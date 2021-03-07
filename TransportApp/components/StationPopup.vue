<template>
  <l-popup :content="getPopupContent()" :options="options"></l-popup>
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
  methods: {
    getPopupContent() {
      let content = `<div class="stationName">${this.station.name}</div><div class="flex">`
      this.station.linesNumbers.forEach((lineNumber) => {
        content += `<div class="lineNumber" style="background:${
          this.networkData?.lines?.find((l) => l.number === lineNumber)?.color
        }">${lineNumber}</div>`
      })
      content += '</div>'
      return content
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
  color: var(--highlight-color)
}

.leaflet-popup-content-wrapper{
    background-color: var(--main-color);
}
</style>