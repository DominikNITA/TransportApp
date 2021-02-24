<template>
  <div app class="flex justify-center items-center w-full">
    <div class="central-part flex flex-row justify-between w-full">
      <NuxtLink to="/" id="logo">
        <Logo />
      </NuxtLink>
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
            <select name="lang" id="lang">
              <option value="en">English</option>
              <option value="fr">French</option>
            </select>
          </div>
          <div class="profile flex justify-center items-center">
            <i class="fas fa-user mr-2"></i>
            <div v-if="$auth.loggedIn">
              {{ $auth.user.name }}
              <a href="/logout">Logout</a>
            </div>
            <div v-else>
              <a href="/login" class="highlight-text font-bold">Connect</a>
              <a href="/register" class="text-gray-700">Register</a>
            </div>
          </div>
        </div>
        <hr class=""/>
        <div
          class="navbar flex pt-5 text-gray-700 text-xl space-x-6 font-medium pr-10"
        >
          <NuxtLink to="/itinerary">Itinerary</NuxtLink>
          <NuxtLink to="/timetable" class="">Timetable</NuxtLink>
          <NuxtLink to="/about" class="">About</NuxtLink>
          <NuxtLink to="/contact" class="text-orange-400">Contact me!</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
a.nuxt-link-active:not(#logo) {
  border-bottom-width: 5px;
  border-color: var(--highlight-color);
}
.navbar * {
  padding-bottom: 1.25rem;
  font-size: 1.1875em;
}
</style>