<!-- src/views/LandingPage.vue -->
<template>
  <div class="landing-page">
    <header class="hero">
      <div class="hero-content">
        <h1>🎉 Welcome to Murder Mystery Nights 🎉</h1>
        <p>
          Immerse yourself in thrilling stories written by New Zealand writers.
          Get ready for an unforgettable evening of mystery and fun!
        </p>
        <button @click="navigateToJoin">Join the Mystery</button>
        <router-link to="/login" class="login-link">Login</router-link>
      </div>
    </header>
    <section class="features">
      <h2>✨ Game Features ✨</h2>
      <p>
        Engage with in-depth character profiles and improvise your way through
        the story.
      </p>
      <p>
        Split into three teams: the Murderer, the Civilians, and the Mafia. Can
        you achieve your objectives?
      </p>
    </section>
    <section class="teams">
      <h2>🚀 Teams 🚀</h2>
      <div class="team">
        <img src="../assets/murder.png" alt="Murderer Icon" />
        <h3>The Murderer</h3>
        <p>Stay hidden and mislead the others to achieve your goal.</p>
      </div>
      <div class="team">
        <img src="../assets/cop.png" alt="Civilians Icon" />
        <h3>The Civilians</h3>
        <p>Work together to uncover the truth and bring justice.</p>
      </div>
      <div class="team">
        <img src="../assets/mafia.png" alt="Mafia Icon" />
        <h3>The Mafia</h3>
        <p>Seek retribution and manipulate the game to your advantage.</p>
      </div>
    </section>
    <section>
      <CreatedEvent />
    </section>
  </div>
</template>

<script>
import CreatedEvent from "../components/CreatedEvent.vue";

export default {
  name: "LandingPage",
  methods: {
    navigateToJoin() {
      this.$router.push("/join");
    },
  },
  components: {
    CreatedEvent,
  },
};
</script>

<style scoped>
.landing-page {
  font-family: "Arial", sans-serif;
  background-color: #ffffff;
  color: #333333;
}

.hero {
  background-image: url(""); /* Placeholder for your hero image */
  background-size: cover;
  background-position: center;
  padding: 5rem 2rem;
  color: #ffffff;
  text-align: center;
  position: relative;
}

.hero::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}

.hero-content {
  position: relative;
  z-index: 1;
}

.login-link {
  display: block;
  margin-top: 1rem;
  color: #ffffff;
  text-decoration: none;
  font-size: 1rem;
  background-color: #007bff;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.login-link:hover {
  background-color: #0056b3;
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

.hero button {
  background-color: #ff6600;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.25rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.hero button:hover {
  background-color: #e65500;
}

.features,
.teams {
  margin: 4rem 2rem;
  text-align: center;
}

.features h2,
.teams h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #9933ff;
}

.features p,
.teams .team p {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: #333333;
}

.team {
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.team img {
  width: 100px;
  height: 100px;
  margin-bottom: 1rem;
}

.team h3 {
  font-size: 1.75rem;
  margin-bottom: 0.5rem;
  color: #007bff;
}
</style>
