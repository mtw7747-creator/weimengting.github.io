/* oxlint-disable next/no-html-link-for-pages -- Full document navigation is intentional on the hosted runtime. */
export default function NotFound() {
  return (
    <main className="not-found shell">
      <p className="kicker">404 / NOT FOUND</p>
      <h1>这页内容，<br />暂时不在选题库。</h1>
      <a className="text-link" href="/work">返回项目库 <span>↗</span></a>
    </main>
  );
}
