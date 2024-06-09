<template>
  <div class="labels">
    <p class="labels__title">
      All items
    </p>
    <p class="labels__count">
      11/100
    </p>
  </div>
</template>

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