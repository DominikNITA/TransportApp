<template>
  <div class="flex flex-col items-center w-full space-y-3 p-6">
    <div class="flex bg-red-100">
      <div
        id="itinerary-form-wrapper"
        class="main-bg text-gray-300 px-6 py-2 flex flex-col"
      >
        <h3 class="font-bold text-4xl text-center pb-6">
          {{ $t('itineraryFormTitle') }}
        </h3>
        <form
          id="itinerary"
          method="post"
          @submit.prevent="checkForm"
          class="space-y-5"
        >
          <div v-if="errors.length">
            <b>Please correct the following error(s):</b>
            <ul>
              <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
            </ul>
          </div>

          <p class="space-y-2">
            <StationInput
              :model="from"
              placeholder="station, place"
              :label="$t('from')"
              @input="changeFromStation($event)"
              :data="mapData.stations"
            />
            <StationInput
              :model="to"
              placeholder="station, place"
              :label="$t('to')"
              @input="changeToStation($event)"
              :data="mapData.stations"
            />
          </p>
          <p>
            <Toggle
              :firstOption="$t('leaveAt')"
              :secondOption="$t('arriveAt')"
              :model="isDateArrival"
              @change="changeIsDateArrival($event)"
            ></Toggle>
          </p>
          <p>
            <button
              type="submit"
              class="w-full py-3 rounded main-text font-semibold text-2xl bg-white"
            >
              {{ $t('itineraryFormSubmit') }}
            </button>
          </p>
        </form>
      </div>
      <Map :networkData="mapData" @destination="changeToStation($event)"></Map>
    </div>
    <NuxtLink
      :to="localePath('/itinerary/test')"
      class="bg-red-200 p-2 border-4 border-orange-500"
      >Test page</NuxtLink
    >
  </div>
</template>

<script>
import Toggle from '../../components/Toggle'

export default {
  components: { Toggle },
  data() {
    return {
      errors: [],
      from: '',
      to: '',
      isDateArrival: true,
      date: null,
      mapData: {
        stations: [
          // fake initial data, because vue isn't correctly defering conditional rendering
          {
            position: { x: 200, y: 300 },
            linesNumbers: [1, 2, 3],
            name: 'Start typing',
          },
        ],
      },
    }
  },
  methods: {
    checkForm: function (e) {
      console.log('In checkForm')
      console.log(this.isDateArrival)
    },
    changeIsDateArrival(newState) {
      this.isDateArrival = newState
    },
    changeFromStation(newStation) {
      this.from = newStation
    },
    changeToStation(newStation) {
      console.log(newStation)
      this.to = newStation
    },
  },
  async mounted() {
    try {
      this.mapData = await this.$http.$get('/api/map')
      console.log(this.mapData)
    } catch (error) {
      console.error(error)
    }
  },
}
</script>

<style>
#itinerary-form-wrapper {
  min-width: 22rem;
}

.dropdown {
  top: 100%;
  margin-left: 0 !important;
}
</style>