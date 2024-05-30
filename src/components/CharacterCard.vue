<template>
  <div :class="['character-card', character.character_class]">
    <div class="card-header">
      <h3>{{ character.character_name }}</h3>
      <button @click="uploadImage">Upload Image</button>
    </div>
    <p class="importance">{{ character.character_importance }}</p>
    <ul class="characteristics">
      <li v-for="(char, index) in character.characteristics" :key="index">
        {{ char }}
      </li>
    </ul>
    <p class="description">{{ character.short_description }}</p>
  </div>
</template>

<script>
export default {
  name: "CharacterCard",
  props: {
    character: {
      type: Object,
      required: true,
    },
  },
  methods: {
    uploadImage() {
      // Logic for uploading an image
    },
  },
};
</script>

<style scoped>
.character-card {
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  color: #fff;
  transition: transform 0.3s ease;
}

.character-card:hover {
  transform: translateY(-10px);
}

.character-card.cop {
  background-color: #007bff;
}

.character-card.mafia,
.character-card.murder {
  background-color: #6a1b9a;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h3 {
  margin: 0;
}

.card-header button {
  padding: 5px 10px;
  background-color: #fff;
  color: #333;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.card-header button:hover {
  background-color: #ddd;
}

.importance {
  font-style: italic;
  margin-bottom: 10px;
}

.characteristics {
  list-style: disc inside;
  margin-bottom: 10px;
}

.description {
  margin-top: 10px;
}
</style>
