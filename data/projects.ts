export type ProjectMetric = {
  value: string;
  label: string;
  detail?: string;
  level?: 'A' | 'B' | 'C';
  source?: string;
  caveat?: string;
};

export type ContributionLevel = '独立完成' | '主导' | '负责' | '参与' | '待确认';

export type ProjectContribution = {
  level: ContributionLevel;
  summary?: string;
};

export type ProjectResultLevels = {
  business: string[];
  process: string[];
  incomplete?: string[];
  note?: string;
};

export type AccountMatrixRow = {
  account: string;
  href?: string;
  positioning: string;
  users: string;
  responsibility: string;
  duration: string;
  result: string;
  evidenceSrc?: string;
  evidenceAlt?: string;
  evidence?: {
    src: string;
    alt: string;
  }[];
  resultLinks?: {
    label: string;
    href: string;
    kind: 'account' | 'video' | 'content';
  }[];
};

export type PurchasePathStep = {
  label: string;
  detail: string;
};

export type WorkflowBrief = {
  original: { label: string; detail: string; time?: string }[];
  automate: string[];
  human: string[];
  lanes: { input: string; process: string; output: string; acceptance: string }[];
  caveat?: string;
};

export type WorkflowGroup = {
  title: string;
  body: string;
};

export type ProjectMedia = {
  src: string;
  type: 'image' | 'video';
  alt: string;
  caption: string;
  poster?: string;
  orientation?: 'landscape' | 'portrait';
  section?: string;
  fit?: 'cover-bottom';
};

export type ProjectLink = {
  platform: string;
  title: string;
  kind: '账号主页' | '代表内容' | '站内账号' | '历史内容';
  href?: string;
  note?: string;
  status?: 'live' | 'historical' | 'unavailable';
  evidence?: {
    src: string;
    alt: string;
  };
  attachments?: ProjectMedia[];
};

export type ProjectResource = {
  title: string;
  description: string;
  href: string;
  label?: string;
};

export type ProjectProduction = {
  title: string;
  subtitle: string;
  videoPrompt: {
    nodeCount: string;
    excerpt: string[];
    download: string;
  };
  characterPromptBase: string;
  characters: {
    name: string;
    stage: string;
    image: string;
    prompt: string;
  }[];
  song: {
    title: string;
    src: string;
    duration: string;
    format: string;
  };
  assetNotesDownload: string;
};

export type HomeShowcaseItem = {
  projectSlug: string;
  title: string;
  year: string;
  metric: string;
  label: string;
  src: string;
  type: 'image' | 'video';
  poster?: string;
};

export type Project = {
  slug: string;
  featuredOrder?: number;
  title: string;
  titleEn: string;
  year: string;
  category: string;
  track: 'growth' | 'commerce' | 'editorial' | 'systems' | 'video' | 'experiment';
  detailType?: 'growth' | 'matrix' | 'commerce' | 'workflow' | 'editorial';
  scope: string;
  role: string[];
  contribution?: ProjectContribution;
  team?: string;
  platform: string[];
  summary: string;
  background?: string;
  purpose?: string;
  hero: string;
  metrics: ProjectMetric[];
  resultLevels?: ProjectResultLevels;
  problemFindings?: string[];
  dataNotes?: string[];
  accountMatrix?: AccountMatrixRow[];
  purchasePath?: PurchasePathStep[];
  workflowBrief?: WorkflowBrief;
  workflowGroups?: WorkflowGroup[];
  challenge: string;
  insight: string;
  strategy: string[];
  subprojects?: { title: string; body: string; href?: string }[];
  execution: { title: string; body: string }[];
  results: string[];
  media: ProjectMedia[];
  links?: ProjectLink[];
  resources?: ProjectResource[];
  production?: ProjectProduction;
  learnings: string;
};

