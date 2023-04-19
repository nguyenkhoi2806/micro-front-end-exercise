import { createApp } from "vue";

import ProductDetailView from "./ProductDetailView.vue";

export default (el: any, props: any) => {
  createApp(ProductDetailView, props).mount(el);
};
