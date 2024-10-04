import { config } from "dotenv";
config();

export default defineNuxtConfig({
  modules: ["@nuxtjs/i18n", "@nuxt/ui"],

  i18n: {
    locales: ["ro", "ru"],
    defaultLocale: "ro",
    vueI18n: "./i18n.config.ts",
    strategy: "prefix_except_default",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
    },
    customRoutes: "config",
    pages: {
      "despre-noi": {
        ru: "/о-нас",
      },
      contacte: {
        ru: "/контакты",
      },
      "magazin/index": {
        ru: "/магазин/",
      },
      "magazin/reduceri": {
        ru: "/магазин/скидки",
      },
      "magazin/casa": {
        ru: "/магазин/касса",
      },
      "produs/[id]": {
        ru: "/продукт/[id]",
      },
    },
  },

  compatibilityDate: "2024-10-03",
  runtimeConfig: {
    apiToken: process.env.NUXT_API_TOKEN,
    public: {
      baseURL: process.env.NUXT_BASE_URL,
    },
  },
  colorMode: {
    classSuffix: "-mode",
    preference: "system",
    storage: "localStorage",
    storageKey: "nuxt-color-mode",
  },
});
