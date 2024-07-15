<template>
  <div class="signup-page">
    <div class="signup-container" v-if="!additionalDetails">
      <h2>Sign Up</h2>
      <form @submit.prevent="signUp">
        <div class="input-group">
          <label for="first-name">First Name</label>
          <input v-model="firstName" type="text" id="first-name" required />
        </div>
        <div class="input-group">
          <label for="last-name">Last Name</label>
          <input v-model="lastName" type="text" id="last-name" required />
        </div>
        <div class="input-group">
          <label for="email">Email</label>
          <input v-model="email" type="email" id="email" required />
        </div>
        <div class="input-group">
          <label for="password">Password</label>
          <input v-model="password" type="password" id="password" required />
        </div>
        <div class="input-group">
          <label for="profile-picture">Profile Picture (Optional)</label>
          <input @change="onFileChange" type="file" id="profile-picture" />
        </div>
        <div class="input-group">
          <label for="role">Sign Up As</label>
          <select v-model="role" id="role" required>
            <option value="client">Client</option>
            <option value="practitioner">Practitioner</option>
          </select>
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

    <div class="signup-container" v-else>
      <h2>Complete Your Profile</h2>
      <form @submit.prevent="completeProfile">
        <div class="input-group">
          <label for="first-name">First Name</label>
          <input v-model="firstName" type="text" id="first-name" required />
        </div>
        <div class="input-group">
          <label for="last-name">Last Name</label>
          <input v-model="lastName" type="text" id="last-name" required />
        </div>
        <div class="input-group">
          <label for="profile-picture">Profile Picture (Optional)</label>
          <input @change="onFileChange" type="file" id="profile-picture" />
        </div>
        <div class="input-group">
          <label for="role">Sign Up As</label>
          <select v-model="role" id="role" required>
            <option value="client">Client</option>
            <option value="practitioner">Practitioner</option>
          </select>
        </div>
        <button type="submit">Complete Profile</button>
      </form>
      <p v-if="error" class="error">{{ error }}</p>
    </div>

    <div v-if="loading" class="loading-spinner">
      <p-progress-spinner />
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
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";
import Button from "primevue/button";
import ProgressSpinner from "primevue/progressspinner";
import { storage, db } from "../firebase"; // Ensure you have initialized Firebase storage and Firestore

export default {
  name: "SignUpPage",
  components: {
    "p-button": Button,
    "p-progress-spinner": ProgressSpinner,
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      profilePicture: null,
      role: "client",
      error: "",
      additionalDetails: false,
      user: null,
      loading: false,
    };
  },
  methods: {
    onFileChange(event) {
      this.profilePicture = event.target.files[0];
    },
    async signUp() {
      const auth = getAuth();
      try {
        this.loading = true;
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );
        this.user = userCredential.user;
        this.additionalDetails = true;
        this.loading = false;
      } catch (error) {
        this.error = error.message;
        this.loading = false;
      }
    },
    async googleSignUp() {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      try {
        this.loading = true;
        const result = await signInWithPopup(auth, provider);
        this.user = result.user;
        this.additionalDetails = true;
        this.loading = false;
      } catch (error) {
        this.error = error.message;
        this.loading = false;
      }
    },
    async completeProfile() {
      if (this.user) {
        try {
          this.loading = true;
          await this.saveProfile(this.user);
          this.$router.push("/"); // Redirect to Packages page on successful profile completion
        } catch (error) {
          this.error = error.message;
          this.loading = false;
        }
      }
    },
    async saveProfile(user) {
      // Upload profile picture if provided
      let profilePictureUrl = "";
      if (this.profilePicture) {
        const storageRef = ref(storage, `profile_pictures/${user.uid}`);
        await uploadBytes(storageRef, this.profilePicture);
        profilePictureUrl = await getDownloadURL(storageRef);
      }

      // Determine the collection to save the user data
      const collection =
        this.role === "practitioner" ? "practitioner_users" : "clients";

      // Save additional user data to Firestore
      await setDoc(doc(db, collection, user.uid), {
        uid: user.uid,
        firstName: this.firstName,
        lastName: this.lastName,
        email: user.email,
        role: this.role,
        profilePictureUrl,
      });
      this.loading = false;
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

.input-group input,
.input-group select {
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

.loading-spinner {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
