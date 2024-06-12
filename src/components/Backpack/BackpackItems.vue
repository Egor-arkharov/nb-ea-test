<template>
  <div class="items">
    <div
      v-if="isLoading"
      class="loader"
    >
      Loading...
    </div>
    <ul
      v-else
      class="items__list"
    >
      <li
        v-for="(item, index) in filteredData"
        :key="index"
        class="items__item"
        :class="{
          'item--weapon': item.type === 'weapon',
          'item--armor': item.type === 'armor',
          'item--cooldown': item.cooldownActive,
          'item--cooldown-end':
            !item.cooldownActive && item.cooldown !== undefined,
        }"
        :data-item-id="item.id"
      >
        <div class="item__inner">
          <img
            class="item__img"
            :src="item.imageUrl"
            :alt="item.name"
          >
          <div v-if="item.charges && item.maxCharges">
            <p class="item__charges">
              <span class="item__charges-rest">{{ item.charges }}</span>/<span class="item__charges-max">{{ item.maxCharges }}</span>
            </p>
          </div>
          <p
            v-if="item.count"
            class="item__count"
          >
            x{{ item.count }}
          </p>
        </div>
        <p
          v-if="item.cooldownActive"
          class="item__cooldown"
        >
          <span>{{ item.remainingCooldown }}s</span>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import { nextTick, ref, computed, watch } from "vue";
import { useStore } from "vuex";

import tippy, { followCursor } from "tippy.js";
import "tippy.js/dist/tippy.css";

export default {
  setup() {
    const store = useStore();
    const data = computed(() => store.getters.getData);
    const selectedFilter = computed(() => store.getters.getFilter);
    const isLoading = ref(true);


    watch(data, () => {
      if (isLoading.value) {
        console.log("hi??")

        isLoading.value = false;
        initializeCooldowns();

        nextTick(() => {
          initializeTippy();
        });
      }
    });


    const customTippyConfig = {
      arrow: false,
      followCursor: true,
    };

    const initializeTippy = () => {
      tippy(".items__item", {
        content(reference) {
          const itemId = reference.dataset.itemId;
          const item = data.value.find((item) => item.id === itemId);
          return item ? item.name : "";
        },
        ...customTippyConfig,
        plugins: [followCursor],
      });
    };

    const initializeCooldowns = () => {
      data.value.forEach((item) => {
        if (item.cooldown) {
          item.remainingCooldown = getCooldownInSeconds(item.cooldown);
          item.cooldownActive = true;
          startCooldownTimer(item);
        } else {
          item.cooldownActive = false;
        }
      });
    };

    const getCooldownInSeconds = (timestamp) => {
      const now = Date.now();
      const remainingTime = Math.abs(timestamp - now);
      return Math.floor(remainingTime / 1000);
    };

    const startCooldownTimer = (item) => {
      const timer = setInterval(() => {
        if (item.remainingCooldown > 0) {
          item.remainingCooldown--;
        } else {
          item.cooldownActive = false;
          clearInterval(timer);
          item.cooldownEnded = true;
        }
      }, 1000);
    };

    const filteredData = computed(() =>
      data.value.filter((item) =>
        selectedFilter.value === "all"
          ? item
          : item.type === selectedFilter.value
      )
    );

    return {
      filteredData,
      isLoading,
    };
  },
};
</script>

<style lang="scss" scoped>
.items {
  --size: 85px;

  overflow: auto;
  max-height: 100%;

  @supports selector(::-webkit-scrollbar) {
    &::-webkit-scrollbar {
      width: 4px;
      border-radius: 10px;
      background-color: #454545;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: $white-color;

      @include hover {
        background-color: rgba($white-color, 0.6);
      }
    }
  }

  @supports not selector(::-webkit-scrollbar) {
    scrollbar-width: thin;
    scrollbar-color: $white-color #454545;
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(5, var(--size));
    grid-auto-rows: var(--size);
    gap: 0;
  }

  &__item {
    width: var(--size);
    height: var(--size);

    padding: 7px;

    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;

    color: $white-color;
    border: 1px solid #454545;

    background-color: #1a1a1a;
  }
}

