<template>
  <div>
    <p-menubar :model="items">
      <template #start>
        <img
          src="../assets/AtHomeGamesSmall.png"
          alt="logo"
          height="40"
          class="mr-2"
        />
      </template>
    </p-menubar>
  </div>
</template>

<script>
import Menubar from "primevue/menubar";

export default {
  name: "NavBar",
  components: {
    "p-menubar": Menubar,
  },
  data() {
    return {
      items: [
        {
          label: "Home",
          icon: "pi pi-fw pi-home",
          command: () => {
            this.$router.push("/");
          },
        },
        {
          label: "Packages",
          icon: "pi pi-fw pi-box",
          command: () => {
            this.$router.push("/ProductPackages");
          },
        },
        {
          label: "Login",
          icon: "pi pi-fw pi-sign-in",
          command: () => {
            this.$router.push("/login");
          },
        },
        {
          label: "Sign Up",
          icon: "pi pi-fw pi-user-plus",
          command: () => {
            this.$router.push("/signup");
          },
        },
      ],
    };
  },
};
</script>

<style scoped>
.p-menubar {
  background-color: #ffffff;
  color: white;
}

.p-menubar .p-menubar-root-list > .p-menubar-item > .p-menuitem-link {
  color: white;
}

.p-menubar .p-menubar-root-list > .p-menubar-item > .p-menuitem-link:hover {
  background-color: #ffffff;
}
</style>
