<template>
  <nav class="nav">
    <ul class="nav__list">
      <li class="nav__item">
        <router-link
          to="/"
          class="nav__link"
        >
          Backpack
        </router-link>
      </li>
      <li class="nav__item">
        <router-link
          to="/nexus"
          class="nav__link"
        >
          Nexus
        </router-link>
      </li>
    </ul>
    <button class="nav__close-btn" />
  </nav>
</template>

<style lang="scss" scoped>
.nav {
	width: 100%;
	height: var(--nav-h);
	display: flex;

	&__list {
		display: flex;
		flex-grow: 1;
		gap: 5px;
	}

	&__item {
		display: flex;
		justify-content: center;
		align-items: center;

		width: 50%;
	}

	&__link {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;

		margin: 0;
		padding: 10px 20px;

		font-size: 24px;
		line-height: 1;

		color: $white-color;
		text-transform: uppercase;
		background-color: #393839;
		transition: all 0.2s ease-in-out;

		@include hover {
			background-color: darken(#393839, 5%);
		}

		&.active {
			background-color: #242223;
		}
	}

	&__close-btn {
		width: 56px;
		height: 100%;

		margin-left: 5px;

		background-color: #242223;
		border: none;
		outline: none;

		position: relative;

		transition: all 0.2s ease-in-out;

		@include hover {
			background-color: lighten(#242223, 5%);
		}


		&::before {
			content: "";
			position: absolute;

			width: 28px;
			height: 28px;

			top: 50%;
			left: 50%;
			translate: -50% -50%;

			background-image: url("data:image/svg+xml,%3Csvg width='28' height='28' viewBox='0 0 28 28' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M28 4.66632L23.3333 0L13.999 9.33372L4.66665 0.00207944L0 4.6684L9.33231 14L8.59905e-05 23.3316L4.66674 27.9979L13.999 18.6664L23.3333 28L27.9999 23.3337L18.6656 14L28 4.66632Z' fill='white' fill-opacity='0.5'/%3E%3C/svg%3E%0A");

			background-size: contain;
			background-repeat: no-repeat;
			background-position: center;
		}
	}
}
</style>
