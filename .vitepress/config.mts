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
      { text: 'Samuel', link: '/samuel' },
      {  text: 'Tommy', link: '/tommy' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Revue de code de Samuel', link: '/samuel' },
          { text: 'Revue de code de Tommy', link: '/tommy' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
