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

        <div class="popular-songs">
            <h3>Popular</h3>
            <h4 class="right">See All</h4>
        </div>

        <div
            v-for="(item, index) in musicData"
            :key="index"
            class="grid"
            :class="{ isSelected: index === defaultIndex }"
            @click="changeStyle(index)"
        >
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

        <div class="music-player">
            <!-- 单曲循环 随机播放 顺序播放 列表循环 -->
            <img
                src="../assets/images/SingleCycle.svg"
                alt=""
                v-show="playMode === 1"
                @click="changePlayMode(2)"
                class="flex-left"
            />
            <img
                src="../assets/images/RandomPlay.svg"
                alt=""
                v-show="playMode === 2"
                @click="changePlayMode(3)"
                class="flex-left"
            />
            <img
                src="../assets/images/ListPlay.svg"
                alt=""
                v-show="playMode === 3"
                @click="changePlayMode(4)"
                class="flex-left"
            />
            <img
                src="../assets/images/LoopPlay.svg"
                alt=""
                v-show="playMode === 4"
                @click="changePlayMode(1)"
                class="flex-left"
            />
            <img
                src="../assets/images/IcRoundCast.svg"
                alt=""
                class="flex-left"
            />

            <div class="flex-center">
                <img
                    src="../assets/images/IcOutlineSkipPrevious.svg"
                    alt=""
                    @click="previousSong()"
                />
                <!-- v-show 条件渲染 -->
                <!-- https://v3.cn.vuejs.org/guide/conditional.html#v-show -->
                <img
                    src="../assets/images/IcRoundPlayCircleFilled.svg"
                    alt=""
                    v-show="playOrPause === 1"
                    @click="changePlayOrPause(2)"
                />
                <img
                    src="../assets/images/IcRoundPauseCircleFilled.svg"
                    alt=""
                    v-show="playOrPause === 2"
                    @click="changePlayOrPause(1)"
                />
                <img
                    src="../assets/images/IcOutlineSkipNext.svg"
                    alt=""
                    @click="nextSong()"
                />
            </div>
            <img
                src="../assets/images/IcOutlineVolumeMute.svg"
                alt=""
                class="flex-right"
            />
            <img
                src="../assets/images/IcOutlineVolumeUp.svg"
                alt=""
                class="flex-right"
            />
        </div>
        <div class="current-song-details">
            <img
                :src="
                    require('../assets/images/' +
                        musicData[defaultIndex].picture_src +
                        '.webp')
                "
                alt=""
            />
            <p>{{ musicData[defaultIndex].title }}</p>
            <p>{{ musicData[defaultIndex].artist }}</p>
        </div>
    </div>
</template>

