<template>
    <a @click="navigate(`/shop/${item.id}`)" class="latest-product__item">
        <div class="latest-product__item__pic">
            <img :src="item.list_img?.[0].url || require('@/assets/img/default.png')" :alt="item.name"/>
        </div>
        <div class="latest-product__item__text">
            <h6>{{ item.name }}</h6>
            <span>$ {{item.price}}</span>
        </div>
    </a>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
//@ts-ignore
import { IProduct } from "@components/Product/product.type.ts";

export default defineComponent({
    name: 'ProductSmallCard',
    inject: ['navigate'],
    props: {
        item: IProduct
    },
})
</script>
<style scoped lang="scss">
@import "@/assets/scss/variables";
.latest-product__item {
    margin-bottom: 20px;
    overflow: hidden;
    display: block;
}

.latest-product__item__pic {
    float: left;
    margin-right: 26px;

    img {
        height: 110px;
        width: 110px;
    }
}

.latest-product__item__text {
    overflow: hidden;
    padding-top: 10px;
    text-align: left;
    h6 {
        color: $heading-color-2;
        margin-bottom: 8px;
    }

    span {
        font-size: 18px;
        display: block;
        color: $heading-color-2;
        font-weight: 700;
    }
}
</style>