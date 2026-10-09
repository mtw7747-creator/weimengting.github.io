import type { Project } from '@/data/projects';
import { FadeIn } from './fade-in';
import { ParallaxMedia } from './parallax-media';

export function ProjectPreview({
  project,
  index,
  variant = 'default',
}: {
  project: Project;
  index: number;
  variant?: 'wide' | 'default' | 'staggered';
}) {
  return (
    <article className={`project-preview project-preview--${variant}`}>
      <a href={`/work/${project.slug}`} className="project-media-link">
        <ParallaxMedia
          src={project.hero}
          alt={project.title}
          sizes={variant === 'wide' ? '100vw' : '(max-width: 800px) 100vw, 50vw'}
          className="project-preview-media"
          priority={index === 0}
        />
      </a>
      <FadeIn className="project-preview-copy">
        <div className="project-line">
          <span>{String(index + 1).padStart(2, '0')}</span>
          <span>{project.year}</span>
        </div>
        <div className="project-heading-row">
          <div>
            <p className="project-category">{project.category}</p>
            <h3>
              <a href={`/work/${project.slug}`}>{project.title}</a>
            </h3>
          </div>
          <span className="project-arrow" aria-hidden="true">
            ↗
          </span>
        </div>
        <p className="project-summary">{project.summary}</p>
        <div className="project-result-line">
          {project.metrics.slice(0, 3).map((metric) => (
            <span key={metric.value}>
              <strong>{metric.value}</strong> {metric.label}
            </span>
          ))}
        </div>
      </FadeIn>
    </article>
  );
}
