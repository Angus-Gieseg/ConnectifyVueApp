<template>
  <div class="create-event-page">
    <h2>Create Event</h2>
    <form @submit.prevent="createEvent">
      <div>
        <label>Event Name:</label>
        <input v-model="eventName" type="text" required />
      </div>
      <div>
        <label>product_package UID:</label>
        <select v-model="packageUid" required>
          <option
            v-for="product_package in ownedPackages"
            :key="product_package.id"
            :value="product_package.id"
          >
            {{ product_package.name }}
          </option>
        </select>
      </div>
      <div>
        <label>Event Date:</label>
        <input v-model="eventDate" type="date" required />
      </div>
      <div>
        <label>Email Invites:</label>
        <div
          v-for="(email, index) in emailInvites"
          :key="index"
          class="email-input"
        >
          <input v-model="emailInvites[index]" type="email" />
          <button type="button" @click="removeEmailInvite(index)">
            Remove
          </button>
        </div>
        <button type="button" @click="addEmailInvite">Add Email Invite</button>
      </div>
      <button type="submit">Create Event</button>
      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="success" class="success">{{ success }}</p>
    </form>
  </div>
</template>

<script>
import { db, auth } from "../firebase"; // Import auth from firebase.js
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default {
  name: "CreateEventPage",
  data() {
    return {
      eventName: "",
      ownerUid: "",
      packageUid: "",
      eventDate: "",
      emailInvites: [""],
      ownedPackages: [
        // Fetch these from the database or hardcode for now
        { id: "package1", name: "product_package 1" },
        { id: "package2", name: "product_package 2" },
      ],
      error: "",
      success: "",
    };
  },
  created() {
    // Check for the current user on component creation
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.ownerUid = user.uid;
      } else {
        this.error = "No user is logged in.";
      }
    });
  },
  methods: {
    addEmailInvite() {
      this.emailInvites.push("");
    },
    removeEmailInvite(index) {
      this.emailInvites.splice(index, 1);
    },
    async createEvent() {
      try {
        const docRef = await addDoc(collection(db, "events"), {
          event_name: this.eventName,
          owner_uid: this.ownerUid,
          package_uid: this.packageUid,
          event_date: this.eventDate,
          unique_signup_url: "", // Placeholder, will update this later
          email_invites: this.emailInvites,
          rsvped_users: [],
          created_date: serverTimestamp(),
          status: "pending",
        });

        const uniqueSignupUrl = `/events/${docRef.id}`;
        await updateDoc(doc(db, "events", docRef.id), {
          unique_signup_url: uniqueSignupUrl,
        });

        this.success = "Event created successfully!";
        this.error = "";
      } catch (error) {
        console.error("Error creating event:", error);
        this.error = error.message;
        this.success = "";
      }
    },
  },
};
</script>

<style scoped>
.create-event-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 4px;
}

form > div {
  margin-bottom: 10px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input,
select,
textarea {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

button {
  padding: 10px 15px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #0056b3;
}

.error {
  color: red;
}

.success {
  color: green;
}

.email-input {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.email-input button {
  background: #ff0000;
}

.email-input button:hover {
  background: #cc0000;
}
</style>
