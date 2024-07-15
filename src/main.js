import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import "./firebase"; // Ensure this line is included to initialize Firebase
import store from "./store/store"; // If using Vuex
import InputText from "primevue/inputtext";
import Rating from "primevue/rating";
import Button from "primevue/button";
import InputNumber from "primevue/inputnumber";
import "primevue/resources/themes/saga-blue/theme.css"; // or any other theme
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

const app = createApp(App);

app.use(PrimeVue);
app.use(router);
app.component("InputText", InputText);
app.component("Rating", Rating);
app.component("Button", Button);
app.component("InputNumber", InputNumber);
app.use(store);
app.mount("#app");
