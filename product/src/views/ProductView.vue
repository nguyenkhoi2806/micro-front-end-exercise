<template>
  <section class="product spad">
    <div class="container">
      <div class="row">
        <div class="col-lg-3 col-md-5">
          <Sidebar
            @getAllProducts="getAllProducts"
            @getProductsByCategory="getProductsByCategory"
            :filter-item-by-price="filterItemByPrice"
            :navigate="navigate"
          />
        </div>
        <div class="col-lg-9 col-md-7">
          <div class="product__discount">
            <div class="section-title product__discount__title">
              <h2>Sale Off</h2>
            </div>
            <div class="row">
              <ProductSlider :data="saleItems" />
            </div>
          </div>
          <Filter :count="items?.length" />
          <ProductList :data="items" :event-bus="eventBus" />
        </div>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import API from "@/api";
import { defineComponent, PropType } from "vue";
import Sidebar from "@components/Sidebar/index.vue";
import ProductSlider from "@components/Slider/ProductSlider.vue";
import Filter from "@components/Filter/index.vue";
import ProductList from "@components/Product/ProductList.vue";
//@ts-ignore
import { IProduct } from "@components/Product/product.type.ts";

export default defineComponent({
  name: "Shop",
  components: {
    Sidebar,
    ProductSlider,
    Filter,
    ProductList,
  },
  provide() {
    return {
      categoryId: this.searchParams?.categoryId,
      navigate: this.navigate,
    };
  },
  props: {
    navigate: {
      type: Function,
    },
    searchParams: Object as PropType<Record<string, any>>,
    eventBus: {} as any,
  },
  data() {
    return {
      saleItems: null,
      items: null as IProduct[] | null,
    };
  },
  async created() {
    const categoryId = this.searchParams?.categoryId;
    if (categoryId) {
      this.getProductsByCategory(categoryId);
    } else {
      this.getAllProducts();
    }
  },
  methods: {
    async getAllProducts() {
      const { data } = await API.getReviewedProducts({ limit: 100 });
      this.items = data.product;
      this.saleItems = data.product.filter((el: IProduct) => el.discount);
    },
    async getProductsByCategory(id: IProduct["id"]) {
      const { data } = await API.getProductsByCategory(id);
      this.items = data.category?.[0]?.products;
    },
  },
});
</script>
