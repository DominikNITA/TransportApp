<template>
  <div class="flex flex-col items-center w-full">
    <div class="flex justify-center h-50 bg-red-100">
      <div id="itinerary-form-wrapper" class="main-bg text-gray-300 p-6  flex flex-col flex-stretch">
        <h3 class="font-bold text-4xl text-center">Where to?</h3>
        <form
          id="itinerary"
          method="post"
          @submit.prevent="checkForm"
          class="space-y-4"
        >
          <div
            border="bottom"
            color="red"
            text
            type="success"
            v-if="errors.length"
          >
            <b>Please correct the following error(s):</b>
            <ul>
              <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
            </ul>
          </div>

          <p>
            <label for="from">From</label>
            <input type="text" name="from" id="from" v-model="from" placeholder="station, place"/>
          </p>

          <p>
            <label for="to">To</label>
            <input type="text" name="to" id="to" v-model="to" placeholder="station,place"/>
          </p>
          <p>
            <Toggle firstOption="Leave at" secondOption="Arrive at" :model="isDateArrival" @change="changeIsDateArrival($event)"></Toggle>
          </p>
          <p>
            <input type="submit" value="Let's go" class="w-full py-3 rounded main-text font-semibold text-2xl"/>
          </p>
        </form>
      </div>
      <div id="map-wrapper"></div>
    </div>
    <NuxtLink
      to="/itinerary/test"
      class="bg-red-200 p-2 border-4 border-orange-500"
      >Test page</NuxtLink
    >
  </div>
</template>

<script>
import Toggle from '../../components/Toggle'

export default {
  components: {Toggle},
  data() {
    return {
      errors: [],
      from: null,
      to: null,
      isDateArrival: true,
      date: null,
    }
  },
  methods: {
    checkForm: function (e) {
      console.log("In checkForm")
      console.log(this.isDateArrival)
    },
    changeIsDateArrival(newState){
      this.isDateArrival = newState;
    }
  },
}
</script>

<style>
</style>