<template>
    <div :class="{
            [$style.ozInputContainer]: isInput,
            [$style.ozRadioContainer]: isRadio,
            [$style.ozCheckboxContainer]: isCheckbox
        }"
    >
        <label 
            v-if="label" 
            :for="id"
            :class="$style.ozLabel"
        >
            {{ label }}
        </label>
        <div
            :class="{
                [$style.ozFieldInput]: isInput,
                [$style.ozFieldError]: error,
                [$style.ozFieldRadio]: isRadio,
                [$style.ozFieldCheckbox]: isCheckbox,
                [$style.ozFieldctive]: isActive,
            }"
        >
            <input
                :class="$style.ozControl"
                :type="type"
                :value="value"
                :name="name"
                :autofocus="autofocus"
                :id="id"
                :clearable="clearable"
                autocomplete="off"
                ref="input"
                @focus="onFocus"
                @blur="onBlur"
                @input="onInput($event)"
                @keydown.enter="onEnter"
                @keydown.down="onDown"
                @keydown.up="onUp"
            />
            <oz-button 
                v-if="isInput"
                v-show="isShowIcon" 
                :class="$style.ozButton" 
                :onClick="() => onInput('')"
            >
                <oz-clear-icon aria-hidden="true" :class="$style.ozIcon" />
            </oz-button>
            <slot name="otherButtons"></slot>
        </div>
  </div>
</template>

<script>
import OzClearIcon from '@/components/OzIcon/OzClearIcon.vue';
import OzButton from '@/components/OzButton/OzButton.vue';
export default {
    name: 'OzBaseInput',
    components: {
        OzClearIcon,
        OzButton,
    },
    inheritAttrs: true,
    props: {
        type: {
            type: String,
            default: 'text',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        value: {
            type: [String, Number, Boolean],
            default: '',
        },
        name: {
            type: String,
            default: '',
        },
        opt: {
            type: String,
            default: '',
        },
        label: {
            type: String,
            default: '',
        },
        autofocus: {
            type: Boolean,
            default: false,
        },
        id: {
            type: [String, Number],
            default: '',
            required: false
        },
        error: {
            type: String
        },
        focused: {
            type: Boolean,
            default: false,
        },
        clearable: {
            type: Boolean,
            default: false,
        }
    },
    computed: {
        isActive() {
            return (this.autofocus && !this.disabled && this.focused) || this.value;
        },
        isShowIcon() {
            return this.clearable && this.value && this.value.length;
        },
        classes() {
            return [
                'ozInput',
                {
                focused: this.isActive,
                },
            ];
        },
        isInput() {
            return this.type === 'text';
        },
        isRadio() {
            return this.type === 'radio';
        },
        isCheckbox() {
            return this.type === 'checkbox';
        },
    },
    methods: {
        onInput(event) {
            if (this.isRadio) {
                this.emitInput(this.opt);
            } else if (this.isCheckbox) {
                this.emitInput(event.target.checked);
            } else {
                this.emitInput(event.target.value);
            }
        },
        emitInput(value) {
            this.$emit('input', value);
        },
        onFocus() {
            this.$emit('focus');
        },
        onBlur() {
            this.$emit('blur');
        },
        onUp() {
            this.$emit('up');
        },
        onDown() {
            this.$emit('down');
        },
        onEnter() {
            this.$emit('enter');
        },
        focus() {
            this.$refs.input.focus();
        },
    },
};
</script>

<style module>
.ozInputContainer {
    position: relative;
}
.ozRadioContainer,
.ozCheckboxContainer {
    display: inline-flex;
    align-items: center;
    margin: 0 6px;
}
.ozFieldInput {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #eee;
    border-radius: 4px;
    background: #fff;
}
.ozFieldInput:focus-within {
    border-color: #1a73e8;
}
.ozFieldRadio,
.ozFieldCheckbox {
    display: inline-block;
}

.ozControl:not([type="radio"]):not([type="checkbox"]) {
    width: 100%;
    height: 32px;
    padding: 0 12px;
    margin-right: 32px;
    border: none;
    background: none;
}
.ozControl:focus {
    outline: none;
    border: none;
}
.ozLabel {
    display: block;
    color: #606b76;
    font-size: 14px;
    line-height: 14px;
}
.ozButton {
    background: transparent;
    border: none;
}
.ozIcon {
    pointer-events: none;
}
.ozFieldError {
    border-color: red;
}
</style>