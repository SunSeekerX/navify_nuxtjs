export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  devServer: {
    port: 3002,
  },
  // 运行时配置
  runtimeConfig: {
    nestjsApi: process.env.NESTJS_API_URL,
    // 公共变量，客户端可访问
    public: {
      nestjsApi: process.env.NESTJS_API_URL,
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL,
      siteName: process.env.NUXT_PUBLIC_SITE_NAME,
      siteDescription: process.env.NUXT_PUBLIC_SITE_DESCRIPTION,
    },
  },
  app: {
    head: {
      // 页面标题
      title: 'Navify - 优质导航网站聚合',
      titleTemplate: '%s | Navify',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: process.env.NUXT_PUBLIC_SITE_DESCRIPTION,
        },
        {
          name: 'keywords',
          content: '网站导航,网址导航,设计导航,开发者导航,工具导航,学习导航',
        },
        // Open Graph tags
        { property: 'og:title', content: process.env.NUXT_PUBLIC_SITE_NAME },
        { property: 'og:description', content: process.env.NUXT_PUBLIC_SITE_DESCRIPTION },
        { property: 'og:image', content: `${process.env.NUXT_PUBLIC_SITE_URL}/og-image.jpg` },
        { property: 'og:url', content: process.env.NUXT_PUBLIC_SITE_URL },
        { property: 'og:type', content: 'website' },
        // Twitter Card tags
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: process.env.NUXT_PUBLIC_SITE_NAME },
        { name: 'twitter:description', content: process.env.NUXT_PUBLIC_SITE_DESCRIPTION },
        { name: 'twitter:image', content: `${process.env.NUXT_PUBLIC_SITE_URL}/og-image.jpg` },
        // Other SEO tags
        { name: 'robots', content: 'index, follow' },
        { name: 'author', content: 'Navify' },
        { name: 'theme-color', content: '#3B82F6' },
      ],
      // Link tags
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: process.env.NUXT_PUBLIC_SITE_URL },
        { rel: 'alternate', hreflang: 'zh', href: process.env.NUXT_PUBLIC_SITE_URL },
        { rel: 'alternate', hreflang: 'x-default', href: process.env.NUXT_PUBLIC_SITE_URL },
      ],
      script: [
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: process.env.NUXT_PUBLIC_SITE_NAME,
            description: process.env.NUXT_PUBLIC_SITE_DESCRIPTION,
            url: process.env.NUXT_PUBLIC_SITE_URL,
            potentialAction: {
              '@type': 'SearchAction',
              target: `${process.env.NUXT_PUBLIC_SITE_URL}/search?q={search_term_string}`,
              'query-input': 'required name=search_term_string',
            },
          }),
        },
      ],
    },
  },
  // css: ['@/assets/css/scrollbar.css'],
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/sitemap', '@nuxtjs/robots'],
  tailwindcss: {
    cssPath: ['~/assets/css/tailwind.css', { injectPosition: 'first' }],
    configPath: 'tailwind.config',
    // exposeConfig: true,
    exposeConfig: {
      level: 2,
    },
    config: {
      // plugins: [require('tailwind-scrollbar')],
    },
    viewer: true,
  },
  robots: {},
  nitro: {
    compressPublicAssets: true,
    minify: true,
    timing: false,
  },
  // 添加路由规则
  routeRules: {
    '/': { prerender: false, swr: true }, // 不预渲染首页
    '/api/**': {
      cors: true,
      cache: {
        maxAge: 0, // 禁用缓存
        // 或者设置较短的缓存时间
        // maxAge: 60, // 60秒
      },
    }, // API 路由启用 CORS
    // '/**': {
    //   headers: {
    //     'Cache-Control': 'max-age=300, must-revalidate',
    //   },
    // },
  },
  experimental: {
    payloadExtraction: true, // 启用页面负载提取
  },
  // 其他配置保持不变
  vite: {
    css: {
      preprocessorOptions: {
        sass: {
          api: 'modern',
        },
      },
    },
    optimizeDeps: {
      include: ['vue', 'vue-router'],
    },
  },
})
