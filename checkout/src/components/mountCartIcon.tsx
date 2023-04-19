import { pinia } from "@/bootstrap";
import { createApp } from "vue";
import CartIcon from "./CartIcon.vue";

export default (el: any, props: any) => {
  createApp(CartIcon, props).use(pinia).mount(el);
};
