import Vue from 'vue';
import Router from 'vue-router';
import OzCatalog from '@/views/OzCatalog/OzCatalog.vue';
const OzShopingCart = () => import(/* webpackChunkName: 'OzShopingCart' */ '@/views/OzShopingCart/OzShopingCart.vue');
const OzProduct = () => import(/* webpackChunkName: 'OzProduct' */ '@/views/OzProduct/OzProduct.vue');
const OzNotFound = () => import(/* webpackChunkName: 'OzNotFound' */ '@/views/OzNotFound/OzNotFound.vue');
const OzFavourite = () => import(/* webpackChunkName: 'OzFavourite' */ '@/views/OzFavourite/OzFavourite.vue')

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            name: '',
            path: '/',
            component: OzCatalog,
            meta: {
                title: 'Каталог'
            }
        },
        {
            name: 'product',
            path: '/product/:id',
            component: OzProduct,
            meta: {
                title: 'Продукт'
            },
            props: true
        },
        {
            name: 'cart',
            path: '/cart',
            component: OzShopingCart,
            meta: {
                title: 'Корзина'
            },
            props: true
        },
        {
            name: 'favourite',
            path: '/favourite',
            component: OzFavourite,
            meta: {
                title: 'Избранное'
            },
        },
        {
            path: '/404',
            alias: '*',
            name: 'notFound',
            component: OzNotFound,
            meta: {
                title: "Страница не найдена"
            }
        }
    ]
});

router.beforeEach(async (to, from, next) => {
    const { title } = to.meta;
    document.title = title ? title : '';
    next();
});

export default router;