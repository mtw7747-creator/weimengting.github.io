/* oxlint-disable next/no-html-link-for-pages -- Full document navigation is intentional on the hosted runtime. */
import Image from 'next/image';
import { FadeIn } from '@/components/fade-in';
import { ProjectTile } from '@/components/project-tile';
import { ShowcasePreview } from '@/components/showcase-preview';
import { getPublishedContent } from '@/lib/portfolio-store';

const heroTags = ['内容定位', '增长转化', 'AI 提效'];

export const dynamic = 'force-dynamic';

export default async function Home() {
  const content = await getPublishedContent();
  const { home, homeProjects, homeShowcaseItems, projects, videoShowcaseItems } = content;
  const [leadProject, ...supportingProjects] = homeProjects;

  return (
    <main className="home-page--editorial">
      <section className="home-hero home-hero--editorial shell">
        <div className="home-editorial-stage">
          <FadeIn className="home-editorial-identity">
            <p className="home-editorial-kicker">内容增长运营 / CONTENT GROWTH OPERATIONS</p>
            <h1>卫梦亭</h1>
            <p className="home-editorial-role">{home.role}</p>
            <p className="home-editorial-statement">{home.statement}</p>
          </FadeIn>

          <FadeIn className="home-editorial-position" delay={0.04}>
            <p>职业定位 / POSITIONING</p>
            <h2>从内容执行出发，做内容策略、增长和流程优化，用 AI 提升效率。</h2>
            <dl>
              <div>
                <dt>方向</dt>
                <dd>内容策划 / 账号运营 / AI 提效</dd>
              </div>
              <div>
                <dt>能力</dt>
                <dd>内容策略 / 增长转化 / 流程优化</dd>
              </div>
              <div>
                <dt>重点</dt>
                <dd>公众号增长、内容生产与 AI 提效</dd>
              </div>
            </dl>
          </FadeIn>
        </div>

        <div className="home-editorial-proofs" aria-label="核心业务结果">
          {home.metrics.map(({ value, label }, index) => (
            <FadeIn className="home-editorial-proof" delay={index * 0.03} key={`${value}-${label}`}>
              <strong>{value}</strong>
              <span>{label}</span>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="home-project-shelf-v11 home-project-shelf-v11--editorial shell" aria-label="代表项目轮转预览">
        <div className="home-project-shelf-heading-v11">
          <span>代表案例 / SELECTED CASES</span>
          <a href="#selected-work">查看完整案例 ↓</a>
        </div>
        <div className="home-project-covers-v11">
          <div className="home-project-track-v12">
            {[false, true].map((duplicate) => (
              <div
                className="home-project-group-v12"
                aria-hidden={duplicate || undefined}
                key={duplicate ? 'duplicate' : 'primary'}
              >
                {homeShowcaseItems.map((item, index) => (
                  <ShowcasePreview
                    src={item.src} type={item.type} poster={item.poster} title={item.title} projectSlug={item.projectSlug}
                    className="home-project-cover-v11"
                    tabIndex={duplicate ? -1 : undefined}
                    key={`${duplicate ? 'duplicate' : 'primary'}-${item.projectSlug}-${item.src}`}
                  >
                    <div className="home-project-cover-media-v11">
                      {(item.type !== 'video' || item.poster) && (
                        <Image
                          src={item.type === 'video' ? item.poster! : item.src}
                          alt={duplicate ? '' : item.title}
                          fill
                          sizes="(max-width: 760px) 43vw, 220px"
                          loading={!duplicate && index < 2 ? 'eager' : 'lazy'}
                        />
                      )}
                    </div>
                    <div className="home-project-cover-copy-v11">
                      <span>{String(index + 1).padStart(2, '0')} / {item.label} / {item.year}</span>
                      <strong>{item.title}</strong>
                      <small>{item.metric}</small>
                    </div>
                  </ShowcasePreview>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home-video-work shell" aria-labelledby="home-video-work-title">
        <div className="home-video-heading">
          <div>
            <p className="kicker">02 / CONTENT &amp; CREATIVE ARCHIVE</p>
            <h2 id="home-video-work-title">内容与创作档案，集中呈现写作、影像与生成能力。</h2>
          </div>
          <p className="home-video-heading-label">EDITORIAL · PRODUCT FILMS · AI STORY · EXPLAINERS · AGENT DEMOS</p>
        </div>

        <div className="home-video-grid">
          {videoShowcaseItems.map((item, index) => (
            <ShowcasePreview src={item.src} type={item.type} poster={item.poster} title={item.title} projectSlug={item.projectSlug} className="home-video-card" key={item.projectSlug}>
              <div className="home-video-card-media">
                {(item.type !== 'video' || item.poster) && (
                  <Image src={item.type === 'video' ? item.poster! : item.src} alt={item.title} fill sizes="(max-width: 760px) 100vw, 33vw" />
                )}
                <span>{String(index + 1).padStart(2, '0')} / {item.type === 'video' ? 'PLAY' : 'VIEW'}</span>
              </div>
              <div className="home-video-card-copy">
                <div>
                  <p>{item.label}</p>
                  <h3>{item.title}</h3>
                </div>
                <small>{item.year} · {item.metric}</small>
              </div>
            </ShowcasePreview>
          ))}
        </div>
      </section>

      <section className="selected-work selected-work--v10 shell" id="selected-work">
        <div className="library-heading library-heading--v10">
          <div>
            <p className="kicker">03 / SELECTED WORK</p>
            <h2>五个项目，证明一条能力升级线。</h2>
            <p>先看真实增长与商业转化，再看 AI 工作流如何从运营需求中长出来。</p>
          </div>
          <a href="/work" className="text-link">查看完整项目库 <span>↗</span></a>
        </div>

        {leadProject && (
          <ProjectTile project={leadProject} index="01" priority variant="lead" />
        )}

        <div className="project-library-grid project-library-grid--home-v10">
          {supportingProjects.map((project, index) => (
            <ProjectTile
              project={project}
              index={String(index + 2).padStart(2, '0')}
              priority={index === 0}
              key={project.slug}
            />
          ))}
        </div>
      </section>

      <section className="home-ai-upgrade shell" aria-labelledby="home-ai-upgrade-title">
        <div className="home-video-heading">
          <div>
            <p className="kicker">04 / AI CAPABILITY UPGRADE</p>
            <h2 id="home-ai-upgrade-title">把重复运营动作，升级成可复用的工作流与系统。</h2>
          </div>
          <p className="home-video-heading-label">REAL OPERATIONS NEEDS · WORKFLOW DESIGN · CONTENT SYSTEM</p>
        </div>
        <div className="home-ai-upgrade-list">
          {['ai-content-system'].map((slug, index) => {
            const project = projects.find((item) => item.slug === slug);
            if (!project) return null;
            const metric = project.metrics.find((item) => item.level === 'A') ?? project.metrics[0];
            return (
              <a href={`/work/${project.slug}`} className="home-ai-upgrade-item" key={project.slug}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <p>{project.category}</p>
                  <h3>{project.title}</h3>
                  <small>{project.summary}</small>
                </div>
                <strong>{metric.value}</strong>
              </a>
            );
          })}
        </div>
      </section>
    </main>
  );
}
