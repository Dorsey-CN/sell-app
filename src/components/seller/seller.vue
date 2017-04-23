<template>
    <div class="seller" ref="seller">
        <div class="seller-content">
            <div class="overview">
                <h1 class="title">{{seller.name}}</h1>
                <div class="description border-1px">
                    <star :size="36" :score="seller.score"></star>
                    <span class="text">({{seller.ratingCount}})</span>
                    <span class="text">月售{{seller.sellCount}}单</span>
                </div>
                <ul class="basic-info">
                    <li class="info-item">
                        <h2 class="info-title">起送价</h2>
                        <div class="info-content">
                            <span class="stress">{{seller.minPrice}}</span>元
                        </div>
                    </li>
                    <li class="info-item">
                        <h2 class="info-title">商家配送</h2>
                        <div class="info-content">
                            <span class="stress">{{seller.deliveryPrice}}</span>元
                        </div>
                    </li>
                    <li class="info-item">
                        <h2 class="info-title">平均配送时间</h2>
                        <div class="info-content">
                            <span class="stress">{{seller.deliveryTime}}</span>分钟
                        </div>
                    </li>
                </ul>
                <div class="favorite">
                    <span class="icon-favorite" @click="toggleFavorite" :class="{'active': favoriteCondition}"></span>
                    <span class="text">{{getFavoriteCondition}}</span>
                </div>
            </div>
            <split></split>
            <div class="bulletin">
                <h1 class="title">公告与活动</h1>
                <div class="content-wrapper border-1px">
                    <p class="content">{{seller.bulletin}}</p>
                </div>
            </div>
            <div v-if="seller.supports" class="supports">
                <div v-for="(supportItem, index) in seller.supports" class="support-item border-1px">
                    <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                    <span class="text">{{seller.supports[index].description}}</span>
                </div>
            </div>
            <split></split>
            <div class="pics">
                <h1 class="title">商家实景</h1>
                <div class="pics-wrapper" ref="picsWrapper">
                    <ul class="pics-list" ref="picsList">
                        <li class="pic-item" v-for="pic in seller.pics">
                            <img :src="pic" width="120" height="90" />
                        </li>
                    </ul>
                </div>
            </div>
            <split></split>
            <div class="seller-info">
                <h1 class="title border-1px">商家信息</h1>
                <ul class="info-list">
                    <li class="info-item border-1px" v-for="info in seller.infos">{{info}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import star from 'components/star/star.vue';
import split from 'components/split/split.vue';
import BScroll from 'better-scroll';
import {
    saveToLocal,
    loadFromLocal
} from '../../common/js/store.js';

export default {
    props: {
        seller: {
            type: Object
        }
    },
    data() {
        return {
            favoriteCondition: (() => {
                return loadFromLocal(this.seller.id, 'favorite');
            })()
        };
    },
    computed: {
        getFavoriteCondition() {
            return this.favoriteCondition ? '已收藏' : '收藏';
        }
    },
    created() {
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    mounted() {
        this._initScroll();
        if (this.seller.pics) {
            this._initPics();
        }
    },
    updated() {
        this._initScroll();
        this._initPics();
    },
    methods: {
        _initScroll() {
            if (!this.scroll) {
                this.scroll = new BScroll(this.$refs.seller, {
                    click: true
                });
            } else {
                this.scroll.refresh();
            }
        },
        _initPics() {
            if (!this.picsScroll) {
                let picWidth = 120;
                let margin = 6;
                let width = (picWidth + margin) * this.seller.pics.length - margin;
                this.$refs.picsList.style.width = width + 'px';
                this.picsScroll = new BScroll(this.$refs.picsWrapper, {
                    scrollX: true,
                    eventPassThrough: 'vertical'
                });
            } else {
                this.picsScroll.refresh();
            }
        },
        toggleFavorite(event) {
            if (!event._constructed) {
                return;
            }
            this.favoriteCondition = !this.favoriteCondition;
            saveToLocal(this.seller.id, 'favorite', this.favoriteCondition);
        }
    },
    components: {
        star,
        split
    }
};
</script>
<style lang="scss" rel="stylesheet/sass">
@import '../../common/sass/mixin.scss';
.seller {
    position: absolute;
    top: 174px;
    bottom: 0;
    left: 0;
    overflow: hidden;
    width: 100%;
    .overview {
        padding: 18px;
        .title {
            margin-bottom: 8px;
            line-height: 14px;
            font-size: 14px;
            color: rgb(7, 17, 27);
        }
        .description {
            padding-bottom: 18px;
            @include border-1px(rgba(7, 17, 27, 0.1));
            font-size: 0;
            .star {
                display: inline-block;
                margin-right: 8px;
                vertical-align: top;
            }
            .text {
                display: inline-block;
                margin-right: 12px;
                line-height: 18px;
                vertical-align: top;
                font-size: 10px;
                color: rgb(77, 85, 93);
            }
        }
        .basic-info {
            display: flex;
            padding-top: 18px;
            .info-item {
                flex: 1;
                text-align: center;
                border-right: 1px solid rgba(7, 17, 27, 0.1);
                &:last-child {
                    border: none;
                }
                .info-title {
                    margin-bottom: 4px;
                    line-height: 10px;
                    font-size: 10px;
                    color: rgb(147, 153, 159);
                }
                .info-content {
                    line-height: 24px;
                    font-weight: 200;
                    font-size: 10px;
                    color: rgb(7, 17, 27);
                    .stress {
                        font-size: 24px;
                    }
                }
            }
        }
        .favorite {
            position: absolute;
            top: 18px;
            right: 11px;
            width: 50px;
            text-align: center;
            .icon-favorite {
                display: block;
                margin-bottom: 4px;
                line-height: 24px;
                font-size: 24px;
                color: #d4d6d9;
            }
            .active {
                color: rgb(240, 20, 20);
            }
            .text {
                line-height: 10px;
                font-size: 10px;
                color: rgb(77, 85, 93);
            }
        }
    }
    .bulletin {
        padding: 18px 18px 0 18px;
        .title {
            margin-bottom: 8px;
            line-height: 14px;
            font-size: 14px;
            color: rgb(7, 17, 27);
        }
        .content-wrapper {
            padding: 0 18px 12px 12px;
            @include border-1px(rgba(7, 17, 27, 0.1));
            .content {
                line-height: 24px;
                font-weight: 200;
                font-size: 12px;
                color: rgb(240, 20, 20);
            }
        }
    }
    .supports {
        padding: 18px 18px 0 18px;
        .support-item {
            padding: 16px 12px;
            @include border-1px(rgba(7, 17, 27, 0.1));
            &:last-child {
                &:after {
                    border: none;
                }
            }
            .icon {
                display: inline-block;
                width: 16px;
                height: 16px;
                margin-right: 6px;
                background-size: 16px 16px;
                background-repeat: no-repeat;
                vertical-align: top;
            }
            .decrease {
                @include bg-image(decrease_4);
            }
            .discount {
                @include bg-image(discount_4);
            }
            .guarantee {
                @include bg-image(guarantee_4);
            }
            .invoice {
                @include bg-image(invoice_4);
            }
            .special {
                @include bg-image(special_4);
            }
            .text {
                line-height: 16px;
                font-weight: 200;
                font-size: 12px;
                color: rgb(7, 17, 27);
            }
        }
    }
    .pics {
        padding: 18px;
        .title {
            margin-bottom: 12px;
            line-height: 14px;
            font-size: 14px;
            color: rgb(7, 17, 27);
        }
        .pics-wrapper {
            width: 100%;
            overflow: hidden;
            .pics-list {
                white-space: nowrap;
                font-size: 0;
                .pic-item {
                    display: inline-block;
                    margin-right: 6px;
                    width: 120px;
                    height: 90px;
                    &:last-child {
                        margin: 0;
                    }
                }
            }
        }
    }
    .seller-info {
        padding: 18px 18px 0 18px;
        .title {
            padding-bottom: 12px;
            line-height: 14px;
            @include border-1px(rgba(7, 17, 27, 0.1));
            font-size: 14px;
            color: rgb(7, 17, 27);
        }
        .info-item {
            padding: 16px 12px;
            line-height: 16px;
            @include border-1px(rgba(7, 17, 27, 0.1));
            font-weight: 200;
            font-size: 12px;
            color: rgb(7, 17, 27);
            &:last-child {
                &:after {
                    border: none;
                }
            }
        }
    }
}
</style>