export const projects: Project[] = [
  {
    slug: 'new-zealand-travel-account',
    featuredOrder: 6,
    title: '新西兰旅游账号运营',
    titleEn: 'New Zealand Travel Content Account',
    year: '2023.12—2024.02',
    category: '旅游内容 / 本地生活',
    track: 'growth',
    scope: '面向山西本地出境游客｜为新西兰组团旅行社做小红书获客',
    role: ['账号定位', '选题策划', '脚本与剪辑', '发布运营'],
    contribution: {
      level: '独立完成',
      summary: '独立完成旅行社筛选、选题、攻略整理、视频剪辑与小红书获客运营。',
    },
    team: '个人独立完成｜无额外内容团队协作',
    platform: ['小红书'],
    summary:
      '为面向山西本地游客、组织新西兰旅行团的旅行社搭建小红书账号，用目的地攻略和风景视频获取线上咨询，再按实际客源转化获得相应提成。',
    hero: '/media/new-zealand-account.png',
    metrics: [
      { value: '3个月', label: '短周期账号运营' },
      { value: '67', label: '阶段粉丝' },
      { value: '651', label: '获赞与收藏' },
    ],
    challenge:
      '合作方有新西兰组团和接待能力，但缺少面向山西本地游客的线上获客渠道。我负责搭建小红书账号，通过攻略、风景视频和路线内容吸引有出境需求的本地游客，再将咨询交给旅行社跟进；项目按客源转化获得提成。',
    insight:
      '先确认旅行社的组团、报价和接待能力，再用新西兰目的地内容吸引山西本地游客。账号的目标不是单纯涨粉，而是带来有效咨询和可跟进的客源。',
    strategy: [
      '先确认旅行社的路线、客群与咨询承接能力，再决定账号的内容边界。',
      '把目的地信息组织成用户能做决定的攻略，而不是单纯展示风景。',
      '用持续发布和咨询入口验证内容是否真正带来旅行需求。',
    ],
    execution: [
      { title: '01 / 合作筛选', body: '确认合作旅行社的新西兰组团、路线、报价和接待能力，明确客源转化和提成方式。' },
      { title: '02 / 攻略整理', body: '通过 YouTube 等渠道寻找目的地视频，用 ChatGPT 辅助整理路线、预算、季节与注意事项。' },
      { title: '03 / 视频与图文', body: '独立完成选题、脚本、风景视频剪辑、攻略排版和小红书发布。' },
      { title: '04 / 内容获客', body: '面向山西本地有出境需求的游客发布内容，引导用户咨询，再交由旅行社跟进。' },
    ],
    results: [
      '完成“KK带你漫游新西兰”账号从 0 到 1 的内容搭建。',
      '阶段账号粉丝 67，获赞与收藏 651；数据以历史截图为准。',
      '形成目的地攻略、路线体验、旅行预算与避坑内容，为合作旅行社带来线上咨询；项目收入以实际客源转化后的提成为准。',
    ],
    media: [
      { src: '/media/new-zealand-account.png', type: 'image', alt: '新西兰旅游账号主页与内容矩阵截图', caption: '账号主页、内容定位与阶段数据的历史截图。', orientation: 'portrait' },
      { src: '/media/new-zealand-feed.jpg', type: 'image', alt: '新西兰旅游账号内容流截图', caption: '攻略、路线与旅行决策内容组合。', orientation: 'portrait' },
      { src: '/media/new-zealand-post.jpg', type: 'image', alt: '新西兰旅游攻略笔记截图', caption: '把目的地卖点转译为可收藏的路线与避坑信息。', orientation: 'portrait' },
      { src: '/media/new-zealand-kk-representative-video.mp4', type: 'video', alt: 'KK带你漫游新西兰代表视频', caption: '代表视频：用目的地内容与轻量叙事吸引对新西兰感兴趣的用户。', orientation: 'portrait', section: 'KK带你漫游新西兰｜代表内容' },
      { src: '/media/new-zealand-kk-video-data.jpg', type: 'image', alt: 'KK带你漫游新西兰视频数据截图', caption: '对应视频的数据截图：180 次点赞、47 次收藏、10 条评论。', orientation: 'portrait', section: 'KK带你漫游新西兰｜代表内容', fit: 'cover-bottom' },
      { src: '/media/new-zealand-kk-representative-video-02.mp4', type: 'video', alt: 'KK带你漫游新西兰第二支代表视频', caption: '代表视频 02：用目的地标题与风景画面承接新西兰自由行兴趣。', orientation: 'portrait', section: 'KK带你漫游新西兰｜代表内容' },
      { src: '/media/new-zealand-kk-video-data-02.jpg', type: 'image', alt: 'KK带你漫游新西兰第二支视频数据截图', caption: '对应视频的数据截图：30 次点赞、6 次收藏、3 条评论。', orientation: 'portrait', section: 'KK带你漫游新西兰｜代表内容', fit: 'cover-bottom' },
    ],
    links: [
      { platform: '小红书', title: 'KK带你漫游新西兰', kind: '账号主页', href: 'https://www.xiaohongshu.com/user/profile/65517ff700000000020112cf?xsec_token=YBMgALhxNkKUf_s6sAT7lg2APPYFWGlvjBfqExlyMQJhg=&xsec_source=app_share&apptime=1789012379&shareRedId=N0w2OUg6OUo2NzUyOTgwNjY0OTc8SjxN&share_id=c0f005adacdf419bae53b8ce05eafa14&xhsshare=CopyLink', note: '主页当前可访问；账号阶段数据与内容截图同步保留作为项目证据。', status: 'live' },
    ],
    learnings:
      '这个项目让我积累了从零搭建旅行账号、整理目的地攻略和制作获客内容的经验，也让我更清楚内容要围绕具体游客的问题来写。',
  },
  {
    slug: 'medical-device-matrix',
    featuredOrder: 2,
    title: '医疗器械账号矩阵',
    titleEn: 'Medical Device Content Matrix',
    year: '2024.07月底—2024.11',
    category: '账号增长 / 医疗内容',
    track: 'growth',
    detailType: 'matrix',
    scope: '钰兔科技任职项目｜2 个专业号从 0→1；钰兔后续连接电商售后与代理商教育',
    role: ['账号从 0 搭建', '技术资料转译', '拍摄与脚本', '矩阵复盘'],
    contribution: { level: '主导', summary: '主导两个核心专业号从 0 到 1 搭建，并负责两个辅助账号的内容与视觉优化' },
    team: '与产品、电商及代理商协作｜我负责账号搭建、内容转译与交付',
    platform: ['小红书、抖音（主要运营）', '公众号、视频号、B站（内容延展）'],
    summary:
      '本项目包含两个核心医疗器械专业号，以及两个用于承接行业科普和职业内容的辅助账号。我的核心工作是从 0 到 1 搭建钰兔医疗器械、佐将医疗器械，并把新技术资料、拍摄素材和售后问题整理成可持续更新的内容资产。',
    hero: '/media/medical-accounts.png',
    metrics: [
      { value: '608 / 574', label: '核心专业号历史粉丝（钰兔／佐将）', level: 'A', source: '历史主页截图；分别对应钰兔 608、佐将 574' },
      { value: '2个', label: '核心专业号从 0→1 搭建', level: 'B' },
      { value: '2473', label: '辅助号抖音历史粉丝', level: 'A', source: '钰兔经纪人抖音历史主页截图', caveat: '同一历史主页同时显示 1.8 万获赞' },
    ],
    challenge:
      '两个核心产品都缺少可以直接使用的中文教育内容：一个是无创血糖仪，另一个是从国外引进的自体脂肪微颗粒关节修复技术。内容需要从设备、页面和技术资料开始重新整理，并配合医疗内容审核。',
    insight:
      '我分别为两个产品账号完成从 0 搭建、设备拍摄、资料整理到内容发布：核对产品资料和实际使用信息，把产品原理、使用方式与售后问题写成用户能理解、团队能继续使用的内容，并配合完成医疗内容审核。',
    strategy: [
      '按产品拆分账号和内容边界，分别服务产品教育与技术咨询。',
      '把设备、技术资料和售后问题转译成用户能理解、团队能复用的内容。',
      '把内容放进业务路径，根据电商承接、客单价和地域覆盖判断继续投入还是收缩。',
    ],
    resultLevels: {
      business: ['两个核心专业号历史粉丝：608／574', '钰兔经纪人抖音历史主页：2473 粉丝、1.8 万获赞'],
      process: ['完成两个核心专业号从 0 到 1 的定位、栏目、拍摄和内容发布；钰兔后续接入电商售后与代理商教育'],
      incomplete: ['两个专业号的逐月涨粉曲线、线索量与转化数据未完整留存'],
      note: '账号已封存或受限时，以本页对应截图与历史记录核验。',
    },
    accountMatrix: [
      {
        account: '核心｜钰兔医疗器械',
        href: 'https://www.xiaohongshu.com/user/profile/66a74245000000001d0332a2',
        positioning: '无创血糖仪产品教育专业号',
        users: '首次了解用户／购买后用户／代理商',
        responsibility: '主导：从 0 搭建、拍摄、资料转译、内容与售后栏目',
        duration: '约 2—3 个月',
        result: '历史主页 608 粉丝；后续接入电商与代理商教育',
        evidenceSrc: '/media/yutu-device-profile.jpg',
        evidenceAlt: '钰兔医疗器械小红书历史主页截图',
        evidence: [
          { src: '/media/yutu-device-profile.jpg', alt: '钰兔医疗器械小红书历史主页截图' },
          { src: '/media/yutu-device-feed.jpg', alt: '钰兔医疗器械历史内容截图' },
          { src: '/media/yutu-device-proof.jpg', alt: '钰兔医疗器械阶段结果截图' },
        ],
        resultLinks: [
          { label: '打开账号主页', href: 'https://www.xiaohongshu.com/user/profile/66a74245000000001d0332a2', kind: 'account' },
        ],
      },
      {
        account: '核心｜佐将医疗器械',
        positioning: '自体脂肪微颗粒关节修复技术专业号',
        users: '关节损伤／手术相关咨询人群',
        responsibility: '主导：从 0 搭建、技术表达与合规内容',
        duration: '约 2 个月',
        result: '历史主页 574 粉丝；较早跑通后因高客单价与地域覆盖限制停止扩量',
        evidenceSrc: '/media/zuojiang-device-01.jpg',
        evidenceAlt: '佐将医疗器械小红书历史主页截图',
        evidence: [
          { src: '/media/zuojiang-device-01.jpg', alt: '佐将医疗器械小红书历史主页截图' },
          { src: '/media/zuojiang-device-02.jpg', alt: '佐将医疗器械历史内容截图一' },
          { src: '/media/zuojiang-device-03.jpg', alt: '佐将医疗器械历史内容截图二' },
          { src: '/media/zuojiang-device-04.jpg', alt: '佐将医疗器械历史内容截图三' },
        ],
      },
      {
        account: '辅助｜医学专利科普君',
        positioning: '医学专利转化科普辅助号',
        users: '医药／专利相关人群',
        responsibility: '负责：视觉与发布逻辑优化',
        duration: '任职期间辅助运营',
        result: '历史内容截图；粉丝数据未单独留存，当前受限',
        evidenceSrc: '/media/medical-patent-feed-01.jpg',
        evidenceAlt: '医学专利科普君小红书历史内容截图',
        evidence: [
          { src: '/media/medical-patent-feed-01.jpg', alt: '医学专利科普君小红书历史内容截图一' },
          { src: '/media/medical-patent-feed-02.jpg', alt: '医学专利科普君小红书历史内容截图二' },
        ],
      },
      {
        account: '辅助｜钰兔经纪人',
        positioning: '医药代表职业／兼职内容',
        users: '医药代表与求职人群',
        responsibility: '负责：小红书／抖音内容与视觉逻辑',
        duration: '任职期间辅助运营',
        result: '抖音历史主页 2473 粉丝、1.8 万获赞（截图）',
        evidenceSrc: '/media/yutu-agent-douyin-grid.png',
        evidenceAlt: '钰兔经纪人抖音作品列表截图',
        evidence: [
          { src: '/media/yutu-agent-xhs-profile.jpg', alt: '钰兔经纪人小红书历史主页截图' },
          { src: '/media/yutu-agent-xhs-feed-01.jpg', alt: '钰兔经纪人小红书历史内容截图' },
          { src: '/media/yutu-agent-douyin-profile.png', alt: '钰兔经纪人抖音历史主页截图' },
          { src: '/media/yutu-agent-douyin-grid.png', alt: '钰兔经纪人抖音作品列表截图' },
        ],
        resultLinks: [
          { label: '查看代表视频', href: 'https://v.douyin.com/r1z-BtVG4v0/', kind: 'video' },
        ],
      },
    ],
    subprojects: [
      { title: '核心｜钰兔医疗器械', body: '无创血糖仪产品教育专业号，从 0 搭建并运营约 2—3 个月；后期连接电商售后、产品教育和代理商资料支持。' },
      { title: '核心｜佐将医疗器械', body: '自体脂肪微颗粒关节修复技术专业号，约 2 个月跑通早期内容；高客单与地域覆盖限制了后续线索规模。' },
      { title: '辅助｜医学专利科普君', body: '承接医学专利转化与行业科普内容；当前账号受限，以历史截图为证据。' },
      { title: '辅助｜钰兔经纪人', body: '承接医药代表职业与兼职场景，小红书、抖音双平台并行；以历史截图和代表视频为证据。' },
    ],
    execution: [
      {
        title: '01 / 钰兔医疗器械',
        body: '独立从 0 搭建账号，连续运营约 2—3 个月；围绕产品教育、设备使用和售后问题建立可持续栏目。',
      },
      {
        title: '02 / 佐将医疗器械',
        body: '独立从 0 搭建，约 2 个月跑通早期内容；面对 2—3 万客单价和北京、河北、广东、重庆手术室覆盖限制，复盘线索匹配度后停止扩量。',
      },
      {
        title: '03 / 素材转译',
        body: '自己拍摄设备和使用过程，整理国外技术资料，转成小红书图文、短视频、公众号与视频号可复用的中文解释。',
      },
      {
        title: '04 / 辅助账号与证据',
        body: '重构医学专利科普君、钰兔经纪人视觉和发布逻辑；账号下线后保留小红书主页、抖音主页、代表内容与阶段数据截图，作为历史证据。',
      },
    ],
    results: [
      '两个核心专业号均完成从 0 到 1 搭建；历史主页分别显示 608、574 粉丝。',
      '钰兔医疗器械实际运营约 2—3 个月，后续接入电商平台，成为产品售后、产品教育和无创血糖仪代理商资料支持的内容库；离职后账号停止更新。',
      '佐将医疗器械约 2 个月先跑通，但产品单价 2—3 万元且手术室/合作机构主要集中北京、河北、广东、重庆，线索少且匹配成本高，后续停止投入。',
      '钰兔经纪人抖音历史主页显示 2473 粉丝、1.8 万获赞；医学专利科普君等辅助账号目前已封存或受限，数据以历史截图为准。',
    ],
    media: [
      {
        src: '/media/medical-accounts.png',
        type: 'image',
        alt: '医疗器械账号矩阵截图',
        caption: '四个账号的历史主页总览：专业号负责产品解释，辅助号负责行业与职业内容触达。',
        orientation: 'landscape',
        section: '账号矩阵总览',
      },
      {
        src: '/media/medical-feed.jpg',
        type: 'image',
        alt: '医疗器械小红书内容截图',
        caption: '将器械原理、测评与使用问题转译为平台内容。',
        orientation: 'portrait',
        section: '内容样例｜历史截图',
      },
    ],
    links: [
      {
        platform: '小红书',
        title: '钰兔医疗器械',
        kind: '账号主页',
        href: 'https://www.xiaohongshu.com/user/profile/66a74245000000001d0332a2',
        note: '小红书主页；截图账号名为 A钰兔医疗器械，页面内容为历史阶段证据。',
        status: 'live',
        evidence: { src: '/media/yutu-device-profile.jpg', alt: '钰兔医疗器械小红书历史主页截图' },
      },
      {
        platform: '小红书',
        title: '佐将医疗器械',
        kind: '账号主页',
        note: '账号已封存；不提供失效链接，以本页截图核验。',
        status: 'unavailable',
        evidence: { src: '/media/zuojiang-device-01.jpg', alt: '佐将医疗器械小红书历史主页截图' },
      },
      {
        platform: '小红书',
        title: '医学专利科普君',
        kind: '账号主页',
        note: '账号已受限；以历史内容截图为准。',
        status: 'unavailable',
        evidence: { src: '/media/medical-patent-feed-01.jpg', alt: '医学专利科普君小红书历史内容截图' },
      },
      {
        platform: '小红书',
        title: '钰兔经纪人',
        kind: '账号主页',
        note: '账号已受限；以小红书与抖音历史截图、代表内容为准。',
        status: 'unavailable',
        evidence: { src: '/media/yutu-agent-xhs-profile.jpg', alt: '钰兔经纪人小红书历史主页截图' },
      },
      {
        platform: '抖音',
        title: '钰兔经纪人｜医药代表职场剧情',
        kind: '代表内容',
        href: 'https://v.douyin.com/r1z-BtVG4v0/',
        note: '历史代表视频；账号主页状态不作为当前验证。',
        status: 'live',
        evidence: { src: '/media/yutu-agent-douyin-grid.png', alt: '钰兔经纪人抖音作品列表截图' },
      },
    ],
    learnings:
      '无创血糖仪和自体脂肪微颗粒技术都缺少现成的中文素材时，先把适用场景、使用条件和售后问题拍清楚，比继续堆术语更能帮助用户判断，也方便代理商拿去沟通。',
  },
  {
    slug: 'multi-platform-store-setup',
    featuredOrder: 3,
    title: '钰兔医疗器械四平台店铺搭建与成交承接',
    titleEn: 'Yutu Medical Device Store Setup',
    year: '2025.02—2025.08',
    category: '电商运营 / 店铺体系',
    track: 'commerce',
    detailType: 'commerce',
    scope: '钰兔医疗器械品牌电商项目｜围绕无创血糖仪等产品，完成拼多多、淘宝、京东、小红书店铺从 0 到 1',
    role: ['店铺搭建', '商品页面', '客服售后', '数字人直播'],
    contribution: { level: '独立完成', summary: '我负责四个平台的店铺、商品页面、客服售后和直播辅助内容' },
    team: '与产品、客服及发货团队对接',
    platform: ['拼多多', '淘宝', '京东', '小红书'],
    summary:
      '围绕钰兔医疗器械品牌和无创血糖仪等产品，我完成了拼多多、淘宝、京东和小红书的店铺搭建、商品页面制作、客服售后整理，以及数字人直播辅助内容。',
    hero: '/media/commerce-store-sales-proof.jpg',
    metrics: [
      { value: '4W+', label: '零广告月销售额', level: 'A', source: '阶段记录' },
      { value: '4个平台', label: '店铺从 0 到 1 搭建', level: 'B' },
      { value: '4类', label: '平台分工与运营调整', level: 'B' },
    ],
    challenge:
      '当时品牌需要同时做内容宣传、平台搜索和商品销售，但四个平台的店铺信息并不完整，商品页面、客服和售后也没有整理好。我先把店铺和页面补齐，再根据咨询、退款和成交情况调整重点。',
    insight:
      '四个平台的情况不一样。拼多多咨询多，但顾客比较看重价格，退款也偏高；京东的顾客更看重品质，我增加了重点商品和隐藏优惠券；淘宝是新店，我补做了店铺主页和授权书，让顾客更容易相信店铺；小红书没有得到足够的广告投入，所以主要用来做种草、咨询、售后补充和代理商沟通。',
    strategy: [
      '先把商品信息、价格、库存、客服和售后内容整理一致，再分别搭建四个平台的店铺和商品页面。',
      '我根据实际情况调整做法：拼多多减少无效咨询，京东突出重点商品和优惠券，淘宝补充店铺主页和授权书，小红书主要用于种草、咨询、售后补充和代理商沟通。',
      '把商品卖点、使用方法和常见问题整理成数字人直播内容，放回店铺项目里辅助卖货。',
    ],
    execution: [
      { title: '01 / 店铺上线', body: '我完成拼多多、淘宝、京东和小红书店铺搭建，补齐商品和服务信息。' },
      { title: '02 / 页面与信任', body: '制作商品页面、淘宝店铺主页和授权书，整理客服、售后及优惠信息。' },
      { title: '03 / 持续调整', body: '根据咨询、退款和成交情况调整平台重点，并用数字人直播辅助商品讲解。' },
    ],
    results: [
      '我完成拼多多、淘宝、京东和小红书四个平台店铺从 0 到 1 的搭建，并根据实际数据调整运营重点。',
      '我补做店铺主页、授权书、重点商品和优惠信息，用数字人直播辅助商品讲解。',
      '阶段记录显示零广告月销售额 4W+；支付后台与交易汇总截图分别作为证据，数据不重复计算。',
    ],
    media: [
      { src: '/media/commerce-store-sales-proof.jpg', type: 'image', alt: '钰兔店铺商品页面显示无创血糖仪商品与历史付款记录', caption: '商品页面的历史付款记录，作为商品成交表现的阶段证据。', orientation: 'landscape' },
      { src: '/media/commerce-taobao-products.jpg', type: 'image', alt: '钰兔医疗器械店商品列表与无创血糖仪商品页面', caption: '钰兔医疗器械店商品页：376 粉丝，无创血糖仪商品显示 600+ 人付款。', orientation: 'portrait' },
      { src: '/media/digital-human-preview.mp4', type: 'video', poster: '/media/digital-human-poster.jpg', alt: '数字人电商直播间录屏视频', caption: '数字人直播间录屏。', orientation: 'landscape' },
      { src: '/media/commerce-revenue.png', type: 'image', alt: '支付宝商家平台阶段收入后台截图', caption: '支付宝商家平台阶段收入截图。', orientation: 'landscape' },
      { src: '/media/commerce-trade-summary.jpg', type: 'image', alt: '电商交易汇总 WPS 截图', caption: '阶段交易汇总：选中 27 笔，合计 46,357.03 元；与商品页历史付款记录分开看。', orientation: 'landscape' },
    ],
    learnings:
      '这次项目让我确认，四个平台不能照搬同一套做法。拼多多要减少低意向咨询和退款，京东要把重点商品和优惠讲清楚，淘宝要先补足店铺信任，小红书则更适合做种草、咨询、售后补充和代理商沟通。把这些差异处理好，店铺、页面、直播和售后才真正连得起来。',
  },
  {
    slug: 'xiaohongshu-beauty-matrix',
    featuredOrder: 4,
    title: '小红书医美账号矩阵',
    titleEn: 'Xiaohongshu Beauty Account Matrix',
    year: '2023.07—2023.12',
    category: '矩阵运营 / 内容测试',
    track: 'growth',
    detailType: 'matrix',
    scope: '山西璟中任职项目｜因医美账号反复受限，个人先后负责五十多个小红书账号，测试医美科普与颜值内容',
    role: ['账号定位', '选题测试', '标题与封面', '达人合作支持'],
    contribution: { level: '负责', summary: '我从零搭建并反复测试五十多个账号，负责定位、选题和内容发布' },
    team: '山西璟中内容团队协作｜部分账号因平台规则与资质问题后续封存或受限',
    platform: ['小红书'],
    summary:
      '我在山西璟中从零开始做小红书医美内容，先后负责五十多个账号。账号数量并不是同时运营的规模，而是因为当时平台严查医美内容，账号经常被限流甚至归零，只能不断重新起号。内容从光子嫩肤等医美原理和作用，逐步转向颜值打分与颜值报告。',
    hero: '/media/beauty-feed.jpg',
    metrics: [
      { value: '70W', label: '历史内容单篇最高浏览', level: 'A', source: '小红书历史内容截图；账号后续删除／封存' },
      { value: '3000', label: '代表内容评论量级', level: 'A', source: '小红书历史内容截图' },
      { value: '50+', label: '先后负责账号（含小号）', level: 'B', source: '个人工作回顾；完整账号清单未留存' },
    ],
    challenge:
      '项目开始时主要做光子嫩肤等医美原理和作用的科普，但正值小红书严查医美内容，账号经常被限流，严重时曝光直接归零。公司又缺少相应资质，账号很难稳定运营，只能边起号边测试。',
    insight:
      '后来我们找到“颜值打分”这个方向：用户愿意提交信息换取颜值报告，比直接看医美原理更容易产生互动。但合作机构只在太原，颜值打分却面向全国，线上流量和线下到店之间没有很好接上，所以账号始终不温不火，也没有形成明显收入。',
    strategy: [
      '先测试光子嫩肤等医美原理、作用和护肤建议，观察平台对医美内容的限制。',
      '账号受限后重新起号，反复调整标题、封面文字、图片顺序和结尾提问。',
      '后期转向颜值打分和颜值报告，尝试用低门槛互动代替直接介绍医美项目，同时避免夸大效果和强承诺。',
    ],
    resultLevels: {
      business: ['单篇内容最高约 70 万浏览；代表内容评论量级约 3000'],
      process: ['先后负责五十多个账号（含小号）；前期测试医美科普，后期转向颜值打分与颜值报告'],
      incomplete: ['阶段涨粉和收入数据未完整留存；70W对应账号已删除／封存，项目未形成稳定收入'],
      note: '五十多个是先后负责的数量，不是同时运营规模；部分账号因平台规则和资质问题封存。70W为历史内容单篇最高浏览。',
    },
    dataNotes: ['先后负责：五十多个账号（含小号）。', '内容方向：医美原理与作用、颜值打分、颜值报告和变美建议。', '平台规则与资质问题导致部分账号后续封存；70W为历史内容单篇最高浏览。'],
    execution: [
      {
        title: '01 / 矩阵测试',
        body: '由于账号持续受限，我先后负责五十多个账号的起号、发布与内容测试。',
      },
      {
        title: '02 / 重点账号',
        body: '前期做光子嫩肤等医美科普，后期转向颜值打分、颜值报告和变美建议。',
      },
      {
        title: '03 / 素材迭代',
        body: '持续优化标题、封面和图文结构，并根据账号是否限流决定是否继续运营。',
      },
      {
        title: '04 / 结果复盘',
        body: '根据浏览、评论和账号状态，留下表现较好的选题和写法。',
      },
    ],
    results: [
      '历史内容单篇最高约 70 万浏览，但对应账号后来已删除或封存。',
      '代表内容曾获得约 3000 条评论；由于平台限制、资质不足和账号反复重建，项目没有形成稳定收入，阶段涨粉数据也不完整。',
      '我积累了从零搭建小红书医美账号、判断限流风险和快速重做内容的经验。',
    ],
    media: [
      {
        src: '/media/beauty-feed.jpg',
        type: 'image',
        alt: '医美护肤账号内容截图',
        caption: '以用户问题为入口的图文内容。',
        orientation: 'portrait',
      },
      {
        src: '/media/beauty-skincare-01.jpg',
        type: 'image',
        alt: '护肤与医美原理类小红书内容截图一',
        caption: '前期测试护肤和医美原理类内容。',
        orientation: 'portrait',
      },
      {
        src: '/media/beauty-skincare-02.jpg',
        type: 'image',
        alt: '护肤与医美原理类小红书内容截图二',
        caption: '围绕具体皮肤问题组织内容。',
        orientation: 'portrait',
      },
      {
        src: '/media/beauty-score-01.jpg',
        type: 'image',
        alt: '颜值打分与颜值报告类小红书内容截图一',
        caption: '后期测试颜值打分和颜值报告方向。',
        orientation: 'portrait',
      },
    ],
    resources: [
      {
        title: '颜值打分五官分析报告',
        description: '项目后期颜值打分方向使用的五官分析报告示例。',
        href: '/downloads/beauty-matrix/颜值打分五官分析报告.pdf',
        label: '下载 PDF',
      },
    ],
    learnings:
      '这个项目最大的收获不是做出了一个稳定增长的账号，而是积累了从零起号、测试医美内容和处理平台限流的经验。后来我也确认，平台规则、公司资质和服务地点必须在一开始就和内容方向一起考虑；只靠线上流量，无法解决全国颜值打分和太原本地到店之间的距离。',
  },
  {
    slug: 'wechat-vaccine-growth',
    featuredOrder: 1,
    title: '疫苗公众号内容策略与增长优化',
    titleEn: 'Vaccine WeChat Content Strategy & Growth',
    year: '2026.02—2026.08（阶段数据至 2026.05）',
    category: '内容策略 / 数据增长',
    track: 'growth',
    detailType: 'growth',
    scope: '北京大德博瑞任职项目｜27.9 万粉丝“疫苗圈”公众号',
    role: ['标题与文章修改', '文章排版', '菜单栏与配图', '数据复盘'],
    contribution: { level: '负责', summary: '负责文章修改、排版、菜单栏与公号视觉触点优化' },
    team: '与内容团队协作｜我负责文章优化、排版、菜单栏和配图，最终发布由团队完成',
    platform: ['微信公众号为主', '视频号为协作触点'],
    summary:
      '围绕企业疫苗行业文章进行标题、结构、开头、中段和排版修改，同时优化公众号菜单栏及文章头尾配图，改善内容阅读与关注转化。',
    hero: '/media/wechat-report.png',
    metrics: [
      { value: '+126.8%', label: '文章带来的关注', level: 'A', source: '公众号前后对比报告' },
      { value: '+40.2%', label: '账号大盘阅读', level: 'A', source: '公众号前后对比报告' },
      { value: '+53.1%', label: '均篇阅读', level: 'A', source: '公众号前后对比报告' },
      { value: '+77.0%', label: '分享人数', level: 'A', source: '公众号前后对比报告' },
    ],
    challenge:
      '账号已有 27.9 万多粉丝，但多数文章阅读量只有几百到一千左右，粉丝数量也持续下滑。原有文章排版缺乏统一结构，开头不够吸引人，菜单栏和内容入口也不完整，需要从文章呈现和公众号触点重新调整。',
    insight:
      '先根据数据复盘定位阅读与关注下滑的环节，再逐篇调整标题、开头、结构、排版和菜单入口，让内容更容易被读者进入、读完并继续关注。',
    strategy: [
      '先看文章数据变化，定位标题、开头、内容结构和排版中影响阅读的问题。',
      '根据文章主题修改标题、开头和中段信息组织，让读者更快进入重点。',
      '同步优化公众号菜单栏、文章头图和结尾入口，让内容阅读、账号浏览和后续关注衔接起来。',
    ],
    problemFindings: [
      '账号粉丝规模较大，但多数文章阅读量只有几百到一千左右，粉丝数量处于持续下滑状态。',
      '文章开头缺少吸引读者继续阅读的抓手，正文结构和起承转合不够清晰，重点信息进入较慢。',
      '文章排版缺少统一规范，菜单栏和内容入口不完整，读者看完后缺少继续浏览和关注的路径。',
    ],
    dataNotes: [
      '项目参与：2026.02.01 起；核心前后对比为 2025.11.01—2026.01.29 vs 2026.02.01—2026.04.30。',
      '后台趋势导出覆盖 2026.02.06—2026.05.06；5月仅为部分数据，未纳入主对比。',
      '入职后按月账号大盘阅读：2月 47,867；3月 299,741；4月 217,407。',
      '数据来源：内容分析／数据趋势、通知数据、2—4月完读率文件及《疫苗圈公众号入职前后数据对比_作品集版.pdf》。',
    ],
    resultLevels: {
      business: ['账号大盘阅读 402,980 → 565,015（+40.2%）', '文章带来的关注 407 → 923（+126.8%）', '均篇阅读 +53.1%；分享人数 +77.0%'],
      process: ['完成文章标题、开头、中段、排版、头图与结尾入口的修改，并调整公众号菜单栏', '根据阅读、分享和关注数据持续复盘文章表达效果'],
      incomplete: ['自然增长与团队其他动作的拆分数据未单独留存'],
      note: '前后对比报告支持结果方向，具体职责以项目分工与复盘记录为准。',
    },
    execution: [
      {
        title: '01 / 数据复盘',
        body: '查看文章阅读、分享、关注等数据变化，判断标题和内容结构的问题。',
      },
      {
        title: '02 / 前后对比',
        body: '对比不同文章和阶段数据，找出更容易被读完、分享和关注的表达方式。',
      },
      {
        title: '03 / 内容优化',
        body: '修改文章标题、开头、中段和排版，并调整头图、结尾图片和公众号菜单栏。',
      },
      {
        title: '04 / 复盘机制',
        body: '根据数据变化持续调整后续文章，观察阅读量与关注量的变化。',
      },
    ],
    results: [
      '账号大盘阅读从 402,980 增至 565,015，提升 40.2%。',
      '均篇阅读提升 53.1%，分享人数提升 77.0%，收藏人数提升 106.8%。',
      '文章带来的关注从 407 增至 923，提升 126.8%。',
      '粉丝净增从 -352 转为 +515。',
    ],
    media: [
      {
        src: '/media/vaccine-wechat-followers.png',
        type: 'image',
        alt: '疫苗圈公众号后台总用户数截图',
        caption: '认证公众号「疫苗圈」后台：总用户数 279,032。',
        orientation: 'landscape',
      },
      {
        src: '/media/wechat-report.png',
        type: 'image',
        alt: '疫苗圈公众号入职前后数据报告',
        caption: '入职前后对比报告与核心判断。',
        orientation: 'landscape',
      },
      {
        src: '/media/wechat-impact.png',
        type: 'image',
        alt: '公众号关键指标对比',
        caption: '统一指标口径后，观察内容效率与用户关系变化。',
        orientation: 'landscape',
      },
      {
        src: '/media/wechat-sources.png',
        type: 'image',
        alt: '公众号传播来源与用户增长分析',
        caption: '推荐与社交传播增强，同时识别搜索承接仍需补齐。',
        orientation: 'landscape',
      },
    ],
    links: [
      {
        platform: '微信公众号',
        title: '疫苗圈',
        kind: '站内账号',
        note: '微信内搜索账号名称',
      },
    ],
    resources: [
      {
        title: '公众号入职前后数据对比报告',
        description: '阶段对比报告，包含账号阅读、均篇阅读、分享与关注变化。',
        href: '/downloads/vaccine-wechat/疫苗圈公众号入职前后数据对比_作品集版.pdf',
        label: '下载 PDF',
      },
      {
        title: '25年11月—26年1月内容分析',
        description: '入职前阶段的文章内容与传播数据分析表。',
        href: '/downloads/vaccine-wechat/25年11月到26年1月内容分析.xlsx',
        label: '下载 Excel',
      },
      {
        title: '25年11月—26年1月底用户分析',
        description: '入职前阶段的用户变化与来源分析表。',
        href: '/downloads/vaccine-wechat/25年11月到26年1月底用户分析.xlsx',
        label: '下载 Excel',
      },
      {
        title: '2月完读率数据',
        description: '阶段文章完读率数据文件。',
        href: '/downloads/vaccine-wechat/2月完读率数据.xlsx',
        label: '下载 2 月数据',
      },
      {
        title: '3月完读率数据',
        description: '阶段文章完读率数据文件。',
        href: '/downloads/vaccine-wechat/3月完读率数据.xlsx',
        label: '下载 3 月数据',
      },
      {
        title: '4月完读率数据',
        description: '阶段文章完读率数据文件。',
        href: '/downloads/vaccine-wechat/4月完读率数据.xlsx',
        label: '下载 4 月数据',
      },
    ],
    learnings:
      '文章量再大，如果没有清晰的结构、能吸引人的开头、符合阅读习惯的排版和顺畅的入口承接，也很难产生效果。真正有效的方法，是根据数据反馈，对文章的不同环节分别调整，让读者愿意进入、读下去并继续关注。',
  },
  {
    slug: 'professional-editorial-writing',
    detailType: 'editorial',
    title: '专业内容写作',
    titleEn: 'Professional Editorial Writing',
    year: '2025.01—2025.04',
    category: '专业内容 / 公众号与官网',
    track: 'video',
    scope: '苏州钰童服务号、医工融合分会官网｜专业文章选题、撰写与发布',
    role: ['选题策划', '内容结构', '资料整理', '专业校对'],
    contribution: { level: '负责', summary: '负责选题、资料整理、结构撰写与发布前校对' },
    team: '独立完成内容撰写｜专业事实与最终发布口径由项目方审核',
    platform: ['微信公众号', '协会官网'],
    summary:
      '为儿童运动健康服务号与医工融合分会官网完成专业文章，把医学、运动健康与行业议题转译成可读、可发布的内容。',
    background:
      '两个内容场景分别面向家长和机构读者：前者需要清晰、可执行的健康建议，后者需要严谨、可引用的行业表达。',
    purpose:
      '用于服务号日常更新与协会官网栏目建设，持续沉淀可检索、可复用的专业文章。',
    hero: '/media/children-health-cover.png',
    metrics: [
      { value: '17篇', label: '公众号与官网文章' },
      { value: '2类', label: '家长健康与机构行业内容' },
      { value: '人工校准', label: '专业边界与发布口径' },
    ],
    challenge:
      '同一套专业资料要适配两种读者：家长关注看得懂、用得上，机构读者关注事实、来源与表达边界。',
    insight:
      '先按读者和发布场景确定选题，再用清晰的信息层级完成资料整理、结构撰写与人工校对，文章才真正具备发布价值。',
    strategy: [
      '按家长健康与机构行业两类场景建立选题范围，分别确定文章语气和信息密度。',
      '以“背景—事实—建议/影响”组织文章，减少术语堆叠，让读者快速找到重点。',
      '完成资料整理、初稿、校对与排版，发布前人工检查事实、术语和表达口径。',
    ],
    subprojects: [
      { title: '春季“长高黄金期”这样运动', body: '公众号发布页', href: 'https://mp.weixin.qq.com/s/y5xoVW4_LM-rZlsSZVNLpA' },
      { title: '0—5 岁宝宝每天运动、睡眠时间表', body: '公众号发布页', href: 'https://mp.weixin.qq.com/s/pzWMIx_QXaJRsF3fU7inqg' },
      { title: '儿童肥胖危害全解析', body: '公众号发布页', href: 'https://mp.weixin.qq.com/s/HlL9ZLtpTDz5RmKom6nI8g' },
      { title: '别让肥胖偷走孩子的未来', body: '留存原稿', href: '/articles/children/别让肥胖偷走孩子的未来！3个月减重21斤的真实案例，医生紧急提醒这些误区 640f486ceaf48394ae8e81b78ab9d715.html' },
      { title: '孩子驼背怎么办？', body: '公众号发布页', href: 'https://mp.weixin.qq.com/s/PeltC2RhCTddqVy3XwJIPA' },
      { title: '孩子站没站直，家长看得见吗？', body: '公众号发布页', href: 'https://mp.weixin.qq.com/s/qFEcn-Z4jAky4_0hlcsdtg' },
      { title: '这 3 个姿势正在毁掉孩子的脊柱', body: '公众号发布页', href: 'https://mp.weixin.qq.com/s/JzduRo8YnNaxc9nXwD7ALw' },
      { title: '孩子每天运动够了吗？', body: '公众号发布页', href: 'https://mp.weixin.qq.com/s/qhEwh71KD7Qc6kTJFXTghQ' },
      { title: '儿童健康从洗手开始', body: '公众号发布页', href: 'https://mp.weixin.qq.com/s/oaw7dBxrbzQxCAiWOmwnFg' },
      { title: '运动健康门诊运营全攻略', body: '公众号发布页', href: 'https://mp.weixin.qq.com/s/GlbB5P8PRGT6qJ4VKXW0vw' },
      { title: '公众号新闻', body: '官网文章留存原稿', href: '/articles/association/公众号新闻 45cf486ceaf48380a67e818bf8cafae7.html' },
      { title: '什么是人工智能（AI）', body: '官网文章留存原稿', href: '/articles/association/什么是人工智能（AI） 03ef486ceaf48274821e81bda8bb0061.html' },
      { title: '人工智能与健康', body: '官网文章留存原稿', href: '/articles/association/人工智能与健康 9d0f486ceaf4828da4b381fce65db380.html' },
      { title: '人工智能与医工融合', body: '官网文章留存原稿', href: '/articles/association/人工智能与医工融合 445f486ceaf483c8a9b60135555049e4.html' },
      { title: '医工与文化', body: '官网文章留存原稿', href: '/articles/association/医工与文化 0bdf486ceaf4833283118112bb6a078a.html' },
      { title: '医工与中医药', body: '官网文章留存原稿', href: '/articles/association/医工与中医药 1a3f486ceaf4825396a5018236994775.html' },
      { title: '医工融合与技术创新', body: '官网文章留存原稿', href: '/articles/association/医工融合与技术创新 010f486ceaf4838daf0381f79866ab87.html' },
    ],
    execution: [
      { title: '01 / 选题规划', body: '围绕儿童健康、行业动态与医工融合实践建立两类选题池。' },
      { title: '02 / 资料整理', body: '根据发布场景整理指南、政策、行业事实与机构资料。' },
      { title: '03 / 文章生产', body: '完成公众号与官网文章的结构撰写、标题和段落组织。' },
      { title: '04 / 发布校准', body: '统一摘要、小标题与配图节奏，发布前人工检查事实与表达。' },
    ],
    results: [
      '完成 17 篇公众号与官网文章，覆盖儿童运动健康、行业动态与医工融合主题。',
      '形成适配家长与机构读者的选题、资料整理、写作与人工校准流程。',
      '沉淀可检索、可复用的专业文章内容资产。',
    ],
    media: [
      { src: '/media/children-health-cover.png', type: 'image', alt: '苏州钰童服务号主页截图', caption: '服务号定位与内容入口。', orientation: 'landscape' },
      { src: '/media/children-health-growth.png', type: 'image', alt: '儿童春季长高运动公众号文章封面', caption: '把运动建议转译成家长可执行的内容。', orientation: 'landscape' },
      { src: '/media/children-health-who.png', type: 'image', alt: '儿童运动睡眠指南公众号文章封面', caption: '以权威指南为依据，组织清晰的家庭行动清单。', orientation: 'landscape' },
      { src: '/media/children-health-wash.png', type: 'image', alt: '儿童洗手健康科普文章配图', caption: '卫生主题的图文表达与视觉节奏。', orientation: 'portrait' },
      { src: '/media/medical-association-site.png', type: 'image', alt: '中国医药卫生文化协会官网首页截图', caption: '机构官网的栏目结构与内容发布环境。', orientation: 'landscape' },
      { src: '/media/medical-association-article.png', type: 'image', alt: '医工融合官网文章截图', caption: '医工与中医药主题的专业文章页面。', orientation: 'landscape' },
      { src: '/media/medical-association-news.png', type: 'image', alt: '医工融合分会官网新闻页面截图', caption: '行业动态与协会新闻的内容结构。', orientation: 'landscape' },
    ],
    links: [
      { platform: '微信公众号', title: '儿童肥胖危害全解析', kind: '历史内容', href: 'https://mp.weixin.qq.com/s/HlL9ZLtpTDz5RmKom6nI8g', note: '代表文章；内容链接以历史发布页为准。', status: 'historical' },
      { platform: '微信公众号', title: 'WHO 儿童运动睡眠指南', kind: '历史内容', href: 'https://mp.weixin.qq.com/s/pzWMIx_QXaJRsF3fU7inqg', note: '代表文章；内容链接以历史发布页为准。', status: 'historical' },
    ],
    learnings:
      '专业内容的价值不在于堆砌术语，而在于把可靠信息组织成读者能理解、能保存、能执行的判断工具。',
  },
  {
    slug: 'ai-content-workflows',
    featuredOrder: 5,
    title: 'AI 内容生产工作流',
    titleEn: 'AI Content Production Workflows',
    year: '2026',
    category: 'AI 工作流 / 内容生产',
    track: 'systems',
    detailType: 'workflow',
    scope: '北京大德博瑞任职项目｜多套内容与运营自动化流程的拆解、搭建和验收',
    role: ['任务拆解', 'Coze 工作流设计', '提示词与规则', '调试验收'],
    contribution: { level: '主导', summary: '我根据实际制作任务设计流程、规则和检查步骤' },
    team: '与内容团队协作｜人工审核与发布责任保留在运营侧',
    platform: ['公众号图文', '疫苗条漫', '数字人口播'],
    summary:
      '我围绕真实运营任务搭建了几套 AI 工作流，覆盖抖音数据入飞书、公众号处理、图片生成、数字人口播和疫苗条漫。每套流程都有明确的输入、处理和交付结果，用来减少重复操作、提高内容生产效率。',
    hero: '/media/vaccine-video-channel-views.png',
    metrics: [
      { value: '3h → 5min', label: '数字人口播生成环节', level: 'C', caveat: '个人制作前后对比；不含完整人工验收，不代表批量稳定性' },
      { value: '6h → 10min', label: '角色一致性条漫生成环节', level: 'C', caveat: '个人制作前后对比；不含完整人工验收，不代表批量稳定性' },
      { value: 'Word → 草稿', label: '公众号排版流程', level: 'B' },
      { value: '2h → 5min', label: '抖音数据整理（个人对比）', level: 'C', caveat: '实践示例字段核对准确率 100%；未单独记录长期批量稳定性' },
    ],
    challenge:
      '这些任务都存在重复操作，但输入、输出和检查标准并不相同。我的做法不是做一条万能流程，而是先按实际任务拆开，再分别处理。',
    insight:
      '适合自动化的是链接读取、字段整理、格式处理、素材上传和固定模块拼接；不适合自动化的是选题判断、事实核对、医学表达、异常处理和最终发布。',
    workflowGroups: [
      { title: '抖音数据自动采集入飞书', body: '通过 Coze 获取视频链接和原文案，完成文案二创、格式优化，再批量写入飞书表格。' },
      { title: '模板化图片批量生成', body: '套用固定模板批量替换文字和图片，再人工抽检。' },
      { title: '公众号图文自动化生成与发布', body: '从文章或标题开始，完成成文、配图、排版和草稿发布。' },
      { title: '公众号资讯贴图自动生成', body: '根据摘要和标题字数选择模板，生成资讯贴图。' },
      { title: '疫苗科普条漫自动化生成', body: '把疫苗文章拆成问答和双角色分镜，生成竖版条漫。' },
      { title: '数字人口播视频自动化生产', body: '完成口播改写、数字人生成、字幕处理和剪映草稿。' },
      { title: '公众号图文一键排版发布', body: '读取 Word 内容，上传图片并套用固定排版，生成公众号草稿。' },
    ],
    strategy: [
      '我先从内容团队每天反复做的事情入手，整理每项任务需要什么、最后交付什么。',
      '把公众号排版、资讯贴图、数据整理等高频工作拆成独立流程，分别设置输入、处理步骤和检查点。',
      '优先把使用频率最高的公众号一键排版和资讯贴图做成低门槛入口，让写作者和不会做图的同事都能直接使用。',
      '流程负责处理重复操作，文章判断、内容核对和最终发布仍由人工完成。',
    ],
    workflowBrief: {
      original: [
        { label: '选题', detail: '确认内容主题、受众与平台', time: '人工判断' },
        { label: '查资料', detail: '检索、整理并核对来源', time: '重复劳动' },
        { label: '写稿／改稿', detail: '按平台调整结构、断句与语气', time: '重复劳动' },
        { label: '生图／视频', detail: '生成素材并反复调整', time: '多轮试错' },
        { label: '排版／发布', detail: '套用模块、上传素材、创建草稿', time: '重复劳动' },
      ],
      automate: ['资料整理、初稿改写、断句与格式处理', '角色约束、分镜草稿、素材上传与固定模块拼接', '异步生成轮询与草稿创建'],
      human: ['选题是否值得做、事实与医学边界', '标题承诺、画面表达与平台合规', '最终人工验收、修改与发布'],
      lanes: [
        { input: '项目背景', process: '内容生产和数据整理中存在大量重复操作，且不同任务的素材和检查标准并不相同。', output: '明确自动化边界', acceptance: '不把选题、事实和最终发布交给工具' },
        { input: '项目目标', process: '把数据采集、文章处理、图片生成、视频制作和排版发布拆成可复用的流程。', output: '减少重复劳动', acceptance: '以实际交付结果而不是流程数量判断价值' },
        { input: '搭建思路', process: '先统一输入，再按任务拆分节点；把链接读取、内容处理、素材生成和发布串成不同链路。', output: '多套独立工作流', acceptance: '每套流程都保留人工验收点' },
        { input: '我的工作', process: '负责流程拆解、变量设计、提示词与规则编写、插件串联、调试和输出验收。', output: '可运行的工作流和成品', acceptance: '异常、内容准确性和平台规范由人工复核' },
        { input: '结果边界', process: '抖音数据整理约 2 小时缩短至约 5 分钟；数字人口播和条漫也有个人制作前后对比。', output: '效率改善证据', acceptance: '不将个人单次对比表述为长期批量稳定性' },
      ],
      caveat: '“3h → 5min”“6h → 10min”来自个人实际制作前后对比；完整人工验收未单独计时，也未建立批量样本。',
    },
    execution: [
      {
        title: '01 / 抖音数据入飞书',
        body: '用 Coze 串起链接采集、原文案获取、文案二创、格式优化和飞书表格写入，并在字段和异常处保留检查点。',
      },
      {
        title: '02 / 数字人口播',
        body: '把文章内容整理成适合口播的文案，生成数字人视频样片，再由人工检查表达和画面。',
      },
      {
        title: '03 / 疫苗条漫',
        body: '把文章转为 5 组问答、双角色分镜、生图与竖版画板输出。',
      },
      {
        title: '04 / 公众号发布',
        body: '解析 Word，处理正文图片、封面、固定头尾模块与公众号草稿接口。',
      },
      {
        title: '05 / 人工验收',
        body: '保留事实、医学表达、角色一致性、字幕节奏与最终发布检查，不让工作流越过责任边界。',
      },
    ],
    results: [
      '抖音数据整理：约 2 小时缩短至约 5 分钟；实践示例中的视频链接、播放量、时长和点赞数等字段核对准确率为 100%。',
      '数字人口播：生成环节由约 3 小时缩短至约 5 分钟；不含完整人工验收。',
      '疫苗条漫：角色一致性画面生成环节由约 6 小时缩短至约 10 分钟；不代表批量稳定性。',
      '公众号排版：可从 Word 读取内容、上传图片、套用排版并生成草稿，最后仍需人工修改和发布。',
    ],
    media: [
      {
        src: '/media/vaccine-video-channel-views.png',
        type: 'image',
        alt: '疫苗圈老炮儿视频号代表内容播放量截图',
        caption: '疫苗圈老炮儿代表内容播放数据截图。',
        orientation: 'landscape',
      },
    ],
    links: [
      {
        platform: '微信公众号',
        title: '疫苗科普条漫工作流成品',
        kind: '代表内容',
        href: 'https://mp.weixin.qq.com/s/etjQIhrYkmnug5eQrwQfQw',
        attachments: [
          { src: '/media/workflow-comic.png', type: 'image', alt: '疫苗条漫工作流截图', caption: '条漫工作流截图。', orientation: 'landscape' },
        ],
      },
      {
        platform: '微信公众号',
        title: '公众号一键排版发布成品',
        kind: '代表内容',
        href: 'https://mp.weixin.qq.com/s/vm38O_D_0iX5Vnjg_g-bVA',
        attachments: [
          { src: '/media/automation-wechat-publish.png', type: 'image', alt: '公众号自动排版发布工作流截图', caption: '公众号自动排版发布工作流截图。', orientation: 'landscape' },
        ],
      },
      {
        platform: '微信公众号',
        title: '资讯贴图工作流成品',
        kind: '代表内容',
        href: 'https://mp.weixin.qq.com/s/X4gLDNCGnxfCkldvdwAbqw',
        attachments: [
          { src: '/media/workflow-news-image-new.png', type: 'image', alt: '公众号资讯贴图工作流截图', caption: '资讯贴图工作流：改写正文、按字数分流并生成对应图片。', orientation: 'landscape' },
        ],
      },
      {
        platform: '视频号',
        title: '疫苗圈老炮儿',
        kind: '站内账号',
        note: '微信内搜索账号名称',
        attachments: [
          { src: '/media/vaccine-video-channel-views.png', type: 'image', alt: '疫苗圈老炮儿视频号代表内容播放量截图', caption: '代表内容播放数据截图。', orientation: 'landscape' },
          { src: '/media/digital-human-preview.mp4', type: 'video', poster: '/media/digital-human-poster.jpg', alt: '疫苗圈老炮儿数字人口播样片', caption: '数字人口播样片。', orientation: 'portrait' },
        ],
      },
      {
        platform: '抖音 / 飞书',
        title: '抖音数据整理工作流',
        kind: '代表内容',
        note: '链接采集、整理与表格入库',
        attachments: [
          { src: '/media/workflow-douyin-coze.png', type: 'image', alt: '抖音数据自动采集入飞书 Coze 工作流截图', caption: 'Coze 工作流：获取视频链接、原文案、文案二创、格式优化并写入飞书。', orientation: 'landscape' },
          { src: '/media/workflow-douyin-feishu-result.png', type: 'image', alt: '抖音数据写入飞书实践示例', caption: '实践示例：视频链接、播放量、时长、点赞数等字段批量写入飞书。', orientation: 'landscape' },
        ],
      },
    ],
    learnings:
      '我把高频、重复的步骤交给工具：写作者上传自己写好的文章，就能直接套用公众号模板并生成草稿；把新闻内容输入资讯贴图流程，就能快速得到对应的配图。这样不会排版的人也能完成公众号发布前的处理，不会做图的人也能快速产出贴图，团队节省的是制作时间，内容判断和最终发布仍由人来负责。',
  },
  {
    slug: 'ai-operations-automation-suite',
    title: '运营自动化模块库',
    titleEn: 'AI Operations Automation Suite',
    year: '2026',
    category: 'AI 运营 / 自动化工作流',
    track: 'systems',
    scope: '独立工作流项目集合｜从运营重复动作中拆出可复用的自动化模块',
    role: ['痛点识别', '流程设计', 'Coze 搭建', '接口调试'],
    contribution: { level: '独立完成', summary: '独立完成任务拆解、流程设计、节点搭建与接口调试' },
    team: '独立工作流项目｜人工审核与最终发布责任保留在运营侧',
    platform: ['抖音', '飞书', '微信公众号', 'Coze'],
    summary:
      '将数据采集、公众号成文、图片排版与批量生成拆成独立流程，解决运营中最耗时、最容易出错的重复动作。',
    hero: '/media/automation-douyin-feishu.png',
    metrics: [
      { value: '2h → 5min', label: '抖音数据整理' },
      { value: '7段', label: '公众号自动发布链路' },
      { value: '10+张', label: '单次模板图批量生成' },
    ],
    challenge:
      '数据整理、文章排版、资讯贴图和模板图片各自重复发生，若混成一个大流程，输入输出会变复杂，异常也难以定位。',
    insight:
      '自动化的边界应该由运营任务决定：采集、成文、排版和生成分别定义输入、输出与人工检查点，才既稳定又可维护。',
    strategy: [
      '按数据采集、公众号成文发布、资讯贴图与模板生成拆分独立工作流。',
      '把标题判断、图片上传、模板分流、HTML 拼接和草稿创建写成明确规则。',
      '保留人工审核出口，自动化负责重复处理，运营负责事实、合规与最终表达。',
    ],
    subprojects: [
      { title: '抖音数据自动采集入飞书', body: '链接读取、文案二创与结构化入库。' },
      { title: '公众号图文一键排版发布', body: 'Word 解析、图片替换、封面与草稿发布。' },
      { title: '公众号图文自动化生成与发布', body: '双入口成文、配图、HTML 拼接与发布。' },
      { title: '公众号资讯贴图自动生成', body: '摘要、标题字数与长短模板自动分流。' },
      { title: '模板化图片批量生成', body: '统一视觉模板，单次批量产出并抽检。' },
    ],
    execution: [
      { title: '01 / 抖音数据入库', body: '链接读取 → 原文获取 → 文案二创 → 格式优化 → 批量写入飞书多维表格。' },
      { title: '02 / 公众号自动发布', body: '文章链接或标题正文双入口 → 成文/改写 → 拆段配图 → 素材上传 → HTML 拼接 → 草稿发布。' },
      { title: '03 / 资讯贴图分流', body: '摘要提炼 → 标题字数判断 → 长短标题模板分流 → 画板生成。' },
      { title: '04 / 模板图批量生成', body: '统一视觉模板与内容组件，单次生成 10+ 张图片并保留人工抽检。' },
    ],
    results: [
      '抖音数据整理从约 2 小时缩短至约 5 分钟，形成稳定入库路径。',
      '公众号工作流覆盖双入口、成文、配图、素材上传、排版与草稿发布。',
      '资讯贴图可按标题长度自动选择版式；模板图单次批量生成 10+ 张。',
    ],
    media: [
      { src: '/media/automation-douyin-feishu.png', type: 'image', alt: '抖音数据采集入飞书工作流截图', caption: '从视频链接、原文获取到飞书入库的独立数据链路。', orientation: 'landscape' },
      { src: '/media/automation-wechat-generation-flow.png', type: 'image', alt: '公众号图文自动化生成发布流程图', caption: '公众号内容从输入到草稿发布的完整工作流。', orientation: 'landscape' },
      { src: '/media/automation-wechat-draft.png', type: 'image', alt: '公众号自动发布草稿截图', caption: '素材上传、图文排版与草稿创建后的实际结果。', orientation: 'landscape' },
      { src: '/media/automation-news-card-flow.png', type: 'image', alt: '公众号资讯贴图自动生成流程图', caption: '标题字数检测与长短模板自动分流。', orientation: 'landscape' },
      { src: '/media/automation-news-card-output.png', type: 'image', alt: '公众号资讯贴图成品', caption: '同一模板体系下的资讯贴图输出。', orientation: 'portrait' },
      { src: '/media/automation-template-output.png', type: 'image', alt: '模板化图片批量生成成品', caption: '模板、内容组件与批量生成结果。', orientation: 'portrait' },
    ],
    links: [
      { platform: '微信公众号', title: '公众号一键排版发布成品', kind: '代表内容', href: 'https://mp.weixin.qq.com/s/vm38O_D_0iX5Vnjg_g-bVA', note: '历史发布页；当前页以工作流截图与本地复现为主。', status: 'historical' },
      { platform: '微信公众号', title: '资讯贴图工作流成品', kind: '代表内容', href: 'https://mp.weixin.qq.com/s/X4gLDNCGnxfCkldvdwAbqw', note: '历史发布页；当前页以流程与输出证据为主。', status: 'historical' },
    ],
    learnings:
      '把运营经验产品化，第一步不是追求一个大而全的 AI 平台，而是把每个重复任务的输入、规则、出口和责任边界说清楚。',
  },
  {
    slug: 'ai-content-system',
    title: 'AI 工作流平台',
    titleEn: 'AI Workflow Platform',
    year: '2026',
    category: 'AI 工作流 / 内部平台',
    track: 'systems',
    scope: '内容运营流程产品化项目｜把实际工作流程整理成需求，并用 Codex 开发 AI 工作流平台供公司内部使用',
    role: ['运营流程梳理', '需求拆解', '独立设计与开发', '测试与问题定位'],
    contribution: { level: '独立完成', summary: '独立完成流程梳理、产品设计、系统开发和调试；根据同事试用反馈持续优化' },
    team: '独立完成设计与开发｜由同事协助部署，并参与试用和反馈',
    platform: ['选题与文章', '多形态创作', '素材与审核发布'],
    summary:
      '我先把日常内容运营中的选题、文章、图片、条漫、视频和发布流程整理成产品需求，再使用 Codex，通过自然语言描述需求和多轮调试，开发成一个用于管理和使用多套 AI 工作流的系统，并交给公司内部用户试用。',
    hero: '/media/system-workbench.png',
    metrics: [
      { value: '7个', label: '核心业务模块' },
      { value: '5类', label: '内容形态规划' },
      { value: '1条', label: '采集到发布主链路' },
    ],
    challenge:
      '日常选题、改写、条漫、视频、素材和审核分散在不同工具里，团队缺少一套能承接真实工作流程的统一入口。',
    insight:
      '我先从实际使用流程中提炼需求，再决定系统需要哪些模块和状态。生成结果还要能编辑、保存、审核和继续处理，才能真正被团队使用。',
    strategy: [
      '按“发现机会—生产内容—沉淀资产—审核—发布”组织信息架构。',
      '让文章、条漫、视频与数字人共享任务和状态逻辑，同时保留各自生产入口。',
      '由我独立完成工作台页面、模块交互和功能开发，再由同事协助部署；上线试用后，根据反馈继续调试和优化。',
    ],
    execution: [
      {
        title: '01 / 流程建模',
        body: '梳理选题、文章、创作、素材、审核与发布的动作、字段和状态。',
      },
      {
        title: '02 / 信息架构',
        body: '设计工作台、列表、创作中心、素材库、审核中心与发布管理。',
      },
      {
        title: '03 / 原型实现',
        body: '独立完成前端、交互逻辑和功能开发，使用 Codex 辅助编码与问题定位；部署由同事协助完成。',
      },
      {
        title: '04 / 业务校验',
        body: '邀请同事试用真实内容路径，根据他们的使用反馈检查并调整输入、生成、修改、审核与发布流程。',
      },
    ],
    results: [
      '完成覆盖采集到发布的 AI 工作流平台，并交给公司内部用户试用。',
      '将分散的运营动作转化为可描述、可协作、可扩展的模块。',
      '验证了从内容运营流程、产品需求到实际系统使用的完整落地过程。',
    ],
    media: [
      {
        src: '/media/system-workbench.png',
        type: 'image',
        alt: 'AI 内容生产系统工作台',
        caption: '工作台围绕内容状态组织，而不是展示工具 Logo。',
        orientation: 'landscape',
      },
      {
        src: '/media/system-articles.png',
        type: 'image',
        alt: 'AI 内容生产系统文章列表',
        caption: '采集内容可筛选、生成选题并进入后续任务。',
        orientation: 'landscape',
      },
      {
        src: '/media/system-digital-human.png',
        type: 'image',
        alt: 'AI 内容生产系统数字人模块',
        caption: '数字人模块包含输入、形象、声音、任务与状态。',
        orientation: 'landscape',
      },
      {
        src: '/media/system-review.png',
        type: 'image',
        alt: 'AI 内容生产系统审核中心',
        caption: '审核中心用于表达团队协作与合规流程。',
        orientation: 'landscape',
      },
      {
        src: '/media/system-v2-task-confirmation.png',
        type: 'image',
        alt: 'AI 内容生产系统 V2 任务确认页面',
        caption: 'V2 对话式页面先确认平台、主题、受众和资料来源，再进入生成。',
        orientation: 'landscape',
        section: 'V2 / AI 对话式页面',
      },
      {
        src: '/media/system-v2-history.png',
        type: 'image',
        alt: 'AI 内容生产系统 V2 历史对话与任务',
        caption: '历史对话与任务可以继续打开，便于修改和复查。',
        orientation: 'landscape',
        section: 'V2 / AI 对话式页面',
      },
    ],
    learnings:
      '这个项目让我沉淀下来的，不只是做出一个工具，而是开始用产品经理的角度看日常工作：先发现真实需求，再把需求讲清楚、拆成可执行的功能，最后使用 Codex，通过自然语言描述需求、页面试用和多轮调试，独立开发出自己需要的工具。这个过程中，我逐渐建立了系统化和产品化的思维。',
  },
  {
    slug: 'blockchain-explainer-video',
    title: '区块链科普短视频',
    titleEn: 'Blockchain Explainer Shorts',
    year: '2025.09',
    category: 'AI 视频 / 知识表达',
    track: 'video',
    scope: '个人 AI 视频项目｜基于已有区块链文章改写脚本并完成 AI 生图、生视频与剪辑',
    role: ['文章整理', '脚本改写', 'AI 生图与视频', '剪辑发布'],
    contribution: {
      level: '独立完成',
      summary: '独立完成文章整理、脚本改写、AI 生图、生视频和剪辑成片。',
    },
    team: '独立项目｜无团队协作，从文章底稿到第一集成片由我完成。',
    platform: ['短视频', 'AI 生图与生视频', '剪映'],
    summary:
      '基于已有区块链文章，把其中的概念改写成短视频脚本，再用 AI 生图和生视频完成科普短片。',
    hero: '/media/blockchain-short-video-poster.jpg',
    metrics: [
      { value: '1集', label: '完整科普样片' },
      { value: '1套', label: '概念视觉化表达方法' },
      { value: 'AI → 成片', label: '从脚本到剪辑' },
    ],
    challenge:
      '已有文章的信息需要重新组织，才能适合短视频观看；脚本中的角色、场景和信息点也要继续转成可生成的画面与视频。',
    insight:
      '先从文章里提炼本集要解释的一个概念和叙事顺序，再写成短视频脚本；生图和生视频服务于脚本，不让画面反过来决定内容。',
    strategy: [
      '先确定本集只解释一个核心概念，避免科普内容失去重点。',
      '用角色、对白和镜头节奏降低抽象概念的理解门槛。',
      '优先保证事实顺序和叙事清楚，再使用 AI 补足画面表现。',
    ],
    execution: [
      { title: '01 / 文章整理', body: '从已有区块链文章中选定本集主题，整理需要保留的事实和解释顺序。' },
      { title: '02 / 脚本改写', body: '把文章内容改写成角色、对白和镜头节奏都明确的短视频脚本。' },
      { title: '03 / AI 生图与视频', body: '根据脚本编写提示词，生成角色、场景和视频画面。' },
      { title: '04 / 剪辑成片', body: '筛选生成素材，重组镜头并统一字幕、声音和节奏，完成第一集。' },
    ],
    results: [
      '完成《链上和链下到底有啥区别呢？》第一集科普视频。',
      '建立从知识拆解、剧情脚本、画面提示词到成片的独立生产链路。',
      '将技术概念转化为普通用户可理解、可记忆的短视频表达。',
    ],
    media: [
      { src: '/media/blockchain-short-video.mp4', type: 'video', poster: '/media/blockchain-short-video-poster.jpg', alt: '区块链链上与链下科普短视频', caption: '第一集完整播放：基于已有区块链文章改写脚本，再用 AI 生图和生视频完成。', orientation: 'landscape' },
    ],
    learnings:
      '把复杂难懂的知识转成有趣、易传播的动画视频，降低用户理解和内容传播的成本。',
  },
  {
    slug: 'brand-product-films',
    title: '企业产品宣传视频',
    titleEn: 'Product Storytelling Films',
    year: '2025.03—2025.07',
    category: '视频内容 / 产品传播',
    track: 'video',
    scope: '钰兔科技任职项目｜钰兔帮产品宣传片独立制作',
    role: ['产品体验与理解', '脚本与分镜', '素材寻找与 AI 生成', 'AE / 剪映后期'],
    contribution: {
      level: '独立完成',
      summary: '从体验产品、梳理卖点，到脚本、素材、动画、剪辑和成片交付均由我独立完成。',
    },
    team: '独立项目｜无团队协作，我负责从产品体验到最终成片的完整交付。',
    platform: ['企业宣传视频', 'AI 产品演示'],
    summary:
      '先体验钰兔帮产品和页面，再把卖点、使用场景与产品演示整理成脚本；部分画面用 AI 生成，核心动画和成片由 AE、剪映完成。',
    hero: '/media/yutabang-product-promo-poster.png',
    metrics: [
      { value: '1支', label: '完整产品宣传片' },
      { value: 'AI → 视频', label: '从卖点到成片' },
      { value: 'B端', label: '产品传播场景' },
    ],
    challenge:
      '产品宣传不能只把功能逐条念出来，需要先理解产品如何使用、面向谁，再决定哪些信息用演示、动画或素材表达。',
    insight:
      '先体验产品和页面，和产品经理确认产品痛点及团队当前遇到的困难，再编写宣传片脚本。随后用 AI 生成视觉素材，并寻找行业素材补充；把页面演示、功能演示和部分 AI 对话表现剪进成片，最后用剪映完成节奏、声音、视频与数字人的统一。',
    strategy: [
      '先体验产品和页面，确认目标受众、核心卖点与真实使用需求。',
      '根据脚本寻找可商用素材和产品演示素材，只对需要补充的镜头使用 AI 生成。',
      '用 AE 完成产品功能动画，再用剪映整合素材、字幕、声音和节奏。',
    ],
    execution: [
      {
        title: '01 / 产品体验',
        body: '实际体验产品和页面，记录功能路径、使用场景与目标受众关心的问题。',
      },
      {
        title: '02 / 脚本分镜',
        body: '把产品卖点转成场景、镜头、字幕与动作节点，确定先讲什么、后演示什么。',
      },
      {
        title: '03 / 素材与动画',
        body: '寻找企业可用素材和产品演示素材，按镜头需要补充 AI 生成画面，并用 AE 做功能动画。',
      },
      {
        title: '04 / 剪辑交付',
        body: '在剪映中完成素材、动画、字幕、声音和节奏整合，输出可对外使用的成片。',
      },
    ],
    results: [
      '完成钰兔帮产品宣传片，形成从产品理解到视频交付的完整链路。',
      '将产品信息从功能罗列转为场景化、可观看的表达。',
      '沉淀脚本、镜头与 AI 素材筛选方法，支持后续产品内容复用。',
    ],
    media: [
      {
        src: '/media/yutabang-product-promo-720p.mp4',
        type: 'video',
        poster: '/media/yutabang-product-promo-poster.png',
        alt: '钰兔帮产品宣传片',
        caption: '钰兔帮产品宣传片：产品体验、脚本分镜、素材寻找、AI 补充画面与 AE / 剪映后期均由我独立完成。',
        orientation: 'landscape',
      },
      {
        src: '/media/brand-comic-long.png',
        type: 'image',
        alt: '钰兔帮品牌条漫长图',
        caption: '相关品牌传播视觉：将品牌故事与产品价值组织成长图条漫。',
        orientation: 'portrait',
        section: '相关品牌视觉',
      },
    ],
    learnings:
      '企业视频的价值不止是好看，而是把产品理解成本降下来，让内容成为销售与沟通的前置环节。',
  },
  {
    slug: 'ai-agent-product-films',
    title: 'AI 智能体产品宣传体系',
    titleEn: 'AI Agent Product Films',
    year: '2025.06—2025.07',
    category: '视频内容 / AI 产品传播',
    track: 'video',
    scope: '钰兔科技任职项目｜医械查、医学专利评估、临床方案三类智能体',
    role: ['智能体体验与需求对齐', '宣传脚本', 'AI 画面与视频生成', '剪辑交付'],
    contribution: {
      level: '主导',
      summary: '主导三个智能体视频的体验、脚本、AI 生成、反复测试与剪辑交付。',
    },
    team: '与产品经理对齐功能、痛点和客户使用场景；我负责脚本、AI 生成与成片交付。',
    platform: ['B 端 AI 产品', '产品宣传片', '动画演示'],
    summary:
      '为三个医疗 AI 智能体制作宣传视频：先体验产品、和产品经理对齐痛点，再写脚本；画面全部用 AI 生成，最后剪辑成交付给 B 端客户的介绍片。',
    hero: '/media/yutabang-agent-medical-search-poster.png',
    metrics: [
      { value: '3类', label: '智能体产品视频' },
      { value: '3条', label: '功能演示内容' },
      { value: 'B端', label: '高专业产品表达' },
    ],
    challenge:
      '2025 年 6 月 AI 生视频还不成熟，画面经常需要反复抽卡；同时三个智能体的功能和使用场景不同，视频既要讲清产品，也要控制生成结果的稳定性。',
    insight:
      '先把智能体真实操作和客户痛点讲清楚，再按脚本生成画面；通过首尾帧和生成参数控制减少抽卡次数，保证三个视频都能完成从功能说明到客户介绍的交付。',
    strategy: [
      '先从真实使用路径中提炼客户最关心的问题，而不是从功能清单开始。',
      '让每条视频只讲清一个“问题—操作—结果”的价值链。',
      '让生成技术服务于产品说明，而不是让视觉效果取代产品理解。',
    ],
    execution: [
      {
        title: '01 / 智能体体验',
        body: '实际走通三个智能体的输入、处理与输出，并记录产品经理确认的功能重点。',
      },
      {
        title: '02 / 脚本分镜',
        body: '把客户痛点、操作路径和结果价值写成脚本，确定每个镜头要说明什么。',
      },
      {
        title: '03 / AI 视频生成',
        body: '按脚本生成图像和视频，用首尾帧与技术参数控制动作、画面连续性和生成稳定性。',
      },
      {
        title: '04 / 剪辑交付',
        body: '将三个智能体视频分别剪辑成片，补齐字幕、声音和产品说明后交给客户使用。',
      },
    ],
    results: [
      '完成医械查、医学专利评估、临床方案三类智能体宣传视频。',
      '通过首尾帧和技术控制减少 AI 生视频反复抽卡，完成从生成到剪辑的完整交付。',
      '将三个智能体的功能和使用场景整理成可直接给客户观看的产品介绍。',
    ],
    media: [
      {
        src: '/media/yutabang-agent-medical-search.mp4',
        type: 'video',
        poster: '/media/yutabang-agent-medical-search-poster.png',
        alt: '钰兔帮医械查智能体宣传短片',
        caption: '医械查智能体：体验产品、对齐客户痛点后，用 AI 生成并剪辑为完整介绍视频。',
        orientation: 'landscape',
      },
      {
        src: '/media/yutabang-agent-patent-evaluation.mp4',
        type: 'video',
        poster: '/media/yutabang-agent-patent-poster.jpg',
        alt: '钰兔帮医学专利评估智能体宣传片',
        caption: '医学专利评估智能体：根据真实操作路径编写脚本，用首尾帧控制 AI 视频生成。',
        orientation: 'landscape',
        section: '三类智能体案例 / Product Demonstrations',
      },
      {
        src: '/media/yutabang-agent-clinical-plan.mp4',
        type: 'video',
        poster: '/media/yutabang-agent-clinical-poster.jpg',
        alt: '钰兔帮临床方案智能体宣传片',
        caption: '临床方案智能体：把功能、操作和客户价值串成可观看的 AI 产品介绍。',
        orientation: 'landscape',
        section: '三类智能体案例 / Product Demonstrations',
      },
    ],
    learnings:
      'AI 视频项目的关键不是一次生成成功，而是把产品体验、脚本和首尾帧控制放进同一条制作流程，才能稳定交付。',
  },
  {
    slug: 'kaidou-pet-video-prompts',
    title: '咖逗 AI 宠物视频指令体系',
    titleEn: 'Prompt-led Pet Video System',
    year: '2025.05—2025.06',
    category: '视频内容 / 指令体系',
    track: 'video',
    scope: '钰兔科技 AI 宠物陪伴小程序项目｜为后端沉淀稳定的宠物动作生成指令',
    role: ['动作场景拆解', '提示词优化', '多轮生成测试', '固定指令交付开发'],
    contribution: {
      level: '主导',
      summary: '主导宠物动作提示词的拆解、测试与稳定版本整理，并将可复用指令交付开发团队接入后端。',
    },
    team: '与产品及后端开发团队协作｜我负责提示词与样片验证，开发将固定指令写入视频生成服务',
    platform: ['可灵 API', '火山引擎 API', 'AI 视频'],
    summary:
      '为宠物陪伴小程序建立稳定的 AI 视频指令：把跑步、跳跃、洗澡等动作拆成可测试字段，反复生成后固定为后端可调用的提示词，让用户只输入简单动作也能生成相对稳定的视频。',
    hero: '/media/kaidou-pet-dog-run-poster.png',
    metrics: [
      { value: '5类', label: '动作场景测试' },
      { value: '2套', label: 'API 指令路径' },
      { value: '10s', label: '单条样片验证' },
    ],
    challenge:
      '项目启动时 AI 视频刚刚兴起，模型对同一张宠物图的动作理解并不稳定：跑步会变形、跳跃缺少连续性、镜头容易乱移，固定场景的背景也会跟着变化。但小程序希望用户只输入“跑步”“洗澡”这样的简单词，就能得到可用视频，因此后端需要一套同时约束动作、镜头和背景的稳定指令。',
    insight:
      '当时提示词写法还没有成熟范式，直接把一句动作交给模型，无法保证结果。我参考 ChatGPT 等提示词写法，把动作拆成起点、过程、终点，再补充主体、镜头、速度、方向、背景锁定与连续性约束；通过反复测试找到稳定版本，最后固定成开发可以接入的指令。',
    strategy: [
      '把用户输入的动作拆成可观察、可验收的关键阶段。',
      '将主体、动作、镜头、速度和连续性固化为可复用字段。',
      '以动作完整度、主体稳定性和镜头可用性作为统一验收标准。',
      '只把经过样片验证的稳定版本交给开发团队。',
    ],
    execution: [
      {
        title: '01 / 拆解动作场景',
        body: '把跑步、跳跃、洗澡等用户会输入的动作拆成可观察的起点、过程和终点，并记录宠物身体需要保持的特征。',
      },
      {
        title: '02 / 参考并改写提示词',
        body: '参考 ChatGPT 等提示词写法，把主体、动作、镜头、速度、方向和连续性整理成固定字段。',
      },
      {
        title: '03 / 多轮生成验证',
        body: '在可灵与火山引擎 API 中重复生成同一动作，比较动作完整度、主体稳定性与镜头可用性。',
      },
      {
        title: '04 / 固定版本交付开发',
        body: '筛选稳定样片，整理成提示词列表和动作映射，交给后端写入小程序的视频生成服务。',
      },
    ],
    results: [
      '覆盖跑步、跳跃、趴下、洗澡、打招呼 5 类动作场景，完成可灵与火山引擎两套生成路径测试。',
      '形成一份可复用的提示词列表：用户输入简单动作，后端调用对应的固定指令生成视频。',
      '将经过验证的稳定指令和案例视频交付开发团队，为小程序后端的生成稳定性提供基础。',
    ],
    media: [
      {
        src: '/media/kaidou-pet-dog-run.mp4',
        type: 'video',
        poster: '/media/kaidou-pet-dog-run-poster.png',
        alt: '咖逗 AI 宠物视频生成样片：小狗跑步',
        caption: '案例视频 01｜跑步：验证动作连续性与宠物主体稳定性。',
        orientation: 'portrait',
      },
      {
        src: '/media/kaidou-pet-dog-jump.mp4',
        type: 'video',
        poster: '/media/kaidou-pet-dog-jump-poster.png',
        alt: '咖逗 AI 宠物视频生成样片：小狗跳跃',
        caption: '案例视频 02｜跳跃：验证起跳、腾空与落地的连续动作。',
        orientation: 'portrait',
        section: '案例视频 / Prompt Tests',
      },
      {
        src: '/media/kaidou-pet-dog-bath.mp4',
        type: 'video',
        poster: '/media/kaidou-pet-dog-bath-poster.png',
        alt: '咖逗 AI 宠物视频生成样片：小狗洗澡',
        caption: '案例视频 03｜洗澡：验证固定浴室背景、水流和主体动作的稳定性。',
        orientation: 'portrait',
        section: '案例视频 / Prompt Tests',
      },
      {
        src: '/media/kaidou-pet-cat-wave.mp4',
        type: 'video',
        poster: '/media/kaidou-pet-cat-wave-poster.png',
        alt: '咖逗 AI 宠物视频生成样片：小猫打招呼',
        caption: '案例视频 04｜打招呼：验证抬爪、挥动和放下的连续动作。',
        orientation: 'portrait',
        section: '案例视频 / Prompt Tests',
      },
      {
        src: '/media/kaidou-pet-dog-rest.mp4',
        type: 'video',
        poster: '/media/kaidou-pet-dog-rest-poster.png',
        alt: '咖逗 AI 宠物视频生成样片：小狗趴下休息',
        caption: '案例视频 05｜趴下：验证站立、下沉到趴卧的动作阶段和背景连续性。',
        orientation: 'portrait',
        section: '案例视频 / Prompt Tests',
      },
    ],
    resources: [
      {
        title: '宠物动作提示词列表',
        description: '下载跑步、跳跃、趴下、洗澡、打招呼 5 类动作的提示词结构、约束字段与测试记录模板。',
        href: '/downloads/kaidou-pet-prompt-library.md',
        label: '下载 Markdown 文件',
      },
      {
        title: '图生视频参数表',
        description: '原始项目资料中的参数表，记录图生视频测试时使用的动作与生成设置。',
        href: '/downloads/kaidou-pet-video-parameters.xlsx',
        label: '下载 Excel 文件',
      },
    ],
    learnings:
      'AI 视频刚起步时，真正需要解决的不是“偶尔生成一条好看的片段”，而是把反复测试后稳定的指令固定下来，让用户的简单输入可以被后端可靠调用。',
  },
  {
    slug: 'aigc-story-experiment',
    title: 'AIGC 剧情短片验证',
    titleEn: 'AIGC Storytelling Experiment',
    year: '2025.09 / 2026.09',
    category: '个人项目 / 传播验证',
    track: 'video',
    scope: '个人独立创作｜2025 年事件改编 AI 漫剧传播验证；2026 年 9 月 1—2 日完成叙事 MV',
    role: ['剧情脚本', '分镜设计', '视频画面', '角色参考图', '角色连续性', '剪辑整合'],
    contribution: {
      level: '独立完成',
      summary: '独立完成脚本、分镜、视频画面、角色形象参考图、角色连续性控制与 MV 后期整合。',
    },
    team: '个人项目，无团队协作｜从音乐、画布资产到成片均由我独立完成',
    platform: ['LibTV 画布', 'Suno', '小红书', '剪映'],
    summary:
      '先用 2025 年娱乐事件改编 AI 漫剧验证题材与传播，再在 2026 年 9 月 1—2 日用 Suno 生成音乐，以 LibTV 画布固定角色和场景，独立完成《请你像光一样，平凡地活着》5 分 22 秒叙事 MV。',
    hero: '/media/light-mv-cover.png',
    metrics: [
      { value: '5:22', label: '最新叙事 MV' },
      { value: '200+', label: '2025 年一周涨粉' },
      { value: '5,897', label: '单篇漫剧最高点赞' },
      { value: '22个', label: 'MV 声画同步节点' },
    ],
    challenge:
      '2025 年 AI 视频还不成熟：人物形象和场景容易漂移，短片之间很难保持连续。我先把娱乐事件改编成 AI 漫剧，在一周内获得 200+ 新增粉丝、单篇数千点赞；但题材涉及娱乐相关史事，单条短剧的分发窗口只有约 12 小时。到了 2026 年，AI 视频生成更稳定，我希望用一首完整音乐和画布工作流，把角色、场景和镜头关系固定下来，真正做出一支能连续观看的 MV。',
    insight:
      '2026 年的核心判断是先用 Suno 生成一首完整音乐，再用 LibTV 画布把人物角色、场景和镜头资产固定下来，让音乐成为叙事时间轴。相比 2025 年直接生成一条条不稳定的 AI 视频，这种方式能把角色连续性、场景一致性和整体流畅度放在同一个制作流程里。',
    strategy: [
      '先验证事件改编是否成立，再决定是否延展为连续内容。',
      '保留已经验证过的角色和情绪线索，避免每条内容重新开始。',
      '把音乐、角色资产、场景资产和镜头关系统一到同一条制作链路。',
    ],
    subprojects: [
      {
        title: '01 / 2025 事件改编 AI 漫剧',
        body: '根据 2025 年娱乐圈事件改编连续漫剧；一周涨粉 200+，多篇内容获得千级点赞，最高 5,897 赞。',
      },
      {
        title: '02 / 2025 传播窗口复盘',
        body: '题材涉及娱乐相关史事，单条短剧的分发窗口约 12 小时；以短时曝光、互动与涨粉判断内容是否成立。',
      },
      {
        title: '03 / 2026.09《请你像光一样》',
        body: '9 月 1—2 日完成最新 5 分 22 秒 MV：沿用此前短片内容，用 Suno 音乐将剧情、角色与情绪串联起来。',
      },
      {
        title: '04 / 资产与后期整合',
        body: '独立完成角色参考图、场景画面、22 个声画同步节点与提示词资产，完成从旧片素材到完整成片的重组。',
      },
    ],
    execution: [
      {
        title: '01 / 事件改编',
        body: '从 2025 年娱乐事件提炼冲突与人物关系，改写为适合连续发布的 AI 漫剧。',
      },
      {
        title: '02 / 漫剧验证',
        body: '连续发布短篇内容，观察一周涨粉、单篇点赞与 12 小时分发窗口内的互动反馈。',
      },
      {
        title: '03 / MV 重组',
        body: '2026 年 9 月 1—2 日用 Suno 生成音乐，以 LibTV 画布固定人物和场景，再将此前短片内容串成 5 分 22 秒叙事 MV。',
      },
      {
        title: '04 / 资产与剪辑',
        body: '独立完成角色形象参考图、角色连续性、22 个声画节点、提示词、声音、字幕与成片筛选。',
      },
    ],
    results: [
      '2025 年事件改编 AI 漫剧一周涨粉 200+，多篇内容获得千级点赞，单篇最高 5,897 赞。',
      '尽管单条短剧的分发窗口约 12 小时，仍获得可观曝光，验证了题材改编与人物冲突的传播效率。',
      '2026 年 9 月 1—2 日独立完成《请你像光一样，平凡地活着》5 分 22 秒 MV，用 Suno 音乐串联此前短片内容。',
      '通过 LibTV 画布固定人物、场景和镜头关系，完成 22 个声画同步节点与角色连续性控制。',
      '明确该案例为个人独立创作实验，不代表企业业务项目。',
    ],
    media: [
      {
        src: '/media/light-mv-full-web.mp4',
        type: 'video',
        poster: '/media/light-mv-cover.png',
        alt: '请你像光一样平凡地活着完整 AIGC MV',
        caption: '《请你像光一样，平凡地活着》5 分 22 秒 AIGC 叙事 MV 网页播放版。',
        orientation: 'portrait',
      },
      {
        src: '/media/aigc-story-preview.mp4',
        type: 'video',
        poster: '/media/aigc-story-poster.jpg',
        alt: 'AIGC 剧情短片样片',
        caption: '2025 年事件改编 AI 漫剧样片；用于验证题材、角色与连载节奏。',
        orientation: 'landscape',
      },
      {
        src: '/media/aigc-results.png',
        type: 'image',
        alt: 'AIGC 剧情内容发布数据',
        caption: '2025 年漫剧发布后的曝光、观看、点赞、收藏与涨粉数据。',
        orientation: 'landscape',
      },
      {
        src: '/media/aigc-results-2.png',
        type: 'image',
        alt: 'AIGC 剧情短片账号数据',
        caption: '漫剧分发窗口与代表内容表现记录；单篇最高 5,897 赞。',
        orientation: 'landscape',
      },
    ],
    links: [
      {
        platform: '小红书',
        title: 'AI淼淼小作坊',
        kind: '账号主页',
        href: 'https://www.xiaohongshu.com/user/profile/5c2df9b900000000060394a1',
        note: 'AIGC 剧情短片发布账号',
      },
    ],
    production: {
      title: '《请你像光一样，平凡地活着》',
      subtitle: '5:22 AIGC 叙事 MV / Suno 音乐 / 22 个声画同步节点',
      videoPrompt: {
        nodeCount: '22 个 15 秒节点 · 按真实歌曲时间码组织',
        excerpt: [
          '9:16 竖屏真人电影画面，现代东方抒情现实主义 MV，中国普通城市与新疆生活环境；真实人物、真实空间比例与自然皮肤纹理，低饱和暖白、暖灰、灰蓝、灰绿、旧木、雾金与深青灰调色。',
          '人物严格绑定干净角色图，锁定同一身份、五官骨相、年龄、发型、发色、身高、体型和服装。每个短镜头只完成一个主要动作，眨眼、呼吸、发丝、衣角、窗帘、草叶和水流保持自然微动。',
          '现实主义为主体，只保留时间穿越、人物消散与水下银白鱼梦境三处克制超现实；可读中文统一后期添加，生成画面只保留干净空屏或模糊占位。',
        ],
        download: '/downloads/light-mv-video-prompts.md',
      },
      characterPromptBase:
        '真人电影写实角色资产图，纯暖灰无缝背景，柔和自然光，真实皮肤与织物纹理；严格锁定同一身份、五官骨相、年龄、发型、发色、身高、体型和服装。分别输出面部正面、45 度、右侧面、全身正面、全身背面；无场景、无剧情动作、无文字、无 Logo、无水印。',
      characters: [
        {
          name: '林淼淼',
          stage: '24 岁 / A01',
          image: '/media/character-miaomiao-24.png',
          prompt: '24 岁中国女性，齐肩自然黑发，奶油白短袖 T 恤、雾霾蓝灰束脚工装裤、米白运动鞋；右手细红绳，气质安静克制。',
        },
        {
          name: '林淼淼',
          stage: '57 岁 / A02',
          image: '/media/character-miaomiao-57.png',
          prompt: '与 24 岁阶段保持同一五官骨相，57 岁自然老化，发色与皮肤纹理真实克制；不改变身份感，不做夸张衰老。',
        },
        {
          name: '白鱼鱼',
          stage: '25 岁 / B01',
          image: '/media/character-yuyu-25.png',
          prompt: '25 岁中国男性，清瘦自然，白衬衫、黑色直筒裤；青年音乐人气质，神态温和，不做明星精修与舞台夸张造型。',
        },
        {
          name: '白鱼鱼',
          stage: '55 岁 / B03',
          image: '/media/character-yuyu-55.png',
          prompt: '保持青年阶段同一张脸；两鬓约 20% 银发，雾蓝灰棉质衬衫、暖白 T 恤、深灰直筒裤，呈现自然成熟状态。',
        },
        {
          name: '白鱼鱼',
          stage: '70 岁 / B04',
          image: '/media/character-yuyu-70.png',
          prompt: '保持 25 岁至 55 岁阶段的五官连续性，70 岁自然白发与皮肤纹理；健康、平静，不病弱，不做临终化表达。',
        },
        {
          name: '福福',
          stage: '成年 / C02',
          image: '/media/character-fufu-adult.png',
          prompt: '约 4 岁健康成年柯基；额头白线、眼周橘色块、白胸白腿和红项圈保持不变，真实毛发与自然体型。',
        },
        {
          name: '福福',
          stage: '老年 / C03',
          image: '/media/character-fufu-senior.png',
          prompt: '约 12—13 岁健康老年柯基；口鼻、眉毛和耳缘自然银白，橘色毛变浅，红项圈轻微旧化；禁止病弱、伤口和花色漂移。',
        },
      ],
      song: {
        title: '请你像光一样',
        src: '/media/light-song.mp3',
        duration: '05:22',
        format: 'Suno 生成 · MP3 · 192kbps 网页版',
      },
      assetNotesDownload: '/downloads/light-character-asset-notes.md',
    },
    learnings:
      'AI 降低了素材成本，但没有替代内容判断。个人实验的价值，是用发布结果验证创意与制作方法的边界。',
  },
];

