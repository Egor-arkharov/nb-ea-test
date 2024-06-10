import { createStore, createLogger } from "vuex";
import axios from 'axios';

const plugins = [];

if (process.env.NODE_ENV === "development") {
	plugins.push(createLogger());
}

export default createStore({
  state: {
    data: null, 
  },
  getters: {
    getData(state) {
      return state.data;
    }
  },
  mutations: {
    setInventory(state, inventory) {
      state.data = inventory;
    }
  },
  actions: {
    async loadData({ commit }, payload) {
      const API_BASE_URL = 'https://us-central1-seven-seven-bit-inhouse-helper.cloudfunctions.net/vueDevTestTask-getInventoryState';


      try {
        const response = await axios.get(`${API_BASE_URL}?case=${payload}`);
        const inventory = response.data.inventory;

        console.log('store', inventory);

        commit('setInventory', inventory); 

        return inventory;
      } catch (error) {
        console.log('ERROR', error);
        throw error;
      }
		},
  },
  modules: {},
});
