<template>
  <div class="upload-page">
    <h2>Upload Murder Mystery Set</h2>
    <form @submit.prevent="uploadSet">
      <div>
        <label>Display Name:</label>
        <input v-model="displayName" type="text" required />
      </div>
      <div>
        <label>Minimum Players:</label>
        <input v-model="minimumPlayers" type="number" required />
      </div>
      <div>
        <label>Maximum Players:</label>
        <input v-model="maximumPlayers" type="number" required />
      </div>
      <div>
        <label>Price:</label>
        <input v-model="price" type="number" required />
      </div>
      <div>
        <label>Good Players:</label>
        <input v-model="players.good" type="number" required />
      </div>
      <div>
        <label>Bad Players:</label>
        <input v-model="players.bad" type="number" required />
      </div>
      <div>
        <label>Murder Players:</label>
        <input v-model="players.murder" type="number" required />
      </div>
      <div>
        <label>Long Description:</label>
        <textarea v-model="descriptionLong" required></textarea>
      </div>
      <div>
        <label>Short Description:</label>
        <textarea v-model="descriptionShort" required></textarea>
      </div>
      <div>
        <label>Purchased By:</label>
        <input v-model="purchasedBy" type="text" required />
      </div>
      <div>
        <label>Author:</label>
        <input v-model="author" type="text" required />
      </div>
      <div>
        <label>Upload Date:</label>
        <input v-model="uploadDate" type="date" required />
      </div>
      <div>
        <label>Number Completed:</label>
        <input v-model="numberCompleted" type="number" required />
      </div>
      <div>
        <label>Fun Rating:</label>
        <input v-model="feedbackRating.fun" type="number" required />
      </div>
      <div>
        <label>Difficulty Rating:</label>
        <input v-model="feedbackRating.difficulty" type="number" required />
      </div>
      <div>
        <label>Duration Rating:</label>
        <input v-model="feedbackRating.duration" type="number" required />
      </div>
      <div>
        <label>Introduction PDF:</label>
        <input type="file" @change="handleIntroductionFileUpload" required />
      </div>
      <div>
        <label>Reveal PDF:</label>
        <input type="file" @change="handleRevealFileUpload" required />
      </div>
      <div
        v-for="(character, index) in characters"
        :key="index"
        class="character-form"
      >
        <h3>Character {{ index + 1 }}</h3>
        <div>
          <label>Character Name:</label>
          <input v-model="character.character_name" type="text" required />
        </div>
        <div>
          <label>Character Importance:</label>
          <input
            v-model="character.character_importance"
            type="text"
            required
          />
        </div>
        <div>
          <label>Characteristics:</label>
          <div
            v-for="(characteristic, cIndex) in character.characteristics"
            :key="cIndex"
            class="characteristic-input"
          >
            <input v-model="character.characteristics[cIndex]" type="text" />
            <button type="button" @click="removeCharacteristic(index, cIndex)">
              Remove
            </button>
          </div>
          <button type="button" @click="addCharacteristic(index)">
            Add Characteristic
          </button>
        </div>
        <div>
          <label>Short Description:</label>
          <textarea v-model="character.short_description" required></textarea>
        </div>
        <div>
          <label>Character Profile PDF:</label>
          <input
            type="file"
            @change="handleCharacterFileUpload($event, index)"
            required
          />
        </div>
        <div>
          <label>Character Class:</label>
          <input
            type="radio"
            v-model="character.character_class"
            value="cop"
            required
          />
          Cop
          <input
            type="radio"
            v-model="character.character_class"
            value="mafia"
            required
          />
          Mafia
          <input
            type="radio"
            v-model="character.character_class"
            value="murder"
            required
          />
          Murder
        </div>
        <button type="button" @click="removeCharacter(index)">
          Remove Character
        </button>
      </div>
      <button type="button" @click="addCharacter">Add Character</button>
      <button type="submit">Upload Set</button>
      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="success" class="success">{{ success }}</p>
    </form>
  </div>
