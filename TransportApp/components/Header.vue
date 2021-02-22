<template>
  <div class="flex flex-row justify-between">
    <div
      id="logo"
      class="text-orange-400 text-3xl font-semibold flex items-center p-3"
    >
      Transport App
    </div>
    <div class="flex flex-col">
      <div
        class="grid grid-cols-3 divide-x divide-gray-300 py-5 w-full space-x-2"
      >
        <div class="socials flex justify-around">
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
          <span>Connect</span>
        </div>
      </div>
      <hr class="" />
      <div class="flex text-gray-500 text-xl space-x-6 font-medium pr-10">
        <div class="border-b-4 border-orange-400 py-5">Itinerary</div>
        <div class="py-5">Timetable</div>
        <div class="py-5">About</div>
        <div class="py-5 text-orange-400">Contact me!</div>
      </div>
    </div>
  </div>
</template>