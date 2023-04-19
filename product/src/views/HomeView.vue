<template>
  <div>
    <SuggestProducts/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SuggestProducts from "@/components/Product/SuggestProducts.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    SuggestProducts
},
});
</script>
