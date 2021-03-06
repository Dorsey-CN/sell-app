// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import goods from 'components/goods/goods.vue';
import ratings from 'components/ratings/ratings.vue';
import seller from 'components/seller/seller.vue';

Vue.use(VueRouter);
Vue.use(VueResource);

import 'common/sass/index.scss';

/* eslint-disable no-new */
const router = new VueRouter({
    routes: [
        { path: '', component: goods },
        { path: '/goods', component: goods },
        { path: '/ratings', component: ratings },
        { path: '/seller', component: seller }
    ],
    linkActiveClass: 'active'
});

new Vue({ router, render: h => h(App) }).$mount('#app');
// router.go('/ratings');
