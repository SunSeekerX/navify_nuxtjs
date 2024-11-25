import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

export default <Partial<Config>>{
  // 暗色模式配置
  darkMode: 'class',

  // 内容配置
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],

  theme: {
    // 字体大小配置
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }], // 12px
      sm: ['0.875rem', { lineHeight: '1.25rem' }], // 14px
      base: ['1rem', { lineHeight: '1.5rem' }], // 16px
      lg: ['1.125rem', { lineHeight: '1.75rem' }], // 18px
      xl: ['1.25rem', { lineHeight: '2rem' }], // 20px
      '2xl': ['1.5rem', { lineHeight: '2rem' }], // 24px
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }], // 36px
    },
    extend: {
      // 容器配置
      container: {
        center: true,
        padding: {
          DEFAULT: '0.5rem', // 减小默认间距
          xs: '0.5rem', // 添加 xs 断点的间距
          sm: '1rem',
          md: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
        screens: {
          xs: '375px', // 添加更小的断点
          sm: '540px', // 减小最小宽度
          md: '668px', // 减小平板宽度
          lg: '1024px',
          xl: '1280px',
          '2xl': '1536px',
        },
      },

      // 颜色配置
      colors: {
        primary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },

      // 字间距配置
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0em',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
      },

      // 行高配置
      lineHeight: {
        tighter: '1.125',
        tight: '1.25',
        snug: '1.375',
        normal: '1.5',
        relaxed: '1.625',
        loose: '2',
      },

      // 阴影配置
      boxShadow: {
        'neu-light': '6px 6px 12px rgba(0,0,0,0.1), -6px -6px 12px rgba(255,255,255,0.9)',
        'neu-dark': '4px 4px 8px rgba(0,0,0,0.2), -2px -2px 6px rgba(255,255,255,0.02)',
        'neu-btn-light': '4px 4px 10px rgba(0,0,0,0.1), -4px -4px 10px rgba(255,255,255,0.9)',
        'neu-btn-dark': '4px 4px 10px rgba(0,0,0,0.3), -4px -4px 10px rgba(255,255,255,0.1)',
      },

      // 圆角配置
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },

      // 过渡配置
      transitionProperty: {
        height: 'height',
        spacing: 'margin, padding',
      },

      // 动画配置
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
    },
  },

  // 变体配置
  variants: {
    extend: {
      backgroundColor: ['active', 'dark'],
      textColor: ['active', 'dark'],
      borderColor: ['active', 'dark'],
      opacity: ['dark'],
      display: ['dark'],
    },
  },

  // 插件配置
  plugins: [
    // 如果需要可以添加插件
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/typography'),
    // require('@tailwindcss/aspect-ratio'),
  ],
}
