<template>
  <div class="labels">
    <p class="labels__title">
      {{ selectedFilter === 'all' ? 'All items' : selectedFilter }}
    </p>
    <p class="labels__count">
      11/100
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    selectedFilter: {
      type: String,
      required: true,
    },
  },
});
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
	}

	&__count {
		font-size: 18px;
	}
}
</style>