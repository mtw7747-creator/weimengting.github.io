import { projects } from '@/data/projects';
import type { EditableProjectPatch, PortfolioPatch } from '@/data/portfolio-content';
import { getEditorAccess } from '@/lib/auth';
import { getEditorState, publishDraft, saveDraft } from '@/lib/portfolio-store';

export const dynamic = 'force-dynamic';

const contributionLevels = new Set(['独立完成', '主导', '负责', '参与', '待确认']);
const projectSlugs = new Set(projects.map((project) => project.slug));
const maxPayloadLength = 600_000;

function cleanString(value: unknown, maxLength: number) {
  if (typeof value !== 'string') return undefined;
  const cleaned = value.replaceAll('\0', '').trim();
  return cleaned.length <= maxLength ? cleaned : cleaned.slice(0, maxLength);
}

function cleanStringArray(value: unknown, maxItems: number, maxLength: number) {
  if (!Array.isArray(value)) return undefined;
  return value
    .slice(0, maxItems)
    .map((item) => cleanString(item, maxLength))
    .filter((item): item is string => Boolean(item));
}

function cleanExecution(value: unknown): EditableProjectPatch['execution'] | undefined {
  if (!Array.isArray(value)) return undefined;
  return value.slice(0, 12).flatMap((item) => {
    if (!item || typeof item !== 'object') return [];
    const candidate = item as Record<string, unknown>;
    const title = cleanString(candidate.title, 120);
    const body = cleanString(candidate.body, 700);
    return title && body ? [{ title, body }] : [];
  });
}

function cleanMetrics(value: unknown): EditableProjectPatch['metrics'] | undefined {
  if (!Array.isArray(value)) return undefined;
  return value.slice(0, 8).flatMap((item) => {
    if (!item || typeof item !== 'object') return [];
    const candidate = item as Record<string, unknown>;
    const metricValue = cleanString(candidate.value, 80);
    const label = cleanString(candidate.label, 160);
    const level = candidate.level === 'A' || candidate.level === 'B' || candidate.level === 'C' ? candidate.level : undefined;
    return metricValue && label ? [{ value: metricValue, label, ...(level ? { level } : {}) }] : [];
  });
}

function cleanContribution(value: unknown): EditableProjectPatch['contribution'] | undefined {
  if (!value || typeof value !== 'object') return undefined;
  const candidate = value as Record<string, unknown>;
  const level = cleanString(candidate.level, 20);
  const summary = cleanString(candidate.summary, 360);
  if (!level || !contributionLevels.has(level)) return undefined;
  return summary ? { level: level as NonNullable<EditableProjectPatch['contribution']>['level'], summary } : { level: level as NonNullable<EditableProjectPatch['contribution']>['level'] };
}

function cleanProjectPatch(value: unknown): EditableProjectPatch {
  if (!value || typeof value !== 'object') return {};
  const candidate = value as Record<string, unknown>;
  const patch: EditableProjectPatch = {};
  const stringFields: Array<keyof EditableProjectPatch> = ['title', 'titleEn', 'year', 'category', 'scope', 'summary', 'challenge', 'insight', 'learnings', 'team'];
  for (const field of stringFields) {
    const cleaned = cleanString(candidate[field], field === 'summary' || field === 'challenge' || field === 'insight' || field === 'learnings' ? 1200 : 240);
    if (cleaned) patch[field] = cleaned as never;
  }

  const strategy = cleanStringArray(candidate.strategy, 12, 700);
  const results = cleanStringArray(candidate.results, 16, 700);
  const platform = cleanStringArray(candidate.platform, 12, 80);
  const execution = cleanExecution(candidate.execution);
  const metrics = cleanMetrics(candidate.metrics);
  const contribution = cleanContribution(candidate.contribution);
  if (strategy) patch.strategy = strategy;
  if (results) patch.results = results;
  if (platform) patch.platform = platform;
  if (execution) patch.execution = execution;
  if (metrics) patch.metrics = metrics;
  if (contribution) patch.contribution = contribution;
  return patch;
}

function normalizePatch(input: unknown): PortfolioPatch | null {
  if (!input || typeof input !== 'object') return null;
  const candidate = input as Record<string, unknown>;
  if (candidate.version !== 1 || !candidate.projects || typeof candidate.projects !== 'object') return null;

  const projectInput = candidate.projects as Record<string, unknown>;
  const normalizedProjects: PortfolioPatch['projects'] = {};
  for (const [slug, value] of Object.entries(projectInput)) {
    if (projectSlugs.has(slug)) normalizedProjects[slug] = cleanProjectPatch(value);
  }

  const homeInput = candidate.home && typeof candidate.home === 'object' ? candidate.home as Record<string, unknown> : {};
  const home: PortfolioPatch['home'] = {};
  const role = cleanString(homeInput.role, 120);
  const statement = cleanString(homeInput.statement, 180);
  const metrics = Array.isArray(homeInput.metrics)
    ? homeInput.metrics.slice(0, 6).flatMap((item) => {
        if (!item || typeof item !== 'object') return [];
        const metric = item as Record<string, unknown>;
        const value = cleanString(metric.value, 80);
        const label = cleanString(metric.label, 160);
        return value && label ? [{ value, label }] : [];
      })
    : undefined;
  if (role) home.role = role;
  if (statement) home.statement = statement;
  if (metrics?.length) home.metrics = metrics;

  return { version: 1, home, projects: normalizedProjects };
}

async function assertEditor() {
  const access = await getEditorAccess();
  if (!access.user) return new Response(JSON.stringify({ error: '请先登录作者账号。' }), { status: 401, headers: { 'content-type': 'application/json' } });
  if (!access.allowed) return new Response(JSON.stringify({ error: '当前账号没有作者编辑权限。' }), { status: 403, headers: { 'content-type': 'application/json' } });
  return null;
}

export async function GET() {
  const denied = await assertEditor();
  if (denied) return denied;
  try {
    return Response.json(await getEditorState());
  } catch {
    return Response.json({ error: '编辑存储尚未就绪，请先应用 D1 migration。' }, { status: 503 });
  }
}

export async function POST(request: Request) {
  const denied = await assertEditor();
  if (denied) return denied;

  let body: unknown;
  try {
    const raw = await request.text();
    if (raw.length > maxPayloadLength) return Response.json({ error: '内容过大，请减少单次编辑内容。' }, { status: 413 });
    body = JSON.parse(raw);
  } catch {
    return Response.json({ error: '提交内容不是有效 JSON。' }, { status: 400 });
  }

  const payload = body && typeof body === 'object' ? body as Record<string, unknown> : {};
  const patch = normalizePatch(payload.patch);
  const action = payload.action === 'publish' ? 'publish' : 'draft';
  if (!patch) return Response.json({ error: '编辑内容格式不完整，请刷新后重试。' }, { status: 400 });

  try {
    if (action === 'publish') {
      await saveDraft(patch);
      const publishedAt = await publishDraft(patch);
      return Response.json({ ok: true, status: 'published', timestamp: publishedAt });
    }
    const updatedAt = await saveDraft(patch);
    return Response.json({ ok: true, status: 'draft', timestamp: updatedAt });
  } catch (error) {
    const message = error instanceof Error ? error.message : '编辑存储不可用。';
    return Response.json({ error: message }, { status: 503 });
  }
}
