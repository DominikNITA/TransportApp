<template>
  <div id="title-bar" class="flex flex-col">
    <div class="flex items-stretch">
      <span class="side-part bg-gray-700"></span>
      <div class="central-part flex flex-grow">
        <span
          class="flex flex-auto items-center bg-gray-700 text-gray-100 text-5xl"
        >
          {{ pageName() }}
        </span>
      </div>
      <span id="side-panel" class="side-part"></span>
    </div>
    <div class="flex items-stretch">
      <span class="side-part"></span>
      <div
        class="central-part flex items-center justify-between w-full px-6 py-4"
      >
        <div class="flex items-center space-x-2 text-sm">
          <NuxtLink to="/">Home</NuxtLink>
          <div
            v-for="path in pathPages"
            v-bind:key="path.name"
            class="flex space-x-2 items-center"
          >
            <span class="dot rounded-full w-1 h-1"></span>
            <NuxtLink :to="path.url" class="font-medium">{{
              path.name
            }}</NuxtLink>
          </div>
        </div>
        <WeatherWidget />
      </div>
    </div>
  </div>
</template>

<script>
import WeatherWidget from './WeatherWidget.vue'
export default {
  components: { WeatherWidget },
  computed: {
    pathPages: function () {
      const res = []
      const pages = (this.$route.path + '').split('/')
      for (let index = 1; index < pages.length; index++) {
        //Skip language specific part of path
        if(index == 1 && pages[index].length == 2) continue;
        
        const page = pages[index]
        res.push({
          name: this.firstToUpper(page),
          url: pages.slice(0, index + 1).join('/'),
        })
      }
      return res
    },
  },
  methods: {
    firstToUpper: function (text) {
      return text.charAt(0).toUpperCase() + text.slice(1)
    },
    pageName: function () {
      const pages = (this.$route.path + '').split('/')
      const page = pages[pages.length - 1]
      if (page.length + '' <= 1) return 'Home'
      return this.firstToUpper(page)
    },
  }
}
</script>

<style scoped>
a.nuxt-link-exact-active {
  color: black;
  font-weight: 700;
  border: 0;
}

.dot {
  background-color: var(--highlight-color);
}

#side-panel {
  background-color: var(--highlight-color);
  min-height: 8rem;
}

.sticky + #title-bar {
  padding-top: 8.5rem;
}
</style>