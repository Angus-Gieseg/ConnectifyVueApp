// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase"; // Make sure to import your Firebase configuration

import LandingPage from "../views/LandingPage.vue";
import LoginPage from "../views/Login.vue";
import JoinPage from "../views/JoinPage.vue";
import SignUpPage from "../views/SignUpPage.vue";
import ProductPackages from "../views/ProductPackages.vue";
import Profilepage from "../views/Profilepage.vue";
import PTSignUpPage from "../views/PTSignUpPage.vue";
import PractitionersProfile from "../views/PractitionersProfile.vue";
import FormBuilder from "../views/FormBuilder.vue";
import PractitionerProfilepage from "../views/PractitionerProfilepage.vue";

const routes = [
  {
    path: "/",
    name: "LandingPage",
    component: LandingPage,
  },
  {
    path: "/join",
    name: "JoinPage",
    component: JoinPage,
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
    meta: { requiresAuth: true },
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
  {
    path: "/create_feedback_form",
    name: "FormBuilder",
    component: FormBuilder,
  },
  {
    path: "/practitioner-profile/:id",
    name: "PractitionerProfilepage",
    component: PractitionerProfilepage,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const auth = getAuth();
  const user = auth.currentUser;

  if (requiresAuth && !user) {
    next("/login");
  } else if (
    user &&
    (to.name === "Profile" || to.name === "PractitionerProfile")
  ) {
    try {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userData = userDoc.data();

      if (userData) {
        if (
          userData.role === "practitioner" &&
          to.name !== "PractitionerProfile"
        ) {
          next({ name: "PractitionerProfile", params: { id: user.uid } });
        } else if (userData.role !== "practitioner" && to.name !== "Profile") {
          next({ name: "Profile", params: { id: user.uid } });
        } else {
          next();
        }
      } else {
        console.error("User data not found");
        next("/login");
      }
    } catch (error) {
      console.error("Error checking user role:", error);
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
