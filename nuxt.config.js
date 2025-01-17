export default {
  publicRuntimeConfig: {
    baseURL: 'https://www.kalibrr.id/api',
  },
  ssr: true,
  target: 'server',
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'ChatAja Jobs - Cari kerja lebih mudah dengan ChatAja Jobs',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'ChatAja Jobs - Cari kerja lebih mudah dengan ChatAja Jobs',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/cajobs-logo.svg' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap',
      },
    ],
  },
  loading: {
    color: '#EB5757',
    height: '4px',
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['@/assets/style.css'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    // moment.js
    '@nuxtjs/moment',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    'dropzone-nuxt',
    'v-sanitize/nuxt',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    proxy: false,
  },

  // proxy: {
  //   '/api': {
  //     target: 'https://www.kalibrr.id/api',
  //     pathRewrite: {
  //       '^/api': '/',
  //     },
  //     changeorigin: true,
  //   },
  // },

  auth: {
    redirect: {
      login: '/',
      logout: '/',
      callback: '/',
      home: '/',
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url:
              'https://cors-anywhere.herokuapp.com/http://chataja-jobs-be.chataja.co.id/api/v1/auth/login',
            method: 'post',
          },
          logout: false,
          user: false,
        },
      },
    },
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    loaders: {
      vue: {
        prettify: false,
      },
    },
  },
}
