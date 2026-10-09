'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

type MediaLightboxProps = {
  src: string;
  alt: string;
  eager?: boolean;
  fit?: 'cover-bottom';
  sizes: string;
};

export function MediaLightbox({ src, alt, eager = false, fit, sizes }: MediaLightboxProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [open]);

  const previewClassName = fit === 'cover-bottom' ? 'contain-image media-image--cover-bottom' : 'contain-image';

  return (
    <>
      <button
        type="button"
        className="media-lightbox-trigger"
        aria-label={`放大查看${alt}`}
        onClick={() => setOpen(true)}
      >
        <Image src={src} alt={alt} fill loading={eager ? 'eager' : 'lazy'} sizes={sizes} className={previewClassName} />
      </button>

      {open && (
        <div className="media-lightbox-backdrop" role="dialog" aria-modal="true" aria-label={`放大查看${alt}`} onClick={() => setOpen(false)}>
          <div className="media-lightbox-frame" onClick={(event) => event.stopPropagation()}>
            <Image src={src} alt={alt} fill sizes="(max-width: 800px) 94vw, 90vw" className="media-lightbox-image" />
            <button type="button" className="media-lightbox-close" aria-label="关闭大图" onClick={() => setOpen(false)}>
              关闭
            </button>
          </div>
        </div>
      )}
    </>
  );
}
