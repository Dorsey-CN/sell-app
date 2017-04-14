<template>
    <div class="ratings-wrapper">
        <div class="ratings" ref="ratings">
            <div class="ratings-content">
                <div class="overview">
                    <div class="overview-left">
                        <h1 class="score">{{seller.score}}</h1>
                        <div class="title">综合评分</div>
                        <div class="rank">高于周边商家{{seller.rankRate}}%</div>
                    </div>
                    <div class="overview-right">
                        <div class="score-container">
                            <span class="title">服务态度</span>
                            <star :size="36" :score="seller.serviceScore"></star>
                            <span class="score">{{seller.serviceScore}}</span>
                        </div>
                        <div class="score-container">
                            <span class="title">商品评分</span>
                            <star :size="36" :score="seller.foodScore"></star>
                            <span class="score">{{seller.foodScore}}</span>
                        </div>
                        <div class="delivery-container">
                            <span class="title">送达时间</span>
                            <span class="delivery-time">{{seller.deliveryTime}}分钟</span>
                        </div>
                    </div>
                </div>
                <split></split>
                <ratingselect :ratings="ratings" :rating-type="ratingType" :only-content="onlyContent" v-on:change-type="setRatingType" v-on:change-content="setOnlyContent"></ratingselect>
                <div class="rating-wrapper">
                    <ul class="rating-list">
                        <li class="rating-item" v-for="rating in ratings" v-show="needShow(rating.rateType, rating.text)">
                            <div class="avatar">
                                <img :src="rating.avatar" width="28" height="28" />
                            </div>
                            <div class="rating-content">
                                <h1 class="user-name">{{rating.username}}</h1>
                                <div class="score-wrapper">
                                    <star :size="24" :score="rating.score"></star>
                                    <span v-show="rating.deliveryTime" class="delivery">{{rating.deliveryTime}}分钟送达</span>
                                </div>
                                <p class="rating-text">{{rating.text}}</p>
                                <div class="recommend-wrapper" v-show="rating.recommend && rating.recommend.length">
                                    <span class="icon-thumb_up"></span>
                                    <span class="recommend-item" v-for="item in rating.recommend">{{item}}</span>
                                </div>
                                <div class="rating-time">
                                    {{rating.rateTime | formatDate}}
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import BScroll from 'better-scroll';
import split from 'components/split/split.vue';
import ratingselect from 'components/ratingselect/ratingselect.vue';
import star from 'components/star/star.vue';
import {
    formDate
} from 'common/js/formate_date.js';

const ERROR_OK = 0;
const ALL = 2;
export default {
    props: {
        seller: {
            type: Object
        }
    },
    data() {
        return {
            ratings: [],
            showFlag: false,
            ratingType: ALL,
            onlyContent: true
        };
    },
    created() {
        this.$http.get('/api/ratings').then((response) => {
            response = response.body;
            if (response.errorno === ERROR_OK) {
                this.ratings = response.data;
                this.$nextTick(() => {
                    this._initScroll();
                });
            }
        });
    },
    methods: {
        _initScroll() {
            this.scroll = new BScroll(this.$refs.ratings, {
                click: true
            });
            // this.foodsWrapper.on('scroll', (pos) => {
            //     this.scrollY = Math.abs(Math.round(pos.y));
            // });
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
                return type === this.ratingType;
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
        star,
        split,
        ratingselect
    }
};
</script>
<style lang="scss" rel="stylesheet/sass" scoped>
@import '../../common/sass/mixin.scss';
.ratings-wrapper {
    position: absolute;
    display: flex;
    top: 174px;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    .ratings-content {
        // width: 100%;
        .overview {
            display: flex;
            padding: 18px 0;
            .overview-left {
                flex: 0 0 137px;
                padding: 6px 0;
                border-right: 1px solid rgba(7, 17, 27, 0.1);
                width: 137px;
                text-align: center;
                @media only screen and (max-width: 320px) {
                    flex: 0 0 120px;
                    width: 120px;
                }
                .score {
                    line-height: 28px;
                    font-size: 24px;
                    color: rgb(255, 153, 0);
                }
                .title {
                    margin: 6px 0 8px;
                    line-height: 12px;
                    font-size: 12px;
                    color: rgb(7, 17, 27);
                }
                .rank {
                    line-height: 10px;
                    font-size: 10px;
                    color: rgb(147, 153, 159);
                }
            }
            .overview-right {
                flex: 1;
                padding: 6px 0 6px 24px;
                @media only screen and (max-width: 320px) {
                    padding-left: 10px;
                }
                .score-container {
                    margin-bottom: 8px;
                    font-size: 0;
                    .title {
                        display: inline-block;
                        vertical-align: top;
                        line-height: 18px;
                        font-size: 12px;
                        color: rgb(7, 17, 27);
                    }
                    .star {
                        display: inline-block;
                        margin: 0 12px;
                        vertical-align: top;
                    }
                    .score {
                        display: inline-block;
                        vertical-align: top;
                        line-height: 18px;
                        font-size: 12px;
                        color: rgb(255, 153, 0);
                    }
                }
                .delivery-container {
                    font-size: 0;
                    .title {
                        margin-right: 12px;
                        line-height: 18px;
                        font-size: 12px;
                        color: rgb(7, 17, 27);
                    }
                    .delivery-time {
                        line-height: 18px;
                        font-size: 12px;
                        color: rgb(147, 153, 159);
                    }
                }
            }
        }
        .rating-wrapper {
            padding: 0 18px;
            .rating-item {
                display: flex;
                padding: 18px 0;
                @include border-1px(rgba(7, 17, 27, 0.1));
                .avatar {
                    margin-right: 12px;
                    flex: 0 0 28px;
                    width: 28px;
                }
                .rating-content {
                    position: relative;
                    flex: 1;
                    .user-name {
                        margin-bottom: 4px;
                        line-height: 12px;
                        font-size: 10px;
                        color: rgb(7, 17, 27);
                    }
                    .score-wrapper {
                        margin-bottom: 6px;
                        font-size: 0;
                        .star {
                            display: inline-block;
                            margin-right: 6px;
                            vertical-align: top;
                        }
                        .delivery {
                            line-height: 12px;
                            font-weight: 200;
                            font-size: 10px;
                            color: rgb(147, 153, 159);
                        }
                    }
                    .rating-text {
                        margin-right: 8px;
                        line-height: 18px;
                        font-size: 12px;
                        color: rgb(7, 17, 27);
                    }
                    .recommend-wrapper {
                        line-height: 16px;
                        font-size: 0;
                        .icon-thumb_up,
                        .recommend-item {
                            display: inline-block;
                            margin: 0 8px 4px 0;
                        }
                        .icon-thumb_up {
                            font-size: 12px;
                            color: rgb(0, 160, 220);
                        }
                        .recommend-item {
                            padding: 6px;
                            border: 1px solid rgba(7, 17, 27, 0.1);
                            border-radius: 1px;
                            font-size: 9px;
                            color: rgb(147, 153, 159);
                            background-color: rgb(255, 255, 255);
                        }
                    }
                    .rating-time {
                        position: absolute;
                        top: 0;
                        right: 0;
                        line-height: 12px;
                        font-weight: 200;
                        font-size: 10px;
                        color: rgb(147, 153, 159);
                    }
                }
            }
        }
    }
}
</style>
