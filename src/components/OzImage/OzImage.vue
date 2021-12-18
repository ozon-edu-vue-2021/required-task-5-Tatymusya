<template>
    <figure :class="$style.ozImageFigure">
        <img 
            :src="src"
            :alt="alt"
            :class="$style.ozImage"
        />
        <figcaption>
            {{ description }}
        </figcaption>
    </figure>
</template>

<script>
export default {
    name: 'OzImage',
    inheritAttrs: true,
    props: {
        src: {
            type: String,
            required: true,
        },
        alt: {
            type: String,
            default: 'Ozon'
        },
        srcset: {
            type: String,
        },
        description: {
            type: String,
            default: ''
        },
    },
}
</script>

<style module>
    .ozImageFigure {
        background-color: #fff;
        box-sizing: border-box;
        display: block;
        line-height: 0;
        overflow: hidden;
        position: relative;
    }
    .ozImage {
        max-height: 100%;
        max-width: 100%;
    }
</style>