export const homeProjects = projects
  .filter((project) => project.featuredOrder)
  .sort((a, b) => (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99));

function showcaseItem(
  projectSlug: string,
  media: Pick<HomeShowcaseItem, 'src' | 'type' | 'poster' | 'label'>,
): HomeShowcaseItem {
  const project = projects.find((item) => item.slug === projectSlug);
  if (!project) throw new Error(`Unknown showcase project: ${projectSlug}`);

  return {
    projectSlug,
    title: project.title,
    year: project.year,
    metric: `${(project.metrics.find((item) => item.level === 'A') ?? project.metrics[0]).value} · ${(project.metrics.find((item) => item.level === 'A') ?? project.metrics[0]).label}`,
    ...media,
  };
}

export const homeShowcaseItems: HomeShowcaseItem[] = [
  showcaseItem('wechat-vaccine-growth', {
    src: '/media/wechat-report.png',
    type: 'image',
    label: '公众号增长',
  }),
  showcaseItem('multi-platform-store-setup', {
    src: '/media/commerce-revenue.png',
    type: 'image',
    label: '商业转化',
  }),
  showcaseItem('ai-content-workflows', {
    src: '/media/digital-human-preview.mp4',
    type: 'video',
    poster: '/media/digital-human-poster.jpg',
    label: '数字人口播',
  }),
  showcaseItem('aigc-story-experiment', {
    src: '/media/light-mv-full-web.mp4',
    type: 'video',
    poster: '/media/light-mv-cover.png',
    label: 'AIGC 叙事 MV',
  }),
  showcaseItem('medical-device-matrix', {
    src: '/media/medical-accounts.png',
    type: 'image',
    label: '医疗内容矩阵',
  }),
  showcaseItem('xiaohongshu-beauty-matrix', {
    src: '/media/beauty-feed.jpg',
    type: 'image',
    label: '小红书内容测试',
  }),
  showcaseItem('new-zealand-travel-account', {
    src: '/media/new-zealand-feed.jpg',
    type: 'image',
    label: '新西兰旅行内容',
  }),
];

