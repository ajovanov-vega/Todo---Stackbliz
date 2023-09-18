// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~/scss/main.scss"],
  buildModules: ["@nuxtjs/svg", "@nuxt/types"],
  app: {
    pageTransition: { name: "fade" },
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
  },
  modules: ["@pinia/nuxt", "dayjs-nuxt", "@pinia-plugin-persistedstate/nuxt", "nuxt-icon"],
  dayjs: {
    locales: ["en-gb", "sr"],
    plugins: ["relativeTime", "utc", "timezone", "calendar", "isToday", "weekday", "isoWeek"],
    defaultLocale: "en-gb",
    defaultTimezone: "Europe/Belgrade",
  },
});
