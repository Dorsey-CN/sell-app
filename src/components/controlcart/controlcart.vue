<template>
    <div class="controlcart">
        <transition name="move">
            <div class="controlcart-decrease" v-show="food.count>0" @click="decreaseCart">
                <span class="inner icon-remove_circle_outline"></span>
            </div>
        </transition>
        <div class="controlcart-count" v-show="food.count>0">{{food.count}}</div>
        <div class="controlcart-add icon-add_circle" @click="addCart"></div>
    </div>
</template>
<script type="text/javascript">
import Vue from 'vue';
export default {
    props: {
        food: {
            type: Object
        }
    },
    methods: {
        addCart(event) {
            if (!event._constructed) {
                return;
            }
            if (!this.food.count) {
                Vue.set(this.food, 'count', 1);
            } else {
                this.food.count ++;
            }
            this.$emit('addcart', event.target);
        },
        decreaseCart(event) {
            if (!event._constructed) {
                return;
            }
            if (this.food.count) {
                this.food.count --;
            }
        }
    }
};
</script>
<style lang="scss" rel="stylesheet/sass" scoped>
.controlcart {
    font-size: 0;
    .controlcart-decrease,
    .controlcart-add {
        display: inline-block;
        padding: 6px;
    }
    .controlcart-add{
        color: rgb(0, 160, 220);
        font-size: 24px;
    }
    .controlcart-decrease{
        .inner{
            display: inline-block;
            line-height: 24px;
            color: rgb(0, 160, 220);
            font-size: 24px;
        }
    }
    .move-enter{
        opacity: 0;
        transform: translate3d(24px, 0, 0);
        .inner{
            transform: rotate(180deg);
        }
    }
    .move-enter-active{
        transition: all .3s linear;
        .inner{
            transition: all .3s linear;
        }
    }
    .move-leave{
        opacity: 1;
        .inner{
            transform: rotate(0);
        }
    }
    .move-leave-active{
        transition: all .3s linear;
        opacity: 0;
        transform: translate3d(24px, 0, 0);
        .inner{
            transition: all .3s linear;
            transform: rotate(180deg);
        }
    }
    .controlcart-count{
    	display: inline-block;
    	vertical-align: top;
    	width: 12px;
    	padding-top: 6px;
    	line-height: 24px;
    	text-align: center;
    	color: rgb(147, 153, 159);
    	font-size: 10px;
    }
}
</style>
