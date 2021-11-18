import Vue from 'vue';
import { getProducts, getProductById } from '@/api/products.api';

const state = {
    products: [],
    favourites: {},
    product: {},
    isLoading: false,
};

const getters = {
    getProducts(state) {
        return state.products;
    },
    favouriteSize(state) {
        return Object.keys(state.favourites).length;
    },
    isLoading(state) {
        return state.isLoading;
    },
    getProductById(state) {
        return (productId) => {
            return state.products.find((product) => product.id === productId);
        }
    },
    getFavoriteProducts(state) {
        return state.favourites;
    }
};

const mutations = {
    SET_PRODUCTS(state, payload) {
        state.products = payload;
    },
    IS_LOADING(state, payload) {
        state.isLoading = payload;
    },
    SET_PRODUCT(state, payload) {
        state.product = payload;
    },
    SET_FAVORITE(state, { id, description, image, price }) {
        const isAdded = state.favourites[id]?.id;

        if(isAdded) {
            return false;
        }

        Vue.set(state.favourites, id, {id, price, description, image});
    },
    REMOVE_FAVOURITE(state, id) {
        Vue.delete(state.favourites, id);
    },
    SET_IS_IN_CART(state, payload) {
        state.product = payload;
    }
};

const actions = {
    async fetchProducts({ commit }) {
        try {
            commit('IS_LOADING', true);
            const response = await getProducts();
            commit('SET_PRODUCTS', response.data);
            commit('IS_LOADING', false);
        } catch(err) {
            console.error(err);
        }
    },
    async fetchProduct({ commit }, id) {
        try {
            commit('IS_LOADING', true);
            const response = await getProductById(id);
            commit('SET_PRODUCT', response.data);
            commit('IS_LOADING', false);
        } catch(err) {
            console.error(err);
        }
    },
    fetchFavouriteProducts({ commit }, id) {
        try {
            commit('SET_FAVORITE', id);
        } catch(err) {
            console.error(err);
        }
    },
    removeProductFromFavourite({ commit }, id) {
        try {
            commit('REMOVE_FAVOURITE', id);
        } catch(err) {
            console.error(err);
        }
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
