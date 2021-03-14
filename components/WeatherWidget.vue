<template>
  <div class="weather space-x-1">
    <i class="fas fa-cloud-sun"></i>
    <span class="text-red-300 font-bold">{{ weatherData.maxTemperature }}&#176;C</span>
    <span class="text-blue-300 font-bold"
      >{{ weatherData.minTemperature }}&#176;C</span
    >
    <span class="font-medium">ImagiTown</span>
  </div>
</template>

<script>
export default {
  data() {
    return { weatherData: { minTemp: '_', maxTemp: '_' } }
  },
  async mounted() {
    this.weatherData = await this.$http.$get('/weather')
  },
  // async asyncData() {
  //   //const data = await $http.$get('/api/weather')
  //   console.log(data)
  //   data = null;
  //   if (data == null) {
  //     data = { minTemp: -1, maxTemp: 15 }
  //   }
  //   return { weatherData: data }
  // },
}
</script>

<style>
</style>