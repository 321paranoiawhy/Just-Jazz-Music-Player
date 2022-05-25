<template>
    <div class="item">
        <img src="../assets/images/TeenyiconsHomeOutline.svg" alt="" />
        <p>Home</p>
    </div>
</template>

<script>
export default {
    name: "LeftAside",
};
</script>
<style scoped lang="scss">
.item {
    display: flex;
    justify-content: center;
    align-items: center;
    & img {
        width: 24px;
        height: 24px;
    }
}
</style>
