<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { defaultCategories, defaultSections } from '~/assets/constant'

const isDarkMode = ref(false)
const isSidebarOpen = ref(false)
const activeSection = ref('')
// 添加 favicon 加载状态追踪
const faviconLoaded = ref({})
const route = useRoute()
// 将原始数据转换为所需格式的函数
const transformData = (rawData) => {
  // 按 sort 字段排序
  const sortedData = [...rawData].sort((a, b) => a.sort - b.sort)

  // 转换 categories 数据
  const transformedCategories = sortedData.map((category) => ({
    id: category.id.toString(),
    name: category.name,
    // 从名称中提取 emoji 作为图标，如果没有则使用默认图标 '📌'
    icon: category.name.match(/^\p{Emoji}/u)?.[0] || '📌',
  }))

  // 转换 sections 数据
  const transformedSections = sortedData.map((category) => ({
    id: category.id.toString(),
    title: category.name,
    // 从名称中提取 emoji 作为图标，如果没有则使用默认图标 '📌'
    icon: category.name.match(/^\p{Emoji}/u)?.[0] || '📌',
    items: category.items.map((item) => ({
      name: item.name,
      description: item.description,
      url: item.url,
      color: item.color || '#666666', // 如果没有color则使用默认颜色
    })),
  }))

  return {
    categories: transformedCategories,
    sections: transformedSections,
  }
}

// 替换原来的 categories 和 sections 定义
const categories = ref([])
const sections = ref([])

// const { data, clear } = useFetch(`${useRuntimeConfig().public.nestjsApi}/nav/data?timestamp=${Date.now()}`, {
//   // lazy: true,
//   // server: false,
// })
// const { data, error, refresh, clear } = await useAsyncData('navigation', () => $fetch('/api/navigation'), {
//   getCachedData: () => null, // 禁用缓存,每次都重新请求
// })

// const { data } = await useAsyncData('navigation', () => $fetch('/api/navigation'), {
//   transform: (response) => {
//     if (response.code === 200) {
//       return transformData(response.data)
//     }
//     return {
//       categories: defaultCategories,
//       sections: defaultSections,
//     }
//   },
//   getCachedData: () => null, // 禁用缓存,每次都重新请求
// })

const { data, error, refresh } = await useLazyAsyncData('navigation', () => $fetch('/api/navigation'), {
  immediate: false, // 初始不立即请求
  getCachedData: () => null, // 禁用缓存,每次都重新请求
})

// 观察数据变化并处理
// watchEffect(() => {
//   if (data.value?.code === 200) {
//     console.log(`++++++[${new Date().toISOString()}] 获取接口导航数据成功`)
//     const transformedData = transformData(data.value.data)
//     categories.value = transformedData.categories
//     sections.value = transformedData.sections
//   } else {
//     console.log(`++++++[${new Date().toISOString()}] 获取接口导航数据失败，使用默认演示数据`, data.value)
//     categories.value = defaultCategories
//     sections.value = defaultSections
//   }
// })

watchEffect(() => {
  if (data.value?.code === 200) {
    const transformedData = transformData(data.value.data)
    categories.value = transformedData.categories
    sections.value = transformedData.sections
  } else {
    categories.value = defaultCategories
    sections.value = defaultSections
  }
})

// 使用 watchEffect 统一更新数据
// watchEffect(() => {
//   if (data.value) {
//     categories.value = data.value.categories
//     sections.value = data.value.sections
//   } else {
//     console.log(`++++++[${new Date().toISOString()}] 获取接口导航数据失败，使用默认演示数据`, data.value)
//     categories.value = defaultCategories
//     sections.value = defaultSections
//   }
// })

watch(
  () => route.path,
  () => {
    if (route.path === '/') {
      refresh()
    }
  },
)

