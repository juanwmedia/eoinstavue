import Vue from 'vue';
import Vuex from 'vuex';
import firebase from './firebase.js';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    entries: null,
    user: null,
    userProfile: {},
  },
  mutations: {
    loadEntries(state, val) {
      state.entries = val;
    },
    saveUser(state, val) {
      state.user = val;
    },
    saveUserProfile(state, val) {
      state.userProfile = val;
    }
  },
  actions: {
    getUserProfile({ commit, sate }) {

    }
  }
})

export default store;