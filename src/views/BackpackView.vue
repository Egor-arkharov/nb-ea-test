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
      <p
        v-if="caseId < MIN_CASE_ID || caseId > MAX_CASE_ID"
        class="error"
      >
        Invalid case ID. Case ID must be 3 or less. 
      </p>
    </div>
  </div>
</template>

<script>
import BackpackFilters from "../components/Backpack/BackpackFilters.vue";
import BackpackLabels from "../components/Backpack/BackpackLabels.vue";
import BackpackItems from "../components/Backpack/BackpackItems.vue";
import { useStore } from "vuex";
import { MIN_CASE_ID, MAX_CASE_ID } from "@/use/utils";

export default {
  
  components: {
    BackpackFilters,
    BackpackLabels,
    BackpackItems
  },
  setup() {
    const store = useStore();
    const caseId = store.getters.getCase;

    return {
      caseId,
      MIN_CASE_ID,
      MAX_CASE_ID
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
      height: var(--labels-h);
		}

		&__items {
      grid-area: items;
      max-height: calc(var(--home-h) - var(--nav-h) - var(--labels-h) - 15px);
      padding-right: 1vw;

      display: flex;
      justify-content: center;
		}
}
</style>