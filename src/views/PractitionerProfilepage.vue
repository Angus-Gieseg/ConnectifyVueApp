<template>
  <div v-if="practitioner" class="practitioner-profile">
    <div class="profile-header">
      <div class="profile-picture-container">
        <Avatar
          :image="practitioner.profilePictureUrl"
          size="xlarge"
          shape="circle"
        />
        <Button
          icon="pi pi-camera"
          class="p-button-rounded p-button-outlined upload-button"
          @click="openImageUploadModal"
        />
      </div>
      <div class="profile-info">
        <h1>{{ practitioner.firstName }} {{ practitioner.lastName }}</h1>
        <p class="role">{{ practitioner.role }}</p>
        <p class="email">
          <i class="pi pi-envelope"></i> {{ practitioner.email }}
        </p>
        <div class="profile-buttons">
          <Button
            :label="hasPractitionerProfile ? 'Edit Profile' : 'Create Profile'"
            icon="pi pi-user-edit"
            @click="editOrCreateProfile"
            class="p-button-outlined"
          />
          <Button
            v-if="hasPractitionerProfile"
            label="View Public Profile"
            icon="pi pi-eye"
            @click="viewPublicProfile"
            class="p-button-outlined"
          />
        </div>
      </div>
    </div>

    <div class="profile-actions">
      <Button
        label="Create Feedback Form"
        icon="pi pi-file-edit"
        class="p-button-lg p-button-secondary"
        @click="createFeedbackForm"
      />
    </div>

    <div v-if="hasPractitionerProfile" class="clients-section">
      <h2>My Clients</h2>
      <DataTable
        :value="clients"
        :paginator="true"
        :rows="10"
        responsiveLayout="scroll"
        stripedRows
        class="p-datatable-sm"
      >
        <Column field="firstName" header="First Name"></Column>
        <Column field="lastName" header="Last Name"></Column>
        <Column field="email" header="Email"></Column>
        <Column header="Actions" bodyStyle="text-align: center">
          <template #body="slotProps">
            <Button
              icon="pi pi-eye"
              class="p-button-rounded p-button-text"
              @click="viewClientDetails(slotProps.data)"
            />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
  <div v-else class="loading-container">
    <ProgressSpinner />
    <p>Loading practitioner details...</p>
  </div>

  <Dialog
    v-model:visible="imageUploadModalVisible"
    header="Upload Profile Picture"
    :style="{ width: '400px' }"
    :modal="true"
  >
    <!-- Add image upload component -->
  </Dialog>
</template>

<script>
import { mapGetters } from "vuex";
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Dialog from "primevue/dialog";
import ProgressSpinner from "primevue/progressspinner";
import Avatar from "primevue/avatar";
import { db } from "../firebase"; // Ensure this path is correct
import { doc, getDoc } from "firebase/firestore";

export default {
  name: "PractitionerProfile",
  components: {
    Button,
    DataTable,
    Column,
    Dialog,
    ProgressSpinner,
    Avatar,
  },
  data() {
    return {
      imageUploadModalVisible: false,
      clients: [],
      hasPractitionerProfile: false,
    };
  },
  computed: {
    ...mapGetters(["userDetails"]),
    practitioner() {
      return this.userDetails;
    },
  },
  methods: {
    async checkPractitionerProfile() {
      if (this.practitioner && this.practitioner.uid) {
        const docRef = doc(db, "personal_trainers", this.practitioner.uid);
        const docSnap = await getDoc(docRef);
        this.hasPractitionerProfile = docSnap.exists();
      }
    },
    editOrCreateProfile() {
      if (this.hasPractitionerProfile) {
        this.$router.push({
          name: "EditProfile",
          params: { practitioner_id: this.practitioner.uid },
        });
      } else {
        this.$router.push({
          name: "CreateProfile",
          params: { practitioner_id: this.practitioner.uid },
        });
      }
    },
    viewPublicProfile() {
      this.$router.push({
        name: "practitioner",
        params: { practitioner_id: this.practitioner.uid },
      });
    },
    openImageUploadModal() {
      this.imageUploadModalVisible = true;
    },
    createFeedbackForm() {
      this.$router.push({ name: "FormBuilder" });
    },
    viewClientDetails(client) {
      console.log("Viewing client details:", client);
      // Implement client details view logic
    },
  },
  async mounted() {
    await this.checkPractitionerProfile();
    // Fetch clients if profile exists and not available in the store
    if (this.hasPractitionerProfile) {
      // this.fetchClients();
    }
  },
};
</script>

<style scoped>
.practitioner-profile {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: "Arial", sans-serif;
}

.profile-header {
  display: flex;
  align-items: center;
  background-color: #f8f9fa;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.profile-picture-container {
  position: relative;
  margin-right: 2rem;
}

.upload-button {
  position: absolute;
  bottom: 0;
  right: 0;
  transform: translate(25%, 25%);
}

.profile-info {
  flex-grow: 1;
}

.profile-info h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.profile-info .role {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.profile-info .email {
  display: flex;
  align-items: center;
  font-size: 1rem;
  color: #666;
  margin-bottom: 1rem;
}

.profile-info .email i {
  margin-right: 0.5rem;
}

.edit-profile-button {
  align-self: flex-start;
}

.profile-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.clients-section {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.clients-section h2 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #333;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
}

@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .profile-picture-container {
    margin-right: 0;
    margin-bottom: 1rem;
  }

  .upload-button {
    position: static;
    transform: none;
    margin-top: 1rem;
  }

  .edit-profile-button {
    align-self: center;
  }

  .profile-actions {
    flex-direction: column;
  }
}
.profile-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .profile-buttons {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
