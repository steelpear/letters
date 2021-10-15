export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Письма, благодарности, поздравления',
    title: 'Письма',
    htmlAttrs: {
      lang: 'ru'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'yandex-verification', content: '5c8fdce64423a114' },
      { name: 'google-site-verification', content: '35dYYpGQEhuQ949PZE4zFGB8WAMrQjTjcEz1JP2L49g' },
      { hid: 'description', name: 'description', content: 'На этом сайте можно написать письмо, поздравить коллег или родных, поблагодарить врача или учителя, попросить о помощи, оставить отзыв, заявить о поиске давнего друга, просто поделиться мыслями и многое другое. Это сайт о людях и для людей. Пишите письма - это ничего не стоит и это бесценно.' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Material+Icons' },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.0.13/css/all.css' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Neucha:400,700' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css ' }
    ]
  },
  loading: { color: 'white' },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/styles.css'],
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vuelidate.js', ssr: true },
    { src: '~/plugins/vue-masonry.js', ssr: false },
    '~/plugins/axios'
  ],

  env: {
    VUE_APP_URL: process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : 'https://all-letters.ru',
    VUE_APP_SERVER: process.env.NODE_ENV !== 'production' ? 'http://localhost:3001' : 'https://all-letters.ru:3001'
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],

  modules: [
    '@nuxtjs/axios',
    'vue-social-sharing/nuxt',
    ['nuxt-clipboard', { autoSetContainer: true }],
    ['cookie-universal-nuxt', { parseJSON: false }],
    ['@nuxtjs/robots', {
      UserAgent: '*',
      Host: 'https://all-letters.ru',
      Disallow: '/admin'
    }],
    '@nuxtjs/sitemap',
    'vue2-editor/nuxt',
    '@nuxtjs/yandex-metrika'
  ],

  yandexMetrika: {
    id: '85812509',
    webvisor: true
    // clickmap: false,
    // useCDN: false,
    // trackLinks: false,
    // accurateTrackBounce: false
  },

  clipboard: {
    autoSetContainer: true
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    lang: {
      current: 'ru'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    //
  }
}