</template>
<script>
import { db, storage } from "../firebase";
import { collection, addDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default {
  name: "UploadPage",
  data() {
    return {
      displayName: "",
      minimumPlayers: 0,
      maximumPlayers: 0,
      price: 0,
      players: {
        good: 0,
        bad: 0,
        murder: 0,
      },
      descriptionLong: "",
      descriptionShort: "",
      purchasedBy: "",
      author: "",
      uploadDate: "",
      numberCompleted: 0,
      feedbackRating: {
        fun: 0,
        difficulty: 0,
        duration: 0,
      },
      introductionFile: null,
      revealFile: null,
      characters: [
        {
          character_name: "",
          character_importance: "",
          characteristics: [""],
          short_description: "",
          character_file: null,
          character_class: "",
        },
      ],
      error: "",
      success: "",
    };
  },
  methods: {
    handleIntroductionFileUpload(event) {
      this.introductionFile = event.target.files[0];
    },
    handleRevealFileUpload(event) {
      this.revealFile = event.target.files[0];
    },
    handleCharacterFileUpload(event, index) {
      this.characters[index].character_file = event.target.files[0];
    },
    addCharacter() {
      this.characters.push({
        character_name: "",
        character_importance: "",
        characteristics: [""],
        short_description: "",
        character_file: null,
        character_class: "",
      });
    },
    removeCharacter(index) {
      this.characters.splice(index, 1);
    },
    addCharacteristic(characterIndex) {
      this.characters[characterIndex].characteristics.push("");
    },
    removeCharacteristic(characterIndex, characteristicIndex) {
      this.characters[characterIndex].characteristics.splice(
        characteristicIndex,
        1
      );
    },
    async uploadSet() {
      try {
        console.log("Starting upload...");

        // Upload the introduction PDF
        console.log("Uploading introduction PDF...");
        const introRef = ref(storage, `pdfs/${this.introductionFile.name}`);
        const introSnapshot = await uploadBytes(
          introRef,
          this.introductionFile
        );
        const introURL = await getDownloadURL(introSnapshot.ref);
        console.log("Introduction PDF uploaded:", introURL);

        // Upload the reveal PDF
        console.log("Uploading reveal PDF...");
        const revealRef = ref(storage, `pdfs/${this.revealFile.name}`);
        const revealSnapshot = await uploadBytes(revealRef, this.revealFile);
        const revealURL = await getDownloadURL(revealSnapshot.ref);
        console.log("Reveal PDF uploaded:", revealURL);

        // Add the document to Firestore
        console.log("Adding product to Firestore...");
        const productRef = await addDoc(collection(db, "products"), {
          display_name: this.displayName,
          minimum_players: this.minimumPlayers,
          maximum_players: this.maximumPlayers,
          price: this.price,
          players: {
            good: this.players.good,
            bad: this.players.bad,
            murder: this.players.murder,
          },
          description_long: this.descriptionLong,
          description_short: this.descriptionShort,
          purchased_by: this.purchasedBy,
          author: this.author,
          upload_date: this.uploadDate,
          number_completed: this.numberCompleted,
          feedback_rating: {
            fun: this.feedbackRating.fun,
            difficulty: this.feedbackRating.difficulty,
            duration: this.feedbackRating.duration,
          },
          pdf_introduction: introURL,
          pdf_reveal: revealURL,
        });
        console.log("Product added to Firestore:", productRef.id);

        // Upload character PDFs and add character documents
        for (const character of this.characters) {
          console.log(
            `Uploading PDF for character ${character.character_name}...`
          );
          const characterRef = ref(
            storage,
            `pdfs/${character.character_file.name}`
          );
          const characterSnapshot = await uploadBytes(
            characterRef,
            character.character_file
          );
          const characterURL = await getDownloadURL(characterSnapshot.ref);
          console.log(`Character PDF uploaded: ${characterURL}`);

          console.log(
            `Adding character ${character.character_name} to Firestore...`
          );
          await addDoc(collection(db, `products/${productRef.id}/characters`), {
            character_name: character.character_name,
            character_importance: character.character_importance,
            characteristics: character.characteristics,
            short_description: character.short_description,
            pdf_character_profile: characterURL,
            character_class: character.character_class,
          });
          console.log(
            `Character ${character.character_name} added to Firestore.`
          );
        }

        this.success = "Murder mystery set uploaded successfully!";
        this.error = "";
        console.log("Upload successful!");
      } catch (error) {
        console.error("Error during upload:", error);
        this.error = error.message;
        this.success = "";
      }
    },
  },
};
</script>

<style scoped>
.upload-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 4px;
}

form > div {
  margin-bottom: 10px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input,
textarea {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

button {
  padding: 10px 15px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #0056b3;
}

.error {
  color: red;
}

.success {
  color: green;
}

.character-form {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
}

.character-form h3 {
  margin-top: 0;
}

.character-form button {
  background: #ff0000;
}

.character-form button:hover {
  background: #cc0000;
}
</style>
