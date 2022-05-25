<template>
    <div class="head">
        <img src="../assets/images/IcRoundArrowBackIos.svg" alt="" />
        <img src="../assets/images/IcRoundArrowForwardIos.svg" alt="" />
        <input type="text" />
    </div>
</template>

<script>
export default {
    name: "Center",
};
</script>
<style scoped lang="scss">
.head {
    display: flex;
    height: 50px;
    & img {
        width: 24px;
        height: 24px;
    }
}
</style>
