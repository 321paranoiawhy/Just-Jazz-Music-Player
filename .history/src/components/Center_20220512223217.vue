<template>
    <div class="container">
        <div class="head">
            <img src="../assets/images/IcRoundArrowBackIos.svg" alt="" />
            <img src="../assets/images/IcRoundArrowForwardIos.svg" alt="" />
            <input type="text" />
        </div>
        <div class="song-picture">
            <img src="../assets/images/Ono-Lisa-best-2002-2006.jpg" alt="" />
        </div>
    </div>
</template>

<script>
export default {
    name: "Center",
};
</script>
<style scoped lang="scss">
.container {
    display: flex;
    flex-direction: column;
}
.head {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    & img {
        width: 24px;
        height: 24px;
        &:first-child {
            margin: 0 30px;
        }
    }
    & input {
        width: 300px;
        height: 30px;
        margin-left: 50px;
        border-radius: 16px;
    }
}
.song-picture {
    width: 300px;
    height: 300px;
}
</style>
