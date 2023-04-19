import { createApp } from "vue";

import SuggestProducts from "./SuggestProducts.vue";

export default (el: any, props: any) => {
  createApp(SuggestProducts, props).mount(el);
};
