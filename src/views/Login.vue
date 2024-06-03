<template>
  <div class="login-page">
    <div class="login-container">
      <h2>Login to Murder Mystery Nights</h2>
      <div class="input-group">
        <label for="email">Email</label>
        <p-inputtext v-model="email" id="email" placeholder="Email" />
      </div>
      <div class="input-group">
        <label for="password">Password</label>
        <p-password
          v-model="password"
          id="password"
          placeholder="Password"
          toggleMask
        />
      </div>
      <p-button
        label="Login"
        icon="pi pi-sign-in"
        @click="login"
        :disabled="loading"
      />
      <p-button
        label="Login with Google"
        icon="pi pi-google"
        class="p-button-danger"
        @click="googleLogin"
        :disabled="loading"
      />
      <router-link to="/signup" class="signup-link"
        >Don't have an account? Sign Up</router-link
      >
      <p v-if="error" class="error">{{ error }}</p>
      <p-progress-spinner v-if="loading"></p-progress-spinner>
    </div>
  </div>
</template>

<script>
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";
import ProgressSpinner from "primevue/progressspinner";
import { auth } from "../firebase"; // Ensure Firebase is initialized
import { mapActions } from "vuex";

export default {
  name: "LoginPage",
  components: {
    "p-inputtext": InputText,
    "p-password": Password,
    "p-button": Button,
    "p-progress-spinner": ProgressSpinner,
  },
  data() {
    return {
      email: "",
      password: "",
      error: "",
      loading: false,
    };
  },
  methods: {
    ...mapActions(["fetchUser"]),
    async login() {
      this.loading = true;
      this.error = "";
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );
        await this.fetchUser(userCredential.user); // Update store with user info
        this.$router.push("/");
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
    async googleLogin() {
      this.loading = true;
      this.error = "";
      const provider = new GoogleAuthProvider();
      try {
        const result = await signInWithPopup(auth, provider);
        await this.fetchUser(result.user); // Update store with user info
        this.$router.push("/");
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
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

.login-container {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 300px;
}

h2 {
  margin-bottom: 1.5rem;
}

.input-group {
  margin-bottom: 1rem;
  text-align: left;
}

.input-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
}

.input-group input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
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

.p-progress-spinner {
  margin-top: 1rem;
}
</style>
