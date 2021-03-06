<template>
  <div class="station-wrapper rounded bg-gray-600 flex px-3 py-2 space-x-2">
    <label class="station-label" :for="label">
      {{ label }}
    </label>
    <span class="bar"></span>
    <input
      type="text"
      :id="label"
      class="station-input flex-grow"
      v-bind:value="model"
      v-on:input="$emit('input', $event.target.value)"
      :placeholder="placeholder"
    />
  </div>
</template>

<script>
export default {
  props: ['model', 'placeholder', 'label','stations'],
}
</script>

<style>
.station-label {
  margin: auto;
  font-weight: 600;
  font-size: 1.2rem;
  min-width: 2.7rem;
}

.station-input {
  background-color: transparent;
}

.station-wrapper {
  width: 100%;
  height: 3rem;
  justify-items: center;
}

.bar {
  height: 100%;
  width: 1px;
  background-color: #cecbca83;
}
</style>