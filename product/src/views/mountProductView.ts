import { createApp } from "vue";

import ProductView from "./ProductView.vue";

export default (el: any, props: any) => {
  createApp(ProductView, props).mount(el);
};
