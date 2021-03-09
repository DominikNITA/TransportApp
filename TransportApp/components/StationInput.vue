<template>
  <div
    class="station-wrapper rounded bg-gray-600 flex px-3 py-2 relative"
    v-click-outside="clickedOutside"
  >
    <label class="station-label" :for="label">
      {{ label }}
    </label>
    <span class="bar"></span>
    <input
      type="text"
      ref="input"
      :id="label"
      class="station-input flex-grow"
      v-bind:value="model"
      v-on:input="handleInput"
      :placeholder="placeholder"
      autocomplete="off"
    />
    <div
      v-show="model && showOptions"
      @click.self="handleSelf()"
      @focusout="showOptions = false"
      tabindex="0"
      :class="dropdownClass"
    >
      <ul class="py-1">
        <li
          v-for="(item, index) in searchResults"
          :key="index"
          @click="handleClick(item)"
          class="px-3 py-2 cursor-pointer hover:bg-gray-200"
        >
          {{ item.name }}
        </li>
        <li v-if="!searchResults.length" class="px-3 py-2 text-center">
          No Matching Results
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'

export default {
  props: {
    model: {
      type: String,
      required: false,
    },
    placeholder: {
      type: String,
      required: false,
      default: 'Enter text here.',
    },
    label: {
      type: String,
      required: false,
    },
    data: {
      type: Array,
      required: true,
    },
    dropdownClass: {
      type: String,
      required: false,
      default:
        'dropdown absolute left-0 w-full z-50 bg-white border border-gray-300 overflow-hidden overflow-y-scroll rounded-md shadow-md text-gray-800',
    },
  },
  data() {
    return {
      showOptions: false,
      chosenOption: '',
      searchTerm: '',
    }
  },
  computed: {
    searchResults() {
      if (this.searchTerm === undefined || this.searchTerm.length == 0) {
        return this.data
      }
      return this.data.filter((item) => {
        return item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      })
    },
  },
  methods: {
    reset() {
      this.$emit('input', '')
      this.chosenOption = ''
    },

    handleInput(evt) {
      this.$emit('input', evt.target.value)
      this.searchTerm = evt.target.value
      this.showOptions = true
    },

    handleClick(item) {
      this.$emit('input', item.name)
      this.$emit('chosen', item)
      this.chosenOption = item.name
      this.showOptions = false
      this.$refs.input.focus()
    },

    clickedOutside() {
      this.showOptions = false

      // if (!this.chosenOption) {
      //   this.$emit('input', '')
      // }
    },
  },
  directives: {
    ClickOutside,
  },
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

.station-wrapper > * {
  margin-left: 0.2rem;
}

.bar {
  height: 100%;
  width: 1px;
  background-color: #cecbca83;
}
</style>