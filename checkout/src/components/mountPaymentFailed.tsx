import { createApp } from "vue";
import PaymentFailed from "./PaymentFailed.vue";

export default (el: any, props: any) => {
  createApp(PaymentFailed, props).mount(el);
};