export const videoShowcaseItems: HomeShowcaseItem[] = [
  showcaseItem('brand-product-films', {
    src: '/media/yutabang-product-promo-720p.mp4',
    type: 'video',
    poster: '/media/yutabang-product-promo-poster.png',
    label: '企业产品宣传',
  }),
  showcaseItem('ai-agent-product-films', {
    src: '/media/yutabang-agent-medical-search.mp4',
    type: 'video',
    poster: '/media/yutabang-agent-medical-search-poster.png',
    label: 'AI 智能体视频',
  }),
  showcaseItem('blockchain-explainer-video', {
    src: '/media/blockchain-short-video.mp4',
    type: 'video',
    poster: '/media/blockchain-short-video-poster.jpg',
    label: '知识科普短视频',
  }),
  showcaseItem('kaidou-pet-video-prompts', {
    src: '/media/kaidou-pet-dog-run.mp4',
    type: 'video',
    poster: '/media/kaidou-pet-dog-run-poster.png',
    label: 'AI 指令样片',
  }),
  showcaseItem('aigc-story-experiment', {
    src: '/media/light-mv-full-web.mp4',
    type: 'video',
    poster: '/media/light-mv-cover.png',
    label: 'AIGC 叙事 MV',
  }),
  showcaseItem('professional-editorial-writing', {
    src: '/media/children-health-cover.png',
    type: 'image',
    label: '专业内容写作',
  }),
];

