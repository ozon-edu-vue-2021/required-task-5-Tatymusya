import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import products from '@/store/modules/products.store.js';
import cart from '@/store/modules/cart.store.js';


Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export const store = new Vuex.Store({
    modules: {
        products,
        cart,
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
});