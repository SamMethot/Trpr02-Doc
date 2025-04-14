import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Trpr02-Documentation",
  description: "La documentation du trpr02",
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
          { text: 'Revue du code de Samuel', link: '/revue-samuel' },
          { text: 'Revue du code de Tommy', link: '/revue-tommy' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
