import { SitemapStream, streamToPromise } from 'sitemap'
import { defineEventHandler } from 'h3'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  // 使用配置中的 siteUrl
  const sitemap = new SitemapStream({
    hostname: config.public.siteUrl,
  })

  // 添加 URL
  sitemap.write({
    url: '/',
    changefreq: 'daily',
    priority: 1,
  })

  sitemap.end()

  const xml = await streamToPromise(sitemap)
  event.node.res.setHeader('content-type', 'application/xml')
  return xml.toString()
})
