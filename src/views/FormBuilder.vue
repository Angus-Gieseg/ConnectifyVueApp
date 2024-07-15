<template>
  <div class="form-builder-container">
    <div class="form-builder">
      <h1>Create Feedback Form</h1>
      <p>Create a personalized feedback form for your clients.</p>
      <div
        v-for="(field, index) in fields"
        :key="index"
        class="p-field p-grid field-row"
      >
        <div class="p-col-12">
          <label :for="'field-' + index" class="field-label">{{
            field.label
          }}</label>
        </div>
        <div v-if="field.description" class="p-col-12 description">
          <small>{{ field.description }}</small>
        </div>
        <div class="p-col-10 field-input">
          <InputText
            v-if="field.type === 'text'"
            v-model="field.value"
            :id="'field-' + index"
            class="full-width"
          />
          <Rating
            v-if="field.type === 'rating'"
            v-model="field.value"
            :id="'field-' + index"
            :stars="5"
          />
          <SatisfactionRating
            v-if="field.type === 'satisfaction'"
            v-model="field.value"
          />
          <LikelihoodRating
            v-if="field.type === 'likelihood'"
            v-model="field.value"
          />
        </div>
        <div class="p-col-2">
          <Button
            icon="pi pi-trash"
            class="p-button-danger p-button-rounded p-button-sm"
            @click="removeField(index)"
          />
        </div>
      </div>
      <div class="p-field p-grid new-field-row">
        <div class="p-col-12">
          <InputText
            v-model="newFieldLabel"
            placeholder="Label"
            class="full-width"
          />
        </div>
        <div class="p-col-12 p-md-4">
          <select v-model="newFieldType" class="field-type-select">
            <option value="text">Text</option>
            <option value="rating">Rating</option>
            <option value="satisfaction">Satisfaction</option>
            <option value="likelihood">Likelihood</option>
          </select>
        </div>
      </div>
      <div class="p-field p-grid">
        <div class="p-col-12">
          <textarea
            v-model="newFieldDescription"
            placeholder="Description (optional)"
            class="description-textarea full-width"
          ></textarea>
        </div>
      </div>
      <Button
        label="Add Field"
        icon="pi pi-plus"
        @click="addField"
        class="add-field-button"
      />
      <Button
        label="Save Form"
        icon="pi pi-save"
        class="save-form-button"
        @click="saveForm"
      />
    </div>
  </div>
</template>

<script>
import SatisfactionRating from "../components/SatisfactionRating.vue";
import LikelihoodRating from "../components/LikelihoodRating.vue";

export default {
  components: {
    SatisfactionRating,
    LikelihoodRating,
  },
  data() {
    return {
      fields: [],
      newFieldLabel: "",
      newFieldDescription: "",
      newFieldType: "text",
    };
  },
  methods: {
    addField() {
      if (this.newFieldLabel.trim()) {
        this.fields.push({
          label: this.newFieldLabel,
          description: this.newFieldDescription,
          type: this.newFieldType,
          value: this.newFieldType === "text" ? "" : 0,
        });
        this.newFieldLabel = "";
        this.newFieldDescription = "";
        this.newFieldType = "text";
      }
    },
    removeField(index) {
      this.fields.splice(index, 1);
    },
    saveForm() {
      const formDetails = this.fields.map((field) => ({
        label: field.label,
        description: field.description,
        type: field.type,
        value: field.value,
      }));
      console.log("Form saved:", formDetails);
    },
  },
};
</script>

<style scoped>
.form-builder-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f7f9fc;
  padding: 20px;
}

.form-builder {
  background: white;
  padding: 2em;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  box-sizing: border-box;
}

h1 {
  font-size: 2em;
  margin-bottom: 0.5em;
}

p {
  margin-bottom: 1em;
  color: #6c757d;
}

.field-row {
  align-items: flex-start;
  margin-bottom: 1em;
}

.field-label {
  font-weight: bold;
}

.field-input {
  display: flex;
  flex-direction: column;
}

.description {
  margin-top: 0.5em;
}

.p-button-danger {
  margin-left: 1em;
}

.field-type-select {
  width: 100%;
  padding: 0.5em;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 1em;
}

.description-textarea {
  width: 100%;
  height: 4em; /* Adjust height as needed */
  padding: 0.5em;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 1em;
}

.full-width {
  width: 100%;
}

.add-field-button,
.save-form-button {
  margin-top: 1em;
  width: 100%;
  justify-content: center;
}

.new-field-row .p-col-12.p-md-4 {
  display: flex;
  align-items: center;
}
</style>
