'use client';

import { useMemo, useState } from 'react';
import type { EditableProjectPatch, PortfolioPatch } from '@/data/portfolio-content';
import type { RevisionState } from '@/lib/portfolio-store';

type Props = { initialState: RevisionState };
type ProjectField = 'title' | 'titleEn' | 'year' | 'category' | 'scope' | 'summary' | 'challenge' | 'insight' | 'learnings' | 'team';

const textFields: Array<{ key: ProjectField; label: string; multiline?: boolean; hint?: string }> = [
  { key: 'title', label: '项目标题' },
  { key: 'titleEn', label: '英文标题' },
  { key: 'year', label: '项目周期' },
  { key: 'category', label: '项目分类' },
  { key: 'scope', label: '账号 / 产品背景', multiline: true },
  { key: 'summary', label: '首屏摘要', multiline: true, hint: '一句话说明项目做什么、为谁解决什么问题。' },
  { key: 'challenge', label: '项目背景与业务问题', multiline: true },
  { key: 'insight', label: '我的判断', multiline: true, hint: '写清楚“因为观察到什么，所以选择什么”。' },
  { key: 'team', label: '团队协作', multiline: true },
  { key: 'learnings', label: '项目复盘', multiline: true },
];

function lines(value: string | undefined) {
  return value ?? '';
}

function parseLines(value: string) {
  return value.split('\n').map((item) => item.trim()).filter(Boolean);
}

function parseMetrics(value: string) {
  return value.split('\n').map((line) => {
    const [metricValue, label, level] = line.split('|').map((item) => item.trim());
    return metricValue && label ? { value: metricValue, label, ...(level === 'A' || level === 'B' || level === 'C' ? { level } : {}) } : null;
  }).filter((item): item is { value: string; label: string; level?: 'A' | 'B' | 'C' } => Boolean(item));
}

function parseExecution(value: string) {
  return value.split('\n').map((line) => {
    const [title, ...bodyParts] = line.split('|').map((item) => item.trim());
    const body = bodyParts.join(' | ');
    return title && body ? { title, body } : null;
  }).filter((item): item is { title: string; body: string } => Boolean(item));
}

function metricText(metrics: EditableProjectPatch['metrics']) {
  return (metrics ?? []).map((metric) => [metric.value, metric.label, metric.level].filter(Boolean).join(' | ')).join('\n');
}

function executionText(execution: EditableProjectPatch['execution']) {
  return (execution ?? []).map((item) => `${item.title} | ${item.body}`).join('\n');
}

