<template>
  <div class="profile-page" v-if="userDetails">
    <div class="profile-header">
      <div class="name-edit">
        <h2>
          {{ userDetails.name }} ({{ userDetails.username }})
          <Button
            icon="pi pi-pencil"
            class="p-button-rounded p-button-text"
            @click="editModal"
          />
        </h2>
      </div>
      <div class="display-photo-container" @click="showModal = true">
        <img :src="displayPhotoUrl" alt="Display Photo" class="display-photo" />
      </div>
    </div>
    <div class="profile-details">
      <p><strong>Events Attended:</strong> {{ userDetails.events_attended }}</p>
      <p><strong>Events Hosted:</strong> {{ userDetails.events_hosted }}</p>
      <p>
        <strong>Owned Packages:</strong>
        {{ userDetails.owned_packages.join(", ") }}
      </p>
    </div>
    <p v-if="error" class="error">{{ error }}</p>

    <Dialog header="Edit Profile" v-model:visible="showModal" modal>
      <div class="modal-content">
        <div class="field">
          <label for="name">Display Name</label>
          <InputText id="name" v-model="newName" />
        </div>
        <div class="field">
          <label for="username">Username</label>
          <InputText id="username" v-model="newUsername" />
        </div>
        <div class="field">
          <label for="photo">Profile Photo</label>
          <input type="file" @change="handlePhotoUpload" />
        </div>
        <div class="character-profiles">
          <h3>Select Default Profile Picture</h3>
          <div class="scroll-container">
            <div
              class="profile-item"
              v-for="photo in defaultPhotos"
              :key="photo"
              @click="selectDefaultPhoto(photo)"
            >
              <img :src="photo" alt="Default Profile" class="default-photo" />
            </div>
          </div>
        </div>
        <div class="buttons">
          <Button label="Save" icon="pi pi-check" @click="saveChanges" />
          <Button
            label="Cancel"
            icon="pi pi-times"
            class="p-button-text"
            @click="showModal = false"
          />
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { db, storage } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, listAll, getDownloadURL, uploadBytes } from "firebase/storage";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Dialog from "primevue/dialog";

export default {
  name: "Profilepage",
  components: {
    Button,
    InputText,
    Dialog,
  },
  data() {
    return {
      hover: false,
      displayPhotoUrl: "",
      newName: "",
      newUsername: "",
      showModal: false,
      defaultPhotos: [],
      error: "",
    };
  },
  computed: {
    ...mapGetters(["user", "userDetails"]),
  },
  watch: {
    userDetails: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.newName = newVal.name;
          this.newUsername = newVal.username;
          this.setDisplayPhotoUrl();
        }
      },
    },
  },
  methods: {
    async editModal() {
      await this.fetchDefaultPhotos();
      this.showModal = true;
    },
    async fetchDefaultPhotos() {
      try {
        const listRef = ref(
          storage,
          "gs://inhouse-games.appspot.com/murderMysterDefaultPorfiles"
        );
        const res = await listAll(listRef);
        const urls = await Promise.all(
          res.items.map((item) => getDownloadURL(item))
        );
        this.defaultPhotos = urls;
      } catch (error) {
        this.error = "Error fetching default photos: " + error.message;
      }
    },
    setDisplayPhotoUrl() {
      if (this.userDetails && this.userDetails.display_photo_url) {
        this.displayPhotoUrl = this.userDetails.display_photo_url;
      } else {
        this.displayPhotoUrl = this.defaultPhotos[0];
      }
    },
    async handlePhotoUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      try {
        const storageRef = ref(storage, `display_photos/${this.user.uid}`);
        await uploadBytes(storageRef, file);
        const photoURL = await getDownloadURL(storageRef);

        await updateDoc(doc(db, "users", this.$route.params.id), {
          display_photo_url: photoURL,
        });

        this.displayPhotoUrl = photoURL;
        this.$store.commit("setUserDetails", {
          ...this.userDetails,
          display_photo_url: photoURL,
        });
      } catch (error) {
        this.error = "Error uploading photo: " + error.message;
      }
    },
    async selectDefaultPhoto(photo) {
      try {
        await updateDoc(doc(db, "users", this.$route.params.id), {
          display_photo_url: photo,
        });

        this.displayPhotoUrl = photo;
        this.$store.commit("setUserDetails", {
          ...this.userDetails,
          display_photo_url: photo,
        });
      } catch (error) {
        this.error = "Error selecting default photo: " + error.message;
      }
    },
    async saveChanges() {
      try {
        const updates = {};
        if (this.newName !== this.userDetails.name) {
          updates.name = this.newName;
        }
        if (this.newUsername !== this.userDetails.username) {
          updates.username = this.newUsername;
        }
        if (Object.keys(updates).length) {
          await updateDoc(doc(db, "users", this.$route.params.id), updates);
          this.$store.commit("setUserDetails", {
            ...this.userDetails,
            ...updates,
          });
        }
        this.showModal = false;
      } catch (error) {
        this.error = "Error saving changes: " + error.message;
      }
    },
  },
};
</script>
<style scoped>
.profile-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-family: "Roboto", sans-serif;
}

.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.display-photo-container {
  position: relative;
  width: 150px;
  height: 150px;
  margin-bottom: 20px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.display-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.upload-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.profile-details p {
  margin: 10px 0;
}

.name-edit {
  display: flex;
  align-items: center;
}

.modal-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 390px;
  margin: 0 auto;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.character-profiles {
  margin-top: 20px;
}

.scroll-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px 0;
}

.profile-item {
  width: 50px;
  height: 50px;
  cursor: pointer;
  border: 2px solid transparent;
  border-radius: 50%;
  overflow: hidden;
}

.profile-item:hover,
.profile-item.selected {
  border-color: #007bff;
}

.default-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.buttons {
  display: flex;
  justify-content: space-between;
}

.error {
  color: red;
  margin-top: 20px;
}
</style>
