<template>
  <div class="productpackages-page">
    <div class="productpackages-container">
      <h2>Available productpackages</h2>
      <div class="productpackages-list">
        <div
          class="productpackage"
          v-for="productpackage in productpackages"
          :key="productpackage.id"
        >
          <h3>{{ productpackage.name }}</h3>
          <p>{{ productpackage.description }}</p>
          <p>
            <strong>Price: ${{ productpackage.price }}</strong>
          </p>
          <p-button label="Purchase" @click="purchase(productpackage.id)" />
        </div>
      </div>
    </div>
  </div>
  <UploadMurderMyster />
</template>

<script>
import Button from "primevue/button";
import UploadMurderMyster from "../components/UploadMurderMyster.vue";

export default {
  name: "productpackagesPage",
  components: {
    "p-button": Button,
    UploadMurderMyster,
  },
  data() {
    return {
      productpackages: [
        {
          id: 1,
          name: "Basic productpackage",
          description: "The basic mystery productpackage.",
          price: 10,
        },
        {
          id: 2,
          name: "Standard productpackage",
          description: "The standard mystery productpackage.",
          price: 20,
        },
        {
          id: 3,
          name: "Premium productpackage",
          description: "The premium mystery productpackage.",
          price: 30,
        },
      ],
    };
  },
  methods: {
    purchase(productpackageId) {
      alert(`productpackage ${productpackageId} purchased!`);
      // Implement actual purchase logic here
    },
  },
};
</script>

<style scoped>
.productpackages-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
}

.productpackages-container {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 600px;
}

h2 {
  margin-bottom: 1.5rem;
}

.productpackages-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.productpackage {
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.productpackage h3 {
  margin-bottom: 0.5rem;
}

.p-button {
  margin-top: 1rem;
}
</style>
