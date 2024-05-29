<template>
  <div class="login-page">
    <div class="p-card login-card">
      <div class="p-card-title">Login to Murder Mystery Nights</div>
      <div class="p-card-content">
        <p-inputtext v-model="email" placeholder="Email" />
        <p-password v-model="password" placeholder="Password" toggleMask />
        <p-button label="Login" icon="pi pi-sign-in" @click="login" />
        <p-button
          label="Login with Google"
          icon="pi pi-google"
          class="p-button-danger"
          @click="googleLogin"
        />
        <router-link to="/signup" class="signup-link"
          >Don't have an account? Sign Up</router-link
        >
        <p v-if="error" class="error">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";

export default {
  name: "LoginPage",
  components: {
    "p-inputtext": InputText,
    "p-password": Password,
    "p-button": Button,
  },
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async login() {
      const auth = getAuth();
      try {
        await signInWithEmailAndPassword(auth, this.email, this.password);
        this.$router.push("/packages"); // Redirect to Packages page on successful login
      } catch (error) {
        this.error = error.message;
      }
    },
    async googleLogin() {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      try {
        await signInWithPopup(auth, provider);
        this.$router.push("/packages"); // Redirect to Packages page on successful login
      } catch (error) {
        this.error = error.message;
      }
    },
  },
};
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
}

.login-card {
  width: 300px;
  max-width: 90%;
  text-align: center;
}

.p-card-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.signup-link {
  display: block;
  margin-top: 1rem;
  color: #007bff;
  text-decoration: none;
}

.signup-link:hover {
  text-decoration: underline;
}

.error {
  color: red;
  margin-top: 1rem;
}
</style>
