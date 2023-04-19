<template>
  <div>
    <div class="row">
      <div
        v-for="item in data"
        :key="item.id"
        :class="[column === 4 ? 'col-lg-3 col-md-4 col-sm-6' : 'col-lg-4 col-md-6 col-sm-6']"
      >
        <ProductCard :item="item" :event-bus="eventBus"/>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import ProductCard from "./ProductCard.vue";
//@ts-ignore
import { IProduct } from "@components/Product/product.type.ts";

export default defineComponent({
  name: "ProductList",
  components: { ProductCard },
  props: {
    data: Array as PropType<IProduct[]>,
    column: Number,
    eventBus: {} as any
  },
});
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variables";
@import "@/assets/scss/mixins";
.product__item {
  margin-bottom: 50px;
}
.product__pagination {
  padding-top: 10px;

  a {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 1px solid #b2b2b2;
    font-size: 14px;
    color: #b2b2b2;
    font-weight: 700;
    line-height: 28px;
    text-align: center;
    margin-right: 16px;
    @include transition(all, 0.3s);
    &.active {
      background: $primary-color;
      border-color: $primary-color;
      color: $white-color;
    }
    &:hover {
      background: $primary-color;
      border-color: $primary-color;
      color: $white-color;
    }

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
