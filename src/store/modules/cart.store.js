import Vue from 'vue';

const state = {
    products: null,
    productInCart: {},
    cart: {},
    size: 0,
    total: 0,
};

const getters = {
    getProductQuantity: state => id => {
        return state.cart[`${id}`] ? state.cart[`${id}`].quantity : 0;
    },
    cartSize(state) {
        return state.size;
    },
    productsFromCart (state) {
        return state.cart;
    },
    total(state) {
        return state.total;
    }

};

const mutations = {
    SET_PRODUCTS(state, payload) {
        state.products = payload;
    },
    ADD_TO_CART: (state, {id, quantity, price, title}) => {
        const keys = Object.keys(state.cart);
        const totalPrice = price * quantity;
        if(!keys.includes(`${id}`)) {
            Vue.set(state.cart, id, {id, quantity, price, totalPrice, title});
        } else {
            state.cart[id].quantity = quantity;
            state.cart[id].totalPrice = totalPrice;
        }

        const values = Object.values(state.cart);
        state.size = values.reduce((prev, current) => {
            return prev + current.quantity;
        }, 0);
        state.total = values.reduce((prev, current) => {
            return prev + (current.quantity * current.price);
        }, 0);
    },
    PRODUCT_IN_CART: (state, payload) => {
        state.productInCart = payload;
    },
    SET_QUANTITY: (state, { productId, quantity }) => {
        const currentProduct = state.cart.find((product) => product.id === productId);
        currentProduct.quantity = quantity;
    }
};

const actions = {
    fetchProductsFromCart({ commit }) {
        //const localStorageCart = localStorage.getItem('cart');
        try {
            commit('SET_PRODUCTS');
        } catch(err) {
            console.error(err);
        }
    },
    addToCart: ({ commit, state }, product) => {
        commit('ADD_TO_CART', product);
        commit('PRODUCT_IN_CART', product);
        window.localStorage.setItem('cart', JSON.stringify(state));
    },
    setQuantity: ({ commit }, productId, quantity) => {
        commit('SET_QUANTITY', productId, quantity);
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
