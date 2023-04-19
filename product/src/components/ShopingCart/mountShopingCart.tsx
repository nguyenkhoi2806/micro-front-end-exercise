import { createApp } from "vue";

import ShopingCart from "./index.vue";

export default (el: any, props: any) => {
  createApp(ShopingCart, props).mount(el);
};
