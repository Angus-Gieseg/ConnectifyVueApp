<template>
  <footer class="footer">
    <div class="p-grid p-justify-between p-align-start footer-content">
      <div class="p-col-12 p-md-4 contact-section">
        <h2>Contact</h2>
        <div class="links">
          <a href="#">T&Cs</a>
          <a href="#">Privacy</a>
        </div>
        <h3>Socials</h3>
        <div class="social-icons">
          <Button
            icon="pi pi-facebook"
            class="p-button-rounded p-button-secondary"
          />
          <Button
            icon="pi pi-instagram"
            class="p-button-rounded p-button-secondary"
          />
          <Button
            icon="pi pi-tiktok"
            class="p-button-rounded p-button-secondary"
          />
        </div>
      </div>
      <div class="p-col-12 p-md-8 logo-section">
        <img
          src="../assets/connectifyIcon.svg"
          alt="Connectify Logo"
          height="30"
          class="mr-2"
        />
        <p>ConnectifyNZ</p>
      </div>
    </div>
  </footer>
</template>

<script>
import "primeicons/primeicons.css";
export default {
  name: "Footer",
};
</script>

<style scoped>
.footer {
  background-color: #333333; /* Adjust the color as needed */
  color: #ffffff;
  padding: 20px 0;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.contact-section {
  max-width: 300px;
}

.contact-section h2,
.contact-section h3 {
  margin: 0 0 10px;
}

.links {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}
a {
  color: white;
}
.social-icons {
  display: flex;
  gap: 20px;
}

.logo-section {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.logo {
  max-height: 60px; /* Adjust the logo size as needed */
}
</style>
