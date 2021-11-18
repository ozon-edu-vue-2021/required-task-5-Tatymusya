<template>
    <oz-container>
        <h1>Корзина</h1>
        <div 
            v-if="hasTotal"
            :class="$style.ozCartContainer"
        >
            <div :class="$style.ozCartProducts">
                <template v-if="!isLoading">
                    <ul :class="$style.ozCartProducts">
                        <li 
                            v-for="item in productsFromCart"
                            :key="item.id"
                            :class="$style.ozCartProductItem"
                        >
                            <template v-if="getProductQuantity(item.id)">
                                <oz-product-card
                                    :item="item" 
                                    :quantity="getProductQuantity(item.id)"
                                    :is-cart="true"
                                    @onAddToCart="onAddToCart"
                                />
                            </template>
                        </li>
                    </ul>
                </template>
                <span v-else>
                    ...is loading
                </span>
            </div>
            <aside 
                v-if="productsFromCart"
                :class="$style.ozCartOrderAction"
            >
                <div>
                    Количество товаров: <strong>{{cartSize}}</strong><br>
                    Общая сумма: <strong>{{roundTotal}} RUB</strong>
                </div>
                <oz-divider />
                <oz-button
                    :class="$style.ozCartOrderBtn"
                    ref="addToCartBtn" 
                    @click="sendOrder"
                >
                    Оформить заказ
                </oz-button>
            </aside>
        </div>
        <div v-else>
            Корзина пуста
        </div>
    </oz-container>
</template>

<script>
import ozDivider from '@/components/OzDivider';
import ozContainer from '@/components/OzContainer';
import ozButton from '@/components/OzButton/OzButton.vue';
import OzProductCard from '@/components/OzProductCard/OzProductCard.vue';
//const OzPlusMinusField = () => import(/* webpackChunkName: 'OzPlusMinusField' */ '@/components/OzPlusMinusField/OzPlusMinusField.vue');
import { mapGetters, mapActions } from 'vuex'; 

export default {
    name: 'OzShopingCart',
    components: {
        ozDivider,
        ozContainer,
        ozButton,
        OzProductCard,
    },
    data() {
        return {
            isLoading: false
        }
    },
    computed: {
        ...mapGetters('cart', ['productsFromCart', 'getProductQuantity', 'total', 'cartSize']),
        ...mapGetters('products', ['getProducts']),
        roundTotal() {
            return this.total.toFixed(2);
        },
        hasTotal() {
            return this.total > 0;
        }
    },
    methods: {
        ...mapActions('cart', ['addToCart']),
        onAddToCart(item) {
            this.addToCart(item);
        },
        sendOrder() {
            let order = '';
            
            for (let i in this.productsFromCart) {
                const { title, id, totalPrice, quantity } = this.productsFromCart[i];
                order+= `
                    id: ${id} - ${title}(${quantity}шт) - ${totalPrice} RUB
                `;
            }

            order += `
                --------------------------------------
                На общую сумму: ${this.roundTotal} RUB
            `;
            alert(order);
        }
    }
}
</script>


<style module>
    .ozCartContainer {
        position: relative;
        display: flex;
    }
    .ozCartProducts {
        flex-basis: 75%;
    }
    .ozCartProducts {
        margin: 0 12px 0 0;
        padding: 0;
    }
    .ozCartProductItem {
        list-style-type: none;
        background: #fff;
    }
    .ozCartOrderAction {
        flex-basis: 25%;
    }
    .ozCartOrderBtn {
        background-color: #005bff;
        color: #fff;
        margin-top: 20px;
        width: 100%;
    }
    .ozCartDivider {
        margin: 20px 0;
    }
</style>