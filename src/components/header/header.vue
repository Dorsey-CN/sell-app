<template>
    <div class="header">
        <div class="content-wrapper">
            <div class="avatar">
                <img width="64" height="64" :src="seller.avatar" />
        	</div>
        	<div class="content">
        		<div class="title">
        			<span class="brand"></span>
        			<span class="name">{{seller.name}}</span>
        		</div>
        		<div class="description">
        			<p>{{seller.description}}/{{seller.deliveryTime}}分钟送达</p>
        		</div>
        		<div v-if="seller.supports" class="support">
        			<span class="icon" :class="classMap[seller.supports[0].type]"></span>
        			<span class="text">{{seller.supports[0].description}}</span>
        		</div>
        	</div>
            <div v-if="seller.supports" class="support-count" @click="showDetail">
                <span class="count">{{seller.supports.length}}个</span>
                <i class="icon-keyboard_arrow_right"></i>
            </div>
        </div>
        <div class="bulletin-wrapper" @click="showDetail">
            <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
            <span class="icon-keyboard_arrow_right"></span>
        </div>
        <div class="header-background">
            <img :src="seller.avatar" width="100%" height="100%"/>
        </div>
        <transition name="fade">
            <div v-show="detailShow" class="detail">
                <div class="detail-wrapper clearfix">
                    <div class="detail-main">
                        <h1 class="title">{{seller.name}}</h1>
                        <div class="star-wrapper">
                            <star :size="48" :score="seller.score"></star>
                        </div>
                        <div class="info">
                            <div class="line"></div>
                            <div class="text">优惠信息</div>
                            <div class="line"></div>
                        </div>
                        <div v-if="seller.supports" class="supports">
                            <div v-for="(supportItem, index) in seller.supports" class="support-item">
                                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                                <span class="text">{{seller.supports[index].description}}</span>
                            </div>
                        </div>
                        <div class="info">
                            <div class="line"></div>
                            <div class="text">商家公告</div>
                            <div class="line"></div>
                        </div>
                        <div class="bulletin">
                            <p class="bulletin-content">{{seller.bulletin}}</p>
                        </div>
                    </div>
                </div>
                <div class="detail-close" @click="hideDetail">
                    <i class="icon-close"></i>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
