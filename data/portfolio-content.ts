import {
  homeShowcaseItems as staticHomeShowcaseItems,
  projects as staticProjects,
  projectTracks,
  videoShowcaseItems as staticVideoShowcaseItems,
  type HomeShowcaseItem,
  type Project,
  type ProjectMetric,
} from '@/data/projects';

export type EditableProjectPatch = Partial<
  Pick<
    Project,
    | 'title'
    | 'titleEn'
    | 'year'
    | 'category'
    | 'scope'
    | 'summary'
    | 'challenge'
    | 'insight'
    | 'strategy'
    | 'execution'
    | 'results'
    | 'learnings'
    | 'team'
    | 'platform'
  >
> & {
  contribution?: Project['contribution'];
  metrics?: Pick<ProjectMetric, 'value' | 'label' | 'level'>[];
};

export type HomeContent = {
  role: string;
  statement: string;
  metrics: { value: string; label: string }[];
};

export type PortfolioPatch = {
  version: 1;
  home: Partial<HomeContent>;
  projects: Record<string, EditableProjectPatch>;
};

export type PortfolioContent = {
  home: HomeContent;
  projects: Project[];
  homeProjects: Project[];
  homeShowcaseItems: HomeShowcaseItem[];
  videoShowcaseItems: HomeShowcaseItem[];
  projectTracks: typeof projectTracks;
};

export const defaultHomeContent: HomeContent = {
  role: '内容增长运营｜内容策划、账号运营与 AI 提效',
  statement: '从内容策划、账号运营到增长复盘，关注内容如何被看见、被理解并带来行动，也用 AI 工具减少重复劳动。',
  metrics: [
    ['+40.2%', '公众号大盘阅读增长'],
    ['+126.8%', '阅读后关注增长'],
    ['2h→5min', '数据整理耗时缩短'],
    ['4W+', '电商项目月销售额'],
  ].map(([value, label]) => ({ value, label })),
};

export function emptyPortfolioPatch(): PortfolioPatch {
  return { version: 1, home: {}, projects: {} };
}

function mergeProject(project: Project, patch?: EditableProjectPatch): Project {
  if (!patch) return project;

  // A pre-editor snapshot for this case did not contain ownership fields.
  // Prefer the refreshed source copy until the author saves the rewritten case
  // once, so an old local publication cannot hide the updated project story.
  if ((project.slug === 'kaidou-pet-video-prompts' || project.slug === 'aigc-story-experiment') && !patch.contribution) {
    return project;
  }

  // The first saved version of the AI production case described three
  // workflows as if they were three categories. Let the refreshed source copy
  // migrate that legacy snapshot; later edits saved from Studio still apply.
  if (
    project.slug === 'ai-content-workflows' &&
    patch.title === 'AI 内容生产工作流' &&
    patch.category === '运营提效 / 自动化'
  ) {
    return project;
  }

  // The system case now documents both the V1 workbench and V2 conversational
  // page. A pre-V2 publication should not hide that updated source copy.
  if (project.slug === 'ai-content-system' && patch.summary && !patch.summary.includes('V2')) {
    return project;
  }

  // Keep the independent product-film rewrite visible when an older editor
  // snapshot still contains the generic, pre-background copy.
  if (
    project.slug === 'brand-product-films' &&
    patch.summary === '把产品卖点、使用场景与品牌信息组织成可观看的宣传片，让高专业产品先被理解，再进入后续沟通。' &&
    !patch.contribution
  ) {
    return project;
  }

  // Keep the three-agent rewrite visible when an older editor snapshot still
  // contains the generic product-propagation copy.
  if (
    project.slug === 'ai-agent-product-films' &&
    patch.summary === '围绕三类医疗 AI 智能体，分别把真实操作流程与产品价值转译成清晰的功能演示和宣传内容。'
  ) {
    return project;
  }

  // Keep the article-to-video rewrite visible when an older editor snapshot
  // still contains the generic explainer summary.
  if (
    project.slug === 'blockchain-explainer-video' &&
    patch.summary === '把“链上与链下”等抽象 Web3 概念拆成剧情化短视频，让普通用户在短时观看内建立可记忆的理解框架。'
  ) {
    return project;
  }

  // The travel account was corrected from a four-month label to the actual
  // Dec 2023–Feb 2024 period; do not let the older snapshot restore it.
  if (project.slug === 'new-zealand-travel-account' && patch.year === '2023.11—2024.02') {
    return project;
  }

  // The commerce case now includes digital-human live selling instead of
  // presenting it as a separate project. Keep the concise merged story visible
  // when an older Studio snapshot still contains the pre-merge copy.
  if (
    project.slug === 'multi-platform-store-setup' &&
    patch.summary === '独立完成四平台店铺基础设施、商品视觉与服务话术，把内容触达落到可购买、可咨询、可售后的交易入口。'
  ) {
    return project;
  }

  const merged = {
    ...project,
    ...patch,
    contribution: patch.contribution ?? project.contribution,
    metrics: patch.metrics?.map((metric) => ({ ...metric })) ?? project.metrics,
    strategy: patch.strategy ?? project.strategy,
    execution: patch.execution ?? project.execution,
    results: patch.results ?? project.results,
    platform: patch.platform ?? project.platform,
  };

  // Published drafts can outlive a copy update. Keep this project's account
  // names canonical when an older editor snapshot still contains the former
  // “医疗信息” wording.
  if (project.slug !== 'medical-device-matrix') return merged;

  const normalizeLegacyNames = <T,>(value: T): T => {
    if (typeof value === 'string') {
      return value.replace(/钰兔医疗信息/g, '钰兔医疗器械').replace(/佐将医疗信息/g, '佐将医疗器械') as T;
    }
    if (Array.isArray(value)) return value.map((item) => normalizeLegacyNames(item)) as T;
    if (value && typeof value === 'object') {
      return Object.fromEntries(
        Object.entries(value as Record<string, unknown>).map(([key, item]) => [key, normalizeLegacyNames(item)]),
      ) as T;
    }
    return value;
  };

  return normalizeLegacyNames(merged);
}

