<template>
  <div>
    <div class="landing-container">
      <div v-if="trainers.length" class="Hero">
        <h1 class="main-heading">Find the Personal Trainer fit for you.</h1>
        <Map :trainers="trainers" />
      </div>
      <div class="p-grid PTSection">
        <div class="p-col-12 p-md-3">
          <h2 class="pt-call-action">
            Browse through our highest rated Practitioners
          </h2>
        </div>
        <div class="p-col-12 p-md-9">
          <TrainerCarousel :trainers="trainers" />
        </div>
      </div>
      <CallToActionPT />
    </div>
  </div>
</template>

<script>
import TrainerCarousel from "../components/TrainerCarousel.vue";
import CallToActionPT from "../components/CallToActionPT.vue";
import Map from "../components/Map.vue";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default {
  name: "LandingPage",
  components: {
    TrainerCarousel,
    CallToActionPT,
    Map,
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
        const querySnapshot = await getDocs(collection(db, "personal_trainers"));
        const trainersData = [];
        querySnapshot.forEach((doc) => {
          trainersData.push({ ...doc.data(), id: doc.id });
        });
        this.trainers = trainersData;
        console.log(this.trainers);
      } catch (error) {
        console.error("Error fetching trainers:", error);
      }
    },
  },
};
</script>

<style scoped>
.pt-call-action {
  font-weight: 400;
}

.landing-container {
  font-family: "Poppins", sans-serif;
  max-width: 1200px;
  margin: 20px auto;
  margin-top: 20px;
}

.main-heading {
  font-weight: 400;
  font-size: 2em;
  margin-bottom: 20px;
}
</style>
