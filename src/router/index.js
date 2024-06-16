// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../views/LandingPage.vue";
import LoginPage from "../views/Login.vue"; // Import the login component
import JoinPage from "../views/JoinPage.vue"; // Placeholder for the join page
import SignUpPage from "../views/SignUpPage.vue";
import ProductPackages from "../views/ProductPackages.vue";
import Profilepage from "../views/Profilepage.vue";
import PTSignUpPage from "../views/PTSignUpPage.vue";
import PractitionersProfile from "../views/PractitionersProfile.vue";

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
    path: "/myprofile/:id",
    name: "Profilepage",
    component: Profilepage,
  },
  {
    path: "/practitioner/:practitioner_id",
    name: "practitioner",
    component: PractitionersProfile,
  },
  {
    path: "/practitioner/:practitioner_id/edit",
    name: "EditProfile",
    component: PTSignUpPage,
  },
  {
    path: "/pt_sign_up",
    name: "signupPT",
    component: PTSignUpPage,
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
