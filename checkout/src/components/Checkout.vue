<template>
  <section class="checkout spad">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <h6>
            <span class="icon_tag_alt" />
            Have a coupon? <a href="#">Click here</a> to enter your code
          </h6>
        </div>
      </div>
      <div class="checkout__form">
        <h4>Billing Details</h4>
        <form @submit.prevent="onPayment">
          <div class="row">
            <div class="col-lg-8 col-md-6">
              <div class="row">
                <div class="col-lg-6">
                  <div class="checkout__input">
                    <p>Fist Name<span>*</span></p>
                    <input type="text" required />
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="checkout__input">
                    <p>Last Name<span>*</span></p>
                    <input type="text" required />
                  </div>
                </div>
              </div>
              <div class="checkout__input">
                <p>Country<span>*</span></p>
                <input type="text" required />
              </div>
              <div class="checkout__input">
                <p>Address<span>*</span></p>
                <input
                  type="text"
                  placeholder="Street Address"
                  class="checkout__input__add"
                  required
                />
                <input
                  type="text"
                  placeholder="Apartment, suite, unite ect (optinal)"
                />
              </div>
              <div class="checkout__input">
                <p>Town/City<span>*</span></p>
                <input type="text" required />
              </div>
              <div class="checkout__input">
                <p>Country/State<span>*</span></p>
                <input type="text" required />
              </div>
              <div class="checkout__input">
                <p>Postcode / ZIP<span>*</span></p>
                <input type="number" required />
              </div>
              <div class="row">
                <div class="col-lg-6">
                  <div class="checkout__input">
                    <p>Phone<span>*</span></p>
                    <input type="text" required />
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="checkout__input">
                    <p>Email<span>*</span></p>
                    <input type="email" required />
                  </div>
                </div>
              </div>
              <div class="checkout__input">
                <p>Order notes<span>*</span></p>
                <input
                  type="text"
                  placeholder="Notes about your order, e.g. special notes for delivery."
                  required
                />
              </div>
            </div>
            <div class="col-lg-4 col-md-6">
              <div class="checkout__order">
                <h4>Your Order</h4>
                <div class="checkout__order__products">
                  Products <span>Total</span>
                </div>
                <ul v-if="cartData">
                  <li v-for="item in cartData.items" :key="item.id">
                    {{ item.title }}
                    <span>
                      {{ item.price }}
                    </span>
                  </li>
                </ul>
                <div class="checkout__order__subtotal">
                  Subtotal <span>${{ cartData?.subTotal.toFixed(2) }}</span>
                </div>
                <div class="checkout__order__total">
                  Total <span>${{ cartData?.grandTotal.toFixed(2) }}</span>
                </div>
                <div class="checkout__input__checkbox">
                  <label htmlFor="payment">
                    Check Payment
                    <input type="checkbox" id="payment" v-model="isCheck" />
                    <span class="checkmark" />
                  </label>
                </div>
                <div class="checkout__input__checkbox">
                  <label htmlFor="paypal">
                    Paypal
                    <input type="checkbox" id="paypal" v-model="isPaypal" />
                    <span class="checkmark" />
                  </label>
                </div>
                <p class="text-danger" v-show="!isSelectPayment">
                  Payment is required!
                </p>
                <button type="submit" class="site-btn">PLACE ORDER</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useCartStore } from "@/store/cart";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "Checkout",
  props: ["navigate", "token", "eventBus"],
  setup() {
    const cartStore = useCartStore();
    const { cartData } = storeToRefs(cartStore);
    cartStore.load();
    return { cartStore, cartData };
  },
  data() {
    return {
      isCheck: false,
      isPaypal: false,
    };
  },
  computed: {
    isSelectPayment() {
      return this.isCheck || this.isPaypal;
    },
  },
  methods: {
    onPayment: function (event: any) {
      event.preventDefault();
      if (!this.isCheck && !this.isPaypal) return;
      let messageEvent: any = {};
      if (this.isPaypal) {
        this.navigate("/payment-success");
        this.eventBus.emit("showMessage", null, {
          detail: {
            serverity: "success",
            message: "Your order has been paid successfully",
          },
        });
        this.cartStore.removeCartData();
        this.cartStore.saveOrder({
          paymentMethod: "paypal",
          paymentStatus: "success",
        });
      } else {
        this.navigate("/payment-failed");
        this.eventBus.emit("showMessage", null, {
          detail: {
            serverity: "fail",
            message:
              "There is a problem with your payment, please check your information and try again",
          },
        });
        this.cartStore.saveOrder({
          paymentMethod: "check",
          paymentStatus: "failed",
        });
      }
      if (Object.keys(messageEvent).length > 0) {
        document.body.dispatchEvent(messageEvent);
      }
    },
  },
});
</script>
