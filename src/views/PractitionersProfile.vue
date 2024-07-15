<template>
  <div class="practitioner-profile">
    <div class="profile-wrapper">
      <div class="profile-info" v-if="practitioner">
        <div class="profile-card">
          <div class="profile-header">
            <img
              :src="practitioner.personal_trainer.profile_picture"
              alt="Practitioner Action"
              class="profile-image"
            />
            <div class="details">
              <h2>
                {{ practitioner.personal_trainer.first_name }}
                <i class="pi pi-pencil edit-icon" @click="editProfile"></i>
              </h2>
              <p>IG: @{{ practitioner.personal_trainer.instagram_handle }}</p>
              <p>Address: {{ practitioner.gym_place_of_work.place_of_work_address.full_address }}</p>
              <div class="rating" v-if="practitioner.personal_trainer.rating !== 0">
                <h2>{{ practitioner.personal_trainer.rating }}</h2>
                <div  class="rating-stars">
                  <i class="pi pi-star" v-for="star in 5" :key="star"></i>
                </div>
              </div>
              <div class="rating" v-else style="color: white;">
                <h2>New Member</h2>
              </div>
              <div class="contact-section">
                <Button label="Contact" class="contact-button" />
              </div>
            </div>
          </div>
          <div class="banner-image">
            <img
              :src="practitioner.personal_trainer.picture_upload_banner"
              alt="Practitioner banner picture"
            />
          </div>
        </div>
        <div class="row2">
          <div class="about-section">
            <h3>About</h3>
            <p>{{ practitioner.personal_trainer.introduction }}</p>
          </div>
          <div class="availability-section">
            <h3>Availability</h3>
            <p>
              Morning:
              {{ practitioner.personal_trainer.availability?.morning || "N/A" }}
            </p>
            <p>
              Afternoon:
              {{
                practitioner.personal_trainer.availability?.afternoon || "N/A"
              }}
            </p>
            <p>
              Evening:
              {{ practitioner.personal_trainer.availability?.evening || "N/A" }}
            </p>
          </div>
          <div class="price-section">
            <h3>Price Per Session</h3>
            <p>30 Minutes: {{ practitioner.personal_trainer.price_30mins }}</p>
            <p>45 Minutes: {{ practitioner.personal_trainer.price_45mins }}</p>
            <p>60 Minutes: {{ practitioner.personal_trainer.price_60mins }}</p>
          </div>
        </div>
        <div class="row2">
          <div v-if="practitioner.personal_trainer"> 
            <CalendlyEvents :calendlyAPI="practitioner.personal_trainer.apiCalendly" />
          </div>
          <div v-else>
            <p>Calendly integration is not available for this trainer.</p>
          </div>
          <div class="focus-section">
            <h3>Focus</h3>
            <div class="tags">
              <div
                v-for="speciality in practitioner.personal_trainer.specialisation"
                :key="speciality"
                class="pill"
              >
                {{ speciality }}
              </div>
            </div>
          </div>
        </div>
        <div class="education-section">
          <h3>Education</h3>
          <p>{{ practitioner.personal_trainer.education }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import Button from "primevue/button";
import { useRoute } from "vue-router";
import CalendlyEvents from "../components/Calendar.vue";

export default {
  name: "PractitionersProfile",
  components: {
    Button,
    CalendlyEvents
  },
  data() {
    return {
      practitioner: null,
      db: getFirestore(),
      storage: getStorage(),
    };
  },
  created() {
    this.fetchPractitionerData();
  },
  methods: {
    async fetchPractitionerData() {
      const route = useRoute();
      try {
        const docRef = doc(
          this.db,
          "personal_trainers",
          route.params.practitioner_id
        );
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          this.practitioner = { ...docSnap.data(), id: docSnap.id };
        } else {
          console.error("No such document!");
        }
        console.log(this.practitioner, "practitioner");
      } catch (error) {
        console.error("Error getting document:", error);
      }
    },
    editProfile() {
      console.log(this.practitioner, "this.practitioner");
      this.$router.push(`/practitioner/${this.practitioner.id}/edit`);
    },
  },
};
</script>

<style scoped>
.edit-icon {
  cursor: pointer;
  margin-left: 10px;
}

.profile-wrapper {
  max-width: 1200px;
  margin: 20px auto;
  padding: 0 20px;
}

.practitioner-profile {
  min-height: 90vh;
  padding: 20px;
  background: linear-gradient(#ffffff 0%, #6452ac 20%, #453975 100%);
  display: flex;
  justify-content: flex-start;
}

.profile-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
}

.row2 {
  color: white;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.profile-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;
}

.profile-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 20px;
}

.details {
  text-align: left;
}

.rating {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.rating-stars {
  display: flex;
  margin-left: 10px;
}

.banner-image img {
  width: 100%;
  object-fit: cover;
  max-height: 300px;
  border-radius: 10px;
}

.about-section,
.availability-section,
.price-section,
.focus-section,
.education-section,
.contact-section {
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  text-align: left;
}

.focus-section {
  color: white;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.pill {
  background-color: #6200ea;
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  margin: 5px;
}

.contact-button {
  width: 100%;
  background-color: #6200ea;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
}

/* Media Queries for Mobile Optimization */
@media (min-width: 768px) {
  .profile-card {
    flex-direction: row;
  }

  .profile-header {
    flex-direction: row;
    align-items: center;
    text-align: left;
  }

  .profile-image {
    width: 200px;
    height: 200px;
    margin-right: 20px;
    margin-bottom: 0;
  }

  .details {
    text-align: left;
  }

  .row2 {
    flex-direction: row;
    justify-content: space-between;
  }

  .about-section,
  .availability-section,
  .price-section,
  .focus-section,
  .education-section {
    max-width: 45%;
  }
}

@media (min-width: 1024px) {
  .row2 {
    flex-direction: row;
  }

  .about-section,
  .availability-section,
  .price-section {
    max-width: 30%;
  }
}
</style>
