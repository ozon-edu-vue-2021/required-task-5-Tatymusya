<template>
    <button 
        :class="$style.ozButton"
        :disabled="disabled"
        :type="type"    
        @click.stop="onClick"
    >
        <slot>Отправить</slot>
    </button>
</template>

<script>
export default {
    name: 'OzButton',
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: 'button'
        }
    },
    methods: {
        onClick() {
            this.$emit('click');
        }
    }
}
</script>

<style module>
    .ozButton {
        line-height: 1.29;
        min-height: 32px;
        min-width: 32px;
        border-radius: 4px;
        background: none;
        border: none;
    }
</style>