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
        <div v-for="(item, index) in musicData" :key="index" class="test">
            <p>{{ item.index }}</p>
            <img
                :src="
                    require('../assets/images/' +
                        musicData[index].picture_src +
                        '.webp')
                "
                alt=""
            />
            <p>{{ item.title }}</p>
            <p>{{ item.artist }}</p>
            <p>{{ item.play_count }}</p>
            <p>{{ item.time }}</p>
            <p>{{ item.album }}</p>
        </div>
        <!-- grid -->
        <div class="grid">
            <!-- row1 -->
            <h3 class="row1-left left">Popular</h3>
            <h4 class="row1-right right">See All</h4>
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
            <p>Fly Me To The Moon</p>
            <div>
                <p>小野丽莎 Lisa Ono</p>
            </div>
            <p>1</p>
            <p>3:41</p>
            <div class="right">
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
            <p>Sweet Love of Mine</p>
            <div>
                <p>日野皓正 Terumasa Hino</p>
            </div>
            <p>1</p>
            <p>14:06</p>
            <div class="right">
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
            <p>Just the Two of Us</p>
            <div>
                <p>New York Jazz Lounge</p>
            </div>
            <p>1</p>
            <p>5:37</p>
            <div class="right">
                <p>Funky Jazz Masterpieces, Vol. 3</p>
            </div>
            <!-- row5 -->
            <p class="left" :class="{ isSelected: value3 }" @click="change3()">
                4
            </p>
            <img
                src="../assets/images/A-Whisper-of-Love-细川绫子.webp"
                alt=""
            />
            <p>Tea for Two</p>
            <div>
                <p>细川绫子 Ayako Hosokawa</p>
            </div>
            <p>1</p>
            <p>6:12</p>
            <div class="right">
                <p>A Whisper of Love</p>
            </div>
        </div>
        <div class="music-player">
            <!-- 单曲循环 随机播放 顺序播放 列表循环 -->
            <img
                src="../assets/images/SingleCycle.svg"
                alt=""
                v-show="playMode === 1"
                @click="next(2)"
            />
            <img
                src="../assets/images/RandomPlay.svg"
                alt=""
                v-show="playMode === 2"
                @click="next(3)"
            />
            <img
                src="../assets/images/ListPlay.svg"
                alt=""
                v-show="playMode === 3"
                @click="next(4)"
            />
            <img
                src="../assets/images/LoopPlay.svg"
                alt=""
                v-show="playMode === 4"
                @click="next(1)"
            />
            <img src="../assets/images/IcRoundCast.svg" alt="" />

            <img src="../assets/images/IcOutlineSkipPrevious.svg" alt="" />
            <!-- v-show 条件渲染 -->
            <!-- https://v3.cn.vuejs.org/guide/conditional.html#v-show -->
            <img
                src="../assets/images/IcRoundPlayCircleFilled.svg"
                alt=""
                v-show="playOrPause === 1"
                @click="playChange(2)"
            />
            <img
                src="../assets/images/IcRoundPauseCircleFilled.svg"
                alt=""
                v-show="playOrPause === 2"
                @click="playChange(1)"
            />
            <img src="../assets/images/IcOutlineSkipNext.svg" alt="" />
            <img src="../assets/images/IcOutlineVolumeMute.svg" alt="" />
            <img src="../assets/images/IcOutlineVolumeUp.svg" alt="" />
        </div>
        <img
            :src="
                require('../assets/images/' +
                    musicData[0].picture_src +
                    '.webp')
            "
            alt=""
        />
        <img
            :src="
                require('../assets/images/' +
                    musicData[1].picture_src +
                    '.webp')
            "
            alt=""
        />
        <img
            :src="
                require('../assets/images/' +
                    musicData[2].picture_src +
                    '.webp')
            "
            alt=""
        />
        <img
            :src="
                require('../assets/images/' +
                    musicData[3].picture_src +
                    '.webp')
            "
            alt=""
        />
    </div>
</template>

<script>
import musicData from "/public/data/music.json";
export default {
    name: "Music",
    data() {
        return {
            musicData: musicData,
            defaultValue: true,
            value1: false,
            value2: false,
            value3: false,
            // 默认显示 播放 按钮
            playOrPause: 1,
            // 默认显示 单曲循环 按钮
            playMode: 1,
            // 音乐播放器
            player: new Audio(),
            currentSong: {
                name: "",
                src: "",
            },
        };
    },
    methods: {
        changeDefault() {
            this.defaultValue = true;
            this.value1 = false;
            this.value2 = false;
            console.log(this.musicData[0].song_src);
            // 设置 src
            this.player.src = require("../assets/musics/" +
                this.musicData[0].song_src +
                ".mp3");
        },
        change1() {
            this.value1 = true;
            this.defaultValue = false;
            this.value2 = false;
        },
        change2() {
            this.value2 = true;
            this.defaultValue = false;
            this.value1 = false;
        },
        //  切换 播放/暂停
        // 更改 playOrPause 的值为 入参的值
        playChange(parameter) {
            this.playOrPause = parameter;
            parameter === 1 ? this.player.pause() : this.player.play();
        },
        // 切换 播放模式
        // 更改 playValue 的值为 入参 的值
        next(parameter) {
            this.playMode = parameter;
        },
        // 下载当前音乐
        download() {
            window.open(this.file, "download");
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
        // 自身作为 flex容器使内部子元素 垂直居中
        align-items: center;
        // 自身作为外层flex的子元素 居左对齐
        align-self: flex-start;
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
        margin-left: 30px;
        margin-right: 30px;
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
            line-height: 100%;
        }
        & .isSelected {
            // 相对定位
            position: relative;
            color: #cdcdcd;
        }
        & .isSelected::before {
            // 伪元素绝对定位
            position: absolute;
            content: " ";
            height: 100%;
            border-left: thick double #32a1ce;
            left: -15px;
        }
    }
    & .music-player {
        & img {
            width: 32px;
            height: 32px;
            cursor: pointer;
        }
    }
}
</style>
