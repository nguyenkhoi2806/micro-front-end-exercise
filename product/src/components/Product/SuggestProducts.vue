<template>
  <div class="latest-product spad">
    <div class="container">
      <div class="row">
        <div class="col-lg-4 col-md-6">
          <ProductSmallSlider
            v-if="latedProduct.length > 0"
            :data="latedProduct"
            title="Latest Products"
          />
        </div>
        <div class="col-lg-4 col-md-6">
          <ProductSmallSlider
            v-if="ratedProduct.length > 0"
            :data="ratedProduct"
            title="Top Rated Products"
          />
        </div>
        <div class="col-lg-4 col-md-6">
          <ProductSmallSlider
            v-if="reviewedProduct.length > 0"
            :data="reviewedProduct"
            title="Review Products"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Api from "@/api";
import ProductSmallSlider from "@/components/Slider/ProductSmallSlider.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { ProductSmallSlider },
  provide() {
    return {
      navigate: this.navigate,
    };
  },
  props: {
    navigate: {
      type: Function
    }
  },
  data() {
    return {
      ratedProduct: [],
      reviewedProduct: [],
      latedProduct: [],
    };
  },
  created() {
    const self: any = this;
    Api.getLastedProducts({ limit: 9 }).then(({ data }) => {
      self.latedProduct = data.product;
    });
    Api.getReviewedProducts({ limit: 9 }).then(({ data }) => {
      self.reviewedProduct = data.product;
    });
    Api.getRatedProducts({ limit: 9 }).then(({ data }) => {
      self.ratedProduct = data.product;
    });
  },
})
</script>
