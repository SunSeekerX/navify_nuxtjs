export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig()
    const response = await fetch(`${config.nestjsApi}/nav/data`, {
      cache: 'no-store', // 关键配置，确保不使用缓存
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
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
