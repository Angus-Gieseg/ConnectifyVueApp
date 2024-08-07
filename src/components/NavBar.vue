<template>
  <div>
    <p-menubar :model="menuItems">
      <template #start>
        <div class="logo-container" @click="$router.push('/')">
          <img
            src="../assets/connectifyIcon.svg"
            alt="Connectify Logo"
            height="30"
            class="mr-2"
          />
          <p class="logo-text">ConnectifyNZ</p>
        </div>
      </template>
      <template #end>
        <div v-if="isAuthenticated">
          <span>Welcome, {{ userDetails?.firstName || "User" }}</span>
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
  data() {
    return {
      menuItems: [],
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated", "userDetails", "isPractitioner", "user"]),
    profileRoute() {
      console.log("Calculating profileRoute:");
      console.log("isPractitioner:", this.isPractitioner);
      console.log("userDetails:", this.userDetails);
      console.log("isAuthenticated:", this.isAuthenticated);
      console.log("user:", this.user);

      if (!this.isAuthenticated || !this.user) {
        console.log("User not authenticated or user object not available");
        return "/login";
      }

      if (this.isPractitioner === null || this.isPractitioner === undefined) {
        console.log("isPractitioner is null or undefined");
        return "/loading"; // You might want to create a loading route/component
      }

      if (this.isPractitioner) {
        console.log("Routing to practitioner profile");
        return `/practitioner-profile/${this.user.uid}`;
      } else {
        console.log("Routing to client profile");
        return `/myprofile/${this.user.uid}`;
      }
    },
  },
  methods: {
    ...mapActions(["signOut"]),
    updateMenuItems() {
      console.log("Updating menu items");
      console.log("Current profileRoute:", this.profileRoute);

      this.menuItems = [
        {
          label: "Home",
          icon: "pi pi-fw pi-home",
          command: () => {
            this.$router.push("/");
          },
        },
        {
          label: "Profile",
          icon: "pi pi-fw pi-user",
          command: () => {
            console.log(
              "Profile menu item clicked, routing to:",
              this.profileRoute
            );
            this.$router.push(this.profileRoute);
          },
          visible: this.isAuthenticated,
        },
        {
          label: "Create Feedback Form",
          icon: "pi pi-fw pi-file-edit",
          command: () => {
            this.$router.push("/create_feedback_form");
          },
          visible: this.isAuthenticated && this.isPractitioner,
        },
      ];
    },
  },
  watch: {
    userDetails: {
      handler() {
        this.updateMenuItems();
      },
      immediate: true,
    },
    isPractitioner: {
      handler() {
        this.updateMenuItems();
      },
      immediate: true,
    },
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
  cursor: pointer;
}

.logo-text {
  margin: 0;
  font-size: 1.5em;
  color: black;
}
</style>
