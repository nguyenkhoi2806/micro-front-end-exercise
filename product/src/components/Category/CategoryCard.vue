<template>
    <div className="categories__item set-bg"
        :style="{backgroundImage: `url(${item.img || require('@/assets/img/default.png')})`}">
        <h5><a @click="navigate(`/shop?category=${item.id}`)">{{ item.name }}</a></h5>
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
//@ts-ignore
import { ICategory } from "./category.type.ts"

export default defineComponent({
    name: 'CategoryCard',
    inject: ['navigate'],
    props: {
        item: {
            type: Object as PropType<ICategory>
        }
    },
})
</script>
<style scoped lang="scss">
@import "@/assets/scss/variables";

.categories__item {
    height: 270px;
    position: relative;

    h5 {
        position: absolute;
        left: 0;
        width: 100%;
        padding: 0 20px;
        bottom: 20px;
        text-align: center;

        a {
            font-size: 18px;
            color: $normal-color;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 2px;
            padding: 12px 0 10px;
            background: $white-color;
            display: block;
            &:hover {
                background-color: $primary-color;
                color: $white-color;
                transition: .2s;
            }
        }
    }
}
</style>