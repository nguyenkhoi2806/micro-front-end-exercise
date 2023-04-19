<template>
  <div>
    <h4>Price</h4>
    <div class="price-range-wrap">
      <div
        class="price-range ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content"
        data-min="1"
        data-max="20"
      >
        <div class="ui-slider-range ui-corner-all ui-widget-header"></div>
        <span tabindex="0" class="ui-slider-handle ui-corner-all ui-state-default"></span>
        <span tabindex="0" class="ui-slider-handle ui-corner-all ui-state-default"></span>
      </div>
      <div class="range-slider">
        <div class="price-input">
          <input id="minamount" type="text" />
          <input id="maxamount" type="text" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PriceRange",
  props: {
    filterItemByPrice: Function,
  },
  mounted() {
    let rangeSlider = $(".price-range"),
      minamount = $("#minamount"),
      maxamount = $("#maxamount"),
      minPrice = rangeSlider.data("min"),
      maxPrice = rangeSlider.data("max");
    rangeSlider.slider({
      range: true,
      min: minPrice,
      max: maxPrice,
      values: [minPrice, maxPrice],
      slide: function (_: any, ui: any) {
        const minPrice = ui.values[0];
        const maxPrice =  ui.values[1];
        minamount.val("$" + minPrice);
        maxamount.val("$" + maxPrice);
      },
    });
    minamount.val("$" + rangeSlider.slider("values", 0));
    maxamount.val("$" + rangeSlider.slider("values", 1));
  },
});
</script>
<style lang="scss">
@import "@/assets/scss/variables";

.price-range-wrap {
  .range-slider {
    margin-top: 20px;

    .price-input {
      position: relative;

      &:after {
        position: absolute;
        left: 38px;
        top: 13px;
        height: 1px;
        width: 5px;
        background: #dd2222;
        content: "";
      }

      input {
        font-size: 16px;
        color: #dd2222;
        font-weight: 700;
        max-width: 20%;
        border: none;
        display: inline-block;
      }
    }
  }

  .price-range {
    border-radius: 0;

    &.ui-widget-content {
      border: none;
      background: #ebebeb;
      height: 5px;

      .ui-slider-handle {
        height: 13px;
        width: 13px;
        border-radius: 50%;
        background: $white-color;
        border: none;
        -webkit-box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.2);
        box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.2);
        outline: none;
        cursor: pointer;
      }
    }

    .ui-slider-range {
      background: #dd2222;
      border-radius: 0;

      &.ui-corner-all.ui-widget-header:last-child {
        background: #dd2222;
      }
    }
  }
}
</style>
