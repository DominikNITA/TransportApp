<template>
  <div id="map-wrap">
    <client-only>
      <l-map
        :min-zoom="-2.5"
        :max-zoom="5"
        :crs="crs"
        v-if="networkData"
        :max-bounds="bounds"
        :zoomSnap="0.25"
        :zoomDelta="0.1"
        :center="[1000, 1000]"
        :zoom="-1"
      >
        <l-image-overlay :url="url" :bounds="bounds" />
        <l-circle-marker
          v-for="station in networkData.stations"
          :key="station.name"
          :lat-lng="$L.latLng(station.position.y, station.position.x)"
        >
          <StationPopup :station="station" :networkData="networkData"></StationPopup>
        </l-circle-marker>
        <l-polyline
          v-for="line in networkData.lines"
          :key="line.number"
          :lat-lngs="
            line.stations.map((s) =>
              $L.latLng(
                s.position.y + line.number / 100.0,
                s.position.x + line.number / 100.0
              )
            )
          "
          :color="line.color"
          :options="polylineOptions"
          :weight="6"
          @mouseover="printLineNumber(line)"
        />
      </l-map>
    </client-only>
  </div>
</template>

<script>
import { CRS } from 'leaflet'
export default {
  props: ['networkData'],
  data() {
    return {
      polylineOptions: {
        opacity: 0.95,
      },
      url: '/map.jpeg',
      bounds: [
        [0, 0],
        [2000, 2000],
      ],
      crs: CRS.Simple,
      minZoom: -2,
    }
  },
  methods: {
    printLineNumber(line) {
      console.log(line.number)
    },
  },
}
</script>

<style>
#map-wrap {
  min-width: 40rem;
  min-height: 55rem;
}
</style>