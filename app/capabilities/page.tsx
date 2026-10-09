/* oxlint-disable next/no-html-link-for-pages -- Full document navigation is intentional on the hosted runtime. */
import type { Metadata } from 'next';
import { FadeIn } from '@/components/fade-in';

export const metadata: Metadata = {
  title: '能力体系',
  description: 'Product Communication、AI Workflow 与 0–1 Building 能力体系。',
};

const stages = [
  {
    index: '01',
    en: 'PRODUCT COMMUNICATION',
    title: '把复杂产品讲清楚',
    statement: '先体验产品和真实操作，再把功能、用户问题与使用价值组织成脚本、演示、教程和传播内容。',
    evidence: [
      ['3类', '医疗 AI 智能体产品视频', '/work/ai-agent-product-films'],
      ['1支', '完整企业产品宣传片', '/work/brand-product-films'],
    ],
    methods: ['产品体验与用户问题', '价值主张与信息层级', '脚本、演示与教程', '发布反馈与表达迭代'],
  },
  {
    index: '02',
    en: 'AI WORKFLOW',
    title: '把重复生产变成工作流',
    statement: '区分适合自动化的重复动作和必须由人判断的环节，明确输入、规则、输出与验收标准。',
    evidence: [
      ['3条', '真实内容生产链路', '/work/ai-content-workflows'],
      ['5类', '运营自动化模块', '/work/ai-operations-automation-suite'],
    ],
    methods: ['任务与异常拆解', '提示词与业务规则', '人机协作节点', '人工抽检与交付出口'],
  },
  {
    index: '03',
    en: '0–1 BUILDING',
    title: '把运营经验做成产品原型',
    statement: '从业务流程出发定义对象、字段、状态与协作关系，用可演示原型验证需求，而不是堆叠 AI 功能。',
    evidence: [
      ['7个', '内容系统核心模块', '/work/ai-content-system'],
      ['1条', '采集到发布主链路', '/work/ai-content-system'],
    ],
    methods: ['业务流程建模', '信息架构与状态', '原型实现与测试', '范围说明与迭代'],
  },
];

export default function CapabilitiesPage() {
  return (
    <main>
      <section className="page-intro capability-intro-v10 shell">
        <p className="kicker">CAPABILITIES / FROM MESSAGE TO SYSTEM</p>
        <FadeIn>
          <h1>把产品讲清楚，<br />把方法做成系统。</h1>
        </FadeIn>
        <p>我的能力不是三组孤立技能，而是一条从产品理解、内容表达，到流程和原型落地的完整链路。</p>
      </section>

      <section className="capability-path-v10 shell" aria-label="能力链路">
        {stages.map((stage, stageIndex) => (
          <FadeIn className="capability-stage-v10" delay={stageIndex * 0.04} key={stage.index}>
            <div className="capability-stage-index-v10">
              <span>{stage.index}</span>
              <p>{stage.en}</p>
            </div>

            <div className="capability-stage-copy-v10">
              <h2>{stage.title}</h2>
              <p>{stage.statement}</p>
              <ul>
                {stage.methods.map((method) => <li key={method}>{method}</li>)}
              </ul>
            </div>

            <div className="capability-stage-proof-v10">
              <span>PROJECT PROOF</span>
              {stage.evidence.map(([value, label, href]) => (
                <a href={href} key={`${href}-${value}`}>
                  <strong>{value}</strong>
                  <p>{label}</p>
                  <small>查看案例 ↗</small>
                </a>
              ))}
            </div>
          </FadeIn>
        ))}
      </section>

      <section className="capability-close capability-close--v10 shell">
        <p className="kicker">THE SHIFT</p>
        <blockquote>从“会使用 AI 工具”，到“能用 AI 解决真实内容问题”。</blockquote>
      </section>
    </main>
  );
}
