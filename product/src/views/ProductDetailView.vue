<template>
  <div>
    <ProductDetail :event-bus="eventBus"/>
    <section class="related-product">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="section-title related__product__title">
              <h2>Related Product</h2>
            </div>
          </div>
        </div>
        <ProductList :column="4" :data="items" :event-bus="eventBus" />
      </div>
    </section>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import API from "@/api";
import ProductList from "@components/Product/ProductList.vue";
import ProductDetail from "@components/ProductDetail/index.vue";
//@ts-ignore
import { IProduct } from "@components/Product/product.type.ts";

export default defineComponent({
  name: "Shop",
  components: {
    ProductList,
    ProductDetail,
  },
  provide() {
    return {
      navigate: this.navigate,
      id: this.id,
    };
  },
  props: {
    id: {
      type: String as IProduct['id'],
      default: ''
    },
    navigate: {
      type: Function
    },
    eventBus: {} as any
  },
  data() {
    return {
      items: null,
    };
  },
  async created() {
    const { data } = await API.getRelatedProducts();
    this.items = data.product;
  },
});
</script>
