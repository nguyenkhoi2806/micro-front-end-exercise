import { createApp } from "vue";

import CategoryCard from "../Category/CategoryCard.vue";

export default (el: any, props: any) => {
  createApp(CategoryCard, props).mount(el);
};
