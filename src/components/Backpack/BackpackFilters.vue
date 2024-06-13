<template>
  <div class="filters">
    <ul class="filters__list">
      <li
        v-for="(item, idx) in filters"
        :key="idx"
        class="filters__item"
      >
        <button
          :class="['filters__btn', `filter__${item.name}`, { 'active': selectedFilter === item.name }]"
          :title="item.name.charAt(0).toUpperCase() + item.name.slice(1)"
          @click.prevent="selectFilter(item.name)"
        >
          {{ item.name }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";

export default {
emits: ['filter-selected'],
  setup(_, { emit }) {
		const store = useStore();
    const selectedFilter = computed(() => store.getters.getFilter);

    const filters = [
      { name: "all" },
      { name: "armor" },
      { name: "misc" },
      { name: "weapon" },
      { name: "trash" },
    ];

    const selectFilter = (filterName) => {
      store.commit('setFilter', filterName);
      emit('filter-selected', filterName);
    };

    return {
      filters,
      selectedFilter,
      selectFilter
    };
  },
};
</script>

<style lang="scss" scoped>
$filters: all, armor, misc, weapon, trash;

.filters {
	height: 100%;
	background-color: #393839;

	&__list {
		height: 100%;

		display: flex;
		flex-direction: column;
		gap: 25px;

		padding: 15px 0;
	}

	&__item {
		&:last-child {
			margin-top: auto;
		}
	}

	&__btn {
		font-size: 0;

    width: 100%;
    height: 35px;

		background-color: transparent;
		background-position: center;
		background-size: contain;
		background-repeat: no-repeat;

		opacity: 0.5;
		transition: opacity 0.2s ease-in-out;

		@each $filter in $filters {
			&.filter__#{$filter} {
				background-image: url('@/assets/icons/#{$filter}.svg'); // путь к изображениям

			}
		}

		@include hover {
			opacity: 1;
		}

		&.active {
			opacity: 1;
		}
	}
}
</style>
