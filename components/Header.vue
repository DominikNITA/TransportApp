<template>
  <div ref="headerBar" class="flex justify-center items-center w-full bg-white">
    <div class="central-part flex flex-row justify-between w-full">
      <div class="flex-auto items-center justify-center">
        <NuxtLink :to="localePath('/')" id="logo">
          <Logo />
        </NuxtLink>
      </div>
      <div class="flex flex-col">
        <div class="flex py-5 w-full justify-end space-x-8">
          <div class="socials flex justify-around w-24">
            <a href="https://www.facebook.com"
              ><i class="fab fa-facebook-f"></i
            ></a>
            <a href="https://www.twitter.com"><i class="fab fa-twitter"></i></a>
            <a href="https://www.youtube.com"><i class="fab fa-youtube"></i></a>
          </div>
          <div class="language flex justify-center">
            <select v-model="$i18n.locale">
              <option
                v-for="lang in $i18n.locales"
                :key="lang.code"
                :value="lang.code"
              >
                {{ lang.name }}
              </option>
            </select>
          </div>
          <div class="profile flex justify-center items-center">
            <i class="fas fa-user mr-2"></i>
            <div v-if="$auth.loggedIn">
              {{ $auth.user.name }}
              <a href="/logout">{{ $t('logout') }}</a>
            </div>
            <div v-else>
              <a href="/login" class="highlight-text font-bold">{{
                $t('login')
              }}</a>
              <a href="/register" class="text-gray-700">{{ $t('register') }}</a>
            </div>
          </div>
        </div>
        <hr class="" />
        <div class="navbar flex text-gray-700 text-xl space-x-6 font-medium">
          <NuxtLink :to="localePath('/itinerary')">{{ $t('itinerary') }}</NuxtLink>
          <NuxtLink :to="localePath('/timetable')" class="">{{ $t('timetable') }}</NuxtLink>
          <NuxtLink :to="localePath('/about')" class="">{{ $t('about') }}</NuxtLink>
          <NuxtLink :to="localePath('/contact')" class="text-orange-400">{{
            $t('contact')
          }}</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sticky: 0,
    }
  },
  methods: {
    handleScroll() {
      if (window.pageYOffset > this.sticky) {
        this.$refs.headerBar.classList.add('sticky')
      } else {
        this.$refs.headerBar.classList.remove('sticky')
      }
    },
  },
  mounted() {
    this.$nextTick(function () {
      this.sticky = this.$refs.headerBar.offsetTop
      window.addEventListener('scroll', this.handleScroll)
    })
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
}
</script>

<style scoped>
a.nuxt-link-active:not(#logo) {
  border-bottom-width: 5px;
  border-color: var(--highlight-color);
  padding-bottom: calc(1.25rem - 5px);
}
.navbar * {
  padding: 1.25rem 0;
  font-size: 1.1875em;
}

.sticky {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 2000
}
</style>