import { createApp } from "vue";

import ProductCard from "./ProductCard.vue";

export default (el: any, props: any) => {
  createApp(ProductCard, props).mount(el);
};
