'use client';

export function BackLink({ className }: { className: string }) {
  return <a href="/" className={className} onClick={(event) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    if (window.history.length > 1) {
      event.preventDefault();
      window.history.back();
    }
  }}>← 返回上一页</a>;
}
