<template>
    <div>
        <v-header :seller="seller"></v-header>
        <div class="tab border-1px">
            <div class="tab-item">
                <router-link to="/goods">商品</router-link>
            </div>
            <div class="tab-item">
                <router-link to="/ratings">评价</router-link>
            </div>
            <div class="tab-item">
                <router-link to="/seller">商家</router-link>
            </div>
        </div>
        <keep-alive>
            <router-view :seller="seller"></router-view>
        </keep-alive>
        <!-- <div class="content">
            I am content!
        </div> -->
    </div>
</template>
<script>
import header from './components/header/header.vue';
import {
    urlParse
} from 'common/js/util.js';
const ERROR_OK = 0;

export default {
    data() {
            return {
                seller: {
                    id: (() => {
                        let query = window.location.search;
                        let id = urlParse(query).id;
                        return id;
                    })()
                }
            };
        },
        created() {
            this.$http.get('/api/seller?id=' + this.seller.id).then((response) => {
                response = response.body;
                if (response.errorno === ERROR_OK) {
                    this.seller = Object.assign({}, this.seller, response.data);
                }
            });
        },
        components: {
            'v-header': header
        }
};
</script>
<style lang="scss" type="stylesheet/sass" scoped>
    @import "common/sass/mixin.scss"; .tab{ display: flex; width: 100%; height: 40px; line-height: 40px; @include border-1px(rgba(7,17,27,0.1)); .tab-item{ flex:1; text-align: center; a{ display:block; font-size:14px; color:rgb(77, 85, 93); } .active{ color:rgb(240, 20, 20); } } }
</style>
