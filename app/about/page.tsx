import type { Metadata } from 'next';
import Image from 'next/image';
import { FadeIn } from '@/components/fade-in';

export const metadata: Metadata = {
  title: '关于我',
  description: '卫梦亭，从内容运营走向 AI 产品传播、工作流与系统设计。',
};

const career = [
  {
    index: '01',
    date: '2023.07—2024.02',
    stage: '建立内容判断',
    company: '山西璟中贸易有限公司 · 新媒体运营',
    body: '从小红书矩阵起步，用账号定位、选题、标题与封面测试理解内容如何获得真实传播。',
    proof: '单篇最高 70W 浏览',
  },
  {
    index: '02',
    date: '2024.07—2025.08',
    stage: '连接产品、内容与业务',
    company: '钰兔科技集团有限公司北京分公司 · 内容运营',
    body: '从 0 搭建医疗器械账号与四平台店铺，也为企业产品、医疗 AI 智能体和宠物小程序完成内容与生成方案。',
    proof: '零广告单月销售 4W+',
  },
  {
    index: '03',
    date: '2026.02—至今',
    stage: '走向 AI 工作流与系统',
    company: '北京大德博瑞管理咨询有限公司 · 新媒体运营经理',
    body: '负责成熟公众号增长与数据复盘，并把数字人、条漫和公众号发布拆成可交付工作流，再整理为内容系统原型。',
    proof: '阅读后关注 +126.8%',
  },
];

export default function AboutPage() {
  return (
    <main>
      <section className="about-hero about-hero--v10 shell">
        <FadeIn className="about-copy about-copy--v10">
          <p className="kicker">ABOUT / WEI MENGTING</p>
          <h1>从内容运营出发，走向 AI 产品传播与流程设计。</h1>
          <p className="about-lead about-lead--v10">
            3 年+内容与 AIGC 实践，能连接产品理解、用户表达、内容生产和系统化落地。
          </p>
          <div className="about-status-v10">
            <span>北京</span>
            <span>AI 产品内容运营 / Product Communication / AI Workflow</span>
          </div>
        </FadeIn>

        <div className="about-portrait about-portrait--v10">
          <Image src="/media/portrait.jpg" alt="卫梦亭" fill sizes="(max-width: 800px) 72vw, 28vw" priority />
        </div>
      </section>

      <section className="career-arc-v10 shell" aria-labelledby="career-title">
        <header>
          <p className="kicker">CAREER ARC / 职业路径</p>
          <h2 id="career-title">三段经历，从内容表现走向产品与系统。</h2>
        </header>

        <div className="career-arc-list-v10">
          {career.map((item, index) => (
            <FadeIn className="career-stage-v10" delay={index * 0.04} key={item.index}>
              <div className="career-stage-meta-v10">
                <span>{item.index}</span>
                <time>{item.date}</time>
              </div>
              <div className="career-stage-main-v10">
                <h3>{item.stage}</h3>
                <p className="career-company-v10">{item.company}</p>
                <p>{item.body}</p>
              </div>
              <strong>{item.proof}</strong>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="about-foundation about-foundation--v10 shell">
        <div>
          <p className="kicker">FOUNDATION</p>
          <h2>专业理解<br />× 产品表达</h2>
        </div>
        <div className="foundation-detail foundation-detail--v10">
          <p>延边大学 · 护理学本科</p>
          <p>健康管理师 / 护士资格证 / GCP 认证</p>
          <p>医疗背景让我尊重事实、边界与审核；运营经验让我把专业信息转成用户能理解、业务能验证、团队能复用的内容。</p>
        </div>
      </section>
    </main>
  );
}
