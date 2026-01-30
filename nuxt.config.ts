// nuxt.config.ts
export default defineNuxtConfig({
  routeRules: {
    '/**': { prerender: true },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/ru', '/about', '/gallery', '/contact', '/ru/about', '/ru/gallery', '/ru/contact'],
    },
  },

  devtools: { enabled: true },
  css: ['@/assets/styles/main.scss'],
  devServer: { host: '0.0.0.0', port: 3000 },

  modules: ['@nuxtjs/i18n'],
  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'et',
    detectBrowserLanguage: false,
    lazy: false,
    langDir: null,
    locales: [
      { code: 'et', name: 'Eesti' },
      { code: 'ru', name: 'Русский' }
    ]
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          additionalData: `
            @use "@/assets/styles/base/media.scss" as *;
            @use "@/assets/styles/base/token.scss" as *;
            @use "@/assets/styles/base/animation.scss" as *;
            @use "@/assets/styles/base/base.scss" as *;
          `,
        },
      },
    },
  },

  compatibilityDate: '2024-12-21',
})