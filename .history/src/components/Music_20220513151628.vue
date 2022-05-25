<template>
    <!-- 最外层容器 container -->
    <div class="container">
        <!-- 头部 head -->
        <div class="head">
            <img src="../assets/images/IcRoundArrowBackIos.svg" alt="" />
            <img src="../assets/images/IcRoundArrowForwardIos.svg" alt="" />
            <input type="text" />
        </div>
        <!-- 轮播图 slideshow -->
        <div class="slideshow">
            <img src="../assets/images/Ono-Lisa-best-2002-2006.jpg" alt="" />
        </div>
        <!-- grid -->
        <div class="grid">
            <!-- row1 -->
            <p class="row1-left left">Popular</p>
            <p class="row1-right right">See All</p>
            <!-- row2 -->
            <p class="row2-left left">#</p>
            <p>Title</p>
            <p>PLAYING</p>
            <p>TIME</p>
            <p class="right">ALBUM</p>
            <!-- row3 -->
            <p class="left">1</p>
            <img
                src="../assets/images/fly-me-to-the-moon-小野丽莎.webp"
                alt=""
            />
            <p>Title</p>
            <p>PLAYING</p>
            <p>TIME</p>
            <p class="right">ALBUM</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "Music",
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
        grid-template-columns: 1fr 1fr 5fr 3fr 2fr 2fr;
        margin-left: 20px;
        margin-right: 20px;
        // 指定第一行的格子区域
        grid-template-areas:
            "row1-left row1-left row1-right row1-right row1-right row1-right"
            "row2-left row2-left row2-column2 row2-column3 row2-column4 row2-column5";
        // 占据第一行前两列
        & .row1-left {
            grid-area: row1-left;
        }
        // 占据第一行最后四列
        & .row1-right {
            grid-area: row1-right;
        }
        // 占据第二行前两列
        & .row2-left {
            grid-area: row2-left;
        }
        // 最左一列居左对齐
        & .left {
            justify-self: start;
        }
        // 最右一列居右对齐
        & .right {
            // grid-area: row2-left;
            justify-self: end;
        }
        & img {
            width: 50px;
            height: 50px;
        }
    }
}
</style>
