<template>
  <div class="carousel-container">
    <div class="carousel-wrapper">
      <button @click="scrollLeft" class="carousel-button left">‹</button>
      <div class="carousel" ref="carousel">
        <div
          v-for="(trainer, index) in trainers"
          :key="index"
          class="card-wrapper"
        >
          <PersonalTrainerCard :data="trainer" @map-location="showOnMap" />
        </div>
      </div>
      <button @click="scrollRight" class="carousel-button right">›</button>
    </div>
  </div>
</template>

<script>
import PersonalTrainerCard from "./PersonalTrainerCard.vue";

export default {
  components: {
    PersonalTrainerCard,
  },
  props: {
    trainers: {
      type: Array,
      required: true,
    },
  },
  methods: {
    showOnMap(data) {
      // Add your logic to view on map here
      this.$emit("map-location", data);
      console.log("View on map clicked");
    },
    scrollLeft() {
      this.$refs.carousel.scrollBy({
        left: -390, // Adjust to fit card width plus margins
        behavior: "smooth",
      });
    },
    scrollRight() {
      this.$refs.carousel.scrollBy({
        left: 390, // Adjust to fit card width plus margins
        behavior: "smooth",
      });
    },
  },
};
</script>

<style scoped>
.carousel-container {
  position: relative;
  margin-top: 30px;
  max-width: 100%;
  overflow: hidden;
  padding: 0 20px;
}

.carousel-wrapper {
  display: flex;
  align-items: center;
}

.carousel {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
}

.carousel::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}

.card-wrapper {
  flex: 0 0 auto;
  width: 370px;
  margin: 0 10px;
  box-sizing: border-box;
}

.carousel-button {
  background: rgba(255, 255, 255, 0.8);
  border: none;
  cursor: pointer;
  padding: 10px;
  font-size: 20px;
  z-index: 1;
  position: relative;
}

.carousel-button.left {
  margin-right: 10px;
}

.carousel-button.right {
  margin-left: 10px;
}
</style>
