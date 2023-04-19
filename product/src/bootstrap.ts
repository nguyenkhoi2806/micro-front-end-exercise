import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "owl.carousel/dist/owl.carousel.min";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import "jquery-ui-bundle/jquery-ui.min.css";
import "jquery-ui-bundle/jquery-ui.min.js";
import "jquery-nice-select/js/jquery.nice-select.min.js";

import "./assets/scss/style.scss";


createApp(App).use(store).use(router).mount("#app");
