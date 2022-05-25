<template>
    <div class="container">
        <div class="head">
            <img src="../assets/images/IcRoundArrowBackIos.svg" alt="" />
            <img src="../assets/images/IcRoundArrowForwardIos.svg" alt="" />
            <input type="text" />
        </div>
        <div class="slideshow">
            <img src="../assets/images/Ono-Lisa-best-2002-2006.jpg" alt="" />
        </div>
        <div class="grid">
            <p class="row1-left left">Popular</p>
            <p class="row1-right right">See All</p>
            <p class="left">#</p>
            <p>Title</p>
            <p>PLAYING</p>
            <p>TIME</p>
            <P class="right">ALBUM</P>
            <p class="left">#</p>
            <p>Title</p>
            <p>PLAYING</p>
            <p>TIME</p>
            <P class="right">ALBUM</P>
            <p class="left">#</p>
            <p>Title</p>
            <p>PLAYING</p>
            <p>TIME</p>
            <P class="right">ALBUM</P>
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
    align-items: center;
    & .head {
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
    & .slideshow {
        width: 300px;
        height: 300px;
        margin: 50px;
    }
    & .grid {
        display: grid;
        justify-items: center;
        width: 650px;
        grid-template-columns: 1fr 5fr 3fr 2fr 2fr;
        margin-left: 20px;
        margin-right: 20px;
        // 指定第一行的格子区域
        grid-template-areas: "row1-left row1-left row1-left row1-left row1-right";
        // 占据第一行前四列
        & .row1-left {
            grid-area: row1-left;
        }
        // 占据第一行最后一列
        & .row1-right {
            grid-area: row1-right;
        }
        // 居左对齐
        & .left {
            justify-self: start;
        }
        // 居右对齐
        & .right {
            justify-self: end;
        }
    }
}
</style>
