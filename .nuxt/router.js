import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _a045c17c = () => interopDefault(import('..\\pages\\about.vue' /* webpackChunkName: "pages/about" */))
const _44406fc1 = () => interopDefault(import('..\\pages\\letter.vue' /* webpackChunkName: "pages/letter" */))
const _3796f586 = () => interopDefault(import('..\\pages\\message\\index.vue' /* webpackChunkName: "pages/message/index" */))
const _1950a16e = () => interopDefault(import('..\\pages\\message\\_id.vue' /* webpackChunkName: "pages/message/_id" */))
const _60d60bf2 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/about",
    component: _a045c17c,
    name: "about"
  }, {
    path: "/letter",
    component: _44406fc1,
    name: "letter"
  }, {
    path: "/message",
    component: _3796f586,
    name: "message"
  }, {
    path: "/message/:id",
    component: _1950a16e,
    name: "message-id"
  }, {
    path: "/",
    component: _60d60bf2,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
