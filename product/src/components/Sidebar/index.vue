<template>
    <div class="sidebar">
        <div class="sidebar__item">
            <Menu :navigate="navigate"/>
        </div>
        <div class="sidebar__item">
            <PriceRange />
        </div>
        <div class="sidebar__item sidebar__item__color--option">
            <ColorSelectbox/>
        </div>
        <div class="sidebar__item">
            <SizeSelectbox/>
        </div>
        <div class="sidebar__item">
            <ProductSmallSlider :data="items"/>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import ProductSmallSlider from '../Slider/ProductSmallSlider.vue'
import PriceRange from '../PriceRange/index.vue'
import ColorSelectbox from '../ColorSelectbox/index.vue'
import SizeSelectbox from '../SizeSelectbox/index.vue'
import Menu from './Menu.vue'
import API from '@/api'
export default defineComponent({
    name: "Sidebar",
    components: { ProductSmallSlider, PriceRange, ColorSelectbox, SizeSelectbox, Menu },
    props:{
      navigate: Function,
      filterItemByPrice: Function
    },
    data(){
        return{
            items: null
        }
    },
    async created(){
        const { data } = await API.getLastedProducts({ limit: 21 });
        this.items = data.product
    }
})
</script>
<style lang="scss">
@import "@/assets/scss/variables";
.sidebar__item {
    margin-bottom: 35px;

    &.sidebar__item__color--option {
        overflow: hidden;
    }

    h4 {
        color: $normal-color;
        font-weight: 700;
        margin-bottom: 25px;
    }

    ul {

        li {
            list-style: none;

            a {
                font-size: 16px;
                color: $normal-color;
                line-height: 39px;
                display: block;
                &.active{
                    color: $primary-color;
                    font-weight: bold;
                }
            }
        }
    }

    .latest-product__text {
        position: relative;

        h4 {
            margin-bottom: 45px;
        }

        .owl-carousel {

            .owl-nav {
                right: 0;
            }
        }
    }
}
</style>
