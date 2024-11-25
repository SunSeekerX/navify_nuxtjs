// 分类数据
export const defaultCategories = [
  { id: 'ai', name: '🤖 AI 工具' },
  { id: 'community', name: '👥 社区资讯' },
  { id: 'design', name: '🎨 设计资源' },
  { id: 'develop', name: '🔧 开发工具' },
  { id: 'learn', name: '📚 学习平台' },
  { id: 'work', name: '⚡ 效率工具' },
  { id: 'read', name: '📖 阅读资源' },
  { id: 'frontend', name: '💻 前端开发' },
  { id: 'backend', name: '🔋 后端开发' },
  { id: 'mobile', name: '📱 移动开发' },
]
// 网站数据
export const defaultSections = [
  {
    id: 'ai',
    icon: '🤖',
    title: '🤖 AI 工具',
    items: [
      {
        name: 'ChatGPT',
        description: 'OpenAI 开发的 AI 助手',
        url: 'https://chat.openai.com',
        color: '#74AA9C',
      },
      {
        name: 'Midjourney',
        description: 'AI 绘画工具',
        url: '#',

        color: '#0000FF',
      },
      {
        name: 'Claude',
        description: 'Anthropic 开发的 AI 助手',
        url: '#',

        color: '#8E44AD',
      },
      {
        name: 'Stable Diffusion',
        description: 'AI 图像生成模型',
        url: '#',

        color: '#E74C3C',
      },
      {
        name: 'Bard',
        description: 'Google 开发的 AI 助手',
        url: '#',

        color: '#4285F4',
      },
      {
        name: 'DALL-E',
        description: 'OpenAI 图像生成模型',
        url: '#',

        color: '#FF6B6B',
      },
    ],
  },
  {
    id: 'community',
    icon: '👥',
    title: '社区资讯',
    items: [
      {
        name: '掘金',
        description: '开发者社区',
        url: '#',

        color: '#007FFF',
      },
      {
        name: '36kr',
        description: '创业资讯、科技新闻',
        url: '#',

        color: '#4ECDC4',
      },
      {
        name: 'V2EX',
        description: '创意工作者社区',
        url: '#',

        color: '#333333',
      },
      {
        name: 'InfoQ',
        description: '软件开发资讯',
        url: '#',

        color: '#FF5733',
      },
    ],
  },
  {
    id: 'design',
    icon: '🎨',
    title: '设计资源',
    items: [
      {
        name: 'Figma',
        description: '在线设计工具',
        url: '#',

        color: '#FF4785',
      },
      {
        name: 'Dribbble',
        description: '设计师作品分享平台',
        url: '#',

        color: '#EA4C89',
      },
      {
        name: 'Behance',
        description: '创意设计社区',
        url: '#',

        color: '#1769FF',
      },
    ],
  },
  {
    id: 'develop',
    icon: '🔧',
    title: '开发工具',
    items: [
      {
        name: 'GitHub',
        description: '代码托管平台',
        url: '#',

        color: '#333',
      },
      {
        name: 'VS Code',
        description: '代码编辑器',
        url: '#',

        color: '#007ACC',
      },
      {
        name: 'GitLab',
        description: '代码托管平台',
        url: '#',

        color: '#FCA121',
      },
    ],
  },
  {
    id: 'learn',
    icon: '📚',
    title: '学习平台',
    items: [
      {
        name: 'Coursera',
        description: '全球在线教育平台',
        url: '#',

        color: '#0056D2',
      },
      {
        name: 'Udemy',
        description: '在线课程平台',
        url: '#',

        color: '#A435F0',
      },
      {
        name: 'edX',
        description: '免费在线课程',
        url: '#',

        color: '#02262B',
      },
    ],
  },
  {
    id: 'work',
    icon: '⚡',
    title: '效率工具',
    items: [
      {
        name: 'Notion',
        description: '全能工作空间',
        url: '#',

        color: '#000000',
      },
      {
        name: 'Trello',
        description: '项目管理工具',
        url: '#',

        color: '#0079BF',
      },
      {
        name: 'Slack',
        description: '团队协作平台',
        url: '#',

        color: '#4A154B',
      },
    ],
  },
  {
    id: 'frontend',
    icon: '💻',
    title: '前端开发',
    items: [
      {
        name: 'Vue.js',
        description: '渐进式 JavaScript 框架',
        url: '#',

        color: '#42b883',
      },
      {
        name: 'React',
        description: 'JavaScript UI 库',
        url: '#',

        color: '#61dafb',
      },
      {
        name: 'Angular',
        description: 'Web 应用框架',
        url: '#',

        color: '#dd1b16',
      },
    ],
  },
  {
    id: 'backend',
    icon: '🔋',
    title: '后端开发',
    items: [
      {
        name: 'Node.js',
        description: 'JavaScript 运行时',
        url: '#',

        color: '#339933',
      },
      {
        name: 'Django',
        description: 'Python Web 框架',
        url: '#',

        color: '#092E20',
      },
      {
        name: 'Spring Boot',
        description: 'Java 应用框架',
        url: '#',

        color: '#6DB33F',
      },
    ],
  },
  {
    id: 'mobile',
    icon: '📱',
    title: '移动开发',
    items: [
      {
        name: 'Flutter',
        description: '跨平台开发框架',
        url: '#',

        color: '#02569B',
      },
      {
        name: 'React Native',
        description: '移动应用开发框架',
        url: '#',

        color: '#61dafb',
      },
      {
        name: 'Swift',
        description: 'iOS 开发语言',
        url: '#',

        color: '#FA7343',
      },
    ],
  },
  {
    id: 'read',
    icon: '📖',
    title: '阅读资源',
    items: [
      {
        name: 'Medium',
        description: '优质文章平台',
        url: '#',

        color: '#000000',
      },
      {
        name: 'Dev.to',
        description: '开发者博客平台',
        url: '#',

        color: '#0A0A0A',
      },
      {
        name: 'HashNode',
        description: '技术博客社区',
        url: '#',

        color: '#2962FF',
      },
    ],
  },
]
