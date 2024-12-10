export default defineEventHandler(async (event) => {
  try {
    // 设置响应头，禁用缓存
    setResponseHeaders(event, {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      Pragma: 'no-cache',
      Expires: '0',
    })

    const config = useRuntimeConfig()
    const response = await fetch(`${config.nestjsApi}/nav/data`, {
      headers: {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
      },
    })

    return await response.json()
  } catch (error) {
    console.error('获取导航数据失败:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch navigation data',
    })
  }
})
