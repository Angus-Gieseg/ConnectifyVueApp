<template>
  <div class="carousel-container">
    <Carousel
      :value="trainers"
      :numScroll="1"
      :numVisible="2"
      orientation="horizontal"
      circular
    >
      <template #item="{ data: trainer }">
        <div class="card-wrapper">
          <PersonalTrainerCard :data="trainer" />
        </div>
      </template>
    </Carousel>
  </div>
</template>

<script>
import Carousel from "primevue/carousel";
import PersonalTrainerCard from "./PersonalTrainerCard.vue";

export default {
  components: {
    Carousel,
    PersonalTrainerCard,
  },
  props: {
    trainers: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.carousel-container {
  margin-top: 30px;
  max-width: 100%;
  overflow-x: auto;
  scrollbar-width: thin;
  scrollbar-color: #888 #f1f1f1;
}

.carousel-container::-webkit-scrollbar {
  height: 8px;
}

.carousel-container::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.carousel-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.card-wrapper {
  padding: 0 10px;
}
</style>
