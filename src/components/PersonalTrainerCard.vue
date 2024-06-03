<template>
  <div class="card">
    <img
      :src="data.personal_trainer.profile_picture"
      alt="Profile Picture"
      class="profile-picture"
    />
    <div class="overlay">
      <h2>
        {{ data.personal_trainer.first_name }}
        {{ data.personal_trainer.last_name }}
      </h2>
      <div class="tags">
        <div
          v-for="speciality in data.personal_trainer.specialisation"
          :key="speciality"
          class="pill"
        >
          {{ speciality }}
        </div>
      </div>
      <p class="introduction-text">{{ data.personal_trainer.introduction }}</p>
      <hr />
      <div class="footer">
        <div class="rating">
          <div>Rating</div>
          <div class="stars">
            <i
              v-for="star in 5"
              :key="star"
              class="pi"
              :class="
                star <= data.personal_trainer.rating
                  ? 'pi-star-fill'
                  : 'pi-star'
              "
              style="color: white"
            ></i>
          </div>
        </div>
        <div class="separator"></div>
        <div class="gym">
          <div>Gym</div>
          <img
            :src="data.personal_trainer.picture_upload_banner"
            alt="Gym Logo"
            class="gym-logo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PersonalTrainerCard",
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 370px;
  height: 485px;
  background: url("/mnt/data/image.png") no-repeat center center;
  background-size: cover;
  border-radius: 16px;
  position: relative;
  overflow: hidden;
}

.profile-picture {
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}

.overlay {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 32px;
  gap: 8px;
  position: absolute;
  width: 100%;
  height: 50%;
  left: 0;
  bottom: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.8) 64.5%
  );
  border-radius: 16px;
  z-index: 2;
}

h2 {
  width: 100%;
  font-family: "Poppins", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 90%;
  letter-spacing: -0.01em;
  color: #ffffff;
  margin: 0;
}

.tags {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0;
  gap: 10px;
  width: 100%;
}

.pill {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px 10px;
  background: #ffffff;
  border-radius: 99999px;
  font-family: "Poppins", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 90%;
  letter-spacing: -0.01em;
  color: #000000;
}

.introduction-text {
  max-width: 100%;
  margin: 0px;
  color: white;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  font-size: 12px;
  font-family: "Poppins", sans-serif;
}

hr {
  width: 100%;
  border: 1px solid #ffffff;
  margin: 8px 0;
}

.footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  height: 50px;
}

.rating {
  color: white;
  font-family: "Poppins", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  width: 145px;
  height: 50px;
}

.stars {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 5px;
}

.separator {
  width: 1px;
  height: 50px;
  border: 1px solid #ffffff;
}

.gym {
  color: #ffffff;
  font-family: "Poppins", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 107px;
  height: 50px;
}

.gym-logo {
  width: 100%;
  height: auto;
}
</style>
