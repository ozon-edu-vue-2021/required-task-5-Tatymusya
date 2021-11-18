<template>
    <header :class="$style.ozHeader">
        <oz-container>
            <div :class="$style.ozHeaderContainer">
                <router-link 
                    :class="$style.ozHeaderLogo"
                    to="/"
                >
                    <span :class="$style.ozVisuallyHidden">
                        Ozon - на главную страницу лучшего магазина
                    </span>
                </router-link>
                <span :class="$style.ozHeaderRAction">
                    <span
                        @mouseover="setHover"
                        @mouseleave="removeHover"
                    >
                        <router-link 
                            :class="$style.ozHeaderRActionLink"
                            to="/favourite"
                        >
                            <oz-favourite-icon />
                            Избранное
                            <span 
                                :class="$style.ozHeaderRActionBadge"
                            >
                                <oz-badge 
                                    v-if="favouriteSize"
                                    :hovered="isHovered"
                                    :rounded="true"
                                    :value="favouriteSize" 
                                />
                            </span>
                        </router-link>
                    </span>
                    <span
                        @mouseover="setHover"
                        @mouseleave="removeHover"
                    >
                        <router-link 
                            :class="$style.ozHeaderRActionLink"
                            to="/cart"
                        >
                            <oz-cart-icon aria-hidden="true" />
                            Корзина
                            <span 
                                :class="$style.ozHeaderRActionBadge"
                            >
                                <oz-badge 
                                    v-if="hasProductInCart"
                                    :hovered="isHovered"
                                    :rounded="true"
                                    :value="cartSize" 
                                />
                            </span>
                        </router-link>
                    </span>
                </span>
            </div>
        </oz-container>
    </header>
</template>

<script>
import OzFavouriteIcon from '@/components/OzIcon/OzFavouriteIcon.vue';
import OzCartIcon from '@/components/OzIcon/OzShoppingCart/OzCartIcon.vue';
import OzBadge from '@/components/OzBadge/OzBadge.vue';
import OzContainer from '@/components/OzContainer';
import { mapGetters } from 'vuex'; 

export default {
    name: 'OzLHeader',
    components: {
        OzContainer,
        OzFavouriteIcon,
        OzCartIcon,
        OzBadge,
    },
    data() {
        return {
            isHovered: false,
        }
    },
    computed: {
        ...mapGetters('cart', ['cartSize']),
        ...mapGetters('products', ['favouriteSize']),
        hasProductInCart() {
            return this.cartSize > 0;
        }
    },
    methods: {
        setHover() {
            this.isHovered = true;
        },
        removeHover() {
            this.isHovered = false;
        }
    }
}
</script>

<style module>
    .ozHeader {
        position: relative;
        background: #fff;
        border-bottom: 1px solid rgba(0,26,52,.16);
        block-size: 63px;
    }
    .ozHeaderContainer {
        display: flex;
        justify-content: space-between;
    }
    .ozHeaderLogo {
        align-items: center;
        display: flex;
        height: 40px;
        justify-content: flex-start;
        width: 128px;
        background: url('../../assets/images/bf1.png') no-repeat 0 0;
        background-size: contain;
    }
    .ozHeaderRAction {
        display: flex;
        margin-left: auto;
        inline-size: min-content;
        gap: 20px;
    }
    .ozHeaderRActionLink {
        display: flex;
        position: relative;
        gap: 3px;
        flex-direction: column;
        align-items: center;
        font-size: 14px;
        color: #001a34;
        text-decoration: none;
        transition: .2s cubic-bezier(.4,0,.2,1);
        transition-property: color;
    }
    .ozHeaderRActionBadge {
        position: absolute;
        right: -12px;
        top: -8px;
    }
    .ozHeaderRActionLink:visited {
        color: #222;
    }
    .ozHeaderRActionLink:focus {
        outline: none;
    }
    .ozHeaderRActionLink:focus:not(:focus-visible) {
        outline: none;
    }
    .ozHeaderRActionLink:focus-visible {
        outline: 1px solid #003ead;
    }
    @media(hover: hover) {
        .ozHeaderRActionLink:hover {
            color: #003ead;
        }
    }
    .ozHeaderRActionLink:active {
        color: #222;
    }
    .ozVisuallyHidden {
        position: absolute !important;
        clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
        clip: rect(1px, 1px, 1px, 1px);
        padding:0 !important;
        border:0 !important;
        height: 1px !important; 
        width: 1px !important; 
        overflow: hidden;
    }
</style>