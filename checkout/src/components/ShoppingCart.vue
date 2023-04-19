<template>
  <template v-if="!cartData || !cartData.items.length">
    <div class="row">
      <div class="col-lg-12">
        <h3>Your cart is empty!</h3>
      </div>
    </div>
  </template>
  <template v-else>
    <div class="row">
      <div class="col-lg-12">
        <div class="shoping__cart__table">
          <table>
            <thead>
              <tr>
                <th class="shoping__product">Products</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th />
              </tr>
            </thead>
            <tbody>
              <CartItem
                v-for="item in cartData.items"
                :key="item.id"
                :item="item"
                @removeItem="removeItem"
                @updateQty="onChangeQty"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <div class="shoping__cart__btns">
          <a class="primary-btn cart-btn" @click="navigate(`/shop`)">
            CONTINUE SHOPPING
          </a>
          <a
            class="primary-btn cart-btn cart-btn-right"
            @click="onUpdateLocalStorage"
          >
            <span class="icon_loading" />
            UPDATE CART
          </a>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="shoping__continue">
          <div class="shoping__discount">
            <h5>Discount Codes</h5>
            <form>
              <input type="text" placeholder="Enter your coupon code" />
              <button type="submit" class="site-btn">APPLY COUPON</button>
            </form>
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="shoping__checkout">
          <h5>Cart Total</h5>
          <ul>
            <li>
              Subtotal <span>{{ cartData.subTotal.toFixed(2) }}</span>
            </li>
            <li>
              Total <span>{{ cartData.grandTotal.toFixed(2) }}</span>
            </li>
          </ul>
          <a class="primary-btn" @click="navigateToCheckOut">
            PROCEED TO CHECKOUT
          </a>
        </div>
      </div>
    </div>
  </template>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import CartItem from "./CartItem.vue";
import { IItemCart } from "@/utils/loadStorage";
import { useCartStore } from "@/store/cart";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "ShoppingCart",
  components: { CartItem },
  props: ["navigate", "token"],
  setup() {
    const cartStore = useCartStore();
    const { cartData } = storeToRefs(cartStore);
    cartStore.load();
    return { cartStore, cartData };
  },
  methods: {
    removeItem(item: any) {
      this.cartStore.removeItem(item);
    },

    onChangeQty(item: IItemCart) {
      this.cartStore.onChangeQty(item);
    },

    onUpdateLocalStorage() {
      this.cartStore.onUpdateLocalStorage();
    },

    navigateToCheckOut() {
      this.navigate("/checkout");
    },
  },
});
</script>

<style lang="scss" scope>
@import "@/style/sass/variables";

.shoping-cart {
  padding-top: 80px;
  padding-bottom: 80px;
}

.shoping__cart__table {
  margin-bottom: 30px;

  table {
    width: 100%;
    text-align: center;

    thead {
      tr {
        border-bottom: 1px solid $border;
      }

      th {
        font-size: 20px;
        font-weight: 700;
        color: $normal-color;
        padding-bottom: 20px;

        &.shoping__product {
          text-align: left;
        }
      }
    }

    tbody {
      tr {
        td {
          padding-top: 30px;
          padding-bottom: 30px;
          border-bottom: 1px solid $border;

          &.shoping__cart__item {
            width: 630px;
            text-align: left;

            img {
              display: inline-block;
              margin-right: 25px;
              width: 100px;
              height: auto;
            }

            h5 {
              color: $normal-color;
              display: inline-block;
            }
          }

          &.shoping__cart__price {
            font-size: 18px;
            color: $normal-color;
            font-weight: 700;
            width: 100px;
          }

          &.shoping__cart__total {
            font-size: 18px;
            color: $normal-color;
            font-weight: 700;
            width: 110px;
          }

          &.shoping__cart__item__close {
            text-align: right;

            span {
              font-size: 24px;
              color: #b2b2b2;
              cursor: pointer;
            }
          }

          &.shoping__cart__quantity {
            width: 225px;

            .pro-qty {
              width: 120px;
              height: 40px;

              input {
                color: $normal-color;

                &::placeholder {
                  color: $normal-color;
                }
              }

              .qtybtn {
                width: 15px;
              }
            }
          }
        }
      }
    }
  }
}

.primary-btn.cart-btn {
  color: $para-color;
  padding: 14px 30px 12px;
  background: $background;

  span {
    font-size: 14px;
  }

  &.cart-btn-right {
    float: right;
  }
}

// .shoping__continue {}

.shoping__discount {
  margin-top: 45px;

  h5 {
    font-size: 20px;
    color: $normal-color;
    font-weight: 700;
    margin-bottom: 25px;
  }

  form {
    input {
      width: 255px;
      height: 46px;
      border: 1px solid #cccccc;
      font-size: 16px;
      color: #b2b2b2;
      text-align: center;
      display: inline-block;
      margin-right: 15px;

      &::placeholder {
        color: #b2b2b2;
      }
    }

    button {
      padding: 15px 30px 11px;
      font-size: 12px;
      letter-spacing: 4px;
      background: $para-color;
    }
  }
}

.shoping__checkout {
  background: $background;
  padding: 30px;
  padding-top: 20px;
  margin-top: 50px;

  h5 {
    color: $normal-color;
    font-weight: 700;
    font-size: 20px;
    margin-bottom: 28px;
  }

  ul {
    margin-bottom: 28px;

    li {
      font-size: 16px;
      color: $normal-color;
      font-weight: 700;
      list-style: none;
      overflow: hidden;
      border-bottom: 1px solid $border;
      padding-bottom: 13px;
      margin-bottom: 18px;

      &:last-child {
        padding-bottom: 0;
        border-bottom: none;
        margin-bottom: 0;
      }

      span {
        font-size: 18px;
        color: #dd2222;
        float: right;
      }
    }
  }

  .primary-btn {
    display: block;
    text-align: center;
  }
}
</style>
