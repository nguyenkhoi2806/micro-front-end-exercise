import { pinia } from "@/bootstrap";
import { createApp } from "vue";
import CartPrice from "./CartPrice.vue";

export default (el: any, props: any) => {
  createApp(CartPrice, props).use(pinia).mount(el);
};
