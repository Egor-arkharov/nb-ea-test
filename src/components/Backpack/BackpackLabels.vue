<template>
  <div class="labels">
    <p class="labels__title">
      {{ selectedFilter }}
    </p>
    <p class="labels__count">
      {{ filteredItemCount }}/{{ totalItemCount }}
    </p>
  </div>
</template>

<script>
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const data = ref(store.getters.getData || []);
    const selectedFilter = computed(() => store.getters.getFilter);

    watch(
      () => store.getters.getData,
      (newValue) => {
        data.value = newValue;
      }
    );

    const filteredItemCount = computed(() => data.value.filter(item => selectedFilter.value === 'all' ? item : item.type === selectedFilter.value).length);
    const totalItemCount = computed(() => data.value.length);

    watch(() => store.getters.getData, (newValue) => {
      data.value = newValue;
    });

    return { 
      filteredItemCount, 
      totalItemCount,
      selectedFilter 
    };
  }
};
</script>

<style lang="scss" scoped>
.labels {
	display: flex;
	justify-content: space-between;
	color: $white-color;

	padding: 10px 0;
	padding-right: 10px;

	&__title {
		font-size: 20px;
		text-transform: uppercase;
    font-weight: 600;
	}

	&__count {
		font-size: 18px;
	}
}
</style>