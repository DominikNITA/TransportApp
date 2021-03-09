<template>
  <l-popup :options="options">
    <div class="popupContent">
      <div class="stationName">
        {{ this.station.name }}
      </div>
      <div class="flex justify-center">
        <div
          class="lineNumber"
          v-for="lineNumber in station.linesNumbers"
          v-bind:key="lineNumber.number"
          :style="{ 'background-color': linesColors[lineNumber - 1] }"
        >
          {{ lineNumber }}
        </div>
      </div>
      <button
        class="p-1 bg-gray-400 m-auto"
        v-on:click="$emit('change-departure', station.name)"
      >
        Set As Departure
      </button>
      <button
        class="p-1 bg-gray-400 m-auto"
        v-on:click="$emit('destination', station.name)"
      >
        Set As Destination
      </button>
    </div>
  </l-popup>
</template>

<script>
export default {
  props: ['networkData', 'station'],
  data() {
    return {
      options: {
        className: 'test',
      },
    }
  },
  computed: {
    linesColors: function () {
      return this.networkData.lines.map((l) => l.color)
    },
  },
}
</script>

<style>
.lineNumber {
  width: 1.3rem;
  height: 1.3rem;
  border-radius: 100%;
  margin: 0.25rem;
  /* mix-blend-mode: difference; */
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

.stationName {
  text-align: center;
  width: 100%;
  font-weight: 700;
  font-size: 1.2rem;
  color: var(--highlight-color);
}

.leaflet-popup-content-wrapper {
  background-color: var(--main-color);
}
.leaflet-popup-content {
  margin: 10px 7px;
  width: fit-content !important;
}
</style>