// src/store/store.js
import { createStore } from "vuex";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const store = createStore({
  state: {
    user: null,
    userDetails: null,
    userType: null, // 'client' or 'practitioner'
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setUserDetails(state, userDetails) {
      state.userDetails = userDetails;
    },
    setUserType(state, userType) {
      state.userType = userType;
    },
  },
  actions: {
    async fetchUser({ commit }, user) {
      commit("setUser", user);
      if (user) {
        console.log("Fetching user details for:", user.uid);
        try {
          // Check client collection
          console.log("Checking clients collection...");
          let userDoc = await getDoc(doc(db, "clients", user.uid));
          if (userDoc.exists()) {
            console.log("Client found:", userDoc.data());
            commit("setUserDetails", userDoc.data());
            commit("setUserType", "client");
            return;
          } else {
            console.log("User not found in clients collection");
          }

          // Check practitioners_users collection
          console.log("Checking practitioner_users collection...");
          userDoc = await getDoc(doc(db, "practitioner_users", user.uid));
          if (userDoc.exists()) {
            console.log("Practitioner found:", userDoc.data());
            commit("setUserDetails", userDoc.data());
            commit("setUserType", "practitioner");
            return;
          } else {
            console.log("User not found in practitioner_users collection");
          }

          console.log("User not found in any collection");
          commit("setUserDetails", null);
          commit("setUserType", null);
        } catch (error) {
          console.error("Error fetching user details:", error);
          commit("setUserDetails", null);
          commit("setUserType", null);
        }
      } else {
        console.log("No user provided to fetchUser action");
        commit("setUserDetails", null);
        commit("setUserType", null);
      }
    },
    fetchAuthUser({ dispatch }) {
      console.log("Setting up auth state listener");
      onAuthStateChanged(auth, (user) => {
        console.log("Auth state changed:", user ? user.uid : "No user");
        dispatch("fetchUser", user);
      });
    },
    async signOut({ commit }) {
      try {
        await auth.signOut();
        console.log("User signed out successfully");
        commit("setUser", null);
        commit("setUserDetails", null);
        commit("setUserType", null);
      } catch (error) {
        console.error("Error signing out:", error);
      }
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
    user: (state) => state.user,
    userDetails: (state) => state.userDetails,
    userType: (state) => state.userType,
    isPractitioner: (state) => {
      console.log("isPractitioner getter called, userType:", state.userType);
      return state.userType === "practitioner";
    },
  },
});

export default store;
