<template>
  <l-popup :options="options">
    <div class="popupContent" ref="content">
      <div class="stationName">
        {{ this.station.name }}
      </div>
      <div class="flex justify-center">
        <div
          class="lineNumber"
          v-for="lineNumber in station.linesNumbers"
          v-bind:key="lineNumber.number"
          :style="{ 'background-color': linesColors[lineNumber-1] }"
        >
          {{ lineNumber }}
        </div>
      </div>
      <button
        class="destinationButton btn btn-blue"
        v-on:click="emitDestination()"
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
  computed:{
    linesColors : function (){
      return this.networkData.lines.map(l => l.color)
    }
  },
  methods: {
    // getPopupContent() {
    //   let content = `<div class="stationName">${this.station.name}</div><div class="flex">`
    //   this.station.linesNumbers.forEach((lineNumber) => {
    //     content += `<div class="lineNumber" style="background:${
    //       this.networkData?.lines?.find((l) => l.number === lineNumber)?.color
    //     }">${lineNumber}</div>`
    //   })
    //   content += '</div>'
    //   content +=
    //     '<button ref="dest" class="destinationButton btn btn-blue">Set As Destination</button>'
    //   return content
    // },
    emitDestination() {
      this.$emit('destination', this.station.name)
    },
    getLineColor(lineNumber) {
      this.networkData?.lines?.find((l) => l.number === lineNumber)?.color
    },
    // setListeners() {
    //   console.log(this.$refs.stationPopup)
    //   this.$refs.stationPopup.$el
    //     .getElementsByClassName('destinationButton')[0]
    //     .addEventListener('click', emitDestination)
    // },
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
</style>