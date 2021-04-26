import { wrapFunctional } from './utils'

export { default as Banner } from '../..\\components\\Banner.vue'

export const LazyBanner = import('../..\\components\\Banner.vue' /* webpackChunkName: "components/banner" */).then(c => wrapFunctional(c.default || c))
