<template>
  <div class="profile-page" v-if="user">
    <div class="profile-content">
      <div class="profile-container">
        <img
          :src="user.profilePictureUrl"
          alt="Profile Picture"
          class="profile-picture"
        />
        <h2>{{ user.firstName }} {{ user.lastName }}</h2>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Role:</strong> {{ user.role }}</p>
        <div class="button-group">
          <button @click="connectWithPractitioner">
            Connect with Practitioner
          </button>
          <button @click="setLocalGym">Set Local Gym</button>
        </div>
      </div>

      <i v-if="practitioner" class="pi pi-link link-icon"></i>

      <div class="practitioner-card" v-if="practitioner">
        <h3>Practitioner Details</h3>
        <img
          :src="practitioner.personal_trainer.profile_picture"
          alt="Profile Picture"
          class="profile-picture"
        />
        <p>
          <strong>Name:</strong> {{ practitioner.personal_trainer.first_name }}
          {{ practitioner.last_name }}
        </p>
        <p>
          <strong>Gym:</strong>
          {{ practitioner.personal_trainer.gym_affiliation }}
        </p>
        <p>
          <strong>Address:</strong>
          {{
            practitioner.gym_place_of_work.place_of_work_address.full_address
          }}
        </p>
        <div class="button-group">
          <button @click="addFeedback">Add Feedback</button>
          <button @click="viewPlan">View Plan</button>
        </div>
      </div>

      <div class="practitioner-card empty" v-else>
        <div class="empty-card">
          <i class="pi pi-plus-circle"></i>
          <p>Connect with Practitioner</p>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Loading user details...</p>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  doc,
  getDoc,
  query,
  where,
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase"; // Ensure you have initialized Firebase Firestore

export default {
  name: "ProfilePage",
  data() {
    return {
      user: null,
      practitioner: null,
      error: "",
    };
  },
  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, "clients", currentUser.uid));
          if (userDoc.exists()) {
            this.user = userDoc.data();
            if (this.user.practitioner_id) {
              await this.fetchPractitionerDetails(this.user.practitioner_id);
            }
          } else {
            const practitionerDoc = await getDoc(
              doc(db, "practitioner_users", currentUser.uid)
            );
            if (practitionerDoc.exists()) {
              this.user = practitionerDoc.data();
            } else {
              this.error =
                "User not found in either clients or practitioner_users collections.";
            }
          }
        } catch (error) {
          this.error = "Error fetching user data: " + error.message;
        }
      } else {
        this.error = "No user is currently signed in.";
      }
    });
  },
  methods: {
    async fetchPractitionerDetails(practitionerId) {
      try {
        const q = query(
          collection(db, "personal_trainers"),
          where("uid", "==", practitionerId)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          this.practitioner = querySnapshot.docs[0].data();
          console.log(this.practitioner, "this.practitioner");
        } else {
          this.error = "Practitioner not found.";
        }
      } catch (error) {
        this.error = "Error fetching practitioner data: " + error.message;
      }
    },
    connectWithPractitioner() {
      alert("Connect with Practitioner clicked!");
    },
    setLocalGym() {
      alert("Set Local Gym clicked!");
    },
  },
};
</script>

<style scoped>
.profile-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f4f4f4;
}

.profile-content {
  display: flex;
  align-items: center;
}

.profile-container,
.practitioner-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 300px;
  margin: 20px;
}

.link-icon {
  font-size: 2rem;
  margin: 0 20px;
}

.profile-picture {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 1rem;
}

h2 {
  margin-bottom: 1rem;
}

p {
  margin-bottom: 0.5rem;
  color: #333;
}

.button-group {
  margin-top: 1rem;
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
  margin: 0.5rem;
}

button:hover {
  background-color: #0056b3;
}

.practitioner-card.empty {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  border: 2px dashed #ccc;
}

.empty-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.5rem;
  color: #ccc;
}

.error {
  color: red;
  margin-top: 1rem;
}
</style>
