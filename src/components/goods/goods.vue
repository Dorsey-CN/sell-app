<template>
    <div class="goods">
        <div class="menu-wrapper" ref="menuWrapper">
            <ul>
                <li v-for="(item,index) in goods" class="menu-item border-1px" :class="{'current': currentIndex === index}" @click="selectMenu(index, $event)">
                    <span class="text">
                        <span v-if="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="goods-wrapper" ref="foodsWrapper">
            <ul>
                <li v-for="goodsType in goods" class="goods-list foods-list-hook">
                    <h1 class="title">{{goodsType.name}}</h1>
                    <ul class="foods-list">
                        <li v-for="foods in goodsType.foods" class="good-item border-1px">
                            <div class="icon">
                                <img :src="foods.icon" />
                            </div>
                            <div class="content">
                                <h2 class="name">{{foods.name}}</h2>
                                <p class="desc">{{foods.description}}</p>
                                <div class="extra">
                                    <span class="count">月售{{foods.sellCount}}份</span>
                                    <span>好评率{{foods.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class="now-price">¥{{foods.price}}</span>
                                    <span v-show="foods.oldPrice" class="old-price">¥{{foods.oldPrice}}</span>
                                </div>
                                <div class="cartcontrol-wrapper">
                                    <cartcontrol :food="foods" v-on:addcart="_drop"></cartcontrol>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <shopcart ref="shopcart" :selectedGoods="selectedFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>
    </div>
</template>
<script>
import BScroll from 'better-scroll';
import shopcart from 'components/shopcart/shopcart.vue';
import cartcontrol from 'components/controlcart/controlcart.vue';
const ERROR_OK = 0;
export default {
    props: {
        seller: {
            type: Object
        }
    },
    data() {
        return {
            goods: [],
            listHeight: [],
            scrollY: 0
        };
    },
    computed: {
        currentIndex() {
            // console.log(this.listHeight);
            for (let i = 0; i < this.listHeight.length; i++) {
                let currentHeight = this.listHeight[i];
                let nextHeight = this.listHeight[i + 1];

                if (!nextHeight || this.scrollY >= currentHeight && this.scrollY < nextHeight) {
                    return i;
                }
            }
            return 0;
        },
        selectedFoods() {
            let selectedFoods = [];
            this.goods.forEach((good) => {
                good.foods.forEach((food) => {
                    if (food.count) {
                        selectedFoods.push(food);
                    }
                });
            });
            return selectedFoods;
        }
    },
    created() {
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
        this.$http.get('/api/goods').then((response) => {
            response = response.body;
            if (response.errorno === ERROR_OK) {
                this.goods = response.data;
                this.$nextTick(() => {
                    this._initScroll();
                    this._calculateHeight();
                });
            }
        });
    },
    methods: {
        _initScroll() {
            this.menuWrapper = new BScroll(this.$refs.menuWrapper, {
                click: true
            });
            this.foodsWrapper = new BScroll(this.$refs.foodsWrapper, {
                click: true,
                probeType: 3
            });
            this.foodsWrapper.on('scroll', (pos) => {
                this.scrollY = Math.abs(Math.round(pos.y));
            });
        },
        _drop(target) {
            /** 优化小球下落动画 **/
            this.$nextTick(() => {
                this.$refs.shopcart.drop(target);
            });
        },
        _calculateHeight() {
            let foodList = this.$refs.foodsWrapper.getElementsByClassName('foods-list-hook');
            let height = 0;
            this.listHeight.push(height);
            for (let i = 0; i < foodList.length; i++) {
                let foodItem = foodList[i];
                height += foodItem.clientHeight;
                this.listHeight.push(height);
            }
        },
        selectMenu(index, event) {
            if (!event._constructed) {
                return;
            }
            let foodList = this.$refs.foodsWrapper.getElementsByClassName('foods-list-hook');
            let currentMenuItem = foodList[index];
            this.foodsWrapper.scrollToElement(currentMenuItem, 300);
        }
    },
    components: {
        shopcart,
        cartcontrol
    }
};
</script>
<style lang="scss" rel="stylesheet/sass" scoped>
@import '../../common/sass/mixin.scss';
.goods {
    position: absolute;
    display: flex;
    top: 174px;
    bottom: 48px;
    width: 100%;
    overflow: hidden;
    .menu-wrapper {
        flex: 0 0 80px;
        width: 80px;
        background-color: #f3f5f7;
        .current {
            position: relative;
            margin-top: -1px;
            z-index: 10;
            background-color: #fff;
            font-weight: 700;
            .text {
                @include border-none();
            }
        }
        .menu-item {
            display: table;
            line-height: 14px;
            padding: 0 12px;
            width: 56px;
            height: 54px;
            @include border-1px(rgba(7, 17, 27, 0.1));
            .icon {
                display: inline-block;
                width: 12px;
                height: 12px;
                margin-right: 2px;
                background-size: 12px 12px;
                background-repeat: no-repeat;
                vertical-align: top;
            }
            .decrease {
                @include bg-image(decrease_3);
            }
            .discount {
                @include bg-image(discount_3);
            }
            .guarantee {
                @include bg-image(guarantee_3);
            }
            .invoice {
                @include bg-image(invoice_3);
            }
            .special {
                @include bg-image(special_3);
            }
            .text {
                display: table-cell;
                width: 56px;
                vertical-align: middle;
                color: #7D8389;
                font-size: 12px;
            }
        }
    }
    .goods-wrapper {
        flex: 1;
        .title {
            padding-left: 14px;
            height: 26px;
            line-height: 26px;
            border-left: 2px solid #D9DDE1;
            color: rgb(147, 153, 159);
            background-color: #F3F5F7;
            font-size: 12px;
        }
        .foods-list {
            .good-item {
                display: flex;
                margin: 18px;
                padding-bottom: 18px;
                @include border-1px(rgba(7, 17, 27, 0.1));
                .icon {
                    flex: 0 0 57px;
                    width: 57p;
                    ;
                    margin-right: 10px;
                    img {
                        width: 100%;
                    }
                }
                .content {
                    flex: 1;
                    .name {
                        margin: 2px 0 8px;
                        height: 14px;
                        line-height: 14px;
                        color: rgb(7, 17, 27);
                        font-size: 14px;
                    }
                    .desc,
                    .extra {
                        line-height: 12px;
                        font-size: 10px;
                        color: rgb(147, 153, 159);
                    }
                    .desc {
                        margin: 8px 0;
                    }
                    .count {
                        margin-right: 7px;
                    }
                    .price {
                        line-height: 24px;
                        font-weight: 700;
                        .now-price {
                            margin-right: 8px;
                            color: rgb(240, 20, 20);
                            font-size: 14px;
                        }
                        .old-price {
                            color: rgb(147, 153, 159);
                            font-size: 10px;
                        }
                    }
                    .cartcontrol-wrapper {
                        position: absolute;
                        right: 0;
                        bottom: 12px;
                    }
                }
            }
            :last-child {
                @include border-none();
                margin-bottom: 0
            }
        }
    }
}
</style>
