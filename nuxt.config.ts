import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  // Local development uses /; the Pages workflow supplies the deployment path.
  app: { baseURL: process.env.NUXT_APP_BASE_URL || '/' },
  // GitHub Pages cannot serve Nuxt's /api/_nuxt_icon endpoint.
  icon: { provider: 'iconify', serverBundle: false },
  modules: [
    "@nuxt/ui"
  ],
  css: ["~/assets/css/main.css", "~/assets/css/editor.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  future: {
    compatibilityVersion: 4
  }
})
