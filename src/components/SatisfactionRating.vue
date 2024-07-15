<template>
  <div class="rating-container">
    <div class="rating-options">
      <span
        v-for="(option, index) in options"
        :key="index"
        class="rating-option"
      >
        <input
          type="radio"
          :id="`satisfaction-${index}`"
          :value="index + 1"
          v-model="value"
        />
        <label :for="`satisfaction-${index}`" class="rating-circle"></label>
      </span>
    </div>
    <div class="rating-labels">
      <span>{{ options[0] }}</span>
      <span>{{ options[2] }}</span>
      <span>{{ options[options.length - 1] }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: Number,
      default: 3,
    },
  },
  data() {
    return {
      value: this.modelValue,
      options: [
        "Very Dissatisfied",
        "Dissatisfied",
        "Neutral",
        "Satisfied",
        "Very Satisfied",
      ],
    };
  },
  watch: {
    value(newValue) {
      this.$emit("update:modelValue", newValue);
    },
  },
};
</script>

<style scoped>
.rating-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.rating-options {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.rating-option {
  display: inline-block;
}

.rating-option input[type="radio"] {
  display: none;
}

.rating-circle {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #e0e0e0;
  cursor: pointer;
}

.rating-option input[type="radio"]:checked + .rating-circle {
  background-color: #007bff;
}

.rating-labels {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 5px;
}
</style>
