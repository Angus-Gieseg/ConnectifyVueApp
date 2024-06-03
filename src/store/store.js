// src/store/store.js
import { createStore } from "vuex";
import { auth, db } from "../firebase"; // Ensure this is your firebase config file
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const store = createStore({
  state: {
    user: null,
    userDetails: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setUserDetails(state, userDetails) {
      state.userDetails = userDetails;
    },
  },
  actions: {
    async fetchUser({ commit }, user) {
      commit("setUser", user);
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          commit("setUserDetails", userDoc.data());
        } else {
          // If the user document does not exist, create it
          await db.collection("users").doc(user.uid).set({
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          });
          commit("setUserDetails", {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          });
        }
      } else {
        commit("setUserDetails", null);
      }
    },
    fetchAuthUser({ commit }) {
      onAuthStateChanged(auth, async (user) => {
        commit("setUser", user);
        if (user) {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            commit("setUserDetails", userDoc.data());
          }
        }
      });
    },
    async signOut({ commit }) {
      await auth.signOut();
      commit("setUser", null);
      commit("setUserDetails", null);
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
    user: (state) => state.user,
    userDetails: (state) => state.userDetails,
  },
});

export default store;
