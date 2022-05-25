<template>
    <!-- 默认值 0 -->
    <!-- <input type="range" min="0" max="1" step="0.01" value="0" /> -->
    <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value="toChild"
        ref="childSlider"
    />
</template>

<script>
export default {
    name: "HorizontalSlider",
    props: {
        toChild: Number,
    },
    computed: {},
};
</script>
<style scoped lang="scss">
input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    margin: auto 20px;
    outline: 0;
    background-color: transparent;
    width: 300px;
}
input[type="range"]::-webkit-slider-runnable-track {
    height: 2px;
    background: #ebdfff;
}
input[type="range"]::-webkit-slider-container {
    height: 20px;
    overflow: hidden;
}
input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #7d30fa;
    border: 1px solid transparent;
    margin-top: -4px;
    border-image: linear-gradient(#7d30fa, #7d30fa) 0 fill / 4 10 4 0 / 0px 0px
        0 2000px;
}
</style>
