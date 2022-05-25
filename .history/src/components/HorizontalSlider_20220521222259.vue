<template>
    <!-- 默认值 0 -->
    <!-- <input type="range" min="0" max="1" step="0.01" value="0" /> -->
    <input type="range" min="0" max="1" step="0.01" value="0" />
</template>

<script>
export default {
    name: "HorizontalSlider",
};
</script>
<style scoped lang="scss">
// 参考链接: https://www.quirksmode.org/blog/archives/2015/11/styling_and_scr.html
// https://css-tricks.com/styling-cross-browser-compatible-range-inputs-css/
input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    margin: auto 20px;
    outline: 0;
    background-color: transparent;
    width: 300px;
    height: 20px;
    overflow: hidden;
    cursor: pointer;
}

input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    /* your thumb styles */
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

input[type="range"]::-moz-range-thumb {
    /* again your thumb styles */
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

input[type="range"]::-ms-thumb {
    /* should come after -webkit- */
    /* again your thumb styles */
    /* may require different margins */
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

input[type="range"]::-webkit-slider-runnable-track {
    /* your track styles */
    height: 2px;
    background: #ebdfff;
}

input[type="range"]::-moz-range-track {
    /* again your track styles */
    height: 2px;
    background: #ebdfff;
}

input[type="range"]::-ms-track {
    /* should come after -webkit- */
    border-color: transparent;
    color: transparent;
    /* again your track styles */
    height: 2px;
    background: #ebdfff;
}
</style>
