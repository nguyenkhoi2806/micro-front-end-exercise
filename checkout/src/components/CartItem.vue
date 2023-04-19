<template>
  <tr :key="item.id">
    <td class="shoping__cart__item">
      <img :src="item.img" alt="" />

      <h5>{{ item.title }}</h5>
    </td>

    <td class="shoping__cart__price">{{ item.price.toFixed(2) }}</td>

    <td class="shoping__cart__quantity">
      <div class="quantity">
        <div class="pro-qty">
          <input type="text" v-model="qty" @update:modelValue="onChangeQty" />
        </div>
      </div>
    </td>

    <td class="shoping__cart__total">{{ (item.price * qty).toFixed(2) }}</td>

    <td class="shoping__cart__item__close">
      <span class="icon_close" @click="removeItem(item)" />
    </td>
  </tr>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CartItem",
  props: ["item"],
  emits: ["removeItem", "updateQty"],
  data() {
    return {
      qty: this.$props.item.qty,
    };
  },
  methods: {
    removeItem(item: any) {
      this.$emit("removeItem", item);
    },
    onChangeQty() {
      this.$emit("updateQty", { ...this.item, qty: this.qty });
    },
  },
});
</script>
