<template>
  <div class="signup-container">
    <h1>Sign Up as a Personal Trainer</h1>
    <form @submit.prevent="handleSubmit">
      <!-- Existing form fields -->
      <div class="form-group">
        <label for="first_name">First Name:</label>
        <InputText v-model="form.personal_trainer.first_name" required />
      </div>
      <div class="form-group">
        <label for="last_name">Last Name:</label>
        <InputText v-model="form.personal_trainer.last_name" required />
      </div>

      <!-- Certification fields -->
      <div class="form-group">
        <label>Certifications:</label>
        <div
          v-for="(cert, index) in form.personal_trainer.certifications"
          :key="index"
          class="certification-input"
        >
          <InputText
            v-model="cert.name"
            placeholder="Certification Name"
            required
          />
          <input
            type="file"
            @change="handleCertificationFileChange($event, index)"
            accept="application/pdf,image/*"
            required
          />
          <span v-if="cert.fileName">File selected: {{ cert.fileName }}</span>
          <Button
            type="button"
            label="Remove"
            icon="pi pi-times"
            class="p-button-danger"
            @click="removeCertification(index)"
          />
        </div>
        <Button
          type="button"
          label="Add Certification"
          icon="pi pi-plus"
          @click="addCertification"
        />
      </div>

      <!-- Existing form fields -->
      <div class="form-group">
        <label for="contact_email">Contact Email:</label>
        <InputText v-model="form.personal_trainer.contact_email" required />
      </div>
      <div class="form-group">
        <label for="date_of_birth">Date of Birth:</label>
        <Calendar v-model="form.personal_trainer.date_of_birth" required />
      </div>
      <div class="form-group">
        <label for="gym_affiliation">Gym Affiliation:</label>
        <InputText v-model="form.personal_trainer.gym_affiliation" required />
      </div>
      <div class="form-group">
        <label for="profile_picture">Profile Picture:</label>
        <input
          type="file"
          @change="handleFileChange($event, 'profile_picture')"
          accept="image/*"
          required
        />
        <span v-if="selectedFiles.profile_picture"
          >File selected: {{ selectedFiles.profile_picture }}</span
        >
      </div>
      <div class="form-group">
        <label for="picture_upload_banner">Upload Banner Picture:</label>
        <input
          type="file"
          @change="handleFileChange($event, 'picture_upload_banner')"
          accept="image/*"
          required
        />
        <span v-if="selectedFiles.picture_upload_banner"
          >File selected: {{ selectedFiles.picture_upload_banner }}</span
        >
      </div>
      <div class="form-group">
        <label for="instagram_handle">Instagram Handle:</label>
        <InputText v-model="form.personal_trainer.instagram_handle" />
      </div>
      <div class="form-group">
        <label for="introduction">Introduction:</label>
        <Textarea v-model="form.personal_trainer.introduction" required />
      </div>
      <div class="form-group">
        <label for="phone_number">Phone Number:</label>
        <InputText v-model="form.personal_trainer.phone_number" required />
      </div>
      <div class="form-group">
        <label for="price_30mins">Price for 30 mins:</label>
        <InputNumber v-model="form.personal_trainer.price_30mins" required />
      </div>
      <div class="form-group">
        <label for="price_45mins">Price for 45 mins:</label>
        <InputNumber v-model="form.personal_trainer.price_45mins" required />
      </div>
      <div class="form-group">
        <label for="price_60mins">Price for 60 mins:</label>
        <InputNumber v-model="form.personal_trainer.price_60mins" required />
      </div>
      <div class="form-group">
        <label for="specialisation">Specialisation:</label>
        <div class="specialisation-input">
          <InputText v-model="newSpecialisation" />
          <Button
            type="button"
            label="Add"
            icon="pi pi-plus"
            @click="addSpecialisation"
          />
        </div>
        <ul>
          <li
            v-for="(specialisation, index) in form.personal_trainer
              .specialisation"
            :key="index"
          >
            {{ specialisation }}
            <Button
              type="button"
              label="Remove"
              icon="pi pi-times"
              class="p-button-danger"
              @click="removeSpecialisation(index)"
            />
          </li>
        </ul>
      </div>
      <div class="form-group">
        <label for="years_experience">Years of Experience:</label>
        <InputNumber
          v-model="form.personal_trainer.years_experience"
          required
        />
      </div>
      <div class="form-group">
        <label for="rating">Rating (1-5):</label>
        <Rating v-model="form.personal_trainer.rating" required />
      </div>
      <h2>Gym Place of Work</h2>
      <div class="form-group">
        <label for="place_of_work_address">Place of Work Address:</label>
        <AutocompleteInput
          :address="form.gym_place_of_work.place_of_work_address.full_address"
          @full-address="addAddress"
        />
        <div v-if="geocodeResult">
          <p>Geocoded Address: {{ geocodeResult.formatted_address }}</p>
          <p>
            Coordinates: {{ geocodeResult.geometry.location.lat }},
            {{ geocodeResult.geometry.location.lng }}
          </p>
        </div>
      </div>
      <div class="form-group">
        <label for="gym_type">Gym Type:</label>
        <InputText v-model="form.gym_place_of_work.gym_type" required />
      </div>
      <div class="form-group">
        <label for="equipment_available">Equipment Available:</label>
        <InputText
          v-model="form.gym_place_of_work.equipment_available"
          required
        />
      </div>
      <Button type="submit" label="Submit" />
    </form>
  </div>
