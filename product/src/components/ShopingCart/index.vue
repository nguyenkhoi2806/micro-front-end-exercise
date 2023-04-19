<template>
  <div>
    <section
      class="breadcrumb-section set-bg"
      :style="{ 'background-image': `url(${require('@/assets/img/breadcrumb.jpg')})`, color: 'red' }"
    >
      <div class="container">
        <div class="row">
          <div class="col-lg-12 text-center">
            <div class="breadcrumb__text">
              <h2>Shoping Cart</h2>
              <div class="breadcrumb__option">
                <a href="./index.html">Home</a>
                <span>Shoping Cart</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="shoping-cart spad">
      <div class="container">
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
                    <th></th>
                  </tr>
                </thead>
                <tbody v-for="product in products" :key="product.name">
                  <tr>
                    <td class="shoping__cart__item">
                      <img src="img/cart/cart-1.jpg" alt="" />
                      <h5>{{ product.name }}</h5>
                    </td>
                    <td class="shoping__cart__price">{{ product.price }}</td>
                    <td class="shoping__cart__quantity">
                      <div class="quantity">
                        <div class="pro-qty">
                          <input type="text" value="1" />
                        </div>
                      </div>
                    </td>
                    <td class="shoping__cart__total">
                      {{ product.price * 2 }}
                    </td>
                    <td class="shoping__cart__item__close">
                      <span class="icon_close"></span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <div class="shoping__cart__btns">
              <a href="#" class="primary-btn cart-btn">CONTINUE SHOPPING</a>
              <a href="#" class="primary-btn cart-btn cart-btn-right"
                ><span class="icon_loading"></span> UPDATE CART</a
              >
            </div>
          </div>
          <div class="col-lg-6">
            <div class="shoping__continue">
              <div class="shoping__discount">
                <h5>Discount Codes</h5>
                <form action="#">
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
                <li>Subtotal <span>$454.98</span></li>
                <li>Total <span>$454.98</span></li>
              </ul>
              <a href="#" class="primary-btn">PROCEED TO CHECKOUT</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "ShopingCart",
  data() {
    return {
      products: [
        {
          id: 11,
          list_img: [
            {
              url: "https://i5.walmartimages.com/asr/93a17e9f-c519-487e-8f61-6f7b58fc764f.07776d55da72f8818cec403ec35ff81c.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
            },
            {
              url: "https://i5.walmartimages.com/asr/c3c11ae2-04fa-4361-9ade-4eb92b98d6f0_2.cb2cd6f71af8bb6549a195248e14773d.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
            },
          ],
          name: "Organic Bananas, Bunch",
          price: 1.7,
          created_at: "2022-07-18T05:28:29.53744+00:00",
        },
        {
          id: 10,
          list_img: [
            {
              url: "https://i5.walmartimages.com/asr/62772744-da31-4f57-a23b-23ab0eaec305.5c3a7335c102925a601804db3a9b3077.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
            },
            {
              url: "https://i5.walmartimages.com/asr/e7e4a74e-e5c6-4319-84ba-19ca7f97ee5d_1.2ff00992ed1782e7b014a9588296c866.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
            },
            {
              url: "https://i5.walmartimages.com/asr/bb85a5d4-e49a-42a5-964d-e138f20fca24_1.8ac11ca645b78b601aa7df5f26e36330.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
            },
          ],
          name: "Quaker, Old Fashioned Oatmeal, Whole Grain",
          price: 5.68,
          created_at: "2022-07-18T05:27:09.475589+00:00",
        },
        {
          id: 9,
          list_img: [
            {
              url: "https://post.healthline.com/wp-content/uploads/2020/09/papaya-benefits-732x549-thumbnail-732x549.jpg",
            },
            {
              url: "https://www.researchgate.net/publication/330426981/figure/fig1/AS:715900785266692@1547695456222/Papaya-coloration-during-papaya-fruit-ripening-a-The-color-of-peel-and-flesh-at-the.png",
            },
          ],
          name: "Fresh Papaya, Size Varies",
          price: 4,
          created_at: "2022-07-18T05:25:02.882807+00:00",
        },
      ],
    };
  },
});
</script>