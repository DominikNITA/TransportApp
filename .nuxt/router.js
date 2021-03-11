import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _62029886 = () => interopDefault(import('..\\pages\\about\\index.vue' /* webpackChunkName: "pages/about/index" */))
const _4fa0405a = () => interopDefault(import('..\\pages\\contact\\index.vue' /* webpackChunkName: "pages/contact/index" */))
const _ca3b597e = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))
const _99373870 = () => interopDefault(import('..\\pages\\itinerary\\index.vue' /* webpackChunkName: "pages/itinerary/index" */))
const _6489f658 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _ddb938f8 = () => interopDefault(import('..\\pages\\register.vue' /* webpackChunkName: "pages/register" */))
const _038c6c1c = () => interopDefault(import('..\\pages\\timetable\\index.vue' /* webpackChunkName: "pages/timetable/index" */))
const _1580790c = () => interopDefault(import('..\\pages\\itinerary\\test.vue' /* webpackChunkName: "pages/itinerary/test" */))

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
    component: _62029886,
    name: "about___en"
  }, {
    path: "/contact",
    component: _4fa0405a,
    name: "contact___en"
  }, {
    path: "/fr",
    component: _ca3b597e,
    name: "index___fr"
  }, {
    path: "/itinerary",
    component: _99373870,
    name: "itinerary___en"
  }, {
    path: "/login",
    component: _6489f658,
    name: "login___en"
  }, {
    path: "/register",
    component: _ddb938f8,
    name: "register___en"
  }, {
    path: "/timetable",
    component: _038c6c1c,
    name: "timetable___en"
  }, {
    path: "/fr/about",
    component: _62029886,
    name: "about___fr"
  }, {
    path: "/fr/contact",
    component: _4fa0405a,
    name: "contact___fr"
  }, {
    path: "/fr/itinerary",
    component: _99373870,
    name: "itinerary___fr"
  }, {
    path: "/fr/login",
    component: _6489f658,
    name: "login___fr"
  }, {
    path: "/fr/register",
    component: _ddb938f8,
    name: "register___fr"
  }, {
    path: "/fr/timetable",
    component: _038c6c1c,
    name: "timetable___fr"
  }, {
    path: "/itinerary/test",
    component: _1580790c,
    name: "itinerary-test___en"
  }, {
    path: "/fr/itinerary/test",
    component: _1580790c,
    name: "itinerary-test___fr"
  }, {
    path: "/",
    component: _ca3b597e,
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
