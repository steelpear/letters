import { wrapFunctional } from './utils'

export { default as Banner } from '../..\\components\\Banner.vue'
export { default as QrCode } from '../..\\components\\QrCode.vue'
export { default as Share } from '../..\\components\\Share.vue'

export const LazyBanner = import('../..\\components\\Banner.vue' /* webpackChunkName: "components/banner" */).then(c => wrapFunctional(c.default || c))
export const LazyQrCode = import('../..\\components\\QrCode.vue' /* webpackChunkName: "components/qr-code" */).then(c => wrapFunctional(c.default || c))
export const LazyShare = import('../..\\components\\Share.vue' /* webpackChunkName: "components/share" */).then(c => wrapFunctional(c.default || c))
