<template>
  <div class="items">
    <div
      v-for="n in 10"
      :key="n"
      class="items__item"
    >
      {{ n }}
    </div>
    <div class="items__item items__item--armor">
      <img
        class="items__img"
        src="https://firebasestorage.googleapis.com/v0/b/seven-seven-bit-inhouse-helper.appspot.com/o/energy_potion.png?alt=media"
        alt=""
      >
    </div>
    <div class="items__item items__item--weapon">
      <img
        class="items__img"
        src="https://firebasestorage.googleapis.com/v0/b/seven-seven-bit-inhouse-helper.appspot.com/o/energy_potion.png?alt=media"
        alt=""
      >
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { onMounted, onUpdated } from "vue";
import { useStore } from "vuex";

export default {
	props: {
    selectedFilter: {
      type: String,
      required: true,
    },
  },
  setup(props) {
		const data = ref();
    const store = useStore();

    onMounted(async () => {
      await store.dispatch("loadData", 1);
      data.value = store.getters.getData;
      console.log('items', data.value);
    });

		onUpdated(() => {
			console.log('items', props.selectedFilter)
		});

    return {
      data,
    };
  },
};
</script>

<style lang="scss" scoped>
.items {
	display: grid;
	grid-template-columns: repeat(5, 65px);
	grid-auto-rows: 65px;
	gap: 0;

	padding: 0 15px 15px 0;

	&__item {
		width: 65px;
		height: 65px;

		display: flex;
		justify-content: center;
		align-items: center;

		color: white;
		border: 1px solid red;

		background-color: #1A1A1A;

		&--armor {
			background: radial-gradient(circle, #367CCE 0%, #1A1A1A 80%);
		}

		&--weapon {
			background: radial-gradient(circle, #7F59CE 0%, #1A1A1A 80%);
		}
	}
}
</style>