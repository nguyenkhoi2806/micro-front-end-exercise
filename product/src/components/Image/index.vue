<template>
  <img :class="className" :src="src || defaultImg" :alt="alt" @error="replaceByDefault" />
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Image",
  props: {
    src: String,
    alt: String,
    className: String,
  },
  data(){
    return {
        defaultImg: require("@/assets/img/default.png")
    }
  },
  methods: {
    replaceByDefault(e: any){
      e.target.src = this.defaultImg
    }
  }
});
</script>
