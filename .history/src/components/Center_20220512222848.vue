<template>
    <div class="head">
        <img src="../assets/images/IcRoundArrowBackIos.svg" alt="" />
        <img src="../assets/images/IcRoundArrowForwardIos.svg" alt="" />
        <input type="text" />
    </div>
    <img
        class="song-picture"
        src="../assets/images/Ono-Lisa-best-2002-2006.jpg"
        alt=""
    />
</template>

<script>
export default {
    name: "Center",
};
</script>
<style scoped lang="scss">
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
    width: 200px;
    height: auto;
}
</style>
