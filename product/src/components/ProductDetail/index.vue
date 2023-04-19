<template>
  <section class="product-details spad">
    <div class="container">
      <div class="row">
        <div class="col-lg-6 col-md-6">
          <div class="product__details__pic">
            <div class="product__details__pic__item">
              <Image :src="item.list_img?.[0]?.url" class-name="product__details__pic__item--large" />
            </div>
            <div class="product__details__pic__slider owl-carousel">
              <Image v-for="image in item.list_img" :key="image.id" :src="image.url" @click="zoomImage(image.url)" />
            </div>
          </div>
        </div>
        <div class="col-lg-6 col-md-6">
          <div class="product__details__text">
            <h3>{{ item.name }}</h3>
            <div class="product__details__rating">
              <i v-for="index in item.rated" :key="index" class="fa fa-star"></i>
              <span> {{ item.reviews }} review(s)</span>
            </div>
            <div class="product__details__price">${{ item.price }}</div>
            <p>
              {{ item.description_short }}
            </p>
            <div class="product__details__quantity">
              <div class="quantity">
                <div class="pro-qty">
                  <input type="text" value="1" />
                </div>
              </div>
            </div>
            <span class="primary-btn"
              @click="addToCart(item)">
              ADD TO CARD
            </span>
            <a href="#" class="heart-icon"><span class="icon_heart_alt"></span></a>
            <ul>
              <li>
                <b>Availability</b>
                <span v-if="item.availability">In stock</span>
                <span v-else class="text-danger">Out of stock</span>
              </li>
              <li>
                <b>Shipping</b>
                <span>01 day shipping. <samp class="text-danger">Free pickup today</samp></span>
              </li>
              <li>
                <b>Weight</b> <span>{{ item.weight }} kg</span>
              </li>
              <li>
                <b>Share on</b>
                <div class="share">
                  <a href="#"><i class="fa fa-facebook"></i></a>
                  <a href="#"><i class="fa fa-twitter"></i></a>
                  <a href="#"><i class="fa fa-instagram"></i></a>
                  <a href="#"><i class="fa fa-pinterest"></i></a>
                </div>
              </li>
            </ul>
            <div @click="openChatbox" class="primary-btn mt-3 cursor-pointer">
              <i class="fa fa-comment" />
              Chat now
            </div>
          </div>
        </div>
        <div class="col-lg-12">
          <div class="product__details__tab">
            <!-- Bootstrap Dynamic Tabs -->
            <ul class="nav nav-tabs" role="tablist">
              <li class="nav-item" v-for="tab in tabs" :key="tab.name">
                <a :class="[
                  'nav-link text-capitalize',
                  active === tab.name ? 'active' : '',
                ]" data-toggle="tab" role="tab" @click="active = tab.name" aria-selected="true">{{ tab.name }}</a>
              </li>
            </ul>
            <div class="tab-content">
              <div v-show="active === tab.name" v-for="tab in tabs" :key="tab.name" :class="['tab-pane active']"
                role="tabpanel">
                <div class="product__details__tab__desc">
                  <h6>Products {{ tab.name }}</h6>
                  <p>{{ item[tab.name] }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import API from "@/api";
import Image from "@components/Image/index.vue";
//@ts-ignore
import { IProduct } from "@components/Product/product.type.ts";
import globalStorage, { IItemCart } from "@/utils/loadStorage";
export default defineComponent({
  name: "ProductDetail",
  components: {
    Image,
  },
  inject: ["id"],
  props: {
      eventBus: {} as any
  },
  data() {
    return {
      item: {} as IProduct | null,
      active: "description",
      tabs: [
        {
          name: "description",
          content: "",
        },
        {
          name: "infomation",
          content: "",
        },
        {
          name: "reviews",
          content: "",
        },
      ],
    };
  },
  created() {
    this.getProductDetail();
  },
  methods: {
    async getProductDetail() {
      const vm: any = this;
      const id = vm.id || this.$route?.params.id;
      const { data } = await API.getProductDetail(id);
      if (data?.product) {
        const product = data.product?.[0];
        this.item = product;
        setTimeout(() => {
          this.$nextTick(() => {
            $(".product__details__pic__slider").owlCarousel({
              margin: 20,
              items: 4,
              nav: false,
              dots: false,
              // smartSpeed: 1200,
            });
          });
        }, 200);
      }
    },
    zoomImage(imgurl: string) {
      let bigImg = $(".product__details__pic__item--large").attr("src"); // e.g. img/product/details/thumb-1.jpg
      if (imgurl != bigImg) {
        $(".product__details__pic__item--large").attr({
          src: imgurl,
        });
      }
    },
    openChatbox() {
      const chatDataEvent = new CustomEvent("show-chat-item", {
        detail: {
          chatData: {
            show: true,
            item: this.item,
          }
        },
      });
      document.body.dispatchEvent(chatDataEvent);
    },
    addToCart(item: any) {
      const data: IItemCart = {
        id: item.id,
        title: item.name,
        qty: 1,
        price: item.price,
        img: item.list_img?.[0].url || require('@/assets/img/default.png')
      }
      globalStorage.addItemToCart(data);
      this.eventBus.emit("addCartItem");
      this.eventBus.emit("showMessage", null, {
          detail: {
            serverity: "success",
            message: "Add to cart success",
          },
      });
    }
  },
});
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variables";

.text-danger {
  color: #dd2222;
}

/* Shop Details */
.cursor-pointer {
  cursor: pointer;

  &:hover {
    filter: drop-shadow(2px 4px 6px #454444);
  }
}

.product-details {
  padding-top: 80px;
}

.product__details__pic__item {
  margin-bottom: 20px;

  img {
    min-width: 100%;
  }
}

.product__details__pic__slider {
  img {
    cursor: pointer;
  }

  &.owl-carousel .owl-item img {
    width: auto;
  }
}

.product__details__text {
  h3 {
    color: $heading-color-2;
    font-weight: 700;
    margin-bottom: 16px;
  }

  .product__details__rating {
    font-size: 14px;
    margin-bottom: 12px;

    i {
      margin-right: -2px;
      color: #edbb0e;
    }

    span {
      color: #dd2222;
      margin-left: 4px;
    }
  }

  .product__details__price {
    font-size: 30px;
    color: #dd2222;
    font-weight: 600;
    margin-bottom: 15px;
  }

  p {
    margin-bottom: 45px;
  }

  .primary-btn {
    padding: 16px 28px 14px;
    margin-right: 6px;
    margin-bottom: 5px;
  }

  .heart-icon {
    display: inline-block;
    font-size: 16px;
    color: $para-color;
    padding: 13px 16px 13px;
    background: $background;
  }

  ul {
    border-top: 1px solid $border;
    padding-top: 40px;
    margin-top: 50px;

    li {
      font-size: 16px;
      color: $normal-color;
      list-style: none;
      line-height: 36px;

      b {
        font-weight: 700;
        width: 170px;
        display: inline-block;
      }

      .share {
        display: inline-block;

        a {
          display: inline-block;
          font-size: 15px;
          color: $normal-color;
          margin-right: 25px;

          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }
}

.product__details__quantity {
  display: inline-block;
  margin-right: 6px;
}

.pro-qty {
  width: 140px;
  height: 50px;
  display: inline-block;
  position: relative;
  text-align: center;
  background: $background;
  margin-bottom: 5px;

  input {
    height: 100%;
    width: 100%;
    font-size: 16px;
    color: $para-color;
    width: 50px;
    border: none;
    background: $background;
    text-align: center;
  }

  .qtybtn {
    width: 35px;
    font-size: 16px;
    color: $para-color;
    cursor: pointer;
    display: inline-block;
  }
}

.product__details__tab {
  padding-top: 85px;

  .nav-tabs {
    border-bottom: none;
    justify-content: center;
    position: relative;

    &:before {
      position: absolute;
      left: 0;
      top: 12px;
      height: 1px;
      width: 370px;
      background: $border;
      content: "";
    }

    &:after {
      position: absolute;
      right: 0;
      top: 12px;
      height: 1px;
      width: 370px;
      background: $border;
      content: "";
    }

    li {
      margin-bottom: 0;
      margin-right: 65px;

      &:last-child {
        margin-right: 0;
      }

      a {
        font-size: 16px;
        color: #999999;
        font-weight: 700;
        border: none;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        padding: 0;

        &.active {
          color: #495057;
          background-color: #fff;
          border-color: #dee2e6 #dee2e6 #fff;
        }
      }
    }
  }

  .product__details__tab__desc {
    padding-top: 44px;

    h6 {
      font-weight: 700;
      color: #333333;
      margin-bottom: 26px;
    }

    p {
      color: #666666;
    }
  }
}

.related-product {
  padding-bottom: 30px;
}

.related__product__title {
  margin-bottom: 70px;
}
</style>
