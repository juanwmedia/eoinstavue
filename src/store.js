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
    getUserProfile({ commit, state }) {
      firebase.usersCollection.doc(state.user.uid).get().then(res => {
        commit('saveUserProfile', res.data());
      }).catch(error => console.error(error.message));
    },
    cleanUser({ commit }) {
      commit('saveUser', null);
      commit('saveUserProfile', {});
    }
  }
})

export default store;