<template>
    <div id="app">
        <oz-l-header />
        <router-view />
    </div>
</template>

<script>
import OzLHeader from '@/components/OzLHeader/OzLHeader.vue';
import { mapActions } from 'vuex';

export default {
    name: 'App',
    components: {
        OzLHeader,
    },
    methods: {
        ...mapActions('cart', ['fetchProductsFromCart'])
    },
    created() {
        this.fetchProductsFromCart();
    }
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    color: #2c3e50;
    background-color: #fafafa;
    box-sizing: border-box;
    direction: ltr;
}

html,
body,
#app {
    min-height: 100%;
}

* {
  box-sizing: border-box;
}
</style>
