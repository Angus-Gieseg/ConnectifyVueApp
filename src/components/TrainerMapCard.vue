<template>
  <div class="trainer-card p-card p-component">
    <img
      :src="trainer.personal_trainer.profile_picture"
      :alt="trainer.personal_trainer.first_name"
      class="trainer-image"
    />
    <div class="overlay">
      <h3>{{ trainer.personal_trainer.first_name }}</h3>
      <button @click.stop="navigateToTrainer" class="p-button p-component">
        View
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TrainerMapCard",
  props: {
    trainer: {
      type: Object,
      required: true,
    },
  },
  methods: {
    navigateToTrainer() {
      this.$router.push(`/pt_profile/${this.trainer.id}`);
    },
  },
};
</script>

<style scoped>
.trainer-card {
  cursor: pointer;
  width: 200px;
  height: 250px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 10px;
  position: absolute; /* Position absolutely */
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.trainer-image {
  width: 100%;
  height: 70%;
  object-fit: cover;
}

.overlay {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
}

.overlay h3 {
  margin: 0;
  font-size: 16px;
}

.overlay button {
  margin-top: 5px;
  background: #1e88e5;
  color: white;
  border: none;
  padding: 5px 10px;
  font-size: 14px;
}
</style>
