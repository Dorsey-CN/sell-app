<template>
    <div class="rating-select">
        <div class="rating-type border-1px">
            <span class="block positive" :class="{'active': ratingType === 2}">{{desc.all}}<span class="count">57</span></span>
            <span class="block positive" :class="{'active': ratingType === 0}">{{desc.positive}}<span class="count">47</span></span>
            <span class="block negative" :class="{'active': ratingType === 1}">{{desc.negative}}<span class="count">10</span></span>
        </div>
        <div class="switch">
            <i class="icon-check_circle"></i>只看有内容的评价
        </div>
    </div>
</template>
<script type="text/javascript">
// const POSITIVE = 0;
// const NEGATIVE = 1;
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
    }
};
</script>
<style lang="scss" rel="stylesheet/sass" scoped>
@import '../../common/sass/mixin.scss';
	.rating-select{
		.rating-type{
			padding: 18px 0;
			margin: 0 18px;
			@include border-1px(rgba(7, 17, 27, 0.1));
			font-size: 0;
			.block{
				display: inline-block;
				line-height: 16px;
				padding: 8px 12px;
				margin-right: 8px;
				border-radius: 1px;
				color: rgb(77, 85, 93);
				font-size: 12px;
				.count{
					margin-left: 2px;
					font-size: 8px;
				}
			}
			.positive{
				background-color: rgba(0, 160, 220, 0.2);
				&.active{
					background-color: rgb(0, 160, 220);
					color: #fff;
				}
			}
			.negative{
				background-color: rgba(77, 85, 93, 0.2);
				&.active{
					background-color: rgb(77, 85, 93);
					color: #fff;
				}
			}
		}
	}
</style>