</template>

<script>
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  addDoc,
} from "firebase/firestore";
import { useRoute, useRouter } from "vue-router";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import InputNumber from "primevue/inputnumber";
import Button from "primevue/button";
import Calendar from "primevue/calendar";
import Rating from "primevue/rating";
import AutocompleteInput from "../components/AutocompleteInput.vue"; // Adjust the path as necessary

export default {
  name: "SignUpPT",
  components: {
    InputText,
    Textarea,
    InputNumber,
    Button,
    Calendar,
    Rating,
    AutocompleteInput,
  },
  data() {
    return {
      form: {
        personal_trainer: {
          first_name: "",
          last_name: "",
          certifications: [],
          contact_email: "",
          date_of_birth: "",
          gym_affiliation: "",
          profile_picture: null,
          picture_upload_banner: null,
          instagram_handle: "",
          introduction: "",
          location_post_code: "",
          phone_number: "",
          price_30mins: 0.0,
          price_45mins: 0.0,
          price_60mins: 0.0,
          specialisation: [],
          years_experience: 0,
          rating: 0,
        },
        gym_place_of_work: {
          place_of_work_address: {
            full_address: "",
            place_id: "",
            suburb: "",
            city: "",
          },
          GEOcode_x_y: null,
          gym_type: "",
          equipment_available: "",
        },
      },
      newSpecialisation: "",
      selectedFiles: {
        profile_picture: null,
        picture_upload_banner: null,
      },
      geocodeResult: null,
      db: getFirestore(),
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
          const data = docSnap.data();

          // Convert Firestore timestamp to JavaScript Date object
          if (data.personal_trainer.date_of_birth) {
            data.personal_trainer.date_of_birth = new Date(
              data.personal_trainer.date_of_birth.seconds * 1000
            );
          }

          this.form = data;
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error getting document:", error);
      }
    },
    async handleFileChange(event, field) {
      const file = event.target.files[0];
      if (file) {
        try {
          const storage = getStorage();
          const storageReference = storageRef(storage, `uploads/${file.name}`);
          await uploadBytes(storageReference, file);
          const fileURL = await getDownloadURL(storageReference);
          this.form.personal_trainer[field] = fileURL;
          this.selectedFiles[field] = file.name;
        } catch (error) {
          console.error(`Error uploading file: ${error.message}`);
        }
      }
    },
    async handleCertificationFileChange(event, index) {
      const file = event.target.files[0];
      if (file) {
        try {
          const storage = getStorage();
          const storageReference = storageRef(
            storage,
            `certifications/${file.name}`
          );
          await uploadBytes(storageReference, file);
          const fileURL = await getDownloadURL(storageReference);
          this.$set(
            this.form.personal_trainer.certifications[index],
            "url",
            fileURL
          );
          this.$set(
            this.form.personal_trainer.certifications[index],
            "fileName",
            file.name
          );
        } catch (error) {
          console.error(`Error uploading certification file: ${error.message}`);
        }
      }
    },
    addCertification() {
      this.form.personal_trainer.certifications.push({
        name: "",
        url: "",
        fileName: "",
      });
    },
    removeCertification(index) {
      this.form.personal_trainer.certifications.splice(index, 1);
    },
    addSpecialisation() {
      if (this.newSpecialisation) {
        this.form.personal_trainer.specialisation.push(this.newSpecialisation);
        this.newSpecialisation = "";
      }
    },
    removeSpecialisation(index) {
      this.form.personal_trainer.specialisation.splice(index, 1);
    },
    async handleSubmit() {
      try {
        const db = getFirestore();
        await addDoc(collection(db, "personal_trainers"), this.form);
        alert("Sign-up successful!");
      } catch (error) {
        console.error(`Error submitting form: ${error.message}`);
      }
    },
  },
};
</script>

<style scoped>
.signup-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input,
.form-group textarea,
.form-group .p-inputtext,
.form-group .p-textarea,
.form-group .p-inputnumber,
.form-group .p-calendar,
.form-group .p-rating {
  width: 100%;
}

.form-group ul {
  list-style-type: none;
  padding: 0;
}

.form-group ul li {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.specialisation-input {
  display: flex;
  gap: 10px;
}

.certification-input {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

button[type="submit"] {
  margin-top: 20px;
}
</style>
