import { config } from "dotenv";
config();
export default defineNuxtConfig({
  modules: ["@nuxtjs/i18n", "@nuxt/ui", "@pinia/nuxt"],

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
        ru: "/o-nas",
      },
      contacte: {
        ru: "/kontakty",
      },
      "magazin/index": {
        ru: "/magazin/",
      },
      "magazin/reduceri": {
        ru: "/magazin/skidki",
      },
      "magazin/casa": {
        ru: "/magazin/kassa",
      },
      "produs/[id]": {
        ru: "/produkt/[id]",
      },
      livrare: {
        ru: "/dostavka",
      },
      "categoria/[id]": {
        ru: "/kategoriya/[id]",
      },
      "termeni-si-conditii": {
        ru: "/usloviya-i-terminy",
      },
      "schimb-si-returnare": {
        ru: "/obmen-i-vozvrat",
      },
      "politica-de-confidentialitate": {
        ru: "/politika-konfidentsialnosti",
      },
      garantie: {
        ru: "/garantiya",
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

  devtools: {
    enabled: false,
  },
});
