<template>
  <span>{{ grandTotal.toFixed(2) }}</span>
</template>
<script lang="ts">
import { useCartStore } from "@/store/cart";
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";

export default defineComponent({
  name: "CartIcon",
  props: ["navigate"],
  setup() {
    const cartStore = useCartStore();
    const { grandTotal } = storeToRefs(cartStore);
    cartStore.load();

    return { cartStore, grandTotal };
  },
});
</script>
