<template>
    <span 
        :class="{
            [$style.ozBadge]: true,
            [$style.ozBadgeHovered]: hovered,
            [$style.ozBadgeRounded]: rounded,
        }"
        role="status"
        aria-label="Количество товаров в корзине"
        aria-atomic="true"
        aria-live="polite"
    >
        {{value}}
    </span>
</template>

<script>
export default {
    name: 'OzBadge',
    inheritAttrs: true,
    props: {
        value: {
            type: [Number, String],
        },
        rounded: {
            type: Boolean,
            default: false
        },
        hovered: {
            type: Boolean,
            default: false,
        },
    }
}
</script>

<style module>
    .ozBadge {
        height: 16px;
        padding: 0 8px;
        background: #f91155;
        color: #fff;
        transition: .2s cubic-bezier(.4,0,.2,1);
        transition-property: color;
    }
    .ozBadgeRounded {
        border-radius: 8px;
    }
    @media(hover: hover) {
        .ozBadge:hover,
        .ozBadgeHovered {
            background: #e5265e;
        }
    }
</style>