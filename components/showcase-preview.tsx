'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal, flushSync } from 'react-dom';

export function ShowcasePreview({ src, type, poster, title, projectSlug, className, tabIndex, children }: {
  src: string;
  type: 'video' | 'image';
  poster?: string;
  title: string;
  projectSlug: string;
  className: string;
  tabIndex?: number;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  const openPreview = () => {
    // Mount and start loading in the actual user click, not a later effect.
    flushSync(() => setOpen(true));
    dialog.current?.showModal();
    const player = video.current;
    if (player) {
      player.load();
      player.play().catch(() => {
        // Native controls remain available if the browser rejects autoplay.
      });
    }
  };

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.body.classList.add('showcase-preview-open');
    // Only the active dialog may play; leave background players paused on close.
    document.querySelectorAll<HTMLVideoElement>('video').forEach((player) => {
      if (!dialog.current?.contains(player)) player.pause();
    });
    const activeVideo = video.current;
    return () => {
      activeVideo?.pause();
      if (activeVideo && !activeVideo.isConnected) {
        activeVideo.removeAttribute('src');
        activeVideo.querySelectorAll('source').forEach((source) => source.removeAttribute('src'));
        activeVideo.load();
      }
      document.body.style.overflow = previousOverflow;
      document.body.classList.remove('showcase-preview-open');
      trigger.current?.focus({ preventScroll: true });
    };
  }, [open]);

  return <>
    <div className={className}>
      <button ref={trigger} type="button" className="showcase-preview-trigger" tabIndex={tabIndex}
        aria-haspopup="dialog" aria-label={`${type === 'video' ? '播放' : '放大查看'}：${title}`}
        onClick={openPreview}>{children}</button>
      <a className="showcase-case-link" tabIndex={tabIndex} href={`/work/${projectSlug}`}>查看详细案例 ↗</a>
    </div>
    {open && createPortal(
      <dialog ref={dialog} className="showcase-preview-dialog" aria-label={title}
        onCancel={(event) => { event.preventDefault(); setOpen(false); }}
        onClick={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
        <div className="showcase-preview-panel">
          <header><h2>{title}</h2><button type="button" autoFocus onClick={() => setOpen(false)}>关闭，返回列表 ×</button></header>
          {type === 'video'
            ? <video ref={video} poster={poster} controls playsInline preload="auto">
                <source src={src} type="video/mp4" />
              </video>
            : <img src={src} alt={title} />}
          <footer><a href={`/work/${projectSlug}`}>查看详细案例 ↗</a><button type="button" onClick={() => setOpen(false)}>返回列表，继续浏览</button></footer>
        </div>
      </dialog>, document.body)}
  </>;
}
