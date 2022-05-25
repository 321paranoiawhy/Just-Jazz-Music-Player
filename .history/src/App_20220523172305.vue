<template>
    <router-view />
</template>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: fit-content;
    border: 1px solid #7d30fa;
    border-radius: 1rem;
    color: #2c3e50;
    margin-left: auto;
    margin-right: auto;
}
html {
    background: rgba(255, 255, 255, 0.7);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
}
// 使选中文本高亮 (去除图片)
::selection:not(img) {
    background: #7d30fa;
    color: #fff;
}
</style>
