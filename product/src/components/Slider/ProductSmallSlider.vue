<template>
  <div class="latest-product__text">
    <h4>{{ title }}</h4>
    <div class="latest-product__slider owl-carousel">
      <div
        v-for="(chunk, index) in dataChunk"
        :key="index"
        class="latest-product__slider__item"
      >
        <ProductSmallCard v-for="item in chunk" :key="item?.id" :item="item" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import _ from "lodash";
import ProductSmallCard from "../Product/ProductSmallCard.vue";
//@ts-ignore
import { IProduct } from "@components/Product/product.type.ts";

export default defineComponent({
  name: "ProductSmallSlider",
  components: { ProductSmallCard },
  props: {
    title: {
      type: String,
      default: "Lastest Products",
    },
    data: Array as PropType<IProduct[]>
  },
  data() {
    return {
      dataChunk: []
    }
  },
  watch: {
    data: {
      immediate: true,
      handler(newVal) {
        if (newVal?.length) {
          const vm : any = this;
          vm.dataChunk = _.chunk(newVal, 3);
          vm.$nextTick(() => {
            setTimeout(() => {
              $(".latest-product__slider").owlCarousel({
                loop: true,
                margin: 0,
                items: 1,
                dots: false,
                nav: true,
                navText: [
                  "<span class='fa fa-angle-left'><span/>",
                  "<span class='fa fa-angle-right'><span/>",
                ],
                smartSpeed: 1200,
                autoHeight: false,
                autoplay: true,
              });
            }, 200);
          });
        }
      },
    },
  },
});
</script>
<style lang="scss">
@import "@/assets/scss/variables";

.latest-product {
  padding-top: 80px;
  padding-bottom: 0;
}

.latest-product__text {
  h4 {
    font-weight: 700;
    color: $normal-color;
    margin-bottom: 45px;
  }
}

.latest-product__slider {
  &.owl-carousel {
    .owl-nav {
      position: absolute;
      right: 20px;
      top: -75px;

      button {
        height: 30px;
        width: 30px;
        background: #f3f6fa !important;
        border: 1px solid #e6e6e6 !important;
        font-size: 14px;
        color: #636363;
        margin-right: 10px;
        line-height: 30px;
        text-align: center;

        span {
          font-weight: 700;
        }

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
