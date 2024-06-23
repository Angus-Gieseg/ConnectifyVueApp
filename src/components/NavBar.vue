<template>
  <div>
    <p-menubar :model="menuItems">
      <template #start>
        <div class="logo-container">
          <img
            src="../assets/connectifyIcon.svg"
            alt="Connectify Logo"
            height="30"
            class="mr-2"
            @click="$router.push('/')"
          />
          <p class="logo-text">ConnectifyNZ</p>
        </div>
      </template>
      <template #end>
        <div v-if="isAuthenticated">
          <span>Welcome, {{ userDetails?.name || "User" }}</span>
          <Button
            label="Sign Out"
            icon="pi pi-sign-out"
            class="p-button p-component"
            @click="signOut"
          />
        </div>
        <div v-else>
          <Button
            label="Login"
            icon="pi pi-sign-in"
            class="p-button p-component"
            @click="$router.push('/login')"
          />
        </div>
      </template>
    </p-menubar>
  </div>
</template>

<script>
import Menubar from "primevue/menubar";
import Button from "primevue/button";
import { mapGetters, mapActions } from "vuex";
import { auth } from "../firebase";

export default {
  name: "NavBar",
  components: {
    "p-menubar": Menubar,
    Button,
  },
  computed: {
    ...mapGetters(["isAuthenticated", "userDetails"]),
  },
  data() {
    return {
      menuItems: [
        {
          label: "Profile",
          icon: "pi pi-fw pi-user",
          command: () => {
            this.$router.push(`/myprofile/${this.$store.state.user?.uid}`);
          },
          visible: this.isAuthenticated,
        },
      ],
    };
  },
  watch: {
    isAuthenticated: {
      immediate: true,
      handler(newVal) {
        this.menuItems = this.menuItems.map((item) => {
          if (item.label === "Profile") {
            item.visible = newVal;
          }
          return item;
        });
      },
    },
  },
  methods: {
    ...mapActions(["signOut"]),
  },
  created() {
    this.$store.dispatch("fetchAuthUser");
  },
};
</script>

<style scoped>
.p-menubar {
  background-color: #ffffff;
  color: black;
}

.p-menubar .p-menubar-root-list > .p-menubar-item > .p-menuitem-link {
  color: black;
}

.p-menubar .p-menubar-root-list > .p-menubar-item > .p-menuitem-link:hover {
  background-color: #ffffff;
}

.p-button {
  margin-left: 10px;
}

.logo-container {
  margin-left: 20px;
  display: flex;
  align-items: center;
}

.logo-text {
  margin: 0;
  font-size: 1.5em;
  color: black;
}
</style>
