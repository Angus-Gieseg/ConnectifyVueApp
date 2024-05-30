// src/store/store.js
import { createStore } from "vuex";
import { auth } from "../firebase"; // Ensure this is your firebase config file
import { onAuthStateChanged } from "firebase/auth";

const store = createStore({
  state: {
    user: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    fetchUser({ commit }) {
      onAuthStateChanged(auth, (user) => {
        commit("setUser", user || null);
      });
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
    user: (state) => state.user,
  },
});

export default store;
