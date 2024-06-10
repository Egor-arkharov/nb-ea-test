<template>
  <div class="backpack">
    <div class="backpack__filters">
      <BackpackFilters @filter-selected="updateSelectedFilter" />
    </div>
    <div class="backpack__labels">
      <BackpackLabels :selected-filter="selectedFilter" />
    </div>
    <div class="backpack__items">
      <BackpackItems :selected-filter="selectedFilter" />
    </div>
  </div>
</template>

<script>
import BackpackFilters from "../components/Backpack/BackpackFilters.vue";
import BackpackLabels from "../components/Backpack/BackpackLabels.vue";
import BackpackItems from "../components/Backpack/BackpackItems.vue";
import { ref } from 'vue';

export default {
  
  components: {
    BackpackFilters,
    BackpackLabels,
    BackpackItems
  },
  setup() {
    const selectedFilter = ref('all');

    const updateSelectedFilter = (filterName) => {
      selectedFilter.value = filterName;
    };

    return {
      updateSelectedFilter,
      selectedFilter
    }
  },
};
</script>

<style lang="scss" scoped>
.backpack {
  height: 100%;

  display: grid;
  grid-template-columns: 70px 1fr;
  grid-template-rows: 40px 1fr;
  gap: 0 15px;
  grid-template-areas: 
    "filters labels"
    "filters items"; 

  background-color: #242223;

		&__filters {
      grid-area: filters; 
		}

		&__labels {
      grid-area: labels;
		}

		&__items {
      grid-area: items;
		}
}
</style>