<template>
  <div v-if="practitioner" class="practitioner-profile">
    <div class="profile-header">
      <div class="profile-picture-container">
        <img
          :src="practitioner.profilePictureUrl"
          alt="Profile Picture"
          class="profile-picture"
        />
        <Button
          icon="pi pi-camera"
          class="p-button-rounded p-button-outlined"
          @click="openImageUploadModal"
        />
      </div>
      <div class="profile-info">
        <h1>{{ practitioner.firstName }} {{ practitioner.lastName }}</h1>
        <p><i class="pi pi-envelope"></i> {{ practitioner.email }}</p>
        <p><i class="pi pi-user"></i> {{ practitioner.role }}</p>
        <Button
          label="Edit Profile"
          icon="pi pi-user-edit"
          @click="openEditProfileModal"
        />
      </div>
    </div>

    <div class="profile-actions">
      <Button
        label="Add Public Profile"
        icon="pi pi-globe"
        class="p-button-lg"
        @click="addPublicProfile"
      />
      <Button
        label="Create Custom Feedback Form"
        icon="pi pi-file-edit"
        class="p-button-lg"
        @click="createFeedbackForm"
      />
    </div>

    <div class="clients-section">
      <h2>My Clients</h2>
      <DataTable
        :value="clients"
        :paginator="true"
        :rows="10"
        responsiveLayout="scroll"
      >
        <Column field="firstName" header="First Name"></Column>
        <Column field="lastName" header="Last Name"></Column>
        <Column field="email" header="Email"></Column>
        <Column header="Actions">
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
  <div v-else>
    <ProgressSpinner />
    <p>Loading practitioner details...</p>
  </div>

  <!-- Modals -->
  <Dialog
    v-model:visible="editProfileModalVisible"
    header="Edit Profile"
    :style="{ width: '50vw' }"
  >
    <!-- Add form fields for editing profile -->
  </Dialog>

  <Dialog
    v-model:visible="imageUploadModalVisible"
    header="Upload Profile Picture"
    :style="{ width: '50vw' }"
  >
    <!-- Add image upload component -->
  </Dialog>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Dialog from "primevue/dialog";
import ProgressSpinner from "primevue/progressspinner";

export default {
  name: "PractitionerProfile",
  components: {
    Button,
    DataTable,
    Column,
    Dialog,
    ProgressSpinner,
  },
  setup() {
    const store = useStore();
    const editProfileModalVisible = ref(false);
    const imageUploadModalVisible = ref(false);

    const practitioner = computed(() => store.getters.userDetails);
    const clients = ref([]); // You might want to fetch this from the store as well if available

    const openEditProfileModal = () => {
      editProfileModalVisible.value = true;
    };

    const openImageUploadModal = () => {
      imageUploadModalVisible.value = true;
    };

    const addPublicProfile = () => {
      // Implement public profile creation logic
    };

    const createFeedbackForm = () => {
      // Implement feedback form creation logic
    };

    const viewClientDetails = (client) => {
      // Implement client details view logic
    };

    // You might want to fetch clients here if not available in the store
    // const fetchClients = async () => { ... }

    return {
      practitioner,
      clients,
      editProfileModalVisible,
      imageUploadModalVisible,
      openEditProfileModal,
      openImageUploadModal,
      addPublicProfile,
      createFeedbackForm,
      viewClientDetails,
    };
  },
};
</script>

<style scoped>
/* ... styles remain the same ... */
</style>
