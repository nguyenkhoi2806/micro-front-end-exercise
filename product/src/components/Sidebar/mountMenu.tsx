import { createApp } from "vue";

import Menu from "./Menu.vue";

export default (el: any, props: any) => {
  createApp(Menu, props).mount(el);
};
