// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../views/LandingPage.vue";
import LoginPage from "../views/Login.vue"; // Import the login component
import JoinPage from "../views/JoinPage.vue"; // Placeholder for the join page
import SignUpPage from "../views/SignUpPage.vue";
import ProductPackages from "../views/ProductPackages.vue";

const routes = [
  {
    path: "/",
    name: "LandingPage",
    component: LandingPage,
  },
  {
    path: "/join",
    name: "JoinPage",
    component: JoinPage, // This component needs to be created
  },
  {
    path: "/login",
    name: "LoginPage",
    component: LoginPage,
  },
  {
    path: "/signup",
    name: "SignUpPage",
    component: SignUpPage,
  },
  {
    path: "/ProductPackages",
    name: "ProductPackages",
    component: ProductPackages,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
