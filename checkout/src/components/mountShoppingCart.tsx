import { pinia } from "@/bootstrap";
import { createApp } from "vue";
import ShoppingCart from "./ShoppingCart.vue";

export default (el: any, props: any) => {
  createApp(ShoppingCart, props).use(pinia).mount(el);
};
