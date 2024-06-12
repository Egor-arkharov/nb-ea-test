import { createStore, createLogger } from "vuex";
import axios from 'axios';

const plugins = [];

if (process.env.NODE_ENV === "development") {
	plugins.push(createLogger());
}

export default createStore({
  state: {
    data: null, 
    filter: 'all',
    caseId: 1,
    loading: true
  },
  getters: {
    getData(state) {
      return state.data;
    },
    getFilter(state) {
      return state.filter;
    },
    getCase(state) {
      return state.caseId;
    },
    getLoading(state) {
      return state.loading;
    },
  },
  mutations: {
    setInventory(state, inventory) {
      state.data = inventory;
    },
    setFilter(state, filter) {
      state.filter = filter;
    },
    setCase(state, caseId) {
      state.caseId = caseId;
    },
    setLoading(state, boolean) {
      state.loading = boolean;
    },
  },
  actions: {
    async loadData({ commit }, payload) {
      const API_BASE_URL = 'https://us-central1-seven-seven-bit-inhouse-helper.cloudfunctions.net/vueDevTestTask-getInventoryState';


      try {
        const response = await axios.get(`${API_BASE_URL}?case=${payload}`);
        const inventory = response.data.inventory;

        // console.log('store', inventory);

        commit('setInventory', inventory); 
        commit('setLoading', false); 

        return inventory;
      } catch (error) {
        console.log('ERROR', error);
        commit('setLoading', true); 
        throw error;
      }
		},
  },
  modules: {},
});
