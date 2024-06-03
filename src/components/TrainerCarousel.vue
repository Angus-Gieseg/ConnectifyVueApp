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
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import PersonalTrainerCard from "./PersonalTrainerCard.vue";

export default {
  components: {
    Carousel,
    PersonalTrainerCard,
  },
  data() {
    return {
      trainers: [],
    };
  },
  mounted() {
    this.fetchTrainers();
  },
  methods: {
    async fetchTrainers() {
      console.log("Fetching personal trainers");
      try {
        const querySnapshot = await getDocs(
          collection(db, "personal_trainers")
        );
        const trainersData = [];
        querySnapshot.forEach((doc) => {
          trainersData.push({ ...doc.data(), id: doc.id });
        });
        // Repeat the trainer data 10 times for testing
        this.trainers = trainersData;
        console.log();
        console.log(this.trainers);
      } catch (error) {
        console.error("Error fetching trainers:", error);
      }
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
