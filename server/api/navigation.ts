// export default defineEventHandler(async (event) => {
//   try {
//     const config = useRuntimeConfig()
//     const response = await fetch(`${config.nestjsApi}/nav/data`)
//     return await response.json()
//   } catch (error) {
//     throw createError({
//       statusCode: 500,
//       message: 'Failed to fetch navigation data',
//     })
//   }
// })

export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig()
    const response = await fetch(`${config.nestjsApi}/nav/data`)
    // const data = await response.json()

    // return {
    //   code: 200,
    //   data: data,
    // }

    return await response.json()
  } catch (error) {
    console.error('获取导航数据失败:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch navigation data',
    })
    // return {
    //   code: 500,
    //   message: '获取导航数据失败',
    // }
  }
})
