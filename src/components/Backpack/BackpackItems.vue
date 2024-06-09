<template>
  <div class="items">
    <div
      v-for="n in 40"
      :key="n"
      class="items__item"
    >
      {{ n }}
    </div>
  </div>
</template>

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
	}
}
</style>