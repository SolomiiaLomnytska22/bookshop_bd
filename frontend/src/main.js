import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import notifications from '@kyvg/vue3-notification'

createApp(App).use(store).use(router).use(notifications).mount("#app");
