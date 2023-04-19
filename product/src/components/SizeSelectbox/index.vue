<template>
    <div>
        <h4>Popular Size</h4>
        <div class="sidebar__item__size">
            <label for="large">
                Large
                <input id="large" type="radio">
            </label>
        </div>
        <div class="sidebar__item__size">
            <label for="medium">
                Medium
                <input id="medium" type="radio">
            </label>
        </div>
        <div class="sidebar__item__size">
            <label for="small">
                Small
                <input id="small" type="radio">
            </label>
        </div>
        <div class="sidebar__item__size">
            <label for="tiny">
                Tiny
                <input id="tiny" type="radio">
            </label>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: 'SizeSelectbox'
})
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variables";

.sidebar__item__size {
    display: inline-block;
    margin-right: 16px;
    margin-bottom: 10px;

    label {
        font-size: 12px;
        color: $para-color;
        display: inline-block;
        padding: 8px 25px 6px;
        background: $background;
        cursor: pointer;
        margin-bottom: 0;

        input {
            position: absolute;
            visibility: hidden;
        }
    }
}
</style>