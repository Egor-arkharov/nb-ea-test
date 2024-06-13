import { createStore, createLogger } from 'vuex';
import { Commit } from 'vuex'; // Подключение типа Commit из Vuex
import axios from 'axios';

interface Item {
  id: number;
  type: string;
  imageUrl: string;
  name: string;
  charges?: number;
  maxCharges?: number;
  count?: number;
  cooldown?: number;
  remainingCooldown?: number;
  cooldownActive?: boolean;
}

interface State {
  data: Item[];
  filter: string;
  caseId: number;
  dataLoaded: boolean;
}

const plugins = [];

if (process.env.NODE_ENV === 'development') {
  plugins.push(createLogger());
}

const state: State = {
  data: [],
  filter: 'all',
  caseId: 1,
  dataLoaded: false,
};

const getters = {
  getData: (state: State) => state.data,
  getFilter: (state: State) => state.filter,
  getCase: (state: State) => state.caseId,
  getDataLoaded: (state: State) => state.dataLoaded,
};

const mutations = {
  setInventory(state: State, inventory: Item[]) {
    state.data = inventory;
    state.dataLoaded = true;
  },
  setFilter(state: State, filter: string) {
    state.filter = filter;
  },
  setCase(state: State, caseId: number) {
    state.caseId = caseId;
  },
  setCooldown(state: State, updatedItem: Item) {
    const item = state.data.find(item => item.id === updatedItem.id);

    if (item) {
      item.remainingCooldown = updatedItem.remainingCooldown;
      item.cooldownActive = updatedItem.cooldownActive;
    }
  },
  decrementCooldown(state: State, itemId: number) {
    const item = state.data.find(item => item.id === itemId);
    if (item && item.remainingCooldown) {
      if (item.remainingCooldown > 0) {
        item.remainingCooldown--;
      } else {
        item.cooldownActive = false;
      }
    }
  },
};

const actions = {
  async loadData({ commit }: { commit: Commit }, payload: number) {
    const API_BASE_URL = 'https://us-central1-seven-seven-bit-inhouse-helper.cloudfunctions.net/vueDevTestTask-getInventoryState';

    try {
      const response = await axios.get(`${API_BASE_URL}?case=${payload}`);
      const inventory: Item[] = response.data.inventory;

      commit('setInventory', inventory);

      return inventory;
    } catch (error) {
      console.log('ERROR', error);
      throw error;
    }
  },
  startCooldownTimer({ commit }: { commit: Commit }, itemId: number) {
    const timer = setInterval(() => {
      commit('decrementCooldown', itemId);
      const item = state.data.find(item => item.id === itemId);
      if (!item?.cooldownActive) {
        clearInterval(timer);
      }
    }, 1000);
  }
};

export default createStore({
  state,
  getters,
  mutations,
  actions,
  plugins,
});
