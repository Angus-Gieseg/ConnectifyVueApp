<template>
  <div>
    <div class="landing-container">
      <h1 class="main-heading">Find the Personal Trainer fit for you.</h1>
      <div id="map" class="map"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LandingPage",
  mounted() {
    this.loadGoogleMaps();
  },
  methods: {
    loadGoogleMaps() {
      if (typeof google === "undefined") {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC32U2FipoVpDOVdqExksQ8OoKvLQLDA-U`;
        script.async = true;
        script.defer = true;
        script.onload = this.initMap;
        document.head.appendChild(script);
      } else {
        this.initMap();
      }
    },
    initMap() {
      const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -36.8509, lng: 174.7645 },
        zoom: 13,
      });
    },
  },
};
</script>

<style scoped>
.landing-container {
  max-width: 1200px;
  margin: 20px auto;
  margin-top: 20px;
}

.main-heading {
  font-size: 2em;
  margin-bottom: 20px;
}

.map {
  height: 500px;
  width: 100%;
  border-radius: 20px;
}
</style>
