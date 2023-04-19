import { pinia } from "@/bootstrap"; 
import { createApp } from "vue";
import Checkout from "./Checkout.vue";

export default (el: any, props: any) => {
  createApp(Checkout, props).use(pinia).mount(el);
};
