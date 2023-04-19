import { createApp } from "vue";

import FeaturedProducts from "./FeaturedProducts.vue";

export default (el: any, props: any) => {
  createApp(FeaturedProducts, props).mount(el);
};
