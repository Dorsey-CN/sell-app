<template>
    <div class="shopcart">
        <div class="content">
            <div class="left-content">
                <div class="logo-wrapper">
                    <div class="logo" :class="{'heighlight': totalCount > 0}">
                        <span class="icon-shopping_cart" :class="{'icon-heighlight': totalCount > 0}"></span>
                    </div>
                    <div v-show="totalCount > 0" class="selected-count">
                        {{totalCount}}
                    </div>
                </div>
                <div class="price" :class="{'heighlight': totalPrice > 0}">¥{{totalPrice}}</div>
                <div class="desc">另需配送费{{deliveryPrice}}元</div>
            </div>
            <div class="right-content">
                <div class="pay" :class="{'enough': payClass}">
                    {{payDesc}}
                </div>
            </div>
        </div>
        <transition v-for="ball in balls" name="drop" v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter">
            <!-- <div class="balls-container"> -->
            <div class="ball" v-show="ball.show">
                <div class="inner inner-hook"></div>
            </div>
            <!-- </div> -->
        </transition-group>
    </div>
</template>
<script type="text/javascript">
export default {
    props: {
        deliveryPrice: {
            type: Number,
            default: 0
        },
        minPrice: {
            type: Number,
            default: 0
        },
        selectedGoods: {
            type: Array,
            default () {
                return [{
                    count: 0,
                    price: 0
                }];
            }
        }
    },
    data() {
        return {
            balls: [{
                show: false
            }, {
                show: false
            }, {
                show: false
            }, {
                show: false
            }, {
                show: false
            }],
            dropBalls: []
        };
    },
    computed: {
        totalCount() {
            let selectFoodCount = 0;
            this.selectedGoods.forEach((food) => {
                selectFoodCount += food.count;
            });
            return selectFoodCount;
        },
        totalPrice() {
            let total = 0;
            this.selectedGoods.forEach((food) => {
                total += food.count * food.price;
            });
            return total;
        },
        payDesc() {
            if (this.totalPrice === 0) {
                return `¥${this.minPrice}元起送`;
            } else if (this.totalPrice < this.minPrice) {
                let diff = this.minPrice - this.totalPrice;
                return `还差¥${diff}元起送`;
            } else {
                return '去结算';
            }
        },
        payClass() {
            if (this.totalPrice >= this.minPrice) {
                return true;
            }
        }
    },
    methods: {
        drop(currentElement) {
            for (let i = 0; i < this.balls.length; i++) {
                let ball = this.balls[i];
                if (!ball.show) {
                    ball.show = true;
                    ball.el = currentElement;
                    this.dropBalls.push(ball);
                    return;
                }
            }
        },
        beforeEnter(el) {
            let count = this.dropBalls.length;
            while (count--) {
                let ball = this.dropBalls[count];
                if (ball.show) {
                    let rect = ball.el.getBoundingClientRect();
                    let x = rect.left - 32;
                    let y = -(window.innerHeight - rect.top - 21);
                    el.style.display = '';
                    el.style.webkitTransform = `translate3d(0, ${y}px, 0)`;
                    el.style.transform = `translate3d(0, ${y}px, 0)`;
                    let inner = el.getElementsByClassName('inner-hook')[0];
                    inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`;
                    inner.style.transform = `translate3d(${x}px, 0, 0)`;
                }
            }
        },
        enter(el, done) {
            /* eslint-disable no-unused-vars */
            let refresh = el.offsetHeight;
            this.$nextTick(() => {
                el.style.webkitTransform = 'translate3d(0, 0, 0)';
                el.style.transform = 'translate3d(0, 0, 0)';
                let inner = el.getElementsByClassName('inner-hook')[0];
                inner.style.webkitTransform = 'translate3d(0, 0, 0)';
                inner.style.transform = 'translate3d(0, 0, 0)';
            });
            done();
        },
        afterEnter(el) {
            let ball = this.dropBalls.shift();
            if (ball) {
                ball.show = false;
                el.style.display = 'none';
            }
        }
    }
};
</script>
<style lang="scss" rel="stylesheet/sass" scoped>
.shopcart {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    width: 100%;
    height: 48px;
    .content {
        display: flex;
        color: rgba(255, 255, 255, 0.4);
        .left-content {
            flex: 1;
            background-color: #141d27;
            font-size: 0;
            .logo-wrapper {
                display: inline-block;
                vertical-align: top;
                position: relative;
                top: -10px;
                margin: 0 18px;
                padding: 6px;
                width: 56px;
                height: 56px;
                border-radius: 50%;
                background-color: #141d27;
                box-sizing: border-box;
                .logo {
                    width: 100%;
                    height: 100%;
                    background-color: #2B333B;
                    border-radius: 50%;
                    text-align: center;
                }
                .heighlight {
                    background-color: rgb(0, 160, 220);
                }
                .icon-shopping_cart {
                    line-height: 44px;
                    font-size: 24px;
                    color: #80858A;
                }
                .icon-heighlight {
                    color: rgb(255, 255, 255);
                }
                .selected-count {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 24px;
                    height: 16px;
                    line-height: 16px;
                    text-align: center;
                    color: #fff;
                    font-size: 9px;
                    font-weight: 700;
                    border-radius: 16px;
                    background-color: rgb(240, 20, 20);
                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
                }
            }
            .price,
            .desc {
                display: inline-block;
                vertical-align: top;
                line-height: 24px;
                font-weight: 700;
            }
            .price {
                margin: 12px 0;
                padding-right: 12px;
                border-right: 1px solid rgba(255, 255, 255, 0.1);
                font-size: 16px;
            }
            .heighlight {
                color: rgb(255, 255, 255);
            }
            .desc {
                margin: 12px 0 0 12px;
                font-size: 10px;
            }
        }
        .right-content {
            flex: 0 0 105px;
            width: 105px;
            .pay {
                height: 48px;
                line-height: 48px;
                text-align: center;
                background-color: #2B333B;
                font-weight: 700;
                font-size: 12px;
            }
            .enough {
                background-color: #00b43c;
                color: #fff;
            }
        }
    }
    .ball {
        position: fixed;
        left: 32px;
        bottom: 21px;
        z-index: 200;
        transition: all .4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
        .inner {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background-color: rgb(0, 160, 220);
            transition: all .4s linear;
        }
    }
}
</style>
