<template>
    <transition name="move">
        <div class="food" v-show="showFlag" ref="food">
            <div class="food-content">
                <div class="image-header">
                    <img :src="food.image" />
                    <div class="back" @click="hide">
                        <i class="icon-arrow_lift"></i>
                    </div>
                </div>
                <div class="content">
                    <h1 class="title">{{food.name}}</h1>
                    <div class="detail">
                        <span class="sell-count">月售{{food.sellCount}}份</span>
                        <span class="rating">好评率{{food.rating}}％</span>
                    </div>
                    <div class="price">
                        <span class="now-price">¥{{food.price}}</span><span v-show="food.oldPrice" class="old-price">¥{{food.oldPrice}}</span>
                    </div>
                    <div class="cartcontrol-wrapper">
                        <cartcontrol :food="food" v-on:addcart="_todrop"></cartcontrol>
                    </div>
                    <transition name="fade">
                        <div class="buy" @click.stop.prevent="addFirst($event)" v-show="!food.count || food.count === 0">加入购物车</div>
                    </transition>
                </div>
                <split v-show="food.info"></split>
                <div class="info" v-show="food.info">
                    <h1 class="title">商品介绍</h1>
                    <div class="text">{{food.info}}。</div>
                </div>
                <split></split>
                <div class="food-ratings">
                    <h1 class="title">商品评价</h1>
                    <ratingselect :ratings="food.ratings" :rating-type="ratingType" :only-content="onlyContent" :desc="desc" v-on:change-type="setRatingType" v-on:change-content="setOnlyContent"></ratingselect>
                    <div class="ratings-wrapper">
                        <ul class="rating-list" v-show="food.ratings && food.ratings.length">
                            <li class="rating-item border-1px" v-for="rating in food.ratings" v-show="needShow(rating.rateType, rating.text)">
                                <div class="user-info">
                                    <span class="user-name">{{rating.username}}</span>
                                    <img class="user-avatar" :src="rating.avatar" width="12" height="12" />
                                </div>
                                <span class="rating-time">{{rating.rateTime | formatDate}}</span>
                                <p class="rating-content">
                                    <span class="rating-icon" :class="{'icon-thumb_up': rating.rateType === 0, 'icon-thumb_down': rating.rateType === 1}"></span>
                                    <span class="rating-text">{{rating.text}}</span>
                                </p>
                            </li>
                        </ul>
                        <div class="no-ratings" v-show="!food.ratings || !food.ratings.length">
                            该商品暂无评价信息！
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
import Vue from 'vue';
import BScroll from 'better-scroll';
import {
    formDate
} from 'common/js/formate_date.js';
import cartcontrol from 'components/controlcart/controlcart.vue';
import split from 'components/split/split.vue';
import ratingselect from 'components/ratingselect/ratingselect.vue';

const ALL = 2;

