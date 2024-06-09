<template>
  <div class="backpack">
    <div class="backpack__filters">
      <BackpackFilters />
    </div>
    <div class="backpack__labels">
      <BackpackLabels />
    </div>
    <div class="backpack__items">
      <BackpackItems />
    </div>
  </div>
</template>

<script lang="ts">
import BackpackFilters from "@/components/Backpack/BackpackFilters";
import BackpackLabels from "@/components/Backpack/BackpackLabels";
import BackpackItems from "@/components/Backpack/BackpackItems";

export default {
  components: {
    BackpackFilters,
    BackpackLabels,
    BackpackItems
  },
  setup() {},
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