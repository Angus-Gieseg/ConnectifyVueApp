<template>
  <div>
    <input
      type="text"
      id="autocomplete"
      ref="autocomplete"
      v-model="address"
      @input="onInputChange"
      placeholder="Enter your address"
    />
  </div>
</template>

<script>
import { loadGoogleMaps } from "../composables/loadGoogleMaps"; // Adjust the path as necessary

export default {
  data() {
    return {
      address: "",
      autocomplete: null,
    };
  },
  mounted() {
    loadGoogleMaps("AIzaSyC32U2FipoVpDOVdqExksQ8OoKvLQLDA-U")
      .then(() => {
        this.initAutocomplete();
      })
      .catch((error) => {
        console.error(error);
      });
  },
  methods: {
    initAutocomplete() {
      this.autocomplete = new google.maps.places.Autocomplete(
        this.$refs.autocomplete,
        {
          types: ["address"],
        }
      );
      this.autocomplete.addListener("place_changed", this.onPlaceChanged);
    },
    onPlaceChanged() {
      const place = this.autocomplete.getPlace();
      this.address = place.formatted_address;
      console.log(place);
      console.log(this.address);
      console.log(place.vicinity);
      console.log(place.place_id);
      const locationData = {
        full_address: this.address,
        suburb: place.vicinity,
        place_id: place.place_id,
        city: place.address_components[3].long_name,
      };
      this.$emit("full-address", locationData);
    },
    onInputChange() {
      console.log(this.address);
    },
  },
};
</script>

<style scoped>
input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
</style>
