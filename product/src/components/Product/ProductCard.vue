<template>
  <div class="product__discount__item product__item">
    <div class="product__discount__item__pic set-bg"
         :style="{backgroundImage: `url(${item.list_img?.[0].url || require('@/assets/img/default.png')})`}">
      <div v-if="item.discount" class="product__discount__percent">-{{ item.discount }}%</div>
      <ul class="product__item__pic__hover">
        <li><a href="#"><i class="fa fa-heart"></i></a></li>
        <li><a href="#"><i class="fa fa-retweet"></i></a></li>
        <li><a @click="addToCart(item)"><i class="fa fa-shopping-cart"></i></a></li>
      </ul>
    </div>
    <div>
      <div class="product__discount__item__text">
        <span>{{ item.category?.name }}</span>
        <h5><a @click="navigate(`/shop/${item.id}`)">{{ item.name }}</a></h5>
        <div class="product__item__price">${{ item.price }} <span
          v-if="item.discount">${{ item.price }}</span></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import globalStorage, { IItemCart } from '@/utils/loadStorage';
//@ts-ignore
import { IProduct } from "@components/Product/product.type.ts";

export default defineComponent({
  name: 'ProductCard',
  inject: ['navigate'],
  props: {
    item: IProduct,
    eventBus: {} as any
  },
  methods: {
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
  }
})
</script>
<style scoped lang="scss">
@import "@/assets/scss/variables";
@import "@/assets/scss/mixins";

.product__discount__item {
  min-width: 200px;

  &:hover {

    .product__discount__item__pic {

      .product__item__pic__hover {
        bottom: 20px;
      }
    }
  }
}

.product__discount__item__pic {
  height: 270px;
  position: relative;
  overflow: hidden;

  .product__discount__percent {
    height: 45px;
    width: 45px;
    background: #dd2222;
    border-radius: 50%;
    font-size: 14px;
    color: $white-color;
    line-height: 45px;
    text-align: center;
    position: absolute;
    left: 15px;
    top: 15px;
  }
}

.product__item__pic__hover {
  position: absolute;
  left: 0;
  bottom: -50px;
  width: 100%;
  text-align: center;
  @include transition(all, .5s);

  li {
    list-style: none;
    display: inline-block;
    margin-right: 6px;

    &:last-child {
      margin-right: 0;
    }

    &:hover {

      a {
        background: $primary-color;
        border-color: $primary-color;

        i {
          color: $white-color;
          transform: rotate(360deg);
        }
      }
    }

    a {
      font-size: 16px;
      color: $normal-color;
      height: 40px;
      width: 40px;
      line-height: 40px;
      text-align: center;
      border: 1px solid $border;
      background: $white-color;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      @include transition(all, .5s);

      i {
        position: relative;
        transform: rotate(0);
        @include transition(all, .3s);
      }
    }
  }
}

.product__discount__item__text {
  text-align: center;
  padding-top: 20px;

  span {
    font-size: 14px;
    color: #b2b2b2;
    display: block;
    margin-bottom: 4px;
  }

  h5 {
    margin-bottom: 6px;

    &:hover {
      text-decoration: underline;
    }

    a {
      color: $normal-color;
    }
  }

  .product__item__price {
    font-size: 18px;
    color: $normal-color;
    font-weight: 700;

    span {
      display: inline-block;
      font-weight: 400;
      text-decoration: line-through;
      margin-left: 10px;
    }
  }
}
</style>
