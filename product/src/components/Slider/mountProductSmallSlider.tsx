import { createApp } from "vue";

import ProductSmallSlider from "./ProductSmallSlider.vue";

export default (el: any, props: any) => {
  createApp(ProductSmallSlider, props).mount(el);
};
