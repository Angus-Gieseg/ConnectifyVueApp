<template>
  <div class="hero-section">
    <img :src="backgroundImage" alt="Background" class="background-image" />
    <div class="overlay">
      <div class="content">
        <h1 class="headline">
          ARE YOU A PERSONAL TRAINER LOOKING TO UP YOUR GAME?
        </h1>
        <Button
          label="Create PT Account"
          icon="pi pi-sign-in"
          class="p-button p-component"
          @click="$router.push('/pt_sign_up')"
          >Create PT Account</Button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeroSection",
  data() {
    return {
      backgroundImage:
        "https://firebasestorage.googleapis.com/v0/b/connectifynz-14eab.appspot.com/o/websiteAssets%2FGyming_photo_with_personal_trainers.jfif?alt=media&token=6753c3f8-3b7f-442f-a9bf-963a11d26a2c",
    };
  },
};
</script>

<style scoped>
.hero-section {
  position: relative;
  width: 100%;
  height: 500px; /* Adjust height as needed */
  overflow: hidden;
}

.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7); /* Adjust opacity as needed */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}

.content {
  text-align: center;
  color: white;
  z-index: 2;
}

.headline {
  font-size: 2em;
  margin-bottom: 20px;
  font-weight: bold;
}

.cta-button {
  padding: 10px 20px;
  background: white;
  color: black;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  transition: background 0.3s, color 0.3s;
}

.cta-button:hover {
  background: black;
  color: white;
}
</style>
