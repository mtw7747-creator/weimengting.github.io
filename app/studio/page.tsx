import type { Metadata } from 'next';
import { StudioEditor } from '@/components/studio-editor';
import { chatGptSignInPath, chatGptSignOutPath, getEditorAccess } from '@/lib/auth';
import { getEditorState } from '@/lib/portfolio-store';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: '作者工作台',
  robots: { index: false, follow: false },
};

export default async function StudioPage() {
  const access = await getEditorAccess();

  if (!access.user) {
    return (
      <main className="studio-page shell">
        <section className="studio-gate">
          <p className="kicker">AUTHOR STUDIO</p>
          <h1>登录后编辑作品集</h1>
          <p>这是作者工作台。访客只能查看已发布版本，只有作者账号可以保存草稿或发布更新。</p>
          <a className="studio-button studio-button--primary" href={chatGptSignInPath('/studio')} target="_top">使用 ChatGPT 登录</a>
        </section>
      </main>
    );
  }

  if (!access.allowed) {
    return (
      <main className="studio-page shell">
        <section className="studio-gate">
          <p className="kicker">AUTHOR STUDIO / ACCESS DENIED</p>
          <h1>当前账号没有编辑权限</h1>
          <p>已登录账号：{access.user.email}。请使用配置为作者的 ChatGPT 账号，或联系站点管理员更新 PORTFOLIO_EDITOR_EMAIL。</p>
          <a className="studio-button" href={chatGptSignOutPath('/studio')} target="_top">切换账号</a>
        </section>
      </main>
    );
  }

  let state;
  try {
    state = await getEditorState();
  } catch {
    return (
      <main className="studio-page shell">
        <section className="studio-gate">
          <p className="kicker">AUTHOR STUDIO / STORAGE SETUP</p>
          <h1>编辑存储还没有准备好</h1>
          <p>请先在站点的 D1 数据库中应用 drizzle/0000_portfolio_revisions.sql，再回来打开工作台。</p>
        </section>
      </main>
    );
  }

  return (
    <main className="studio-page shell">
      <header className="studio-heading">
        <div>
          <p className="kicker">AUTHOR STUDIO / {access.user.name ?? access.user.email}</p>
          <h1>编辑作品集</h1>
          <p>先保存草稿，确认无误后再发布。公开页面始终只读取已发布版本。</p>
        </div>
        <div className="studio-heading-actions">
          <span className={`studio-storage studio-storage--${state.storage}`}>{state.storage === 'd1' ? 'D1 已连接' : '本地预览模式'}</span>
          <a className="studio-button" href={chatGptSignOutPath('/studio')} target="_top">退出登录</a>
        </div>
      </header>
      <StudioEditor initialState={state} />
    </main>
  );
}
