<template>
  <section class="filter-container flex align-center">
    <div class="search task-filter flex align-center g-1">
      <input
        type="text"
        class="input-search"
        ref="searchInput"
        v-model="filterBy.txt"
        placeholder="Search "
        @input="setFilter"
      />
    </div>
  </section>
</template>

<script>
  import {utilService} from '../services/util.service.js'
  import {eventBus} from '../services/event-bus.service'
  export default {
    name: 'task-filter',
    emits: ['filtered'],
    data() {
      return {
        filterBy: {
          txt: '',
        },
        unSubscribe: null,
      }
    },
    created() {
      this.filterBy.txt = this.$store.getters.filterBy?.txt || ''
      this.setFilter = utilService.debounce(this.setFilter, 400)
      console.log('runing created')
      this.unSubscribe = eventBus.on('removeTask', (data) => {
        console.log('data', data)
        console.log('data.txt', data.txt)
      })
    },
    mounted() {
      this.$refs.searchInput.focus()
    },
    methods: {
      setFilter() {
        this.$emit('filtered', JSON.parse(JSON.stringify(this.filterBy)))
      },
    },
    unmounted() {
      this.unSubscribe()
    },
  }
</script>
