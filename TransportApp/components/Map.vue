<template>
  <div id="map-wrap">
    <client-only>
      <l-map :zoom="13" :center="[47.41322, -1.219482]">
        <l-tile-layer
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        ></l-tile-layer>
        <l-circle-marker :lat-lng="[47.41322, -1.219482]">
          <l-tooltip content="Test" :options="options"></l-tooltip>
        </l-circle-marker>
      </l-map>
    </client-only>
  </div>
</template>

<script>
// import VueP5 from 'vue-p5';
export default {
  data() {
    return {
      options : {
        permanent : true
      }
    }
  },
  // methods: {
  //   setup(sketch) {
  //     if (!process.browser) {
  //       return
  //     }
  //     sketch.resizeCanvas(200, 200)
  //     sketch.background('green')
  //   },
  //   draw(sketch) {},
  // },
  // render(h) {
  //   return h(VueP5, { on: this })
  // },
}
</script>

<style>
#map-wrap {
  min-width: 40rem;
  min-height: 55rem;
}
</style>