.item {
  p {
    font-size: 17px;
    line-height: 1;
    font-weight: 500;
  }

  &__inner {
    display: flex;
    transition: opacity 0.3s ease-in-out;
  }

  &__charges {
    position: absolute;

    top: 2px;
    left: 2px;
  }

  &__count {
    position: absolute;

    bottom: 2px;
    right: 2px;
  }

  &__cooldown {
    position: absolute;

    top: 60%;
    left: 50%;
    translate: -50% 0;

    &::before {
      content: "";
      position: absolute;

      top: -32px;
      left: 50%;
      translate: -50% 0;
      width: 28px;
      height: 27px;

      background-image: url("data:image/svg+xml,%3Csvg width='28' height='27' viewBox='0 0 28 27' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M14 0C6.26769 0 0 6.04385 0 13.5C0 20.9562 6.26769 27 14 27C21.7323 27 28 20.9562 28 13.5C28 6.04385 21.7323 0 14 0ZM8.45856 7.42111L15.5259 12.0293C15.9924 12.3533 16.3079 12.8413 16.4041 13.3879C16.5003 13.9345 16.3695 14.4956 16.04 14.9499C15.7105 15.4042 15.2088 15.7151 14.6434 15.8155C14.0779 15.9158 13.4943 15.7975 13.0187 15.4861C12.8097 15.344 12.6276 15.1683 12.4802 14.9668L7.70135 8.15192C7.62778 8.05031 7.59366 7.92697 7.60495 7.80352C7.61624 7.68007 7.67224 7.5644 7.76311 7.47677C7.85398 7.38914 7.97394 7.33515 8.10196 7.32426C8.22998 7.31337 8.35789 7.34628 8.46327 7.41721L8.45856 7.42111ZM14 24.9231C7.47115 24.9231 2.15385 19.7989 2.15385 13.5C2.1483 11.9636 2.46687 10.4423 3.0902 9.02836C3.71353 7.61446 4.62858 6.33758 5.77971 5.27538C5.86923 5.18932 5.97563 5.12131 6.09269 5.07531C6.20975 5.0293 6.33514 5.00623 6.46155 5.00744C6.58795 5.00864 6.71284 5.0341 6.82894 5.08233C6.94503 5.13056 7.05001 5.20059 7.13775 5.28834C7.22549 5.37609 7.29424 5.4798 7.33998 5.59344C7.38573 5.70707 7.40756 5.82835 7.40419 5.9502C7.40083 6.07206 7.37235 6.19205 7.3204 6.30317C7.26846 6.4143 7.19409 6.51435 7.10163 6.59748C6.13567 7.48902 5.3678 8.56066 4.84469 9.74726C4.32157 10.9339 4.05415 12.2106 4.05865 13.5C4.05865 18.7858 8.51846 23.0863 14 23.0863C19.4815 23.0863 23.9413 18.7858 23.9413 13.5C23.9413 8.52382 19.989 4.42125 14.9524 3.95913V7.52885C14.9524 7.77242 14.8521 8.00601 14.6735 8.17825C14.4948 8.35048 14.2526 8.44724 14 8.44724C13.7474 8.44724 13.5052 8.35048 13.3265 8.17825C13.1479 8.00601 13.0476 7.77242 13.0476 7.52885V2.99531C13.0476 2.75174 13.1479 2.51814 13.3265 2.34591C13.5052 2.17368 13.7474 2.07692 14 2.07692C20.5322 2.07692 25.8462 7.20433 25.8462 13.5C25.8462 19.7957 20.5322 24.9231 14 24.9231Z' fill='white'/%3E%3C/svg%3E%0A");
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
    }
  }

  &--armor {
    background: radial-gradient(circle, #367cce 0%, #1a1a1a 80%);
  }

  &--weapon {
    background: radial-gradient(circle, #7f59ce 0%, #1a1a1a 80%);
  }

  &--cooldown .item__inner {
    opacity: 0.3;
  }

  &--cooldown-end .item__inner {
    opacity: 1;
  }
}
</style>