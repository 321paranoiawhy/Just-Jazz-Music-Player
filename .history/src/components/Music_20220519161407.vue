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
        <div
            v-for="(item, index) in musicData"
            :key="index"
            class="grid"
            :class="{ isSelected: index === currentSongIndex }"
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
        <div class="current-song-details">
            <img
                :src="
                    require('../assets/images/' +
                        musicData[currentSongIndex].picture_src +
                        '.webp')
                "
                alt=""
            />
            <div>
                <p>{{ musicData[currentSongIndex].title }}</p>
                <p>{{ musicData[currentSongIndex].artist }}</p>
            </div>
            <img
                src="../assets/images/IcOutlineFileDownload.svg"
                alt=""
                class="small-img"
                @click="downloadMusic()"
            />
        </div>
        <div class="music-player">
            <!-- 单曲循环 随机播放 顺序播放 列表循环 -->
            <img
                src="../assets/images/SingleCycle.svg"
                alt=""
                v-show="playMode === 1"
                @click="changePlayMode(2)"
                class="flex-left"
                title="Single Cycle"
            />
            <img
                src="../assets/images/RandomPlay.svg"
                alt=""
                v-show="playMode === 2"
                @click="changePlayMode(3)"
                class="flex-left"
                title="Random Play"
            />
            <img
                src="../assets/images/ListPlay.svg"
                alt=""
                v-show="playMode === 3"
                @click="changePlayMode(4)"
                class="flex-left"
                title="List Play"
            />
            <img
                src="../assets/images/LoopPlay.svg"
                alt=""
                v-show="playMode === 4"
                @click="changePlayMode(1)"
                class="flex-left"
                title="Loop Play"
            />
            <img
                src="../assets/images/IcRoundCast.svg"
                alt=""
                class="flex-left"
                title="Cast"
            />

            <div class="flex-center">
                <img
                    src="../assets/images/IcOutlineSkipPrevious.svg"
                    alt=""
                    @click="previousSong()"
                    title="Previous"
                />
                <!-- v-show 条件渲染 -->
                <!-- https://v3.cn.vuejs.org/guide/conditional.html#v-show -->
                <img
                    src="../assets/images/IcRoundPlayCircleFilled.svg"
                    alt=""
                    v-show="playOrPause === 1"
                    @click="changePlayOrPause(2)"
                    title="Play"
                />
                <img
                    src="../assets/images/IcRoundPauseCircleFilled.svg"
                    alt=""
                    v-show="playOrPause === 2"
                    @click="changePlayOrPause(1)"
                    title="Pause"
                />
                <img
                    src="../assets/images/IcOutlineSkipNext.svg"
                    alt=""
                    @click="nextSong()"
                    title="Next"
                />
            </div>
            <img
                src="../assets/images/IcOutlineVolumeMute.svg"
                alt=""
                class="flex-right"
                title="Mute"
                @click="mute()"
            />
            <img
                src="../assets/images/IcOutlineVolumeUp.svg"
                alt=""
                class="flex-right"
                title="Volume"
                @click="adjustVolume()"
            />
        </div>
        <div class="range-input">
            <!-- 格式化时间 -->
            <p>{{ formatTime(currentTime) }}</p>
            <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value="0"
                ref="percent"
            />
            <!-- 格式化时间 -->
            <p>{{ formatTime(totalTime) }}</p>
        </div>
        <!-- xx:xx 转换为数字 -->
        <p>{{ Number(currentTime) / Number(totalTime) }}</p>
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
            // 默认播放歌曲 (musicData 第 3 个元素对应的歌曲)
            currentSongIndex: 2,
            // 默认显示 播放 按钮
            playOrPause: 1,
            // 默认显示 单曲循环 按钮
            // playMode 1 单曲循环 2 随机播放 3 顺序播放 4 列表循环
            playMode: 1,
            // 音乐播放器
            player: new Audio(),
            // 当前时间 和 总时长
            currentTime: 0,
            totalTime: 0,
            // 已播放歌曲索引数组
            playedSongIndex: [],
        };
    },
    mounted() {
        // 参考链接: https://zhuanlan.zhihu.com/p/78876382
        // 音频媒体事件加载顺序
        // https://developer.mozilla.org/en-US/docs/Web/Guide/Audio_and_video_delivery/Cross-browser_audio_basics#media_loading_events
        // loadstart -> durationchange -> loadedmetadata -> loadeddata -> progress -> canplay -> canplaythrough
        // 在DOM加载完成时, 添加 audio 监听事件
        this.player.addEventListener("canplay", () => {
            // 总时长
            this.totalTime = this.player.duration;
        });
        this.player.addEventListener("timeupdate", () => {
            // 当前时长
            this.currentTime = this.player.currentTime;
            // 播放进度随当前时长同步变化 (注意字符串须通过 Number() 转型函数转为数字)
            this.$refs.percent.value =
                Number(this.currentTime) / Number(this.totalTime);
            // 鼠标悬停时显示当前时长 (title)
            this.$refs.percent.title = this.formatTime(this.currentTime);
            // 播放进度变化时, 更新当前时长
            this.$refs.percent.oninput = () => {
                this.player.currentTime =
                    this.$refs.percent.value * Number(this.totalTime);
            };
        });
        // 当前歌曲结束
        this.player.addEventListener("ended", () => {
            switch (this.playMode) {
                // 1 单曲循环
                case 1:
                    this.player.play();
                    break;
                // 2 随机播放
                case 2:
                    // 更新已播放歌曲索引数组
                    this.playedSongIndex.push(this.currentSongIndex);
                    if (
                        this.playedSongIndex.length ===
                        this.musicData.length - 2
                    ) {
                        // 重置已播放歌曲索引数组
                        this.playedSongIndex = [];
                        // 随机索引
                        this.currentSongIndex =
                            Math.floor(
                                Math.random() * (this.musicData.length - 1)
                            ) + 2;
                        // 更新 player.src
                        this.player.src = require("../assets/musics/" +
                            musicData[this.currentSongIndex].song_src +
                            ".mp3");
                        // 开始播放
                        this.player.play();
                        // 更改播放按钮为暂停按钮
                        this.playOrPause = 2;
                    }
                    // 避免与当前播放歌曲重复
                    // 自 2 始, 至 musicData.length - 1 结束
                    let randomIndex = Math.floor(
                        Math.random() * (this.musicData.length - 2) + 2
                    );
                    while (this.playedSongIndex.indexOf(randomIndex) !== -1) {
                        randomIndex = Math.floor(
                            Math.random() * (this.musicData.length - 2) + 2
                        );
                    }
                    this.currentSongIndex = randomIndex;
                    // 更新 player.src
                    this.player.src = require("../assets/musics/" +
                        musicData[this.currentSongIndex].song_src +
                        ".mp3");
                    // 开始播放
                    this.player.play();
                    // 更改播放按钮为暂停按钮
                    this.playOrPause = 2;
                    break;
                // 3 顺序播放
                case 3:
                    this.currentSongIndex++;
                    if (this.currentSongIndex > this.musicData.length - 1) {
                        this.player.pause();
                    }
                    // 更新 player.src
                    this.player.src = require("../assets/musics/" +
                        musicData[this.currentSongIndex].song_src +
                        ".mp3");
                    // 开始播放
                    this.player.play();
                    // 更改播放按钮为暂停按钮
                    this.playOrPause = 2;
                    break;
                // 4 列表循环
                case 4:
                    this.currentSongIndex++;
                    if (this.currentSongIndex > this.musicData.length - 1) {
                        this.currentSongIndex = 2;
                    }
                    // 更新 player.src
                    this.player.src = require("../assets/musics/" +
                        musicData[this.currentSongIndex].song_src +
                        ".mp3");
                    // 开始播放
                    this.player.play();
                    // 更改播放按钮为暂停按钮
                    this.playOrPause = 2;
                    break;
                default:
                    break;
            }
        });
    },
    methods: {
        changeStyle(index) {
            // 边界处理
            if (index === 0 || index === 1) {
                return;
            }
            // 更新 currentSongIndex 和 player.src
            this.currentSongIndex = index;
            this.player.src = require("../assets/musics/" +
                musicData[index].song_src +
                ".mp3");
            // 开始播放
            this.player.play();
            // 更改播放按钮为暂停按钮
            this.playOrPause = 2;
        },
        //  切换 播放/暂停
        // 更改 playOrPause 的值为 入参的值
        changePlayOrPause(parameter) {
            this.playOrPause = parameter;
            if (parameter === 1) {
                this.player.pause();
            } else {
                // 如果当前时长为 0
                if (this.currentTime === 0) {
                    // 设置播放音乐源
                    this.player.src = require("../assets/musics/" +
                        musicData[this.currentSongIndex].song_src +
                        ".mp3");
                    // 开始播放
                    this.player.play();
                } else {
                    // 从暂停的位置继续播放
                    this.player.play();
                }
            }
        },
        // 切换 播放模式
        changePlayMode(parameter) {
            // 更改 playMode 的值为 入参 的值
            this.playMode = parameter;
        },
        // 上一曲
        previousSong() {
            // 边界处理
            if (this.currentSongIndex === 2) {
                this.currentSongIndex = this.musicData.length - 1;
            } else {
                this.currentSongIndex--;
            }
            // 更新 player.src
            this.player.src = require("../assets/musics/" +
                musicData[this.currentSongIndex].song_src +
                ".mp3");
            // 开始播放
            this.player.play();
            // 更改播放按钮为暂停按钮
            this.playOrPause = 2;
        },
        // 下一曲
        nextSong() {
            // 边界处理
            if (this.currentSongIndex === this.musicData.length - 1) {
                this.currentSongIndex = 2;
            } else {
                this.currentSongIndex++;
            }
            // 更新 player.src
            this.player.src = require("../assets/musics/" +
                musicData[this.currentSongIndex].song_src +
                ".mp3");
            // 开始播放
            this.player.play();
            // 更改播放按钮为暂停按钮
            this.playOrPause = 2;
        },
        mute() {
            // 静音 (如果未静音则静音, 如果已静音则恢复音量)
            this.player.muted = !this.player.muted;
        },
        adjustVolume(parameter) {
            // 调节音量 (0-1)
            this.player.volume = parameter;
        },
        // 下载当前音乐
        downloadMusic() {
            window.open(this.file, "download");
        },
        // 格式化时间
        formatTime(time) {
            // 如果 time 大于 3600 秒，则返回 hh:mm:ss
            if (time / 3600 > 1) {
                let hour = Math.floor(time / 3600);
                let minute = Math.floor((time % 3600) / 60);
                let second = Math.floor((time % 3600) % 60);
                // 写法一: 以 "0" 填充至两位数
                return `${hour}:${minute.toString().padStart(2, "0")}:${second
                    .toString()
                    .padStart(2, "0")}`;
                // 写法二: 判断 minute 和 second 是否为个位数, 如果是, 则前面补一个 0
                // return `${hour}:${minute < 10 ? "0" + minute : minute}:${
                //     second < 10 ? "0" + second : second
                // }`;
            } else {
                // 如果 time 不大于 3600 秒, 则返回 mm:ss (mm 分 ss 秒)
                let minute = Math.floor(time / 60);
                let second = Math.floor(time % 60);
                // TODO 一开始显示 0:0,而非00:00
                // console.log(
                //     `${minute < 10 ? "0" + minute : minute}:${
                //         second < 10 ? "0" + second : second
                //     }`
                // );
                // 写法一: 以 "0" 填充至两位数
                return `${minute.toString().padStart(2, "0")}:${second
                    .toString()
                    .padStart(2, "0")}`;
                // 写法二: 判断 minute 和 second 是否为个位数, 如果是, 则前面补一个 0
                // return `${minute < 10 ? "0" + minute : minute}:${
                //     second < 10 ? "0" + second : second
                // }`;
            }
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
        margin: 0 30px 1rem 30px;
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
        // border-left: thick double #32a1ce;
        border-left: thick double #ff9900;
        left: -15px;
    }
    & .music-player {
        display: flex;
        width: 100%;
        margin-top: 20px;
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
            margin-right: 30px;
        }
        & .flex-center {
            flex: 1;
            text-align: center;
        }
    }
    & .current-song-details {
        display: flex;
        align-items: center;
        & img {
            width: 50px;
            height: 50px;
        }
        & div {
            margin: auto 20px;
        }
        & p {
            text-align: center;
        }
        & .small-img {
            width: 32px;
            height: 32px;
        }
    }
    & .range-input {
        display: flex;
        // 移除默认样式
        & input[type="range"] {
            -webkit-appearance: none;
            width: 300px;
            // height: 1px;
            background-color: #ebdfff;
        }
        & input[type="range"]::-webkit-slider-runnable-track {
            // color: #7d30fa;
            // background-color: #7d30fa;
            -webkit-appearance: none;
            height: 5px;
            color: #7d30fa;
            // height: 1px;
        }
        & input[type="range"]::-webkit-slider-thumb {
            background-color: #7d30fa;
            width: 10px;
            height: 10px;
            -webkit-appearance: none;
            // color: #7d30fa;
            // height: 1px;
        }
    }
}
</style>
