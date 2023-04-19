<template>
  <div class="product__discount__slider owl-carousel">
    <div v-for="item in data" :key="item?.id" :item="item" class="col-lg-4">
      <ProductCard :item="item" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import ProductCard from "../Product/ProductCard.vue";
//@ts-ignore
import { IProduct } from "@components/Product/product.type.ts";

export default defineComponent({
  name: "ProductSlider",
  components: { ProductCard },
  props: {
    data: {
      type: Array as PropType<IProduct[]>,
    },
  },
  watch: {
    data: {
      immediate: true,
      handler(newVal) {
        if (newVal?.length) {
          this.$nextTick(() => {
            setTimeout(() => {
              $(".product__discount__slider").owlCarousel({
                margin: 0,
                items: 3,
                dots: true,
                smartSpeed: 1200,
                autoHeight: false,
                autoplay: true,
                responsive: {
                  320: {
                    items: 1,
                  },
                  480: {
                    items: 2,
                  },
                  768: {
                    items: 2,
                  },
                  992: {
                    items: 3,
                  },
                },
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
.product__discount {
  padding-bottom: 50px;

  .product__discount__title {
    text-align: left;
    margin-bottom: 65px;

    h2 {
      display: inline-block;

      &:after {
        margin: 0;
        width: 100%;
      }
    }
  }
}
.product__discount__slider {
  .col-lg-4 {
    max-width: 100%;
  }
  &.owl-carousel {
    .owl-dots {
      text-align: center;
      margin-top: 30px;

      button {
        height: 12px;
        width: 12px;
        border: 1px solid #b2b2b2;
        border-radius: 50%;
        margin-right: 12px;

        &.active {
          background: #707070;
          border-color: $para-color;
        }

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
}
</style>