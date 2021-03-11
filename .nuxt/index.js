import Vue from 'vue'

import Meta from 'vue-meta'
import ClientOnly from 'vue-client-only'
import NoSsr from 'vue-no-ssr'
import { createRouter } from './router.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from './components/nuxt-error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'

/* Plugins */

import nuxt_plugin_plugin_52a3c970 from 'nuxt_plugin_plugin_52a3c970' // Source: .\\components\\plugin.js (mode: 'all')
import nuxt_plugin_nuxtleaflet_4538cfd2 from 'nuxt_plugin_nuxtleaflet_4538cfd2' // Source: .\\nuxt-leaflet.js (mode: 'client')
import nuxt_plugin_pluginrouting_60f12bc6 from 'nuxt_plugin_pluginrouting_60f12bc6' // Source: .\\nuxt-i18n\\plugin.routing.js (mode: 'all')
import nuxt_plugin_pluginmain_8fe2752e from 'nuxt_plugin_pluginmain_8fe2752e' // Source: .\\nuxt-i18n\\plugin.main.js (mode: 'all')
import nuxt_plugin_http_bff0a346 from 'nuxt_plugin_http_bff0a346' // Source: .\\http.js (mode: 'all')
import nuxt_plugin_axios_4aa9e593 from 'nuxt_plugin_axios_4aa9e593' // Source: .\\axios.js (mode: 'all')
import nuxt_plugin_workbox_6cd17c22 from 'nuxt_plugin_workbox_6cd17c22' // Source: .\\workbox.js (mode: 'client')
import nuxt_plugin_metaplugin_c8d65122 from 'nuxt_plugin_metaplugin_c8d65122' // Source: .\\pwa\\meta.plugin.js (mode: 'all')
import nuxt_plugin_auth_2f6d453d from 'nuxt_plugin_auth_2f6d453d' // Source: .\\auth.js (mode: 'all')

// Component: <ClientOnly>
Vue.component(ClientOnly.name, ClientOnly)

// TODO: Remove in Nuxt 3: <NoSsr>
Vue.component(NoSsr.name, {
  ...NoSsr,
  render (h, ctx) {
    if (process.client && !NoSsr._warned) {
      NoSsr._warned = true

      console.warn('<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead')
    }
    return NoSsr.render(h, ctx)
  }
})

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>
Vue.component(Nuxt.name, Nuxt)

Object.defineProperty(Vue.prototype, '$nuxt', {
  get() {
    return this.$root.$options.$nuxt
  },
  configurable: true
})

Vue.use(Meta, {"keyName":"head","attribute":"data-n-head","ssrAttribute":"data-n-head-ssr","tagIDKeyName":"hid"})

const defaultTransition = {"name":"page","mode":"out-in","appear":false,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

async function createApp(ssrContext, config = {}) {
  const router = await createRouter(ssrContext, config)

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    head: {"title":"TransportApp","meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"hid":"description","name":"description","content":""}],"link":[{"rel":"icon","type":"image\u002Fpng","href":"\u002Ficon-small.png"}],"script":[{"src":"https:\u002F\u002Fkit.fontawesome.com\u002F648c2563d3.js"},{"src":"https:\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002Fp5.js\u002F1.2.0\u002Fp5.min.js"}],"style":[]},

    router,
    nuxt: {
      defaultTransition,
      transitions: [defaultTransition],
      setTransitions (transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [transitions]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },

      err: null,
      dateErr: null,
      error (err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        let nuxt = app.nuxt // to work with @vue/composition-api, see https://github.com/nuxt/nuxt.js/issues/6517#issuecomment-573280207
        if (this) {
          nuxt = this.nuxt || this.$options.nuxt
        }
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
        if (ssrContext) {
          ssrContext.nuxt.error = err
        }
        return err
      }
    },
    ...App
  }

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base, router.options.mode)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    ssrContext
  })

  function inject(key, value) {
    if (!key) {
      throw new Error('inject(key, value) has no key provided')
    }
    if (value === undefined) {
      throw new Error(`inject('${key}', value) has no value provided`)
    }

    key = '$' + key
    // Add into app
    app[key] = value
    // Add into context
    if (!app.context[key]) {
      app.context[key] = value
    }

    // Check if plugin not already installed
    const installKey = '__nuxt_' + key + '_installed__'
    if (Vue[installKey]) {
      return
    }
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Object.prototype.hasOwnProperty.call(Vue.prototype, key)) {
        Object.defineProperty(Vue.prototype, key, {
          get () {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  // Inject runtime config as $config
  inject('config', config)

  // Add enablePreview(previewData = {}) in context for plugins
  if (process.static && process.client) {
    app.context.enablePreview = function (previewData = {}) {
      app.previewData = Object.assign({}, previewData)
      inject('preview', previewData)
    }
  }
  // Plugin execution

  if (typeof nuxt_plugin_plugin_52a3c970 === 'function') {
    await nuxt_plugin_plugin_52a3c970(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_nuxtleaflet_4538cfd2 === 'function') {
    await nuxt_plugin_nuxtleaflet_4538cfd2(app.context, inject)
  }

  if (typeof nuxt_plugin_pluginrouting_60f12bc6 === 'function') {
    await nuxt_plugin_pluginrouting_60f12bc6(app.context, inject)
  }

  if (typeof nuxt_plugin_pluginmain_8fe2752e === 'function') {
    await nuxt_plugin_pluginmain_8fe2752e(app.context, inject)
  }

  if (typeof nuxt_plugin_http_bff0a346 === 'function') {
    await nuxt_plugin_http_bff0a346(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_4aa9e593 === 'function') {
    await nuxt_plugin_axios_4aa9e593(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_workbox_6cd17c22 === 'function') {
    await nuxt_plugin_workbox_6cd17c22(app.context, inject)
  }

  if (typeof nuxt_plugin_metaplugin_c8d65122 === 'function') {
    await nuxt_plugin_metaplugin_c8d65122(app.context, inject)
  }

  if (typeof nuxt_plugin_auth_2f6d453d === 'function') {
    await nuxt_plugin_auth_2f6d453d(app.context, inject)
  }

  // Lock enablePreview in context
  if (process.static && process.client) {
    app.context.enablePreview = function () {
      console.warn('You cannot call enablePreview() outside a plugin.')
    }
  }

  // If server-side, wait for async component to be resolved first
  if (process.server && ssrContext && ssrContext.url) {
    await new Promise((resolve, reject) => {
      router.push(ssrContext.url, resolve, (err) => {
        // https://github.com/vuejs/vue-router/blob/v3.4.3/src/util/errors.js
        if (!err._isRouter) return reject(err)
        if (err.type !== 2 /* NavigationFailureType.redirected */) return resolve()

        // navigated to a different route in router guard
        const unregister = router.afterEach(async (to, from) => {
          ssrContext.url = to.fullPath
          app.context.route = await getRouteData(to)
          app.context.params = to.params || {}
          app.context.query = to.query || {}
          unregister()
          resolve()
        })
      })
    })
  }

  return {
    app,
    router
  }
}

export { createApp, NuxtError }
