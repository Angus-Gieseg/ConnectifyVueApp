<template>
  <div>
    <h2>Characters</h2>
    <div class="characters-container">
      <CharacterCard
        v-for="(character, index) in character_list"
        :key="index"
        :character="character"
      />
    </div>
  </div>
</template>

<script>
import CharacterCard from "./CharacterCard.vue";

export default {
  name: "CharactersCollection",
  components: {
    CharacterCard,
  },
  props: {
    character_list: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.characters-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
</style>
