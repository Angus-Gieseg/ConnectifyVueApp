<template>
  <div class="map-carousel">
    <div id="map" class="map"></div>
  </div>
</template>

<script>
import MapMarker from "../assets/icons/MapMarker.png"; // Ensure the path is correct

export default {
  name: "Map",
  props: {
    trainers: {
      type: Array,
      required: true,
    },
    newMapAddress: {
      type: String,
      required: false,
    },
  },
  watch: {
    trainers: {
      handler(newTrainers) {
        if (newTrainers.length) {
          this.initMap();
        }
      },
      immediate: true,
    },
    newMapAddress: {
      handler(newPlaceId) {
        if (newPlaceId) {
          this.setMapCenterByPlaceId(newPlaceId);
        }
      },
      immediate: true,
    },
  },
  async mounted() {
    await this.loadGoogleMaps();
  },
  methods: {
    async loadGoogleMaps() {
      return new Promise((resolve, reject) => {
        if (typeof google === "undefined") {
          const script = document.createElement("script");
          script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC32U2FipoVpDOVdqExksQ8OoKvLQLDA-U&libraries=places`;
          script.async = true;
          script.defer = true;
          script.onload = () => resolve();
          script.onerror = (error) => reject(error);
          document.head.appendChild(script);
        } else {
          resolve();
        }
      });
    },
    async initMap() {
      const centerPosition = { lat: -36.8509, lng: 174.7645 };

      await this.loadGoogleMaps();

      this.map = new google.maps.Map(document.getElementById("map"), {
        zoom: 13,
        center: centerPosition,
        styles: [
          { elementType: "geometry", stylers: [{ color: "#2b2b2b" }] },
          {
            elementType: "labels.text.stroke",
            stylers: [{ color: "#2b2b2b" }],
          },
          { elementType: "labels.text.fill", stylers: [{ color: "#8ecaf0" }] },
          {
            featureType: "administrative.locality",
            elementType: "labels.text.fill",
            stylers: [{ color: "#8ecaf0" }],
          },
          {
            featureType: "poi",
            elementType: "all",
            stylers: [{ visibility: "off" }],
          },
          {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [{ color: "#1c1c1c" }],
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#333333" }],
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#1c1c1c" }],
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#8ecaf0" }],
          },
          {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [{ color: "#3c3c3c" }],
          },
          {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{ color: "#1c1c1c" }],
          },
          {
            featureType: "road.highway",
            elementType: "labels.text.fill",
            stylers: [{ color: "#8ecaf0" }],
          },
          {
            featureType: "transit",
            elementType: "geometry",
            stylers: [{ color: "#1c1c1c" }],
          },
          {
            featureType: "transit.station",
            elementType: "labels.text.fill",
            stylers: [{ color: "#8ecaf0" }],
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#1c1c1c" }],
          },
          {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [{ color: "#8ecaf0" }],
          },
        ],
        disableDefaultUI: true,
      });

      this.trainers.forEach((trainer) => {
        const placeId =
          trainer.gym_place_of_work.place_of_work_address.place_id;

        if (placeId) {
          const service = new google.maps.places.PlacesService(this.map);

          service.getDetails({ placeId: placeId }, (place, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              const marker = new google.maps.Marker({
                map: this.map,
                position: place.geometry.location,
                title: place.name,
                icon: {
                  url: MapMarker,
                  scaledSize: new google.maps.Size(50, 50),
                },
              });

              const infoWindowContent = `
                  <div style="text-align: center; padding: 10px;">
                      <h3 style="margin: 0;">${trainer.personal_trainer.first_name}</h3>
                      <div style="background-image: url('${trainer.personal_trainer.profile_picture}'); background-size: cover; background-position: center; width: 100px; height: 100px; margin: 10px auto;"></div>
                      <button onclick="window.location.href='/practitioner/${trainer.id}'" style="padding: 5px 10px; border: none; background-color: #007BFF; color: white; border-radius: 5px; cursor: pointer;">View Profile</button>
                  </div>`;

              const infoWindow = new google.maps.InfoWindow({
                content: infoWindowContent,
              });

              marker.addListener("mouseover", () => {
                infoWindow.open(this.map, marker);
              });

              marker.addListener("mouseout", () => {
                if (!infoWindow.get("clicked")) {
                  infoWindow.close();
                }
              });

              marker.addListener("click", () => {
                infoWindow.set("clicked", true);
                infoWindow.open(this.map, marker);
              });

              google.maps.event.addListener(this.map, "click", () => {
                infoWindow.set("clicked", false);
                infoWindow.close();
              });
            }
          });
        }
      });
    },
    async setMapCenterByPlaceId(placeId) {
      if (!this.map) return;

      const service = new google.maps.places.PlacesService(this.map);

      service.getDetails({ placeId }, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && place.geometry) {
          this.map.setCenter(place.geometry.location);
          this.map.setZoom(14);
        } else {
          console.error(`PlacesService was not successful for the following reason: ${status}`);
        }
      });
    },
  },
};
</script>

<style scoped>
.map-carousel {
  margin-top: 20px;
  position: relative;
}

.map {
  height: 500px;
  width: 100%;
  border-radius: 20px;
}
</style>
