<template>
    <oz-card 
        :id="item.id"
        outlined
    >
        <template #topActions>
            <oz-button 
                v-if="!clearable"
                :class="{
                    [$style.ozCatalogCardBtnFavourite]: true,
                    [$style.ozCatalogCardBtnActive]: isFavor
                }"
                @click="addFavourite(item)"
            >
                <oz-favourite-icon />
               <!-- В избранное -->
            </oz-button>
            <oz-button 
                v-else
                :class="$style.ozCatalogCardBtnRemove"
                @click="removeFavourite(item.id)"
            >
                <oz-clear-icon />
               <!-- В избранное -->
            </oz-button>
        </template>
        <template #presentation>
            <router-link 
                :to="`/product/${item.id}`"
                :class="$style.ozCatalogCardImg"
            >
                <oz-image :src="item.image" />
            </router-link>
        </template>
        <template #info>
            <strong :class="$style.ozCatalogCardPrice">
                {{item.price}} RUB
            </strong>
            <router-link 
                :to="`/product/${item.id}`"
                :class="$style.ozCatalogCardText"
            >
                {{item.description}}
            </router-link>
        </template>
        <template #bottomActions>
            
            <oz-button
                v-if="!quantity"
                :class="$style.ozCatalogCardBtnBuy"
                ref="addToCartBtn" 
                @click="onAddToCart(item)"
            >
                Купить
            </oz-button>
            <oz-minus-plus-field 
                v-else
                :value="quantity"
                :product-id="item.id"
                :class="$style.ozCatalogCardBtnQuant"
                @increment="setQuantity(getProductQuantity(item.id) + 1)"
                @decrement="setQuantity(getProductQuantity(item.id) - 1)"
                @input="setQuantityFromInput"
            />
        </template>
    </oz-card>
</template>

<script>
import ozCard from '@/components/OzCard/OzCard.vue';
import ozImage from '@/components/OzImage/OzImage.vue';
import ozButton from '@/components/OzButton/OzButton.vue';
import OzFavouriteIcon from '@/components/OzIcon/OzFavouriteIcon.vue';
import OzClearIcon from '@/components/OzIcon/OzClearIcon.vue';
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
    name: 'OzCatalogCard',
    components: {
        ozCard,
        ozImage,
        ozButton,
        ozMinusPlusField: () => import(/* webpackChunkName: 'OzMinusPlusField' */ '@/components/OzMinusPlusField/OzMinusPlusField.vue'),
        OzFavouriteIcon,
        OzClearIcon,
    },
    props: {
        item: {
            type: Object,
        },
        clearable: {
            type: Boolean, 
            default: false,
        }
    },
    computed: {
        ...mapState('cart', ['cart']),
        ...mapGetters('cart', ['getProductQuantity']),
        ...mapGetters('products', ['getFavoriteProducts']),
        quantity: function() {return this.cart[`${this.item.id}`] ? this.cart[`${this.item.id}`].quantity : 0},
        isFavor() {
            return this.getFavoriteProducts[this.item.id];
        }
    },
    methods: {
        ...mapActions('cart', ['setQuantity']),
        addFavourite(item) {
            this.$emit('addFavourite', item);
        },
        onAddToCart(item) {
            this.$emit('onAddToCart', {...item, quantity: 1});
        },
        setQuantity(quantity) {
            this.$emit('onAddToCart', {...this.item, quantity});
        },
        setQuantityFromInput(value) {
            const quantity = Number(value);
            this.$emit('onAddToCart', {...this.item, quantity});
        },
        removeFavourite(id) {
            this.$emit('onRemoveFromFavourite', id);
        }
    }
}
</script>

<style module>
.ozCatalogCardImg {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    width: 100%;
    height: 250px;
}
.ozCatalogCardText {
    overflow: hidden;
    font-size: 16px;
    line-height: 1.5;
    max-height: calc(1.5em * 3);
    margin: 6px 14px 0;
}
.ozCatalogCardPrice {
    margin: 0 14px;
}
.ozCatalogCardBtnBuy {
    padding: 0 12px;
    background-color: #f91155;
    border: none;
    color: #fff;
    margin: 12px auto;
}
.ozCatalogCardBtnQuant {
    margin: 12px auto;
}
.ozCatalogCardBtnFavourite,
.ozCatalogCardBtnRemove {
    align-self: flex-end;
    margin: 6px;
    cursor: pointer;
} 
.ozCatalogCardBtnActive {
    color: #f91155;
}
</style>