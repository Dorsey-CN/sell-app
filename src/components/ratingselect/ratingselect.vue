<template>
    <div class="rating-select">
        <div class="rating-type border-1px">
            <span class="block positive" :class="{'active': newRatingType === 2}" @click="selectType($event, 2)">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
            <span class="block positive" :class="{'active': newRatingType === 0}" @click="selectType($event, 0)">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
            <span class="block negative" :class="{'active': newRatingType === 1}" @click="selectType($event, 1)">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
        </div>
        <div class="switch" @click="switchContent">
            <span class="icon-check_circle" :class="{'on': newOnlyContent}"></span>
            <span class="switch-text">只看有内容的评价</span>
        </div>
    </div>
</template>
<script type="text/javascript">
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

export default {
    props: {
        ratings: {
            type: Array,
            default () {
                return [];
            }
        },
        ratingType: {
            type: Number,
            default: ALL
        },
        onlyContent: {
            type: Boolean,
            default: false
        },
        desc: {
            type: Object,
            default () {
                return {
                    all: '全部',
                    positive: '满意',
                    negative: '不满意'
                };
            }
        }
    },
    data() {
        return {
            newRatingType: this.ratingType,
            newOnlyContent: this.onlyContent
        };
    },
    computed: {
        positives() {
            return this.ratings.filter(function(rating) {
                return rating.rateType === POSITIVE;
            });
        },
        negatives() {
            return this.ratings.filter(function(rating) {
                return rating.rateType === NEGATIVE;
            });
        }
    },
    methods: {
        selectType: function(event, type) {
            if (!event._constructed) {
                return;
            }
            this.newRatingType = type;
            this.$emit('change-type', type);
        },
        switchContent: function(event) {
            if (!event._constructed) {
                return;
            }
            this.newOnlyContent = !this.newOnlyContent;
            this.$emit('change-content', this.newOnlyContent);
        }
    }
};
</script>
<style lang="scss" rel="stylesheet/sass" scoped>
@import '../../common/sass/mixin.scss';
.rating-select {
    .rating-type {
        padding: 18px 0;
        margin: 0 18px;
        @include border-1px(rgba(7, 17, 27, 0.1));
        font-size: 0;
        .block {
            display: inline-block;
            line-height: 16px;
            padding: 8px 12px;
            margin-right: 8px;
            border-radius: 1px;
            color: rgb(77, 85, 93);
            font-size: 12px;
            .count {
                margin-left: 2px;
                font-size: 8px;
            }
        }
        .positive {
            background-color: rgba(0, 160, 220, 0.2);
            &.active {
                background-color: rgb(0, 160, 220);
                color: #fff;
            }
        }
        .negative {
            background-color: rgba(77, 85, 93, 0.2);
            &.active {
                background-color: rgb(77, 85, 93);
                color: #fff;
            }
        }
    }
    .switch {
        padding: 12px 18px;
        border-bottom: 2px solid rgba(7, 17, 27, 0.2);
        font-size: 0;
        .icon-check_circle {
            display: inline-block;
            margin-right: 4px;
            vertical-align: top;
            line-height: 24px;
            color: rgb(143, 157, 159);
            font-size: 24px;
        }
        .on {
            color: #00C850;
        }
        .switch-text {
            display: inline-block;
            vertical-align: top;
            line-height: 24px;
            color: rgb(143, 157, 159);
            font-size: 12px;
        }
    }
}
</style>