import star from '../star/star.vue';
export default {
    props: {
        seller: {
            type: Object
        }
    },
    data() {
        return {
            detailShow: false
        };
    },
    methods: {
        showDetail: function() {
            this.detailShow = true;
        },
        hideDetail: function() {
            this.detailShow = false;
        }
    },
    created() {
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    components: {
        'star': star
    }
};
</script>
<style lang="scss" rel="stylesheet/sass" scoped>
@import '../../common/sass/mixin.scss';
	.header{
        position: relative;
        overflow: hidden;
        color: #fff;
        background-color: rgba(7,17, 27, 0.5);
        .content-wrapper{
            position: relative;
            padding: 24px 12px 18px 24px;
            font-size: 0;
            .avatar{
                display: inline-block;
                vertical-align: top;
                img{
                    border-radius: 2px;
                }
            }
            .content{
                display: inline-block;
                margin-left: 16px;
                .title{
                    margin: 2px 0 8px 0;
                    .brand{
                        display: inline-block;
                        width: 30px;
                        height: 18px;
                        @include bg-image('brand');
                        background-size: cover;
                        background-repeat: repeat;
                        vertical-align: top;
                    }
                    .name{
                        line-height: 18px;
                        font-size: 16px;
                        font-weight: bold;
                        margin-left: 6px;
                    }
                }
                .description{
                    margin-bottom: 10px;
                    font-size: 12px;
                    color: rgb(255, 255, 255);
                    line-height: 12px;
                }
                .support{
                    .icon{
                        display: inline-block;
                        width: 12px;
                        height: 12px;
                        margin-right: 4px;
                        background-size: 12px 12px;
                        background-repeat: no-repeat;
                        vertical-align: top;
                    }
                    .decrease{
                        @include bg-image(decrease_1);
                    }
                    .discount{
                        @include bg-image(discount_1);
                    }
                    .guarantee{
                        @include bg-image(guarantee_1);
                    }
                    .invoice{
                        @include bg-image(invoice_1);
                    }
                    .special{
                        @include bg-image(special_1);
                    }
                    .text{
                        position: relative;
                        top: 2px;
                        line-height: 12px;
                        font-size: 10px;
                    }
                } 
            }
            .support-count{
                position: absolute;
                right: 14px;
                bottom: 12px;
                height: 24px;
                line-height: 24px;
                border-radius: 14px;
                padding: 0 8px;
                background-color: rgba(0, 0, 0, 0.2);
                text-align: center;
                .count{
                    vertical-align: top;
                    font-size: 10px;
                }
                .icon-keyboard_arrow_right{
                    margin-left: 2px;
                    line-height: 24px;
                    font-size: 10px;
                } 
            }
        } 
        .bulletin-wrapper{
            position: relative;
            height: 28px;
            line-height: 28px;
            padding: 0 22px 0 12px;
            background: rgba(7, 17, 27, 0.2);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            .bulletin-title{
                display: inline-block;
                width: 22px;
                height: 12px;
                margin-top: 8px;
                @include bg-image(bulletin);
                background-size: 22px 12px;
                background-repeat: no-repeat;
                vertical-align: top;
            }
            .bulletin-text{
                position: relative;
                top: 2px;
                margin: 0 4px;
                padding-top: 6px;
                vertical-align: top;
                font-size: 10px;
            }
            .icon-keyboard_arrow_right{
                position: absolute;
                right: 6px;
                top: 9px;
                font-size: 10px;
            }
        }
        .header-background{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            filter: blur(10px);
        }
        .fade-enter-active, .fade-leave-active {
            transition: opacity .5s;
        }
        .fade-enter, .fade-leave-active {
            opacity: 0;
        }
        .detail{
            position: fixed;
            top: 0;
            left: 0;
            z-index: 100;
            width: 100%;
            height: 100%;
            overflow: hidden;
            overflow-y: auto;
            backdrop-filter: blur(10px);
            background: rgba(7, 17, 27, 0.8);
            .detail-wrapper{
                width: 100%;
                min-height: 100%;
                padding-top: 64px;
                box-sizing: border-box;
                .detail-main{
                    padding-bottom: 64px;
                    .title{
                        line-height: 16px;
                        font-weight: 700;
                        font-size: 16px;
                        text-align: center;
                    }
                    .star-wrapper{
                        margin-top: 16px;
                        padding: 2px 0;
                        text-align: center;   
                    }
                    .info{
                        display: flex;
                        width: 80%;
                        margin: 28px auto 24px;
                        .line{
                            position: relative;
                            flex: 1;
                            top: -6px;
                            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
                        }
                        .text{
                            padding: 0 12px;
                            font-weight: 700;
                            font-size: 14px;
                        }
                    }
                    .supports{
                        width:80%;
                        margin: 0 auto;
                        font-size: 0;
                        .support-item{
                            margin-bottom: 12px;
                            padding: 0 12px;
                            .icon{
                                display: inline-block;
                                margin-right: 6px;
                                width: 16px;
                                height: 16px;
                                background-size: 16px 16px;
                                background-repeat: no-repeat;
                                vertical-align: top;
                            }
                            .decrease{
                                @include bg-image(decrease_2);
                            }
                            .discount{
                                @include bg-image(discount_2);
                            }
                            .guarantee{
                                @include bg-image(guarantee_2);
                            }
                            .invoice{
                                @include bg-image(invoice_2);
                            }
                            .special{
                                @include bg-image(special_2);
                            }
                            .text{
                                line-height: 16px;
                                font-size: 12px;
                            }
                        }
                    }
                    .bulletin{
                        width: 80%;
                        margin: 0 auto;
                        .bulletin-content{
                            line-height: 24px;
                            padding: 0 12px;
                            font-size: 12px;
                        }
                    }
                }
            }
            .detail-close{
                position: relative;
                margin: -64px auto 0;
                width: 32px;
                height: 32px;
                clear: both;
                font-size: 32px;
                color: rgba(255, 255, 255, 0.5);
            }
        }
    }	
</style>
