<template>
  <a class="icon-container" @click="navigateToCart">
    <i class="fa fa-shopping-bag" />
    <span>{{ totalItems }}</span>
  </a>
</template>
<script lang="ts">
import { useCartStore } from "@/store/cart";
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";


export default defineComponent({
  name: "CartIcon",
  provide(){
    return {
      navigate: this.navigate
    }
  },
  props: {
    navigate: Function,
    eventBus: {} as any
  },
  setup() {
    const cartStore = useCartStore();
    const { totalItems } = storeToRefs(cartStore);
    cartStore.load();
    return { cartStore, totalItems };
  },
  mounted(){
    if(this.eventBus) { 
      this.eventBus.on('addCartItem', () => {
        this.cartStore.load();
      })
    }
  },
  methods: {
    navigateToCart() {
      if(this.navigate) {
        this.navigate("/shopping-cart");
      }
    }
  },
});
</script>
