/* oxlint-disable next/no-html-link-for-pages -- Full document navigation is intentional on the hosted runtime. */
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { FadeIn } from '@/components/fade-in';
import { CreativeProduction } from '@/components/creative-production';
import { MediaBlock } from '@/components/media-block';
import { MediaLightbox } from '@/components/media-lightbox';
import { projects as staticProjects, type Project, type ProjectMetric } from '@/data/projects';
import { getPublishedContent } from '@/lib/portfolio-store';
import { siteUrl } from '@/lib/site';

export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return staticProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = (await getPublishedContent()).projects.find((item) => item.slug === slug);
  if (!project) return {};

  const image = new URL(project.hero, siteUrl).toString();

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: `${project.title}｜卫梦亭`,
      description: project.summary,
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title}｜卫梦亭`,
      description: project.summary,
      images: [image],
    },
  };
}

const chapters = [
  ['01', '背景与职责', 'decision'],
  ['02', '策略与执行', 'method'],
  ['03', '结果与证据', 'impact'],
  ['04', '项目复盘', 'review'],
];

function metricLevel(metric: ProjectMetric): 'A' | 'B' | 'C' {
  if (metric.level) return metric.level;
  return /(粉丝|阅读|播放|销售|咨询|转化|订单|完播|用户|浏览|点赞|收藏|分享|关注|获赞|评论)/.test(metric.label) ? 'A' : 'B';
}

const detailTypeLabels = {
  growth: { decision: '项目背景与工作重点', method: '我做了什么' },
  matrix: { decision: '项目背景与工作重点', method: '我的策略与执行' },
  commerce: { decision: '交易背景与工作重点', method: '我的解决方案' },
  workflow: { decision: '项目背景与工作重点', method: '工作流设计与验收' },
  editorial: { decision: '项目背景与用途', method: '文章列表' },
} as const;

function EditorialArchivePage({ project }: { project: Project }) {
  const articles = (project.subprojects ?? []).filter((article) => article.href);

  return (
    <main>
      <article className={`case-project case-project--${project.slug} case-project--editorial-archive`}>
        <header className="editorial-archive-header shell">
          <div className="case-breadcrumb">
            <a href="/work">项目库</a>
            <span>/</span>
            <span>{project.category}</span>
          </div>
          <div className="editorial-archive-title">
            <p>ARTICLE ARCHIVE / 文章样本</p>
            <h1>{project.title}</h1>
            <span>{project.year} · {articles.length} 篇文章</span>
          </div>
        </header>

        <section className="editorial-archive-section shell" aria-labelledby="editorial-archive-title">
          <header className="editorial-archive-section-heading">
            <span>ARTICLES</span>
            <h2 id="editorial-archive-title">文章</h2>
          </header>
          <div className="editorial-archive-list">
            {articles.map((article, index) => (
              <a href={article.href} target="_blank" rel="noopener noreferrer" key={article.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{article.title}</h3>
                <span className="editorial-archive-action">{article.body} · 查看原文 ↗</span>
              </a>
            ))}
          </div>
        </section>
      </article>
    </main>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = await getPublishedContent();
  const project = content.projects.find((item) => item.slug === slug);
  if (!project) notFound();

  const projectIndex = content.projects.findIndex((item) => item.slug === slug);
  const nextProject = content.projects[(projectIndex + 1) % content.projects.length];
  const pageLabels = project.detailType ? detailTypeLabels[project.detailType] : { decision: '项目背景与工作重点', method: '策略与执行' };
  const isCompactEditorial = project.detailType === 'editorial';
  if (isCompactEditorial) return <EditorialArchivePage project={project} />;
  const evidenceLivesInAccountMatrix = project.slug === 'medical-device-matrix';
  const chapterNav = isCompactEditorial
    ? ([
        ['01', pageLabels.decision, 'decision'],
        ['02', pageLabels.method, 'editorial-articles'],
      ] as const)
    : chapters.map(([index, label, id], chapterIndex) => [
        index,
        chapterIndex === 0 ? pageLabels.decision : chapterIndex === 1 ? pageLabels.method : label,
        id,
      ] as const);
  const [leadMedia, ...supportingMedia] = project.media;
  const leadMetric = project.metrics[0];
  const evidenceSections = supportingMedia.reduce(
    (sections, media, index) => {
      const title = media.section;
      const current = sections[sections.length - 1];
      if (!current || current.title !== title) sections.push({ title, items: [] });
      sections[sections.length - 1].items.push({ media, index });
      return sections;
    },
    [] as Array<{
      title?: string;
      items: Array<{ media: (typeof supportingMedia)[number]; index: number }>;
    }>,
  );

  return (
    <main>
          <article className={`case-project case-project--${project.slug}`}>
        <header className="case-overview case-overview--v10 shell">
          <div className="case-breadcrumb">
            <a href="/work">项目库</a>
            <span>/</span>
            <span>{project.category}</span>
          </div>

          <div className="case-hero-v10">
            <FadeIn className="case-hero-copy-v10">
              <p className="case-title-en-v10">{project.titleEn}</p>
              <h1>{project.title}</h1>
              <p className="case-summary-v10">{project.summary}</p>

              <div className="case-lead-result-v10">
                <span>代表结果</span>
                <strong>{leadMetric.value}</strong>
                <p>{leadMetric.label}</p>
                {leadMetric.caveat && <small>{leadMetric.caveat}</small>}
              </div>
            </FadeIn>

            {leadMedia && (
              <div className="case-hero-evidence-v10">
                <span>EVIDENCE 01 / 核心证据</span>
                <MediaBlock media={leadMedia} eager />
              </div>
            )}
          </div>

          <dl className="case-facts case-facts--v10">
            <div>
              <dt>周期</dt>
              <dd>{project.year}</dd>
            </div>
            <div>
              <dt>账号 / 产品背景</dt>
              <dd>{project.scope}</dd>
            </div>
            <div>
              <dt>我的角色</dt>
              <dd>{project.contribution?.level ?? '职责见项目说明'}</dd>
            </div>
            <div>
              <dt>个人职责</dt>
              <dd>{project.contribution?.summary ?? project.role.join(' / ')}</dd>
            </div>
            <div>
              <dt>团队协作</dt>
              <dd>{project.team ?? '协作方式见项目说明'}</dd>
            </div>
            <div>
              <dt>渠道</dt>
              <dd>{project.platform.join(' / ')}</dd>
            </div>
          </dl>
        </header>

        <nav className="case-chapters case-chapters--v10" aria-label="案例章节">
          <div className="shell">
            {chapterNav.map(([index, label, id]) => (
              <a href={`#${id}`} key={id}>
                <span>{index}</span>{label}
              </a>
            ))}
          </div>
        </nav>

        <section className="case-story case-story--v10 shell" id="decision">
          <header className="case-story-heading case-story-heading--v10">
            <span>01</span>
            <div>
              <p>PROJECT CONTEXT & RESPONSIBILITY</p>
              <h2>{pageLabels.decision}</h2>
            </div>
          </header>

          <div className="case-decision-v10">
            <div className="case-challenge-v10">
              <span>{project.slug === 'multi-platform-store-setup' ? '当时的交易问题' : '项目背景'}</span>
              <p>{project.challenge}</p>
            </div>
            <FadeIn className="case-insight-v10">
              <span>{project.slug === 'multi-platform-store-setup' ? '我的解决重点' : '我的工作重点'}</span>
              <blockquote>{project.insight}</blockquote>
            </FadeIn>
          </div>
        </section>

        {project.problemFindings && project.problemFindings.length > 0 && (
          <section className="case-specific-block case-specific-block--findings shell" aria-labelledby="problem-findings-title">
            <div className="case-specific-heading">
              <span>01A</span>
              <h3 id="problem-findings-title">我发现的问题</h3>
            </div>
            <ol className="case-finding-list">
              {project.problemFindings.map((finding, index) => (
                <li key={finding}><span>{String(index + 1).padStart(2, '0')}</span><p>{finding}</p></li>
              ))}
            </ol>
          </section>
        )}

        {project.accountMatrix && project.accountMatrix.length > 0 && (
          <section className="case-specific-block case-specific-block--matrix shell" aria-labelledby="account-matrix-title">
            <div className="case-specific-heading">
              <span>01A</span>
              <div>
                <p>ACCOUNT MATRIX</p>
                <h3 id="account-matrix-title">账号矩阵构成</h3>
              </div>
            </div>
            <div className="account-matrix-table" aria-label="医疗器械账号矩阵">
              <div className="account-matrix-row account-matrix-row--head">
                <span>账号</span><span>定位</span><span>用户</span><span>我的职责</span><span>运营时间</span><span>结果</span>
              </div>
              {project.accountMatrix.map((row) => (
                <div className="account-matrix-row" key={row.account}>
                  <strong>{row.href ? <a href={row.href} target="_blank" rel="noreferrer">{row.account} ↗</a> : row.account}</strong>
                  <span>{row.positioning}</span>
                  <span>{row.users}</span>
                  <span>{row.responsibility}</span>
                  <span>{row.duration}</span>
                  <span className="account-matrix-result">
                    <span className="account-matrix-result-copy">{row.result}</span>
                    {(row.evidence?.length || row.evidenceSrc) && (
                      <span className="account-matrix-evidence-list" aria-label={`${row.account}相关截图`}>
                        {(row.evidence ?? [{ src: row.evidenceSrc!, alt: row.evidenceAlt ?? `${row.account}证据截图` }]).map((evidence) => (
                          <span className="account-matrix-evidence" key={evidence.src}>
                            <MediaLightbox
                              src={evidence.src}
                              alt={evidence.alt}
                              sizes="56px"
                            />
                          </span>
                        ))}
                      </span>
                    )}
                    {row.resultLinks && row.resultLinks.length > 0 && (
                      <span className="account-matrix-result-actions">
                        {row.resultLinks.map((link) => (
                          <a href={link.href} target="_blank" rel="noreferrer" key={link.href}>
                            {link.kind === 'video' ? '▶ ' : ''}{link.label} ↗
                          </a>
                        ))}
                      </span>
                    )}
                  </span>
                </div>
              ))}
            </div>
            <p className="case-specific-note">点击结果栏截图可查看完整证据；仅保留仍可访问的账号与视频链接。</p>
          </section>
        )}

        {project.purchasePath && project.purchasePath.length > 0 && (
          <section className="case-specific-block case-specific-block--purchase shell" aria-labelledby="purchase-path-title">
            <div className="case-specific-heading">
              <span>02A</span>
              <div>
                <p>TRANSACTION PATH</p>
                <h3 id="purchase-path-title">我的解决方案：把内容接到成交</h3>
              </div>
            </div>
            <ol className="purchase-path-list">
              {project.purchasePath.map((step, index) => (
                <li key={step.label}><span>{String(index + 1).padStart(2, '0')}</span><strong>{step.label}</strong><p>{step.detail}</p></li>
              ))}
            </ol>
          </section>
        )}

        {project.workflowGroups && project.workflowGroups.length > 0 && (
          <section className="case-specific-block case-specific-block--workflow-groups shell" aria-labelledby="workflow-groups-title">
            <div className="case-specific-heading">
              <span>01B</span>
              <div>
                <p>PROJECT SCOPE</p>
                <h3 id="workflow-groups-title">工作流模块与实际用途</h3>
              </div>
            </div>
            <div className="workflow-groups-grid">
              {project.workflowGroups.map((group, index) => (
                <div key={group.title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h4>{group.title}</h4>
                  <p>{group.body}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {project.workflowBrief && (
          <section className="case-specific-block case-specific-block--workflow shell" aria-labelledby="workflow-brief-title">
            <div className="case-specific-heading">
              <span>02A</span>
              <div>
                <p>PROJECT FRAMEWORK</p>
                <h3 id="workflow-brief-title">为什么做，以及我是怎么落地的</h3>
              </div>
            </div>
            <div className="workflow-lanes">
              <p>先说明为什么做，再说明我如何拆解和落地这些流程</p>
              {project.workflowBrief.lanes.map((lane) => (
                <div className="workflow-lane" key={lane.input}>
                  <strong>{lane.input}</strong><span>{lane.process}</span><span>{lane.output}</span><small>{lane.acceptance}</small>
                </div>
              ))}
            </div>
            {project.workflowBrief.caveat && <p className="case-specific-note">{project.workflowBrief.caveat}</p>}
          </section>
        )}

        {project.slug === 'xiaohongshu-beauty-matrix' && project.dataNotes && (
          <section className="case-specific-block case-specific-block--scope shell" aria-labelledby="beauty-scope-title">
            <div className="case-specific-heading">
              <span>01A</span>
              <div>
                <p>SCOPE & OWNERSHIP</p>
                <h3 id="beauty-scope-title">个人负责范围与平台限制</h3>
              </div>
            </div>
            <div className="scope-callouts">
              <div><span>个人实际负责</span><strong>约 50 个账号（含小号）</strong></div>
              <div><span>重点方向</span><strong>护肤 / 变美 / 颜值建议</strong></div>
              <div><span>账号状态</span><strong>部分已封存或受限</strong></div>
            </div>
            <p className="case-specific-note">平台规则与资质问题导致部分账号后续封存；70W 为历史账号单篇最高浏览。阶段涨粉数据未完整留存，因此不作为结果展示。</p>
          </section>
        )}

        {project.subprojects && project.subprojects.length > 0 && project.slug !== 'medical-device-matrix' && (
          <section
            className="case-story case-story--v10 shell case-subprojects-v10"
            id={isCompactEditorial ? 'editorial-articles' : undefined}
            aria-labelledby="subprojects-title"
          >
            <header className="case-story-heading case-story-heading--v10">
              <span>INDEX</span>
              <div>
                <p>{isCompactEditorial ? 'ARTICLE LIST' : 'ORIGINAL PROJECT INDEX'}</p>
                <h2 id="subprojects-title">{isCompactEditorial ? '文章列表' : '项目分支'}</h2>
              </div>
            </header>
            <div className="case-subprojects-grid-v10">
              {project.subprojects.map((item, index) => (
                <div key={item.title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {!isCompactEditorial && <section className="case-story case-story--v10 shell" id="method">
          <header className="case-story-heading case-story-heading--v10">
            <span>02</span>
            <div>
              <p>STRATEGY & EXECUTION</p>
              <h2>{pageLabels.method}</h2>
            </div>
          </header>

          <div className="case-method-v10">
            <div className="case-strategy-v10">
              <p>我的工作重点</p>
              <ol>
                {project.strategy.map((item, index) => (
                  <li key={item}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <p>{item}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="case-execution-v10">
              <p>具体怎么做</p>
              <div>
                {project.execution.map((item, index) => (
                  <FadeIn className="case-execution-step-v10" delay={index * 0.03} key={item.title}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <h3>{item.title.replace(/^\d+\s*\/\s*/, '')}</h3>
                    <p>{item.body}</p>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </section>}

        {!isCompactEditorial && <section className="case-story case-story--v10 shell" id="impact">
          <header className="case-story-heading case-story-heading--v10">
            <span>03</span>
            <div>
              <p>IMPACT & EVIDENCE</p>
              <h2>结果与证据</h2>
            </div>
          </header>

          <div className="case-impact-v10">
            {project.resultLevels && (
              <div className="case-result-tiers" aria-label="结果可信度分层">
                <div className="case-result-tier case-result-tier--business">
                  <span>LEVEL A / 业务结果</span>
                  {project.resultLevels.business.length > 0 ? <ul>{project.resultLevels.business.map((item) => <li key={item}>{item}</li>)}</ul> : <p>本项目暂无可单独确认的业务结果数据。</p>}
                </div>
                <div className="case-result-tier case-result-tier--process">
                  <span>LEVEL B / 过程成果</span>
                  <ul>{project.resultLevels.process.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
                {project.resultLevels.incomplete && project.resultLevels.incomplete.length > 0 && (
                  <div className="case-result-tier case-result-tier--incomplete">
                    <span>LEVEL C / 数据边界</span>
                    <ul>{project.resultLevels.incomplete.map((item) => <li key={item}>{item}</li>)}</ul>
                  </div>
                )}
                {project.resultLevels.note && <p className="case-specific-note">{project.resultLevels.note}</p>}
              </div>
            )}
            {project.slug === 'wechat-vaccine-growth' && project.dataNotes && (
              <div className="case-data-notes">
                <span>DATA NOTES / 数据口径</span>
                <ul>{project.dataNotes.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
            )}
            <div className={`case-impact-metrics case-impact-metrics--v10 case-impact-metrics--count-${project.metrics.length}`}>
              {project.metrics.map((metric) => (
                <div key={metric.value}>
                  <em className={`metric-level metric-level--${metricLevel(metric)}`}>L{metricLevel(metric)}</em>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                  {metric.source && <small>{metric.source}</small>}
                  {metric.caveat && <small>{metric.caveat}</small>}
                </div>
              ))}
            </div>

            <div className="case-results-v10">
              <p>结果说明</p>
              <ul>
                {project.results.map((result) => <li key={result}>{result}</li>)}
              </ul>
            </div>

            {!evidenceLivesInAccountMatrix && project.links && project.links.length > 0 && (
              <section className="project-links-v14" aria-labelledby="project-links-title">
                <header>
                  <div>
                    <span>ACCOUNT ARCHIVE / 账号与内容证据</span>
                    <h3 id="project-links-title">相关账号与代表内容</h3>
                  </div>
                  <p>公开入口、历史存档与受限账号分开标注；账号下线时，以页面内的截图、代表内容与阶段数据为准。</p>
                </header>
                <div className="project-links-list-v14">
                  {project.links.map((link, index) => {
                    const isWorkflowArchive = project.slug === 'ai-content-workflows';
                    const content = (
                      <>
                        <span className="project-link-index-v14">{String(index + 1).padStart(2, '0')}</span>
                        {!isWorkflowArchive && <span className="project-link-platform-v14">{link.platform}</span>}
                        {!isWorkflowArchive && <span className={`project-link-evidence-v15${link.evidence && project.slug !== 'medical-device-matrix' ? '' : ' project-link-evidence-v15--empty'}`}>
                          {link.evidence && project.slug !== 'medical-device-matrix' && (
                            <Image src={link.evidence.src} alt={link.evidence.alt} fill sizes="88px" className="project-link-evidence-image-v15" />
                          )}
                        </span>}
                        <strong>{link.title}</strong>
                        {!isWorkflowArchive && <span className="project-link-kind-v14">{link.note ?? link.kind}</span>}
                        <span className={`project-link-status-v14 project-link-status-v14--${link.status ?? (link.href ? 'live' : 'unavailable')}`}>
                          {link.status === 'historical' ? '历史存档' : link.status === 'unavailable' ? '无公开入口' : link.href ? '打开链接' : '站内检索'}
                        </span>
                        <span className="project-link-action-v14" aria-hidden="true">{link.href ? '↗' : '—'}</span>
                      </>
                    );

                    const linkKey = `${link.platform}-${link.title}`;
                    const linkRow = link.href ? (
                      <a href={link.href} target="_blank" rel="noreferrer">
                        {content}
                      </a>
                    ) : (
                      <div>{content}</div>
                    );

                    return (
                      <div className="project-link-with-attachments-v14" key={linkKey}>
                        {linkRow}
                        {link.attachments && link.attachments.length > 0 && (
                          <div className={isWorkflowArchive ? 'project-link-inline-attachments-v14' : 'project-link-attachments-v14'}>
                            {link.attachments.map((attachment) => (
                              <MediaBlock media={attachment} key={`${linkKey}-${attachment.src}`} />
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {!evidenceLivesInAccountMatrix && evidenceSections.map((section, sectionIndex) => (
              <section className="case-evidence-section-v10" key={section.title ?? `section-${sectionIndex}`}>
                {section.title && (
                  <header className="case-evidence-heading-v10">
                    <span>{String(sectionIndex + 1).padStart(2, '0')}</span>
                    <div>
                      <p>SELECTED EVIDENCE</p>
                      <h3>{section.title}</h3>
                    </div>
                  </header>
                )}
                <div className="case-evidence-v10">
                  {section.items.map(({ media, index }) => (
                    <div className="case-evidence-item-v10" key={`${media.src}-${media.caption}`}>
                      <span>EVIDENCE {String(index + 2).padStart(2, '0')}</span>
                      <MediaBlock media={media} />
                    </div>
                  ))}
                </div>
              </section>
            ))}

            {project.resources && project.resources.length > 0 && (
              <section className="case-resources-v14" aria-labelledby="project-resources-title">
                <header>
                  <div>
                    <span>PROJECT FILES / 项目资料</span>
                    <h3 id="project-resources-title">项目文件与交付资料</h3>
                  </div>
                  <p>把测试过的指令结构、动作约束与交付方式整理成可下载文件，便于复查具体工作。</p>
                </header>
                <div className="case-resources-list-v14">
                  {project.resources.map((resource, index) => (
                    <a href={resource.href} download key={resource.href}>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <div>
                        <strong>{resource.title}</strong>
                        <p>{resource.description}</p>
                      </div>
                      <small>{resource.label ?? '下载文件'} ↓</small>
                    </a>
                  ))}
                </div>
              </section>
            )}

            {project.production && <CreativeProduction production={project.production} />}
          </div>
        </section>}

        {!isCompactEditorial && <section className="case-story case-story--review-v10 shell" id="review">
          <header className="case-story-heading case-story-heading--v10">
            <span>04</span>
            <div>
              <p>LEARNING</p>
              <h2>项目复盘</h2>
            </div>
          </header>
          <FadeIn className="case-learning-v10">
            <span>沉淀下来的方法</span>
            <blockquote>{project.learnings}</blockquote>
          </FadeIn>
        </section>}

        <nav className="next-project next-project--v10 shell" aria-label="下一个项目">
          <p>NEXT CASE / 下一个案例</p>
          <a href={`/work/${nextProject.slug}`}>
            <span>{nextProject.title}</span>
            <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </article>
    </main>
  );
}
