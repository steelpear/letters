import Vue from 'vue'
import { wrapFunctional } from './utils'

const components = {
  Banner: () => import('../..\\components\\Banner.vue' /* webpackChunkName: "components/banner" */).then(c => wrapFunctional(c.default || c)),
  QrCode: () => import('../..\\components\\QrCode.vue' /* webpackChunkName: "components/qr-code" */).then(c => wrapFunctional(c.default || c)),
  Share: () => import('../..\\components\\Share.vue' /* webpackChunkName: "components/share" */).then(c => wrapFunctional(c.default || c))
}

for (const name in components) {
  Vue.component(name, components[name])
  Vue.component('Lazy' + name, components[name])
}