export function StudioEditor({ initialState }: Props) {
  const [draft, setDraft] = useState<PortfolioPatch>(initialState.draft);
  const [selectedSlug, setSelectedSlug] = useState(Object.keys(initialState.draft.projects)[0] ?? '');
  const [pending, setPending] = useState<'draft' | 'publish' | null>(null);
  const [message, setMessage] = useState('');
  const selectedProject = draft.projects[selectedSlug] ?? {};
  const slugs = useMemo(() => Object.keys(draft.projects), [draft.projects]);

  function updateProject(field: keyof EditableProjectPatch, value: unknown) {
    setDraft((current) => ({
      ...current,
      projects: {
        ...current.projects,
        [selectedSlug]: { ...current.projects[selectedSlug], [field]: value },
      },
    }));
  }

  function updateHome(field: 'role' | 'statement', value: string) {
    setDraft((current) => ({ ...current, home: { ...current.home, [field]: value } }));
  }

  async function submit(action: 'draft' | 'publish') {
    if (action === 'publish' && !window.confirm('确认发布当前草稿？公开页面会立即读取这版内容。')) return;
    setPending(action);
    setMessage('');
    try {
      const response = await fetch('/api/studio', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ action, patch: draft }),
      });
      const result = await response.json() as { ok?: boolean; error?: string; timestamp?: string };
      if (!response.ok) throw new Error(result.error ?? '保存失败，请稍后重试。');
      setMessage(action === 'publish' ? `已发布 · ${result.timestamp ?? ''}` : `草稿已保存 · ${result.timestamp ?? ''}`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : '保存失败，请稍后重试。');
    } finally {
      setPending(null);
    }
  }

  return (
    <div className="studio-editor">
      <div className="studio-editor-toolbar">
        <div>
          <span className="studio-label">编辑状态</span>
          <p>当前修改只会进入草稿；发布后访客才能看到。</p>
        </div>
        <div className="studio-editor-actions">
          <button type="button" className="studio-button" onClick={() => submit('draft')} disabled={Boolean(pending)}>{pending === 'draft' ? '保存中…' : '保存草稿'}</button>
          <button type="button" className="studio-button studio-button--primary" onClick={() => submit('publish')} disabled={Boolean(pending)}>{pending === 'publish' ? '发布中…' : '发布版本'}</button>
        </div>
      </div>
      {message && <output className="studio-feedback">{message}</output>}

      <section className="studio-home-panel">
        <div className="studio-section-heading"><span>01</span><div><p>HOME / FIRST IMPRESSION</p><h2>首页首屏</h2></div></div>
        <div className="studio-form-grid studio-form-grid--home">
          <label>岗位定位<input value={draft.home.role ?? ''} onChange={(event) => updateHome('role', event.target.value)} /></label>
          <label>首页主张<input value={draft.home.statement ?? ''} onChange={(event) => updateHome('statement', event.target.value)} /></label>
        </div>
        <label className="studio-field studio-field--wide">首页核心数据 <small>每行一个：数值 | 说明</small><textarea value={(draft.home.metrics ?? []).map((metric) => `${metric.value} | ${metric.label}`).join('\n')} onChange={(event) => setDraft((current) => ({ ...current, home: { ...current.home, metrics: event.target.value.split('\n').map((line) => { const [value, label] = line.split('|').map((item) => item.trim()); return value && label ? { value, label } : null; }).filter((item): item is { value: string; label: string } => Boolean(item)) } }))} /></label>
      </section>

      <section className="studio-project-panel">
        <div className="studio-section-heading"><span>02</span><div><p>PROJECT CONTENT</p><h2>项目页面</h2></div></div>
        <div className="studio-project-selector" role="tablist" aria-label="选择要编辑的项目">
          {slugs.map((slug) => <button type="button" role="tab" aria-selected={selectedSlug === slug} className={selectedSlug === slug ? 'is-active' : ''} onClick={() => setSelectedSlug(slug)} key={slug}>{draft.projects[slug]?.title ?? slug}</button>)}
        </div>
        <div className="studio-form-grid">
          {textFields.map(({ key, label, multiline, hint }) => {
            const value = String(selectedProject[key] ?? '');
            return <label className={multiline ? 'studio-field studio-field--wide' : 'studio-field'} key={key}>{label}{hint && <small>{hint}</small>}{multiline ? <textarea value={value} onChange={(event) => updateProject(key, event.target.value)} /> : <input value={value} onChange={(event) => updateProject(key, event.target.value)} />}</label>;
          })}
          <label className="studio-field studio-field--wide">代表结果 <small>每行一个结果</small><textarea value={lines(selectedProject.results?.join('\n'))} onChange={(event) => updateProject('results', parseLines(event.target.value))} /></label>
          <label className="studio-field studio-field--wide">策略要点 <small>每行一个策略判断</small><textarea value={lines(selectedProject.strategy?.join('\n'))} onChange={(event) => updateProject('strategy', parseLines(event.target.value))} /></label>
          <label className="studio-field studio-field--wide">执行路径 <small>每行一个：标题 | 具体动作</small><textarea value={executionText(selectedProject.execution)} onChange={(event) => updateProject('execution', parseExecution(event.target.value))} /></label>
          <label className="studio-field studio-field--wide">项目指标 <small>每行一个：数值 | 说明 | A/B/C（A 为业务结果）</small><textarea value={metricText(selectedProject.metrics)} onChange={(event) => updateProject('metrics', parseMetrics(event.target.value))} /></label>
        </div>
      </section>
    </div>
  );
}
