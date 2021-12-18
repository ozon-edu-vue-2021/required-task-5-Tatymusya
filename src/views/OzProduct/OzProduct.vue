<template>
    <section>
        <oz-container>        
            <h1>{{product.title}}</h1>
            <template v-if="!isLoading">
                <oz-product-card
                    :item="product" 
                    :quantity="getProductQuantity(product.id)"
                    @onAddToCart="onAddToCart"
                    @addFavourite="addFavourite"
                />
            </template>
            <span v-else>
                ...is loading
            </span>
        </oz-container>
        <oz-divider />
    </section>
</template>

<script>
import ozDivider from '@/components/OzDivider';
import ozContainer from '@/components/OzContainer';
import OzProductCard from '@/components/OzProductCard/OzProductCard.vue';
import { mapGetters, mapActions, mapState } from 'vuex';

export default {
    name: 'OzProduct',
    components: {
        ozDivider,
        ozContainer,
        OzProductCard
    },
    props: {
        id: {
            type: [String, Number],
        }
    },
    computed: {
        ...mapState('products', ['product', 'isLoading']),
        ...mapGetters('cart', ['getProductQuantity']),

    },
    methods: {
        ...mapActions('products', ['fetchProduct', 'fetchFavouriteProducts']),
        ...mapActions('cart', ['addToCart']),
        addFavourite(product) {
            this.fetchFavouriteProducts(product);
        },
        onAddToCart(product) {
            this.addToCart(product);
        }
    },
    async mounted() {
        await this.fetchProduct(Number(this.id));
    },
}
</script>