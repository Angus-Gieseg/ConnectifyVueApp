<template>
  <div class="event-details-page">
    <h2>{{ eventDetails.event_name }}</h2>
    <p><strong>Date:</strong> {{ eventDetails.event_date }}</p>
    <p><strong>Package:</strong> {{ eventDetails.package_uid }}</p>
    <p><strong>Owner:</strong> {{ eventDetails.owner_uid }}</p>
    <p>
      <strong>Email Invites:</strong>
      {{ eventDetails.email_invites.join(", ") }}
    </p>
    <p v-if="eventDetails.rsvped_users && eventDetails.rsvped_users.length > 0">
      <strong>RSVPed Users:</strong> {{ eventDetails.rsvped_users.join(", ") }}
    </p>
    <p v-else><strong>No users have RSVPed yet.</strong></p>
    <button v-if="!isUserRSVPed" @click="rsvpToEvent">RSVP to Event</button>
    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="success" class="success">{{ success }}</p>
    <CharactersCollection :character_list="character_list" />
  </div>
</template>

<script>
import { db, auth } from "../firebase";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  collection,
  getDocs,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import CharactersCollection from "../components/CharactersCollection.vue";

export default {
  name: "EventDetails",
  components: {
    CharactersCollection,
  },
  data() {
    return {
      eventDetails: {},
      user: null,
      isUserRSVPed: false,
      error: "",
      success: "",
      character_list: [],
    };
  },
  async created() {
    const eventId = this.$route.params.id;
    const eventDocRef = doc(db, "events", eventId);
    const eventDoc = await getDoc(eventDocRef);

    if (eventDoc.exists()) {
      this.eventDetails = eventDoc.data();
      this.eventDetails.id = eventDoc.id;
      this.fetchCharactersList();
    } else {
      this.error = "Event not found.";
    }

    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        this.isUserRSVPed = this.eventDetails.rsvped_users?.includes(user.uid);
      }
    });
  },
  methods: {
    async fetchCharactersList() {
      try {
        const packageId = this.eventDetails.package_uid;
        const charactersCollectionRef = collection(
          db,
          `products/${packageId}/characters`
        );
        const characterDocs = await getDocs(charactersCollectionRef);

        this.character_list = characterDocs.docs.map((doc) => doc.data());
      } catch (error) {
        this.error = "Error fetching characters: " + error.message;
      }
    },
    async rsvpToEvent() {
      if (!this.user) {
        this.error = "You must be logged in to RSVP.";
        return;
      }

      try {
        const eventDocRef = doc(db, "events", this.eventDetails.id);
        await updateDoc(eventDocRef, {
          rsvped_users: arrayUnion(this.user.uid),
        });

        this.isUserRSVPed = true;
        this.success = "You have successfully RSVPed to the event.";
      } catch (error) {
        console.error("Error RSVPing to event:", error);
        this.error = error.message;
      }
    },
  },
};
</script>

<style scoped>
.event-details-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 4px;
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
</style>
