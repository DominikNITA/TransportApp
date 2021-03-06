import Vue from 'vue'

const components = {
  Footer: () => import('../..\\components\\Footer.vue' /* webpackChunkName: "components/footer" */).then(c => c.default || c),
  Header: () => import('../..\\components\\Header.vue' /* webpackChunkName: "components/header" */).then(c => c.default || c),
  Logo: () => import('../..\\components\\Logo.vue' /* webpackChunkName: "components/logo" */).then(c => c.default || c),
  Map: () => import('../..\\components\\Map.vue' /* webpackChunkName: "components/map" */).then(c => c.default || c),
  StationInput: () => import('../..\\components\\StationInput.vue' /* webpackChunkName: "components/station-input" */).then(c => c.default || c),
  StationPopup: () => import('../..\\components\\StationPopup.vue' /* webpackChunkName: "components/station-popup" */).then(c => c.default || c),
  TitleBar: () => import('../..\\components\\TitleBar.vue' /* webpackChunkName: "components/title-bar" */).then(c => c.default || c),
  Toggle: () => import('../..\\components\\Toggle.vue' /* webpackChunkName: "components/toggle" */).then(c => c.default || c),
  UserAuthForm: () => import('../..\\components\\UserAuthForm.vue' /* webpackChunkName: "components/user-auth-form" */).then(c => c.default || c),
  WeatherWidget: () => import('../..\\components\\WeatherWidget.vue' /* webpackChunkName: "components/weather-widget" */).then(c => c.default || c)
}

for (const name in components) {
  Vue.component(name, components[name])
  Vue.component('Lazy' + name, components[name])
}