function withCurrentMetric(project: Project, media: Pick<HomeShowcaseItem, 'src' | 'type' | 'poster' | 'label'>): HomeShowcaseItem {
  const metric = project.metrics.find((item) => item.level === 'A') ?? project.metrics[0];
  return {
    projectSlug: project.slug,
    title: project.title,
    year: project.year,
    metric: metric ? `${metric.value} · ${metric.label}` : '',
    ...media,
  };
}

function buildShowcaseItems(projects: Project[], source: HomeShowcaseItem[]): HomeShowcaseItem[] {
  return source.flatMap((item) => {
    const project = projects.find((candidate) => candidate.slug === item.projectSlug);
    return project ? [withCurrentMetric(project, item)] : [];
  });
}

export function buildPortfolioContent(patch?: Partial<PortfolioPatch>): PortfolioContent {
  const projects = staticProjects.map((project) => mergeProject(project, patch?.projects?.[project.slug]));
  const legacyHomePatch =
    (patch?.home?.role?.startsWith('新媒体运营 / 内容运营 / AI 内容运营') &&
      patch.home.statement === '内容增长 × 商业转化 × AI 工作流') ||
    patch?.home?.role === '内容增长运营｜账号搭建、内容生产与转化';
  const staleHomeMetrics = Boolean(
    patch?.home?.metrics?.some(({ value }) => value.includes('126.8') || value.includes('浏览（历史最高）')) ||
    (patch?.home?.metrics?.length && patch.home.metrics.length < 4),
  );
  const home = {
    ...defaultHomeContent,
    ...(legacyHomePatch ? {} : patch?.home),
    metrics: legacyHomePatch || staleHomeMetrics
      ? defaultHomeContent.metrics
      : patch?.home?.metrics?.length
        ? patch.home.metrics
        : defaultHomeContent.metrics,
  };

  return {
    home,
    projects,
    homeProjects: projects
      .filter((project) => project.featuredOrder)
      .sort((a, b) => (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99)),
    homeShowcaseItems: buildShowcaseItems(projects, staticHomeShowcaseItems),
    videoShowcaseItems: buildShowcaseItems(projects, staticVideoShowcaseItems),
    projectTracks,
  };
}

export function editorPatchFromContent(content: PortfolioContent): PortfolioPatch {
  const projects = Object.fromEntries(
    content.projects.map((project) => [
      project.slug,
      {
        title: project.title,
        titleEn: project.titleEn,
        year: project.year,
        category: project.category,
        scope: project.scope,
        summary: project.summary,
        challenge: project.challenge,
        insight: project.insight,
        strategy: project.strategy,
        execution: project.execution,
        results: project.results,
        learnings: project.learnings,
        team: project.team,
        platform: project.platform,
        contribution: project.contribution,
        metrics: project.metrics.map(({ value, label, level }) => ({ value, label, level })),
      } satisfies EditableProjectPatch,
    ]),
  );

  return {
    version: 1,
    home: {
      role: content.home.role,
      statement: content.home.statement,
      metrics: content.home.metrics,
    },
    projects,
  };
}

export function projectFromContent(content: PortfolioContent, slug: string) {
  return content.projects.find((project) => project.slug === slug);
}
