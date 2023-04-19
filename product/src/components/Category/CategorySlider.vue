<template>
  <section class="categories">
    <div class="row">
      <div class="categories__slider owl-carousel" v-if="notEmptyData">
        <div v-for="category in categories" :key="category.id">
          <div :key="category.id" class="col-lg-3">
            <CategoryCard :item="category"></CategoryCard>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import Api from "@/api";
import CategoryCard from "./CategoryCard.vue";
import { defineComponent } from "vue";
//@ts-ignore
import { ICategory } from "./category.type.ts";

export default defineComponent({
  components: { CategoryCard },
  provide(){
    return {
      navigate: this.navigate
    }
  },
  props: {
    navigate: Function
  },
  data() {
    return {
      categories: [] as ICategory[],
    };
  },
  computed: {
    notEmptyData(): boolean {
      return this.categories.length > 0;
    },
  },
  async created() {
    const { data } = await Api.getCategories();
    this.categories = data.category;
  },
  updated() {
    this.$nextTick(() => {
      $(".categories__slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 4,
        dots: false,
        nav: true,
        navText: [
          "<span class='fa fa-angle-left'><span/>",
          "<span class='fa fa-angle-right'><span/>",
        ], // left and right arrow
        animateOut: "fadeOut",
        animateIn: "fadeIn",
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        responsive: {
          0: {
            items: 1,
          },
          480: {
            items: 2,
          },
          768: {
            items: 3,
          },
          992: {
            items: 4,
          },
        },
      });
    });
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables";
::v-deep.categories {
  .categories__slider {
    .col-lg-3 {
      max-width: 100%;
    }

    &.owl-carousel {
      .owl-nav {
        button {
          font-size: 18px;
          color: $normal-color;
          height: 70px;
          width: 30px;
          line-height: 70px;
          text-align: center;
          border: 1px solid $border;
          position: absolute;
          left: -35px;
          top: 50%;
          -webkit-transform: translateY(-35px);
          background: $white-color;

          &.owl-next {
            left: auto;
            right: -35px;
          }
        }
      }
    }
  }
}
</style>
