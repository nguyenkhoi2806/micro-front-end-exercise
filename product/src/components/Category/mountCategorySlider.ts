import { createApp } from "vue";

import CategorySlider from "../Category/CategorySlider.vue";

export default (el: any, props: any) => {
  createApp(CategorySlider, props).mount(el);
};
