'use client';

/* oxlint-disable next/no-html-link-for-pages -- Full document navigation is intentional on the hosted runtime. */
import { usePathname } from 'next/navigation';

const navigation = [
  ['项目', 'Work', '/work'],
  ['能力', 'Capabilities', '/capabilities'],
  ['关于', 'About', '/about'],
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="site-header shell">
      <a href="/" className="wordmark" aria-label="卫梦亭首页">
        WM.
      </a>
      <nav aria-label="主要导航">
        {navigation.map(([label, labelEn, href]) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <a key={href} href={href} data-active={active || undefined}>
              <span>{label}</span>
              <small>{labelEn}</small>
            </a>
          );
        })}
      </nav>
      {pathname !== '/' && pathname !== '/work' ? (
        <a className="header-back" href={pathname.startsWith('/work/') ? '/work' : '/'}>
          <span aria-hidden="true">←</span>
          <span>返回</span>
        </a>
      ) : null}
      <a className="header-contact" href="mailto:mtw7747@gmail.com">
        Contact
      </a>
    </header>
  );
}
