<template>
  <main class="home">
    <div class="home_nav">
      <NavMain />
    </div>
    <div class="home__main">
      <router-view />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";
import { useStore } from "vuex";
import { useRoute, RouteLocationNormalized } from "vue-router";
import NavMain from "./components/NavMain.vue";
import { MIN_CASE_ID, MAX_CASE_ID } from "@/use/utils";

export default defineComponent({
  components: {
    NavMain,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const fetchData = async (caseId: number) => {
      try {
        if (!store.getters.getDataLoaded) {
          await store.dispatch("loadData", caseId);
        }
      } catch (error: unknown) {
        console.error("Error loading data:", error);
      }
    };

    watch<RouteLocationNormalized>(route, (newRoute) => {
      if (!store.getters.getDataLoaded) {
        const caseId = Number(newRoute.query.case) || store.getters.getCase as number;
        store.commit('setCase', caseId);
        if (isNaN(caseId) || caseId < MIN_CASE_ID || caseId > MAX_CASE_ID) {
          console.error("Invalid case ID. Case ID must be between 1 and 3.");
          return;
        }
        fetchData(caseId);
      }
    });
  },
});
</script>


<style lang="scss" scoped>
.home {
  min-width: 320px;
  max-width: 562px;
  height: 80svh;

  background-color: $black-color;
  outline: 1px solid $grey-color;

  display: flex;
  flex-direction: column;

  &__main {
    flex-grow: 1;
    padding-top: 5px;
  }
}
</style>