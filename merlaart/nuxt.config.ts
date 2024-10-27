// nuxt.config.js
require('dotenv').config(); 

module.exports = {
  compatibilityDate: '2024-04-03',
  css: ['~/assets/styles/main.scss'],
  devtools: { enabled: true },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import '~/assets/styles/base/semantic-colors.scss';`
        }
      }
    }
  },
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap'
        }
      ]
    }
  },
  runtimeConfig: {
    public: {
      directusUrl: process.env.DIRECTUS_URL, 
      apiToken: process.env.DIRECTUS_API_TOKEN 
    }
  }
};
