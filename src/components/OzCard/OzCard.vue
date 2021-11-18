<template>
    <div 
        :class="{
            [$style.ozCard]: true,
            [$style.outlined]: outlined,
            [$style.shaped]: shaped,
            [$style.disabled]: disabled,
            [$style.horizontal]: horizontal,
        }"
    >
        <template v-if="!horizontal">
            <slot name="topActions" />
            <slot name="presentation" />
            <slot name="info" />
            <slot name="bottomActions" />
        </template>
        <template v-else>
            <div :class="$style.ozCardLeftBlock">
                <slot name="topActions" />
                <slot name="presentation" />
            </div>
            <div :class="$style.ozCardRightBlock">
                <slot name="info" />
                <slot name="bottomActions" />
            </div>
        </template>
    </div>
</template>

<script>
export default {
    name: 'OzCard',
    props: {
        outlined: {
            type: Boolean,
            default: false,
        },
        shaped: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        loaded: {
            type: Boolean,
            default: false,
        },
        horizontal: {
            type: Boolean,
            default: false,
        }
    }
}
</script>

<style module>
    .ozCard {
        position: relative;
        display: flex;
    }
    .ozCard:not(.horizontal) {
        flex-direction: column;
    }
    .outlined {
        border: 1px solid #eee;
    }
    .shaped {
        border-radius: 6px;
    }
    .horizontal {
        flex-direction: row;
        padding: 20px;
    }
    .ozCardRightBlock {
        width: 100%;
    }
</style>