<script>
import musicData from "/public/data/music.json";
export default {
    name: "Music",
    data() {
        return {
            // JSON 数据
            musicData: musicData,
            defaultIndex: 2,
            // 默认显示 播放 按钮
            playOrPause: 1,
            // 默认显示 单曲循环 按钮
            // playMode 1 单曲循环 2 随机播放 3 顺序播放 4 列表循环
            playMode: 1,
            // 音乐播放器
            player: new Audio(),
        };
    },
    methods: {
        changeStyle(index) {
            // 边界处理
            if (index === 0 || index === 1) {
                return;
            }
            // 更新 defaultIndex 和 player.src
            this.defaultIndex = index;
            this.player.src = require("../assets/musics/" +
                musicData[index].song_src +
                ".mp3");
            // 开始播放
            this.player.play();
            // 更改播放按钮为暂停按钮
            this.changePlayOrPause(2);
        },
        //  切换 播放/暂停
        // 更改 playOrPause 的值为 入参的值
        changePlayOrPause(parameter) {
            this.playOrPause = parameter;
            if (parameter === 1) {
                this.player.pause();
            } else {
                // 使用默认播放音乐源
                this.player.src = require("../assets/musics/" +
                    musicData[this.defaultIndex].song_src +
                    ".mp3");
                // 开始播放
                this.player.play();
            }
        },
        // 切换 播放模式
        changePlayMode(parameter) {
            // 更改 playMode 的值为 入参 的值
            this.playMode = parameter;
            // switch (this.playMode) {
            //     // 1 单曲循环
            //     case 1:
            //         this.player.loop = true;
            //         break;
            //     // 2 随机播放
            //     case 2:
            //         // 避免与当前播放歌曲重复
            //         while (
            //             Math.floor(
            //                 Math.random() * (this.musicData.length - 1) !==
            //                     this.defaultIndex
            //             )
            //         ) {
            //             this.defaultIndex = Math.floor(
            //                 Math.random() * (this.musicData.length - 1)
            //             );
            //         }
            //         if (this.defaultIndex === 0 || this.defaultIndex === 1) {
            //             this.defaultIndex = 2;
            //         }
            //         // 更新 player.src
            //         this.player.src = require("../assets/musics/" +
            //             musicData[this.defaultIndex].song_src +
            //             ".mp3");
            //         // 开始播放
            //         this.player.play();
            //         // 更改播放按钮为暂停按钮
            //         this.playChange(2);
            //         break;
            //     // 3 顺序播放
            //     case 3:
            //         this.player.loop = false;
            //         break;
            //     // 4 列表循环
            //     case 4:
            //         this.player.loop = true;
            //         break;
            // }
        },
        // 上一曲
        previousSong() {
            // 边界处理
            if (this.defaultIndex === 2) {
                this.defaultIndex = this.musicData.length - 1;
            } else {
                this.defaultIndex--;
            }
            this.player.src = require("../assets/musics/" +
                musicData[this.defaultIndex].song_src +
                ".mp3");
            // 开始播放
            this.player.play();
            // 更改播放按钮为暂停按钮
            this.changePlayOrPause(2);
        },
        // 下一曲
        nextSong() {
            // 边界处理
            if (this.defaultIndex === this.musicData.length - 1) {
                this.defaultIndex = 2;
            } else {
                this.defaultIndex++;
            }
            this.player.src = require("../assets/musics/" +
                musicData[this.defaultIndex].song_src +
                ".mp3");
            // 开始播放
            this.player.play();
            // 更改播放按钮为暂停按钮
            this.changePlayOrPause(2);
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
    & .popular-songs {
        display: flex;
        width: 100%;
        & .right {
            margin-left: auto;
        }
    }
    & .grid {
        display: grid;
        justify-items: center;
        align-content: center;
        width: 800px;
        grid-template-columns: 1fr 1fr 6fr 4fr 2fr 2fr 4fr;
        grid-gap: 1rem;
        // margin-left: 30px;
        // margin-right: 30px;
        margin: 0 0 1rem 30px;
        & img {
            width: 50px;
            height: 50px;
        }
        // & div {
        //     margin: auto;
        // }
        & p {
            margin: auto;
            text-align: center;
            line-height: 100%;
        }
    }
    & .isSelected {
        // 相对定位
        position: relative;
        // color: #cdcdcd;
    }
    & .isSelected::before {
        // 伪元素绝对定位
        position: absolute;
        content: " ";
        height: 100%;
        border-left: thick double #32a1ce;
        left: -15px;
    }
    & .music-player {
        display: flex;
        width: 100%;
        margin-top: 30px;
        & img {
            width: 32px;
            height: 32px;
            cursor: pointer;
        }
        & .flex-left {
            width: 32px;
            margin-left: 30px;
        }
        & .flex-right {
            width: 32px;
        }
        & .flex-center {
            flex: 1;
            text-align: center;
            & :nth-child(2) {
                margin-left: 30px;
            }
        }
        & :nth-last-child(1) {
            margin-left: 30px;
        }
    }
    & .current-song-details {
        & img {
            width: 50px;
            height: 50px;
        }
    }
}
</style>
