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
            <h3 class="row1-left left">Popular</h3>
            <p class="row1-right right">See All</p>
            <!-- row2 -->
            <p class="row2-left left">#</p>
            <p>TITLE</p>
            <p>MUSIC ARTIST</p>
            <p>PLAYING</p>
            <p>TIME</p>
            <p class="right">ALBUM</p>
            <!-- row3 -->
            <p
                class="left"
                :class="{ isSelected: defaultValue }"
                @click="changeDefault()"
            >
                1
            </p>
            <img
                src="../assets/images/fly-me-to-the-moon-小野丽莎.webp"
                alt=""
            />
            <p text-overflow>Fly Me To The Moon</p>
            <div>
                <p>小野丽莎 Lisa Ono</p>
            </div>
            <p>1</p>
            <p>3:41</p>
            <div class="right text-overflow">
                <p>Cheek To Cheek-Jazz Standards from RIO-</p>
            </div>
            <!-- row4 -->
            <p class="left" :class="{ isSelected: value1 }" @click="change1()">
                2
            </p>
            <img
                src="../assets/images/Jazz-Cafe-Presents-Terumasa-Hino.webp"
                alt=""
            />
            <p text-overflow>Sweet Love of Mine</p>
            <div>
                <p>日野皓正 Terumasa Hino</p>
            </div>
            <p>1</p>
            <p>14:06</p>
            <div class="right text-overflow">
                <p>Jazz Café Presents: Terumasa Hino</p>
            </div>
            <!-- row4 -->
            <p class="left" :class="{ isSelected: value2 }" @click="change2()">
                3
            </p>
            <img
                src="../assets/images/Funky-Jazz-Masterpieces-Vol.3-New-York-Jazz-Lounge.webp"
                alt=""
            />
            <p text-overflow>Just the Two of Us</p>
            <div>
                <p>New York Jazz Lounge</p>
            </div>
            <p>1</p>
            <p>5:37</p>
            <div class="right text-overflow">
                <p>Funky Jazz Masterpieces, Vol. 3</p>
            </div>
        </div>
        <div class="music-player">
            <img src="../assets/images/IcRoundPlaylistPlay.svg" alt="" />
            <img src="../assets/images/IcRoundCast.svg" alt="" />
            <img src="../assets/images/IcOutlineSkipPrevious.svg" alt="" />
            <img src="../assets/images/IcRoundPlayCircleFilled.svg" alt="" />
            <img src="../assets/images/IcRoundPauseCircleFilled.svg" alt="" />
            <img src="../assets/images/IcOutlineSkipNext.svg" alt="" />
            <img src="../assets/images/IcOutlineVolumeMute.svg" alt="" />
            <img src="../assets/images/IcOutlineVolumeUp.svg" alt="" />
        </div>
    </div>
</template>

<script>
export default {
    name: "Music",
    data() {
        return {
            defaultValue: true,
            value1: false,
            value2: false,
        };
    },
    methods: {
        changeDefault() {
            this.defaultValue === false ? (this.defaultValue = true) : null;
            this.value1 = false;
            this.value2 = false;
        },
        change1() {
            this.defaultValue === true ? (this.defaultValue = false) : null;
            this.value1 === false ? (this.value1 = true) : null;
            this.value2 === true ? (this.value2 = false) : null;
        },
        change2() {
            this.defaultValue === true ? (this.defaultValue = false) : null;
            this.value2 === false ? (this.value2 = true) : null;
            this.value1 === true ? (this.value1 = false) : null;
        },
    },
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
        width: 250px;
        height: 250px;
        margin: 50px;
    }
    & .grid {
        display: grid;
        justify-items: center;
        align-content: center;
        width: 800px;
        grid-template-columns: 1fr 1fr 6fr 4fr 2fr 2fr 4fr;
        grid-gap: 1rem;
        margin-left: 20px;
        margin-right: 20px;
        // 指定第一行的格子区域
        grid-template-areas:
            "row1-left row1-left row1-right row1-right row1-right row1-right row1-right"
            "row2-left row2-left row2-column2 row2-column3 row2-column4 row2-column5 row2-column6";
        // 占据第一行前两列
        & .row1-left {
            grid-area: row1-left;
        }
        // 占据第一行最后五列
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
            justify-self: end;
        }
        & img {
            width: 50px;
            height: 50px;
        }
        & div {
            margin: auto;
        }
        & div p {
            margin: auto;
            text-align: center;
        }
        & .isSelected::before {
            content: " ";
            display: block;
            position: absolute;
            // margin-left: 10px;
            border-left: 3px solid red;
            left: 20px;
            // background-color: #f5f5f5;
            // outline: 2px solid red;
            // outline-offset: 20px;
        }
    }
}
</style>