// 获取网站图标的 URL
const getFaviconUrl = (url) => {
  if (url === '#') return ''
  try {
    const domain = new URL(url).hostname
    const sources = [
      `https://www.google.com/s2/favicons?domain=${domain}&sz=64`,
      `https://${domain}/favicon.ico`,
      `https://favicon.yandex.net/favicon/${domain}`,
    ]
    return sources[0] // 可以实现失败后自动尝试下一个源
  } catch (e) {
    return ''
  }
}
// 处理图片加载错误
const handleImageError = (event, item) => {
  faviconLoaded.value[item.url] = false
  // 移除错误的图片
  event.target.style.display = 'none'
}
// 获取名称的首字母
const getInitials = (name) => {
  return name
    .split(' ')
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
}
// 检查图片是否成功加载
const checkImageLoad = (url) => {
  if (url === '#') return

  const img = new Image()
  img.onload = () => {
    faviconLoaded.value[url] = true
  }
  img.onerror = () => {
    faviconLoaded.value[url] = false
  }
  img.src = getFaviconUrl(url)
}
// 修改滚动到指定部分的逻辑
const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    const headerHeight = 64 // 头部高度
    const offset = element.offsetTop - headerHeight

    // 先关闭侧边栏并移除 overflow-hidden
    isSidebarOpen.value = false
    document.body.classList.remove('overflow-hidden')

    // 然后滚动到目标位置
    setTimeout(() => {
      window.scrollTo({
        top: offset,
        behavior: 'smooth',
      })
      // 更新激活状态
      activeSection.value = sectionId
    }, 10)
  }
}
// 添加防抖函数
const debounce = (fn, delay) => {
  let timeoutId
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn.apply(null, args), delay)
  }
}
// 修改滚动位置更新激活状态的逻辑
const updateActiveSection = () => {
  const sections = document.querySelectorAll('main > div[id]')
  const scrollPosition = window.scrollY + 80 // 调整头部偏移量

  // 找到最接近顶部的部分
  let closest = null
  let closestDistance = Infinity

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const distance = Math.abs(sectionTop - scrollPosition)

    if (distance < closestDistance) {
      closestDistance = distance
      closest = section
    }
  })

  if (closest) {
    activeSection.value = closest.id
  }
}
const debouncedUpdate = debounce(updateActiveSection, 100)
const handleResize = () => {
  if (window.innerWidth >= 1024 && document.body.classList.contains('overflow-hidden')) {
    document.body.classList.remove('overflow-hidden')
  }
}
// 监听系统主题变化
let mediaQuery = null
const handleThemeChange = (e) => {
  if (!localStorage.getItem('theme')) {
    isDarkMode.value = e.matches
    document.documentElement.classList.toggle('dark', e.matches)
  }
}
// 切换主题
const toggleTheme = () => {
  if (process.client) {
    isDarkMode.value = !isDarkMode.value
    localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark')
  }
}
// 修改侧边栏切换逻辑
const toggleSidebar = () => {
  if (process.client) {
    isSidebarOpen.value = !isSidebarOpen.value
    if (isSidebarOpen.value) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }
}

// 初始化
onMounted(() => {
  refresh()
  if (process.client) {
    // 添加客户端检查
    // 主题初始化
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      isDarkMode.value = savedTheme === 'dark'
    } else {
      mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      isDarkMode.value = mediaQuery.matches
    }

    if (isDarkMode.value) {
      document.documentElement.classList.add('dark')
    }

    window.addEventListener('scroll', debouncedUpdate)
    window.addEventListener('resize', handleResize)

    // 初始化检查位置
    updateActiveSection()

    sections.value.forEach((section) => {
      section.items.forEach((item) => {
        if (item.url !== '#') {
          checkImageLoad(item.url)
        }
      })
    })

    // 添加系统主题变化监听
    if (mediaQuery) {
      mediaQuery.addEventListener('change', handleThemeChange)
    }
  }
})

// 清理事件监听
onUnmounted(() => {
  if (process.client) {
    // 添加客户端检查
    window.removeEventListener('scroll', debouncedUpdate)
    window.removeEventListener('resize', handleResize)
    document.body.classList.remove('overflow-hidden')
    if (mediaQuery) {
      mediaQuery.removeEventListener('change', handleThemeChange)
    }
  }
})
</script>