export const projectArchiveOrder: Record<string, string[]> = {
  systems: ['ai-content-system', 'ai-content-workflows'],
  video: [
    'ai-agent-product-films',
    'brand-product-films',
    'kaidou-pet-video-prompts',
    'professional-editorial-writing',
    'blockchain-explainer-video',
    'aigc-story-experiment',
  ],
  growth: ['wechat-vaccine-growth', 'medical-device-matrix', 'xiaohongshu-beauty-matrix', 'new-zealand-travel-account'],
  commerce: ['multi-platform-store-setup'],
};

export const projectTracks = [
  {
    id: 'systems',
    index: '01',
    label: 'AI 工作流与产品系统',
    labelEn: 'AI WORKFLOW & SYSTEMS',
    description: '从真实运营任务出发，搭建内容工作流、自动化模块与可演示产品原型。',
  },
  {
    id: 'video',
    index: '02',
    label: '产品传播与内容表达',
    labelEn: 'PRODUCT COMMUNICATION',
    description: '把 AI 产品、专业知识与复杂概念转化为用户看得懂、愿意继续了解的内容。',
  },
  {
    id: 'growth',
    index: '03',
    label: '内容增长与矩阵运营',
    labelEn: 'CONTENT GROWTH',
    description: '用账号定位、内容策略、矩阵测试与数据复盘验证内容是否真正有效。',
  },
  {
    id: 'commerce',
    index: '04',
    label: '0–1 商业承接',
    labelEn: 'COMMERCIAL BUILDING',
    description: '把内容触达连接到店铺、直播、客服与售后，验证从内容到交易的完整链路。',
  },
] as const;

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string) {
  const orderedSlugs = projectTracks.flatMap((track) => projectArchiveOrder[track.id] ?? []);
  const index = orderedSlugs.indexOf(slug);
  const nextSlug = orderedSlugs[(index + 1) % orderedSlugs.length];
  return projects.find((project) => project.slug === nextSlug) ?? projects[0];
}
