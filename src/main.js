import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import "./firebase"; // Ensure this line is included to initialize Firebase
import store from "./store/store"; // If using Vuex
import "primevue/resources/themes/saga-blue/theme.css"; // or any other theme
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

const app = createApp(App);

app.use(PrimeVue);
app.use(router);
app.use(store);
app.mount("#app");
