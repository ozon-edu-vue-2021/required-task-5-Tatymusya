<template>
    <section>
        <oz-container v-if="getProducts">        
            <h1>Каталог</h1>
            <template v-if="!isLoading">
                <ul :class="$style.ozCatalogList">
                    <li 
                        v-for="item in getProducts"
                        :key="item.id"
                        :class="$style.ozCatalogItem"
                    >
                        <oz-catalog-card
                            :item="item" 
                            :quantity="getProductQuantity(item.id)"
                            @onAddToCart="onAddToCart"
                            @addFavourite="addFavourite"
                        />
                    </li>
                </ul>
            </template>
            <span v-else>
                ...is loading
            </span>
        </oz-container>
        <oz-container v-else>
             Нет товаров в данной категории
        </oz-container>
        <oz-divider />
    </section>
</template>

<script>
import ozDivider from '@/components/OzDivider';
import ozContainer from '@/components/OzContainer';
import { mapGetters, mapActions } from 'vuex';
import OzCatalogCard from '@/components/OzCatalogCard/OzCatalogCard.vue';

export default {
    name: 'OzCatalog',
    components: {
        ozDivider,
        ozContainer,
        OzCatalogCard,
    },
    computed: {
        ...mapGetters('products', ['getProducts', 'isLoading']),
        ...mapGetters('cart', ['getProductQuantity'])
    },
    methods: {
        ...mapActions('products', ['fetchProducts', 'fetchFavouriteProducts']),
        ...mapActions('cart', ['addToCart']),
        addFavourite(item) {
            this.fetchFavouriteProducts(item);
        },
        onAddToCart(item) {
            this.addToCart(item);
        }
    },
    async mounted() {
        if(this.getProducts.length !== 0) {
            return false;
        }
        await this.fetchProducts();
    },
}
</script>

<style module>
    .ozCatalogList {
        position: relative;
        display: flex;
        align-items: stretch;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 1px;
        margin: 0;
        padding: 0;
    }
    .ozCatalogItem {
        width: 230px;
        list-style-type: none;
        background-color: #fff;
    }
</style>