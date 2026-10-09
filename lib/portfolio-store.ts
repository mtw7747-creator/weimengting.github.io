import {
  buildPortfolioContent,
  editorPatchFromContent,
  emptyPortfolioPatch,
  type PortfolioContent,
  type PortfolioPatch,
} from '@/data/portfolio-content';

const CLOUDFLARE_WORKERS_MODULE = 'cloudflare:workers';
const DRAFT_ID = 'portfolio-draft';
const PUBLISHED_ID = 'portfolio-published';
let developmentSchemaReady = false;

type RevisionRow = {
  payload: string;
  updated_at: string;
  published_at: string | null;
};

type RuntimeModule = { env?: { DB?: D1Database } };

export type RevisionState = {
  draft: PortfolioPatch;
  published: PortfolioPatch;
  draftUpdatedAt: string | null;
  publishedAt: string | null;
  storage: 'd1' | 'static-fallback';
};

async function getDatabase(): Promise<D1Database | null> {
  try {
    const runtime = (await import(/* @vite-ignore */ CLOUDFLARE_WORKERS_MODULE)) as RuntimeModule;
    return runtime.env?.DB ?? null;
  } catch {
    // `next dev` does not provide Cloudflare bindings. The Sites/Vinext
    // runtime does, so local authoring should use `npm run sites:dev`.
    return null;
  }
}

async function ensureDevelopmentSchema(db: D1Database) {
  if (process.env.NODE_ENV === 'production' || developmentSchemaReady) return;
  // Vinext's local worker starts an isolated Miniflare D1 instance. Production
  // schema changes still come from the checked-in migration; this tiny local
  // bootstrap keeps the authoring preview usable before a local migration is
  // applied.
  await db
    .prepare(
      "CREATE TABLE IF NOT EXISTS portfolio_revisions (id TEXT PRIMARY KEY NOT NULL, status TEXT NOT NULL CHECK (status IN ('draft', 'published')), payload TEXT NOT NULL, updated_at TEXT NOT NULL, published_at TEXT)",
    )
    .run();
  await db
    .prepare('CREATE INDEX IF NOT EXISTS idx_portfolio_revisions_status_updated_at ON portfolio_revisions(status, updated_at)')
    .run();
  developmentSchemaReady = true;
}

function parsePatch(payload: string | null | undefined): PortfolioPatch | null {
  if (!payload) return null;
  try {
    const parsed = JSON.parse(payload) as Partial<PortfolioPatch>;
    if (parsed.version !== 1 || !parsed.projects || typeof parsed.projects !== 'object') return null;
    return {
      version: 1,
      home: parsed.home && typeof parsed.home === 'object' ? parsed.home : {},
      projects: parsed.projects as PortfolioPatch['projects'],
    };
  } catch {
    return null;
  }
}

async function readRevision(db: D1Database, id: string): Promise<RevisionRow | null> {
  return db
    .prepare('SELECT payload, updated_at, published_at FROM portfolio_revisions WHERE id = ?1 LIMIT 1')
    .bind(id)
    .first<RevisionRow>();
}

export async function getPublishedContent(): Promise<PortfolioContent> {
  const db = await getDatabase();
  if (!db) return buildPortfolioContent();

  try {
    await ensureDevelopmentSchema(db);
    const row = await readRevision(db, PUBLISHED_ID);
    return buildPortfolioContent(parsePatch(row?.payload) ?? undefined);
  } catch {
    // A not-yet-applied migration should never take the public portfolio
    // offline. The editor reports the storage issue explicitly instead.
    return buildPortfolioContent();
  }
}

export async function getEditorState(): Promise<RevisionState> {
  const db = await getDatabase();
  if (!db) {
    const content = buildPortfolioContent();
    const patch = editorPatchFromContent(content);
    return {
      draft: patch,
      published: patch,
      draftUpdatedAt: null,
      publishedAt: null,
      storage: 'static-fallback',
    };
  }

  await ensureDevelopmentSchema(db);
  const [draftRow, publishedRow] = await Promise.all([
    readRevision(db, DRAFT_ID),
    readRevision(db, PUBLISHED_ID),
  ]);
  const published = parsePatch(publishedRow?.payload) ?? emptyPortfolioPatch();
  const draft = parsePatch(draftRow?.payload) ?? published;

  return {
    draft: editorPatchFromContent(buildPortfolioContent(draft)),
    published: editorPatchFromContent(buildPortfolioContent(published)),
    draftUpdatedAt: draftRow?.updated_at ?? null,
    publishedAt: publishedRow?.published_at ?? null,
    storage: 'd1',
  };
}

export async function saveDraft(patch: PortfolioPatch): Promise<string> {
  return saveRevision(DRAFT_ID, 'draft', patch);
}

export async function publishDraft(patch: PortfolioPatch): Promise<string> {
  return saveRevision(PUBLISHED_ID, 'published', patch);
}

async function saveRevision(id: string, status: 'draft' | 'published', patch: PortfolioPatch): Promise<string> {
  const db = await getDatabase();
  if (!db) throw new Error('D1 未连接。请使用 Sites/Vinext 运行时，并先应用 drizzle/0000_portfolio_revisions.sql。');
  await ensureDevelopmentSchema(db);

  const now = new Date().toISOString();
  const publishedAt = status === 'published' ? now : null;
  const payload = JSON.stringify(patch);
  await db
    .prepare(
      'INSERT INTO portfolio_revisions (id, status, payload, updated_at, published_at) VALUES (?1, ?2, ?3, ?4, ?5) ON CONFLICT(id) DO UPDATE SET status = excluded.status, payload = excluded.payload, updated_at = excluded.updated_at, published_at = excluded.published_at',
    )
    .bind(id, status, payload, now, publishedAt)
    .run();

  return now;
}
