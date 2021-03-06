<template>
  <div id="map-wrap">
    <client-only>
      <l-map
        :min-zoom="-2.5"
        :crs="crs"
        v-if="mapData"
        :max-bounds="bounds"
        :zoomSnap="0.25"
        :zoomDelta="0.1"
      >
        <l-image-overlay :url="url" :bounds="bounds" />
        <l-circle-marker
          v-for="station in mapData.stations"
          :key="station.name"
          :lat-lng="$L.latLng(station.position.y, station.position.x)"
        >
          <l-tooltip
            :content="station.name + ' ' + station.linesNumbers.join(' ')"
            :options="options"
          ></l-tooltip>
        </l-circle-marker>
        <l-polyline
          v-for="line in mapData.lines"
          :key="line.number"
          :lat-lngs="
            line.stations.map((s) =>
              $L.latLng(s.position.y + line.number, s.position.x + line.number)
            )
          "
          :color="line.color"
          :options="polylineOptions"
        />
      </l-map>
    </client-only>
  </div>
</template>

<script>
import { CRS } from 'leaflet'
export default {
  data() {
    return {
      options: {
        permanent: false,
      },
      polylineOptions: {
        opacity: 0.5,
      },
      url: '/map.jpeg',
      bounds: [
        [0, 0],
        [2000, 2000],
      ],
      mapData: {
        stations: [
          // fake initial data, because vue isn't correctly defering conditional rendering
          { position: { x: 200, y: 300 }, linesNumbers: [1, 2, 3] },
        ],
      },
      crs: CRS.Simple,
      minZoom: -2,
    }
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
#map-wrap {
  min-width: 40rem;
  min-height: 55rem;
}
</style>