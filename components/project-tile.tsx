import type { Project } from '@/data/projects';
import { FadeIn } from './fade-in';
import { ParallaxMedia } from './parallax-media';

export function ProjectTile({
  project,
  index,
  priority = false,
  variant = 'row',
}: {
  project: Project;
  index: string;
  priority?: boolean;
  variant?: 'lead' | 'row';
}) {
  const isEditorial = project.detailType === 'editorial';
  const leadMetric = project.metrics.find((metric) => metric.level === 'A') ?? project.metrics[0];
  const supportingMetric = project.metrics.find((metric) => metric !== leadMetric && metric.level === 'A');
  const contribution = project.contribution?.level ?? (isEditorial ? '内容负责' : '职责见案例');
  const articleItems = project.subprojects ?? [];
  const articleMetric = project.metrics.find((metric) => metric.value.includes('篇'));
  const articleFocusMetric = project.metrics.find((metric) => metric.value.includes('类'));
  const articleExamples = articleItems.slice(0, 2).map((item) => item.title).join('、');

  return (
    <FadeIn className={`project-record project-record--${variant}${isEditorial ? ' project-record--editorial' : ''}`}>
      <a
        href={`/work/${project.slug}`}
        className="project-record-link"
        aria-label={`查看${project.title}案例`}
      >
        <div className="project-record-index">
          <span>{index}</span>
          <small>{project.year}</small>
        </div>

        <div className="project-record-copy">
          <p>{project.category}</p>
          <h3>{project.title}</h3>
          <small className="project-record-role">{contribution} · {project.role.slice(0, 2).join(' / ')}</small>
          {isEditorial ? (
            <div className="project-record-editorial-info">
              <div>
                <span>项目背景</span>
                <p>{project.background ?? project.challenge}</p>
              </div>
              <div>
                <span>内容用途</span>
                <p>{project.purpose ?? project.summary}</p>
              </div>
            </div>
          ) : <span>{project.summary}</span>}
        </div>

        <ParallaxMedia
          src={project.hero}
          alt={project.title}
          sizes="(max-width: 760px) 100vw, (max-width: 1100px) 42vw, 30vw"
          className="project-record-media"
          priority={priority}
        />

        {isEditorial ? (
          <div className="project-record-outcome project-record-articles">
            <div className="project-record-articles-heading">
              <span>文章产出</span>
              <strong>{articleMetric?.value ?? `${articleItems.length}篇`}</strong>
            </div>
            <p className="project-record-articles-focus">
              <span>代表主题</span>
              {articleExamples ? `${articleExamples}${articleItems.length > 2 ? '等' : ''}` : '围绕项目主题持续更新'}
            </p>
            {articleFocusMetric && <p className="project-record-articles-scope">覆盖：{articleFocusMetric.label}</p>}
            <small>查看案例 ↗</small>
          </div>
        ) : (
          <div className="project-record-outcome">
            <span>代表结果</span>
            <strong>{leadMetric.value}</strong>
            <p>{leadMetric.label}</p>
            {supportingMetric && <small className="project-record-outcome-secondary">{supportingMetric.value} · {supportingMetric.label}</small>}
            <small>查看案例 ↗</small>
          </div>
        )}
      </a>
    </FadeIn>
  );
}
