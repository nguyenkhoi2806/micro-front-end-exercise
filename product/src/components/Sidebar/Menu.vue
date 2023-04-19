<template>
  <div>
    <h4 v-if="!navigate">Department</h4>
    <ul>
      <li>
        <a :class="{ active: !active }" @click="handleCategory(null)">All</a>
      </li>
      <li v-for="item in items" :key="item.id">
        <a :class="{ active: active === item.id }" @click="handleCategory(item)">{{ item.name }}</a>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import API from "@/api";
import { defineComponent } from "vue";
import { ICategory } from "../Category/category.type";
export default defineComponent({
  name: "Menu",
  inject: ["categoryId"],
  props: {
    navigate: {
      type: Function,
      required: true
    },
  },
  data() {
    return {
      items: null as Array<ICategory> | null,
      active: this.categoryId as unknown,
    };
  },
  async created() {
    const { data } = await API.getCategories();
    this.items = data.category;
  },
  methods: {
    handleCategory(item: ICategory | null) {
      if(item) {
        this.navigate(`/shop?category=${item.id}`);
      } else {
        this.navigate(`/shop`);
      }
      // vm.$parent?.$emit("getProductsByCategory", item.id)
    },
  },
});
</script>
