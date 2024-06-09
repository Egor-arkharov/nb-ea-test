<template>
  <main class="home">
    <NavMain />
    <div class="home__main">
      <router-view />
    </div>
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