<template>
  <section class="featured spad">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="section-title">
            <h2>Featured Products</h2>
          </div>
          <div class="featured__controls">
            <ul>
              <li :class="{active: selectedCatalog === '*'}"
                  data-filter="*"
                  @click="selectedCatalog = '*'">
                  All
              </li>
              <li
                v-for="(item, key) in categories"
                :key="key"
                :data-filter="`.${key}`"
                :class="{active: selectedCatalog === key}"
                @click="selectedCatalog = key"
                class="text-capitalize"
              >
                {{ item?.[0].category.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="row featured__filter">
        <!-- 8 items/products -->
        <div
          v-for="item in featuredProducts"
          :key="item.id"
          :class="['col-lg-3 col-md-4 col-sm-6 mix', item.category.slug]"
        >
          <ProductCard :item="item" :event-bus='eventBus' />
        </div>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import Api from "@/api";
import _ from "lodash";
import ProductCard from "./ProductCard.vue";
import mixitup from "mixitup";
import { IProduct } from "./product.type";
import { defineComponent } from "vue";

export default defineComponent({
  name: "FeaturedProducts",
  components: { ProductCard },
  provide () {
    return {
      navigate: this.navigate
    }
  },
  props: ['eventBus', 'navigate'],
  data() {
    return {
      featuredProducts: null as Array<IProduct> | null,
      selectedCatalog: '*'
    };
  },
  computed: {
    categories(): any {
      const vm: any = this
      return vm.featuredProducts
        ? _.groupBy(vm.featuredProducts, "category.slug")
        : {};
    },
  },
  async mounted() {
    const vm : any = this;
    const { data } = await Api.getFeaturedProducts();
    vm.featuredProducts = data.product;
    vm.$nextTick(() => {
      if ($(".featured__filter").length > 0) {
        const containerEl = document.querySelector(".featured__filter");
        mixitup(containerEl);
      }
    });
  },
})
</script>
