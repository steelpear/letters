import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _a045c17c = () => interopDefault(import('..\\pages\\about.vue' /* webpackChunkName: "pages/about" */))
const _8a379a7e = () => interopDefault(import('..\\pages\\accounts.vue' /* webpackChunkName: "pages/accounts" */))
const _01044e04 = () => interopDefault(import('..\\pages\\admin.vue' /* webpackChunkName: "pages/admin" */))
const _2925498a = () => interopDefault(import('..\\pages\\donate.vue' /* webpackChunkName: "pages/donate" */))
const _44406fc1 = () => interopDefault(import('..\\pages\\letter.vue' /* webpackChunkName: "pages/letter" */))
const _3d7c5680 = () => interopDefault(import('..\\pages\\letters\\index.vue' /* webpackChunkName: "pages/letters/index" */))
const _cd86c5c4 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _581d8acd = () => interopDefault(import('..\\pages\\policy.vue' /* webpackChunkName: "pages/policy" */))
const _f7df00a8 = () => interopDefault(import('..\\pages\\rules.vue' /* webpackChunkName: "pages/rules" */))
const _2e83f1b0 = () => interopDefault(import('..\\pages\\letters\\_id.vue' /* webpackChunkName: "pages/letters/_id" */))
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
    path: "/accounts",
    component: _8a379a7e,
    name: "accounts"
  }, {
    path: "/admin",
    component: _01044e04,
    name: "admin"
  }, {
    path: "/donate",
    component: _2925498a,
    name: "donate"
  }, {
    path: "/letter",
    component: _44406fc1,
    name: "letter"
  }, {
    path: "/letters",
    component: _3d7c5680,
    name: "letters"
  }, {
    path: "/login",
    component: _cd86c5c4,
    name: "login"
  }, {
    path: "/policy",
    component: _581d8acd,
    name: "policy"
  }, {
    path: "/rules",
    component: _f7df00a8,
    name: "rules"
  }, {
    path: "/letters/:id",
    component: _2e83f1b0,
    name: "letters-id"
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
