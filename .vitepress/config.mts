import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Trpr02-Documentation",
  description: "La documentation du trpr02",
  base: '/Trpr02-Doc/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Tommy', link: '/revue-tommy' },
      { text: 'Samuel', link: '/revue-samuel' }

    ],

    sidebar: [
      {
        text: 'Revue de code',
        items: [
          { text: 'Revue de code de Samuel', link: '/revue-samuel' },
          { text: 'Revue de code de Tommy', link: '/revue-tommy' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
