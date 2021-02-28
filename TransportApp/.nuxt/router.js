import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _5fde20ee = () => interopDefault(import('..\\pages\\about\\index.vue' /* webpackChunkName: "pages/about/index" */))
const _656a238a = () => interopDefault(import('..\\pages\\contact\\index.vue' /* webpackChunkName: "pages/contact/index" */))
const _5b31efd9 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))
const _64150fa0 = () => interopDefault(import('..\\pages\\itinerary\\index.vue' /* webpackChunkName: "pages/itinerary/index" */))
const _24d992f0 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _01a35fec = () => interopDefault(import('..\\pages\\register.vue' /* webpackChunkName: "pages/register" */))
const _18cade5a = () => interopDefault(import('..\\pages\\timetable\\index.vue' /* webpackChunkName: "pages/timetable/index" */))
const _787190b8 = () => interopDefault(import('..\\pages\\itinerary\\test.vue' /* webpackChunkName: "pages/itinerary/test" */))

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
    component: _5fde20ee,
    name: "about___en"
  }, {
    path: "/contact",
    component: _656a238a,
    name: "contact___en"
  }, {
    path: "/fr",
    component: _5b31efd9,
    name: "index___fr"
  }, {
    path: "/itinerary",
    component: _64150fa0,
    name: "itinerary___en"
  }, {
    path: "/login",
    component: _24d992f0,
    name: "login___en"
  }, {
    path: "/register",
    component: _01a35fec,
    name: "register___en"
  }, {
    path: "/timetable",
    component: _18cade5a,
    name: "timetable___en"
  }, {
    path: "/fr/about",
    component: _5fde20ee,
    name: "about___fr"
  }, {
    path: "/fr/contact",
    component: _656a238a,
    name: "contact___fr"
  }, {
    path: "/fr/itinerary",
    component: _64150fa0,
    name: "itinerary___fr"
  }, {
    path: "/fr/login",
    component: _24d992f0,
    name: "login___fr"
  }, {
    path: "/fr/register",
    component: _01a35fec,
    name: "register___fr"
  }, {
    path: "/fr/timetable",
    component: _18cade5a,
    name: "timetable___fr"
  }, {
    path: "/itinerary/test",
    component: _787190b8,
    name: "itinerary-test___en"
  }, {
    path: "/fr/itinerary/test",
    component: _787190b8,
    name: "itinerary-test___fr"
  }, {
    path: "/",
    component: _5b31efd9,
    name: "index___en"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config.app && config.app.basePath) || routerOptions.base
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
