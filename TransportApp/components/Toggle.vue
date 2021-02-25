<template>
  <label class="switch">
    <input type="checkbox" v-bind:checked="model" v-on:change="$emit('change', $event.target.checked)"/>
    <span class="slider round"></span>
    <span class="first">{{ firstOption }}</span>
    <span class="second">{{ secondOption }}</span>
  </label>
</template>

<script>
export default {
  props: ['firstOption', 'secondOption', 'model'],
}
</script>

<style scoped>
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 100%;
  height: 3rem;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0);
  border: 1px white solid;
  -webkit-transition: 0.35s;
  transition: 0.35s;
}

.first,
.second {
  cursor: pointer;
  position: absolute;
  top: 25%;
  width: 50%;
  text-align: center;
  color: white;
  z-index: 10;
  transition: 0.35s;
  font-weight: 800;
  user-select: none;
}

.first {
  left: 0;
}

.second {
  left: 50%;
}

.slider:before {
  position: absolute;
  z-index: 5;
  content: '';
  height: 100%;
  width: 50%;
  left: 0px;
  top: 0px;
  background-color: rgba(255, 255, 255, 1);
  -webkit-transition: 0.35s;
  transition: 0.35s;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(100%);
  -ms-transform: translateX(100%);
  transform: translateX(100%);
}

input:checked ~ .second, .first:not(input:checked ~ .first) {
  color: var(--main-color);
}

/* Rounded sliders */
.slider.round {
  border-radius: 5px;
}
</style>