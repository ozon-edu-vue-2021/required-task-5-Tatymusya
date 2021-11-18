<template>
    <oz-card
        :id="item.id"
        outlined
        horizontal
    >
        <template #topActions>
            <oz-button 
                v-if="!isCart"
                :class="{
                    [$style.ozCatalogCardBtnFavourite]: true,
                    [$style.ozCatalogCardBtnActive]: isFavor
                }"
                @click="addFavourite(item)"
            >
                <oz-favourite-icon />
               <!-- В избранное -->
            </oz-button>
        </template>
        <template #presentation>
            <router-link 
                v-if="!isCart"
                :to="`/product/${item.id}`"
                :class="$style.ozCatalogCardImg"
            >
                <oz-image :src="item.image" />
            </router-link>
        </template>
        <template #info>
            <p
                v-if="!isCart"
                :class="$style.ozCatalogCardText"
            >
                {{item.description}}
            </p>
            <p v-else>
                {{item.title}}
            </p>
        </template>
        <template #bottomActions>
            <div :class="$style.ozProductCardBuyActions">
                <strong 
                    v-if="!isCart"
                    :class="$style.ozCatalogCardPrice"
                >
                    {{item.price}} RUB
                </strong>
                <strong 
                    v-else
                    :class="$style.ozCatalogCardPrice"
                >
                    {{item.totalPrice}} RUB
                </strong>
                <oz-button
                    v-if="!quantity"
                    :class="$style.ozProductCardBtnBuy"
                    ref="addToCartBtn" 
                    @click="onAddToCart(item)"
                >
                    Купить
                </oz-button>
                <oz-minus-plus-field 
                    v-else
                    :value="quantity"
                    :product-id="item.id"
                    @increment="setQuantity(getProductQuantity(item.id) + 1)"
                    @decrement="setQuantity(getProductQuantity(item.id) - 1)"
                    @input="setQuantityFromInput"
                />
            </div>
        </template>
    </oz-card>
</template>

<script>
import ozCard from '@/components/OzCard/OzCard.vue';
import ozImage from '@/components/OzImage/OzImage.vue';
import ozButton from '@/components/OzButton/OzButton.vue';
import OzFavouriteIcon from '@/components/OzIcon/OzFavouriteIcon.vue';
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
    name: 'OzProductCard',
    components: {
        ozCard,
        ozImage,
        ozButton,
        ozMinusPlusField: () => import(/* webpackChunkName: 'OzMinusPlusField' */ '@/components/OzMinusPlusField/OzMinusPlusField.vue'),
        OzFavouriteIcon,
    },
    props: {
        item: {
            type: Object,
        },
        isCart: {
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
        }
    }
}
</script>

<style module>
    .ozProductCard {
        position: relative;
    }
    .ozProductCardBuyActions {
        display: flex;
        margin: 20px 0;
        justify-content: flex-end;
        align-items: center;
    }
    .ozCatalogCardPrice {
        margin-right: 12px;
    }
    .ozProductCardBtnBuy {
        padding: 0 12px;
        background-color: #f91155;
        border: none;
        color: #fff;
    }
    .ozCatalogCardBtnActive {
        color: #f91155;
    }
</style>