<template>
  <div :class="['min-h-screen transition-all duration-300', isDarkMode ? 'dark bg-gray-900' : 'bg-gray-100']">
    <!-- 头部导航 -->
    <header class="sticky top-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 shadow-lg">
      <div class="container mx-auto px-4 h-16 flex justify-between items-center">
        <!-- 移动端菜单按钮 -->
        <button
          @click="toggleSidebar"
          class="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center bg-white dark:bg-gray-700 shadow-[4px_4px_10px_rgba(0,0,0,0.1),-4px_-4px_10px_rgba(255,255,255,0.9)] dark:shadow-[4px_4px_10px_rgba(0,0,0,0.3),-4px_-4px_10px_rgba(255,255,255,0.1)]"
        >
          <div class="space-y-1.5">
            <div
              class="w-5 h-0.5 bg-gray-800 dark:bg-gray-200 rounded-full transition-all"
              :class="{ 'rotate-45 translate-y-2': isSidebarOpen }"
            ></div>
            <div
              class="w-5 h-0.5 bg-gray-800 dark:bg-gray-200 rounded-full transition-all"
              :class="{ 'opacity-0': isSidebarOpen }"
            ></div>
            <div
              class="w-5 h-0.5 bg-gray-800 dark:bg-gray-200 rounded-full transition-all"
              :class="{ '-rotate-45 -translate-y-2': isSidebarOpen }"
            ></div>
          </div>
        </button>

        <!-- Logo -->
        <div class="flex items-center space-x-3">
          <svg
            class="w-8 h-8"
            :class="isDarkMode ? 'text-white' : 'text-gray-800'"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2L2 7L12 12L22 7L12 2Z"
              :stroke="isDarkMode ? '#ffffff' : '#1f2937'"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M2 17L12 22L22 17"
              :stroke="isDarkMode ? '#ffffff' : '#1f2937'"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M2 12L12 17L22 12"
              :stroke="isDarkMode ? '#ffffff' : '#1f2937'"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <h1 class="text-xl font-bold text-gray-800 dark:text-white">Navify</h1>
        </div>

        <!-- 主题切换按钮 -->
        <button
          @click="toggleTheme"
          class="w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-gray-700 shadow-[4px_4px_10px_rgba(0,0,0,0.1),-4px_-4px_10px_rgba(255,255,255,0.9)] dark:shadow-[4px_4px_10px_rgba(0,0,0,0.3),-4px_-4px_10px_rgba(255,255,255,0.1)] hover:scale-105 transition-transform duration-200"
        >
          <span class="text-xl">{{ isDarkMode ? '🌙' : '🌞' }}</span>
        </button>
      </div>
    </header>

    <div class="container mx-auto flex">
      <!-- 侧边栏 -->
      <aside
        :class="[
          'fixed lg:sticky lg:block z-40 transition-all duration-300 w-64 top-16 h-[calc(100vh-4rem)] pt-6 overflow-y-auto',
          isSidebarOpen ? 'left-0' : '-left-64',
          isDarkMode ? 'bg-gray-800' : 'bg-white',
        ]"
      >
        <nav class="px-4 space-y-2">
          <a
            v-for="category in categories"
            :key="category.id"
            :href="`#${category.id}`"
            @click="scrollToSection(category.id)"
            class="block px-4 py-2 rounded-xl text-left transition-all duration-200"
            :class="[
              activeSection === category.id
                ? 'bg-blue-500 text-white dark:text-white'
                : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700',
            ]"
          >
            <div class="flex items-center space-x-3">
              <!-- <span class="text-xl" :class="{ 'text-white': activeSection === category.id }">{{ category.icon }}</span> -->
              <span>{{ category.name }}</span>
            </div>
          </a>
        </nav>
      </aside>

      <!-- 遮罩层 -->
      <div v-if="isSidebarOpen" @click="toggleSidebar" class="fixed inset-0 bg-black/50 lg:hidden z-30"></div>

      <!-- 主内容区 -->
      <main class="flex-1 p-6 lg:ml-4">
        <div v-for="section in sections" :key="section.id" :id="section.id" class="mb-12 scroll-mt-20">
          <h2 class="flex items-center space-x-2 text-xl font-bold text-gray-800 dark:text-white mb-6">
            <!-- <span class="text-2xl">{{ section.icon }}</span> -->
            <span>{{ section.title }}</span>
          </h2>

          <!-- 卡片网格 -->
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
            <a
              v-for="(item, idx) in section.items"
              :key="idx"
              :href="item.url"
              :class="[
                'group flex items-center space-x-4 p-4 rounded-xl bg-white dark:bg-gray-800',
                'shadow-[6px_6px_12px_rgba(0,0,0,0.1),-6px_-6px_12px_rgba(255,255,255,0.9)]',
                'dark:shadow-[4px_4px_8px_rgba(0,0,0,0.2),-4px_-4px_8px_rgba(255,255,255,0.03)]',
                'transition-all duration-200 max-w-[300px] mx-auto w-full',
                item.url === '#' ? 'cursor-not-allowed opacity-60 hover:scale-100' : 'hover:scale-[1.02]',
              ]"
              target="_blank"
              rel="noopener noreferrer"
              :aria-disabled="item.url === '#'"
              :tabindex="item.url === '#' ? '-1' : undefined"
              @click="item.url === '#' ? $event.preventDefault() : null"
            >
              <div
                :style="{ backgroundColor: item.color }"
                class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden"
              >
                <template v-if="item.url !== '#'">
                  <img
                    :src="getFaviconUrl(item.url)"
                    :alt="item.name"
                    :class="[
                      'w-6 h-6 object-contain transition-opacity duration-200 ease-in-out',
                      !faviconLoaded[item.url] ? 'opacity-0' : 'opacity-100',
                    ]"
                    @error="handleImageError($event, item)"
                    ref="faviconRef"
                  />

                  <div
                    v-show="!faviconLoaded[item.url]"
                    class="absolute w-6 h-6 flex items-center justify-center text-white font-medium rounded-sm animate-pulse"
                    :style="{ backgroundColor: item.color }"
                  >
                    {{ getInitials(item.name) }}
                  </div>
                </template>
                <div
                  v-else
                  class="w-6 h-6 flex items-center justify-center text-white font-medium"
                  :style="{ backgroundColor: item.color }"
                >
                  {{ getInitials(item.name) }}
                </div>
              </div>

              <div class="flex-1 min-w-0">
                <h3 class="font-medium text-gray-900 dark:text-white truncate text-lg leading-normal">
                  {{ item.name }}
                  <span v-if="item.url === '#'" class="text-sm text-gray-500 dark:text-gray-400">(即将上线)</span>
                </h3>
                <p class="text-base text-gray-500 dark:text-gray-400 truncate mt-1">{{ item.description }}</p>
              </div>
            </a>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
