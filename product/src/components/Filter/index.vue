<template>
    <div class="filter__item">
        <div class="row">
            <div class="col-lg-4 col-md-5">
                <div class="filter__sort">
                    <span>Sort By</span>
                    <select>
                        <option value="0">Default</option>
                        <option value="0">Default</option>
                    </select>
                </div>
            </div>
            <div class="col-lg-4 col-md-4">
                <div class="filter__found">
                    <h6><span>{{count}}</span> Product(s) found</h6>
                </div>
            </div>
            <div class="col-lg-4 col-md-3">
                <div class="filter__option">
                    <span class="icon_grid-2x2"></span>
                    <span class="icon_ul"></span>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
    name: "Filter",
    props: {
        count: Number
    },
    mounted(){
        $("select").niceSelect();
    }
})
</script>
<style lang="scss">
@import "@/assets/scss/variables";
@import "@/assets/scss/mixins";

.filter__item {
    padding-top: 45px;
    border-top: 1px solid $border;
    padding-bottom: 20px;
}

.filter__sort {
    margin-bottom: 15px;

    span {
        font-size: 16px;
        color: $para-color;
        display: inline-block;
    }

    .nice-select {
        background-color: #fff;
        border-radius: 0;
        border: none;
        display: inline-block;
        float: none;
        height: 0;
        line-height: 0;
        padding-left: 18px;
        padding-right: 30px;
        font-size: 16px;
        color: $normal-color;
        font-weight: 700;
        cursor: pointer;

        span {
            color: $normal-color;
        }

        &:after {
            border-bottom: 1.5px solid #1c1c1c;
            border-right: 1.5px solid #1c1c1c;
            height: 8px;
            margin-top: 0;
            right: 16px;
            width: 8px;
            top: -5px;
        }
    }

    .nice-select.open .list {
        opacity: 1;
        pointer-events: auto;
        -webkit-transform: scale(1) translateY(0);
        -ms-transform: scale(1) translateY(0);
        transform: scale(1) translateY(0);
    }

    .nice-select .list {
        border-radius: 0;
        margin-top: 0;
        top: 15px;
    }

    .nice-select .option {
        line-height: 30px;
        min-height: 30px;
    }
}

.filter__found {
    text-align: center;
    margin-bottom: 15px;

    h6 {
        font-size: 16px;
        color: #b2b2b2;

        span {
            color: $normal-color;
            font-weight: 700;
            margin-right: 5px;
        }
    }
}

.filter__option {
    text-align: right;
    margin-bottom: 15px;

    span {
        font-size: 24px;
        color: #b2b2b2;
        margin-right: 10px;
        cursor: pointer;
        @include transition(all, .3s);

        &:last-child {
            margin: 0;
        }

        &:hover {
            color: $primary-color;
        }
    }
}

</style>