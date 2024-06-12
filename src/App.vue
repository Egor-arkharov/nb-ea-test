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

<script>
import { watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import NavMain from "@/components/NavMain";
import { MIN_CASE_ID, MAX_CASE_ID } from "@/use/utils";

export default {
  components: {
    NavMain,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const fetchData = async (caseId) => {
      try {
        await store.dispatch("loadData", caseId);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    watch(route, (newRoute) => {
      const caseId = newRoute.query.case || 1;
      store.commit('setCase', caseId);
      if (caseId < MIN_CASE_ID || caseId > MAX_CASE_ID) {
        console.error("Invalid case ID. Case ID must be 3 or less.");
        return;
      }
      fetchData(caseId);
    });
  },
};
</script>

<style lang="scss" scoped>
.home {
  width: 562px;
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