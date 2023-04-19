import { createApp } from "vue";
import PaymentSuccess from "./PaymentSuccess.vue";

export default (el: any, props: any) => {
  createApp(PaymentSuccess, props).mount(el);
};
