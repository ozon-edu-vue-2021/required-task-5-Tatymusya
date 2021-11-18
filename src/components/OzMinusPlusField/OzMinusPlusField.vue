<template>
    <div :class="$style.ozMinusPlusFieldContainer">
        <oz-button 
                :class="$style.ozMinusPlusFieldButton"
                @click="decrement">
            -
        </oz-button>

        <oz-input
                :value="value"
                maxlength="4"
                @focus="addFocus"
                @blur="removeFocus"
                @input="onInput"
                @keyup.enter="removeFocus"
        />

        <oz-button 
                :class="$style.ozMinusPlusFieldButton"
                @click="increment">
            +
        </oz-button>
    </div>
</template>

<script>
import OzInput from '@/components/OzInput/OzInput.vue';
import OzButton from '@/components/OzButton/OzButton.vue';

export default {
    name: 'OzPlusMinusField',
    components: {
        OzInput,
        OzButton,
    },
    props: {
        productId: [Number, String],
        value: {
            type: Number,
            default: 1,
        },
        startValue: {
            type: Number,
            default: 1
        },
        step: {
            type: Number,
            default: 1,
        },
        maximum: {
            type: Number,
            default: 99,
        },
        isFractional: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            hasFocus: false,
        };
    },
    methods: {
        decrement() {
            this.$emit('decrement');
        },

        increment() {
            this.$emit('increment');
        },
        validate() {
            if (this.value > this.maximum) {
                this.value = this.maximum;
            }

            if (this.value < this.startValue) {
                this.value = this.startValue;
            }
        },
        addFocus() {
            this.hasFocus = true;
        },
        removeFocus() {
            this.hasFocus = false;
        },
        onInput(value) {
            this.$emit('input', value);
        }
    },
};
</script>

<style module>
.ozMinusPlusFieldContainer {
    display: flex;
    align-items: center;
    max-width: 132px;
}
.ozMinusPlusFieldButton {
    padding: 0 12px;
    background-color: #f91155;
    border: none;
    color: #fff;
}
</style>