import type { Metadata } from 'next';
import { ProjectTile } from '@/components/project-tile';
import { projectArchiveOrder } from '@/data/projects';
import { getPublishedContent } from '@/lib/portfolio-store';

export const metadata: Metadata = {
  title: '项目库',
  description: 'AI 产品传播、工作流、0–1 系统以及内容增长项目。',
};

export const dynamic = 'force-dynamic';

export default async function WorkPage() {
  const { projects, projectTracks } = await getPublishedContent();
  const archiveProjects = projects.filter((project) => project.slug !== 'ai-operations-automation-suite');

  return (
    <main>
      <section className="work-library-intro shell">
        <div className="library-heading library-heading--archive-page">
          <div>
            <p className="kicker">WORK / 2023—2026</p>
            <h1>项目库</h1>
            <p>先看 AI 产品传播、工作流与系统，再看支撑这些能力的增长和商业实践。</p>
          </div>
          <span className="work-library-scope">PRODUCT COMMUNICATION / WORKFLOW / BUILDING</span>
        </div>

        <div className="library-note">
          {archiveProjects.length} PROJECTS / 2023—2026 / {projectTracks.length} TRACKS
        </div>
      </section>

      <section className="work-index shell" id="work-library" aria-label="项目列表">
        <nav className="library-tabs library-tabs--archive" aria-label="项目分类">
          <a href="#work-library" className="library-tabs-active">全部项目</a>
          {projectTracks.map((track) => (
            <a href={`#archive-${track.id}`} key={track.id}>{track.label}</a>
          ))}
        </nav>

        {projectTracks.map((track) => {
          const trackProjects = archiveProjects
            .filter((project) => project.track === track.id)
            .sort((a, b) => {
              const order = projectArchiveOrder[track.id] ?? [];
              const aIndex = order.indexOf(a.slug);
              const bIndex = order.indexOf(b.slug);
              return (aIndex === -1 ? 99 : aIndex) - (bIndex === -1 ? 99 : bIndex);
            });

          return (
            <section className="work-archive-group" id={`archive-${track.id}`} key={track.id}>
              <header className="library-group-heading">
                <span>{track.index}</span>
                <div>
                  <p>{track.labelEn}</p>
                  <h2>{track.label}</h2>
                </div>
                <p>{track.description}</p>
                <small>{String(trackProjects.length).padStart(2, '0')} PROJECTS</small>
              </header>

              <div className="project-library-grid">
                {trackProjects.map((project, index) => (
                  <ProjectTile
                    project={project}
                    index={`${track.index}.${String(index + 1).padStart(2, '0')}`}
                    priority={index === 0}
                    key={project.slug}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </section>
    </main>
  );
}
