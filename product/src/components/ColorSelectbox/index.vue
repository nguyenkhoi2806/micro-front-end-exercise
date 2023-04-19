<template>
    <div>
        <h4>Colors</h4>
        <div class="sidebar__item__color sidebar__item__color--white">
            <label for="white">
                White
                <input id="white" type="radio">
            </label>
        </div>
        <div class="sidebar__item__color sidebar__item__color--gray">
            <label for="gray">
                Gray
                <input id="gray" type="radio">
            </label>
        </div>
        <div class="sidebar__item__color sidebar__item__color--red">
            <label for="red">
                Red
                <input id="red" type="radio">
            </label>
        </div>
        <div class="sidebar__item__color sidebar__item__color--black">
            <label for="black">
                Black
                <input id="black" type="radio">
            </label>
        </div>
        <div class="sidebar__item__color sidebar__item__color--blue">
            <label for="blue">
                Blue
                <input id="blue" type="radio">
            </label>
        </div>
        <div class="sidebar__item__color sidebar__item__color--green">
            <label for="green">
                Green
                <input id="green" type="radio">
            </label>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: 'ColorSelectbox'
})
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variables";

.sidebar__item__color {
    float: left;
    width: 40%;

    &.sidebar__item__color--white {

        label {

            &:after {
                border: 2px solid #333333;
                background: transparent;
            }
        }
    }

    &.sidebar__item__color--gray {

        label {

            &:after {
                background: #E9A625;
            }
        }
    }

    &.sidebar__item__color--red {

        label {

            &:after {
                background: #D62D2D;
            }
        }
    }

    &.sidebar__item__color--black {

        label {

            &:after {
                background: $heading-color-2;
            }
        }
    }

    &.sidebar__item__color--blue {

        label {

            &:after {
                background: #249BC8;
            }
        }
    }

    &.sidebar__item__color--green {

        label {

            &:after {
                background: #3CC032;
            }
        }
    }

    label {
        font-size: 16px;
        color: #333333;
        position: relative;
        padding-left: 32px;
        cursor: pointer;

        input {
            position: absolute;
            visibility: hidden;
        }

        &:after {
            position: absolute;
            left: 0;
            top: 5px;
            height: 14px;
            width: 14px;
            background: #222;
            content: '';
            border-radius: 50%;
        }
    }
}
</style>