import { createApp } from "vue";

import Chatbox from "./index.vue";

export default (el: any, props: any) => {
  createApp(Chatbox, props).mount(el);
};
