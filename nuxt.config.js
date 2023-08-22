// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ["@nuxtjs/ionic"],
  store:'~/store',
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  }, // Use the same name as the transition name you defined in the CSS class
  css: ["@/theme/variables.css","@/theme/transitions.css"],
});
