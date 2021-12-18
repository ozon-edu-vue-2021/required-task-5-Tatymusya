<template>
    <section>
        <oz-container>        
            <h1>Избранное</h1>
            <template v-if="favouriteSize">
                <ul :class="$style.ozCatalogList">
                    <li 
                        v-for="item in getFavoriteProducts"
                        :key="item.id"
                        :class="$style.ozCatalogItem"
                    >
                        <oz-catalog-card
                            :item="item" 
                            :quantity="getProductQuantity(item.id)"
                            clearable
                            @onRemoveFromFavourite="removeFromFavourite"
                            @onAddToCart="onAddToCart"
                        />
                    </li>
                </ul>
            </template>
            <div v-else>
                В избранном пусто
            </div>
        </oz-container>
        <oz-divider />
    </section>
</template>

<script>
import ozDivider from '@/components/OzDivider';
import ozContainer from '@/components/OzContainer';
import OzCatalogCard from '@/components/OzCatalogCard/OzCatalogCard.vue';

import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'OzFavourite',
    components: {
        ozDivider,
        ozContainer,
        OzCatalogCard,
    },
    computed: {
        ...mapGetters('products', ['getFavoriteProducts', 'favouriteSize']),
        ...mapGetters('cart', ['getProductQuantity'])
    },
    methods: {
        ...mapActions('cart', ['addToCart']),
        ...mapActions('products', ['removeProductFromFavourite']),
        removeFromFavourite(id) {
            this.removeProductFromFavourite(id);
        },
        onAddToCart(item) {
            this.addToCart(item);
        }
    }
}
</script>

<style module>
    .ozCatalogList {
        position: relative;
        display: flex;
        align-items: stretch;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 20px;
        margin: 0;
        padding: 0;
    }
    .ozCatalogItem {
        max-inline-size: 15%;
        list-style-type: none;
    }
    .ozCatalogText {
        overflow: hidden;
        font-size: 16px;
        line-height: 1.5;
        max-height: calc(1.5em * 3);
    }
</style>