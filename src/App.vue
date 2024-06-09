<template>
  <main class="home">
    <NavMain />
    <router-view />
  </main>
</template>

<script>
import NavMain from "@/components/NavMain";

export default {
  components: {
    NavMain,
  },
  setup() {},
};
</script>

<style lang="scss" scoped>
.home {
  width: 562px;
	height: 200px;

	background-color: $black-color;
  outline: 1px solid $grey-color;
}
</style>