<template>
  <div class="signup-page">
    <div class="signup-container">
      <h2>Sign Up for Murder Mystery Nights</h2>
      <form @submit.prevent="signUp">
        <div class="input-group">
          <label for="email">Email</label>
          <input v-model="email" type="email" id="email" required />
        </div>
        <div class="input-group">
          <label for="password">Password</label>
          <input v-model="password" type="password" id="password" required />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p-button
        label="Sign Up with Google"
        icon="pi pi-google"
        class="p-button-danger"
        @click="googleSignUp"
      />
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import Button from "primevue/button";

export default {
  name: "SignUpPage",
  components: {
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
    async signUp() {
      const auth = getAuth();
      try {
        await createUserWithEmailAndPassword(auth, this.email, this.password);
        this.$router.push("/ProductPackages"); // Redirect to Packages page on successful sign-up
      } catch (error) {
        this.error = error.message;
      }
    },
    async googleSignUp() {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      try {
        await signInWithPopup(auth, provider);
        this.$router.push("/ProductPackages"); // Redirect to Packages page on successful sign-up
      } catch (error) {
        this.error = error.message;
      }
    },
  },
};
</script>

<style scoped>
.signup-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
}

.signup-container {
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

.error {
  color: red;
  margin-top: 1rem;
}
</style>