export default {
    props: {
        food: {
            type: Object
        }
    },
    data() {
        return {
            showFlag: false,
            ratingType: ALL,
            onlyContent: true,
            desc: {
                all: '全部',
                positive: '推荐',
                negative: '吐槽'
            }
        };
    },
    methods: {
        show() {
            this.showFlag = true;
            this.ratingType = ALL;
            this.onlyContent = true;
            this.desc = {
                all: '全部',
                positive: '推荐',
                negative: '吐槽'
            };
            this.$nextTick(() => {
                if (!this.scroll) {
                    this.scroll = new BScroll(this.$refs.food, {
                        click: true
                    });
                } else {
                    this.scroll.refresh();
                }
            });
        },
        hide() {
            this.showFlag = false;
        },
        addFirst(event) {
            if (!event._constructed) {
                return;
            }
            Vue.set(this.food, 'count', 1);
            this.$emit('addcart', event.target);
        },
        _todrop(target) {
            this.$emit('addcart', target);
        },
        setRatingType(type) {
            this.ratingType = type;
            this.$nextTick(() => {
                this.scroll.refresh();
            });
        },
        setOnlyContent(content) {
            this.onlyContent = content;
            this.$nextTick(() => {
                this.scroll.refresh();
            });
        },
        needShow(type, text) {
            if (this.onlyContent && !text) {
                return false;
            }

            if (this.ratingType === ALL) {
                return true;
            } else {
                return this.ratingType === type;
            }
        }
    },
    filters: {
        formatDate(time) {
            let date = new Date(time);
            return formDate(date, 'yyyy-MM-dd hh:mm');
        }
    },
    components: {
        cartcontrol,
        split,
        ratingselect
    }
};
</script>
<style lang="scss" rel="stylesheet/sass" scoped>
@import '../../common/sass/mixin.scss';
.food {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 48px;
    z-index: 30;
    width: 100%;
    background-color: #fff;
    .image-header {
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 100%;
        img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
        .back {
            position: absolute;
            left: 0;
            top: 10px;
            .icon-arrow_lift {
                display: block;
                padding: 10px;
                font-size: 20px;
                color: #fff;
            }
        }
    }
    .content {
        position: relative;
        padding: 18px;
        .title {
            margin-bottom: 8px;
            line-height: 14px;
            font-size: 14px;
            font-weight: 700;
            color: rgb(7, 17, 27);
        }
        .detail {
            margin-bottom: 18px;
            font-size: 0;
            .sell-count,
            .rating {
                line-height: 14px;
                color: rgb(147, 153, 159);
                font-size: 10px;
            }
            .sell-count {
                margin-right: 12px;
            }
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
            right: 12px;
            bottom: 12px;
        }
        .buy {
            position: absolute;
            right: 18px;
            bottom: 18px;
            height: 24px;
            line-height: 24px;
            padding: 0 12px;
            z-index: 10;
            border-radius: 12px;
            color: #fff;
            background-color: rgb(0, 160, 220);
            font-size: 10px;
        }
        .fade-enter {
            opacity: 0;
        }
        .fade-enter-active {
            transition: all .3s;
        }
        .fade-leave {}
        .fade-leave-active {
            transition: all .3s;
            opacity: 0;
        }
    }
    .info {
        padding: 18px;
        .title {
            line-height: 14px;
            margin-bottom: 6px;
            font-size: 14px;
            color: rgb(7, 17, 27);
        }
        .text {
            line-height: 24px;
            padding: 0 8px;
            font-size: 12px;
            font-weight: 200;
            color: rgb(147, 153, 159);
        }
    }
    .food-ratings {
        padding-top: 18px;
        .title {
            line-height: 14px;
            margin-left: 18px;
            font-size: 14px;
            color: rgb(7, 17, 27);
        }
        .ratings-wrapper {
            padding: 0 18px;
            .rating-item {
                position: relative;
                padding: 16px;
                @include border-1px(rgba(7, 17, 27, 0.1));
                .user-info {
                    position: absolute;
                    right: 0;
                    top: 16px;
                    font-size: 0;
                    .user-name {
                        display: inline-block;
                        margin-right: 6px;
                        line-height: 12px;
                        vertical-align: top;
                        color: rgb(147, 153, 159);
                        font-size: 10px;
                    }
                }
                .rating-time {
                    margin-bottom: 6px;
                    line-height: 12px;
                    font-size: 10px;
                    color: rgb(147, 153, 159);
                }
                .rating-content {
                    line-height: 16px;
                    font-size: 12px;
                    color: rgb(7, 17, 27);
                    .rating-icon {
                        line-height: 16px;
                        font-size: 12px;
                    }
                    .icon-thumb_up {
                        color: rgb(0, 160, 220);
                    }
                    .icon-thumb_down {
                        color: rgb(147, 153, 159);
                    }
                }
            }
            .no-ratings {
                padding: 16px 0;
                font-size: 12px;
                color: rgb(147, 153, 159);
            }
        }
    }
}

.move-enter {
    transform: translate3d(100%, 0, 0);
}

.move-enter-active {
    transition: all .2s linear;
}

.move-leave {}

.move-leave-active {
    transition: all .2s linear;
    transform: translate3d(100%, 0, 0);
}
</style>
