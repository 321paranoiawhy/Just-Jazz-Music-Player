<template>
    <!-- 默认值 1 -->
    <!-- https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/volume -->
    <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value="1"
        @input="sendVolume()"
        ref="volume"
    />
</template>

<script>
export default {
    name: "VerticalSlider",
    methods: {
        // 子组件传值给父组件
        sendVolume() {
            // 子组件 this.$emit
            // getVolume 为父组件中给子组件绑定的函数名
            // this.$refs.volume.value 为子组件当前 volume 的值
            this.$emit("getVolume", this.$refs.volume.value);
        },
    },
};
</script>
<style scoped lang="scss">
// input[type="range"] {
//     -webkit-appearance: none;
//     appearance: none;
//     margin: auto 20px;
//     outline: 0;
//     background-color: transparent;
//     width: 80px;
// }
// input[type="range"]::-webkit-slider-runnable-track {
//     height: 2px;
//     background: #ebdfff;
// }
// input[type="range"]::-webkit-slider-container {
//     height: 20px;
//     overflow: hidden;
// }
// input[type="range"]::-webkit-slider-thumb {
//     -webkit-appearance: none;
//     appearance: none;
//     width: 10px;
//     height: 10px;
//     border-radius: 50%;
//     background-color: #7d30fa;
//     border: 1px solid transparent;
//     margin-top: -4px;
//     border-image: linear-gradient(#7d30fa, #7d30fa) 0 fill / 4 10 4 0 / 0px 0px
//         0 2000px;
// }
input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    margin: auto 20px;
    outline: 0;
    background-color: transparent;
    width: 80px;
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

input {
    transform: rotate(-90deg);
}
</style>
