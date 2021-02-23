<template>
  <div class="flex flex-col items-center w-full">
    <div class="flex justify-center h-50 bg-red-100">
      <div id="itinerary-form-wrapper">
        <h3>Where we are going?</h3>
        <form id="itinerary" action="/api/itinerary" method="post" @submit="checkForm">
          <p v-if="errors.length">
            <b>Please correct the following error(s):</b>
            <ul>
              <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
            </ul>
          </p>

          <p>
            <label for="from">From</label>
            <input type="text" name="from" id="from" v-model="from">
          </p>

          <p>
            <label for="to">To</label>
            <input type="text" name="to" id="to" v-model="to">
          </p>
          <p>
            <input
              type="submit"
              value="Submit"
            >
          </p>
        </form>
      </div>
      <div id="map-wrapper">

      </div>
    </div>
    <NuxtLink to="/itinerary/test" class="bg-red-200 p-2 border-4 border-orange-500">Test page</NuxtLink>
  </div>
</template>

<script>
export default {
  data() {
    return {
      errors: ['Kappa'],
      from: null,
      to: null,
      isDateArrival: false,
      date: null,
    }
  },
  methods: {
    checkForm: function (e) {

      e.preventDefault
    },
  },
}
</script>

<style>
</style>