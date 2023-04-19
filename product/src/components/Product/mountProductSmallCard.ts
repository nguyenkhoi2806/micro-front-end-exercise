import { createApp } from "vue";

import ProductSmallCard from "./ProductSmallCard.vue";

export default (el: any, props: any) => {
  createApp(ProductSmallCard, props).mount(el);
};
