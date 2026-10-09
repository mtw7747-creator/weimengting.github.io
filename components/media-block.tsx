/* oxlint-disable jsx-a11y/media-has-caption -- Portfolio samples use embedded captions when available. */
import Image from 'next/image';
import type { ProjectMedia } from '@/data/projects';
import { MediaLightbox } from '@/components/media-lightbox';

export function MediaBlock({ media, eager = false }: { media: ProjectMedia; eager?: boolean }) {
  return (
    <figure className={`media-block media-block--${media.orientation ?? 'landscape'}`}>
      <div className="media-surface">
        {media.type === 'video' ? (
          <video controls playsInline preload="metadata" poster={media.poster}>
            <source src={media.src} type="video/mp4" />
          </video>
        ) : (
          <MediaLightbox
            src={media.src}
            alt={media.alt}
            eager={eager}
            fit={media.fit}
            sizes={
              media.orientation === 'portrait'
                ? '(max-width: 800px) 100vw, 45vw'
                : '(max-width: 800px) 100vw, 88vw'
            }
          />
        )}
      </div>
      <figcaption>{media.caption}</figcaption>
    </figure>
  );
}
