<template>
    <!-- 最外层容器 container -->
    <div class="container">
        <!-- 头部 head -->
        <div class="head">
            <!-- 前进 后退 -->
            <img
                src="../assets/images/IcRoundArrowBackIos.svg"
                alt=""
                title="Forward"
            />
            <img
                src="../assets/images/IcRoundArrowForwardIos.svg"
                alt=""
                title="Next"
            />
            <!-- 搜索框 input -->
            <div class="form">
                <input type="text" placeholder=" " autocomplete="off" />
                <label>Search...</label>
                <img src="../assets/images/IcRoundSearch.svg" alt="" />
            </div>
        </div>
        <!-- 轮播图 slideshow -->
        <!-- TODO -->
        <div
            class="slideshow"
            v-for="(item, index) in musicData.slice(2, 3)"
            :key="index"
        >
            <!-- <img src="../assets/images/Ono-Lisa-best-2002-2006.jpg" alt="" /> -->
            <img
                :src="require('../assets/images/' + item.picture_src + '.webp')"
                alt=""
            />
        </div>
        <!-- Popular Songs 展示 -->
        <div
            v-for="(item, index) in musicData"
            :key="index"
            class="grid"
            :class="{ isSelected: index === currentSongIndex }"
            @click="changeStyle(index)"
        >
            <p>{{ item.index }}</p>
            <!-- 当 picture_src 不为空时显示音乐图片 -->
            <img
                v-if="item.picture_src.length !== 0"
                :src="require('../assets/images/' + item.picture_src + '.webp')"
                alt=""
            />
            <!-- 否则以空 div 占位 -->
            <div v-else></div>
            <p>{{ item.title }}</p>
            <p>{{ item.artist }}</p>
            <p>{{ item.play_count }}</p>
            <p>{{ item.time }}</p>
            <p>{{ item.album }}</p>
        </div>
        <!-- 当前音乐信息 -->
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
        <!-- 播放相关按钮 -->
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
                v-show="muteOrUnmute === 0"
                class="flex-right"
                title="Mute"
                @click="mute()"
            />
            <img
                src="../assets/images/RiVolumeMuteLine.svg"
                alt=""
                v-show="muteOrUnmute === 1"
                class="flex-right"
                title="Mute"
                @click="mute()"
            />
            <div class="adjust-volume">
                <!-- 父组件获取子组件的值 -->
                <VerticalSlider
                    @getVolume="adjustVolume"
                    class="slider-show"
                    title="player.volume"
                ></VerticalSlider>
                <img
                    src="../assets/images/IcOutlineVolumeUp.svg"
                    alt=""
                    class="flex-right"
                    title="Volume"
                />
            </div>
        </div>
        <!-- 播放进度相关 -->
        <div class="range-input">
            <!-- 格式化时间 -->
            <p class="p-center">{{ formatTime(currentTime) }}</p>
            <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value="0"
                ref="percent"
                @input="changeCurrentTime()"
            />
            <!-- 格式化时间 -->
            <p>{{ formatTime(totalTime) }}</p>
            <!-- 显示当前音量 (百分比, 默认 100%) -->
            <p class="p-right">{{ Math.floor(player.volume * 100) }}%</p>
        </div>
        <!-- 分页组件 -->
        <Pagination></Pagination>
        <p>{{ historyPlayedSongIndex }}</p>
    </div>
</template>

<script>
import musicData from "/public/data/musicData.json";
import HorizontalSlider from "../components/HorizontalSlider.vue";
import VerticalSlider from "../components/VerticalSlider.vue";
import Pagination from "./Pagination.vue";
export default {
    name: "Music",
    components: {
        HorizontalSlider,
        VerticalSlider,
        Pagination,
    },
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
            randomPlayedSongIndex: [],
            // 静音前音量
            beforeMutedVolume: 1,
            // 是否已静音 (0 未静音 1 已静音)
            muteOrUnmute: 0,
            // 历史播放歌曲索引 (使用 Set 集合类型 管理避免 push 重复索引进去)
            historyPlayedSongIndex: new Set(),
        };
    },
    mounted() {
        // 默认 src
        this.player.src = require("../assets/musics/" +
            musicData[this.currentSongIndex].song_src +
            ".mp3");
        // 提交 player 至 vuex
        this.$store.commit("getGlobalPlayer", this.player);
        // 参考链接: https://zhuanlan.zhihu.com/p/78876382
        // 音频媒体事件加载顺序
        // https://developer.mozilla.org/en-US/docs/Web/Guide/Audio_and_video_delivery/Cross-browser_audio_basics#media_loading_events
        // loadstart -> durationchange -> loadedmetadata -> loadeddata -> progress -> canplay -> canplaythrough
        // 在DOM加载完成时, 添加 audio 监听事件
        this.player.addEventListener("canplay", () => {
            // 总时长
            this.totalTime = this.player.duration;
        });
        this.player.addEventListener("playing", () => {
            // 当歌曲正在播放时, 执行 globalVisualization()
            this.$store.state.globalVisualization();
            this.historyPlayedSongIndex.add(this.currentSongIndex);
            console.log(this.historyPlayedSongIndex);
        });
        this.player.addEventListener("timeupdate", () => {
            // 当前时长
            this.currentTime = this.player.currentTime;
            // 播放进度随当前时长同步变化 (注意字符串须通过 Number() 转型函数转为数字)
            this.$refs.percent.value =
                Number(this.currentTime) / Number(this.totalTime);
            // 鼠标悬停时显示当前时长 (title)
            this.$refs.percent.title = this.formatTime(this.currentTime);
        });
        // 当前歌曲结束
        this.player.addEventListener("ended", () => {
            switch (this.playMode) {
                // 1 单曲循环
                case 1:
                    // 从头开始播放
                    this.player.play();
                    break;
                // 2 随机播放
                case 2:
                    // 更新已播放歌曲索引数组
                    this.randomPlayedSongIndex.push(this.currentSongIndex);
                    if (
                        this.randomPlayedSongIndex.length ===
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
                    while (
                        this.randomPlayedSongIndex.indexOf(randomIndex) !== -1
                    ) {
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
            if (this.player.volume) {
                // 如果未静音则静音, 并更新静音前音量
                // 更新静音前音量
                this.beforeMutedVolume = this.player.volume;
                // 当前音量设置为 0
                this.player.volume = 0;
                // 更改非静音按钮为静音按钮
                this.muteOrUnmute = 1;
            } else {
                // 如果已静音则恢复音量为静音前音量
                this.player.volume = this.beforeMutedVolume;
                // 更改静音按钮为非静音按钮
                this.muteOrUnmute = 0;
            }
        },
        adjustVolume(data) {
            // 调节音量 (0-1)
            this.player.volume = data;
        },
        // 下载当前音乐
        // 参考链接: https://zhuanlan.zhihu.com/p/58888918
        // https://www.yuhexin.cn/2019/08/06/%E5%89%8D%E7%AB%AF%E9%80%9A%E8%BF%87Blob%E5%AE%9E%E7%8E%B0%E6%96%87%E4%BB%B6%E4%B8%8B%E8%BD%BD/
        downloadMusic() {
            // source (音乐源)
            const source = require("../assets/musics/" +
                musicData[this.currentSongIndex].song_src +
                ".mp3");
            // blobContent (Blob 对象)
            const blobContent = new Blob([JSON.stringify(source, null, 2)], {
                type: "audio/mpeg",
            });
            // blobUrl (Blob 对象的 URL)
            const blobUrl = window.URL.createObjectURL(blobContent);
            // fileName (文件名)
            const fileName = musicData[this.currentSongIndex].title;
            // IIFE(立即执行函数)
            (function () {
                const eleLink = document.createElement("a");
                eleLink.download = fileName;
                eleLink.href = blobUrl;
                document.body.appendChild(eleLink);
                // 触发点击
                eleLink.click();
                // 然后移除
                eleLink.remove();
            })();
            // 亦可先定义函数再调用函数
            // // 定义下载函数 downloadFileByBlob
            // function downloadFileByBlob(blobUrl, fileName) {
            //     const eleLink = document.createElement("a");
            //     eleLink.download = fileName;
            //     eleLink.href = blobUrl;
            //     document.body.appendChild(eleLink);
            //     // 触发点击
            //     eleLink.click();
            //     // 然后移除
            //     eleLink.remove();
            // }
            // // 调用下载函数 downloadFileByBlob
            // downloadFileByBlob(blobUrl, fileName);
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
                // 写法一: 以 "0" 填充至两位数
                return `${minute.toString().padStart(2, "0")}:${second
                    .toString()
                    .padStart(2, "0")}`;
                // 写法二: 同上
            }
        },
        // 播放进度变化(拖动滚动条)时, 更新当前时长
        changeCurrentTime() {
            this.player.currentTime =
                this.$refs.percent.value * Number(this.totalTime);
        },
    },
};
</script>
<style scoped lang="scss">
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-right: 1px solid #d1d4d0;
    & .head {
        display: flex;
        // 自身作为 flex容器使内部子元素 垂直居中
        align-items: center;
        // 自身作为外层flex的子元素 居左对齐
        align-self: flex-start;
        height: 50px;
        width: 100%;
        & img {
            width: 24px;
            height: 24px;
            filter: invert(33%) sepia(90%) saturate(7048%) hue-rotate(260deg)
                brightness(101%) contrast(96%);
            &:first-child {
                margin: 0 30px;
            }
        }
        // 搜索框样式
        // 参考链接: https://codepen.io/angeladelise/pen/ZEpXPBZ
        & div.form {
            position: relative;
            width: 30rem;
            height: 2rem;
            margin-left: 3rem;
            & input {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                border: 1px solid #7d30fa;
                border-radius: 1rem;
                // 去除 input 的默认边框
                outline: none;
                background: none;
                // input placeholder 缩进
                text-indent: 1rem;
                &:focus {
                    border: 1px solid #6426c8;
                }
            }
            & label {
                position: absolute;
                top: 0.5rem;
                left: 1rem;
                cursor: text;
                color: #be97ec;
                // label 背景色 同网页背景色 (可消除 label 文字上移后的 input 边框)
                background-color: #fff;
                transition: top 200ms ease-in, left 200ms ease-in,
                    font-size 200ms ease-in;
            }
            & img {
                position: absolute;
                top: 0.375rem;
                right: 1rem;
            }
        }
        & input:focus ~ label,
        & input:not(:placeholder-shown)input:not(:focus) ~ label {
            top: -0.4rem;
            left: 1rem;
            font-size: 0.8rem;
        }
    }
    & .slideshow {
        margin: 30px;
        & img {
            width: 200px;
            height: 200px;
        }
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
            width: 40px;
            height: 40px;
        }
        & p {
            margin: auto;
            text-align: center;
            line-height: 100%;
        }
    }
    & .isSelected {
        // 相对定位
        position: relative;
        background-color: #f8f5fd;
    }
    & .isSelected::before {
        // 伪元素绝对定位
        position: absolute;
        content: " ";
        height: 100%;
        border-left: thick double #7d30fa;
        left: -15px;
    }
    & .music-player {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100px;
        & img {
            width: 32px;
            height: 32px;
            filter: invert(33%) sepia(90%) saturate(7048%) hue-rotate(260deg)
                brightness(101%) contrast(96%);
        }
        & .flex-left {
            margin-left: 30px;
        }
        & .flex-right {
            margin-right: 30px;
        }
        & .flex-center {
            flex: 1;
            text-align: center;
        }
        // TODO
        & .adjust-volume {
            // 父 相对定位 (子绝父相)
            position: relative;
            & .slider-show {
                // 默认隐藏
                display: none;
                // 子 绝对定位
                position: absolute;
                // 移动至左上方 (left 62-32/2=46)
                left: -46px;
                top: -60px;
            }
            &:hover .slider-show {
                // 显示滚动条
                display: block;
            }
        }
    }
    & .current-song-details {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding-top: 20px;
        border-top: 1px solid #d1d4d0;
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
            // 使 宽度等同于 img 的宽度(50px), 从而实现水平居中
            margin: auto 9px;
            filter: invert(33%) sepia(90%) saturate(7048%) hue-rotate(260deg)
                brightness(101%) contrast(96%);
        }
    }
    & .range-input {
        display: flex;
        width: 100%;
        & .p-center {
            margin-left: auto;
            margin-right: 50px;
        }
        & .p-right {
            width: 50px;
            // 居右对齐
            text-align: right;
            // 左外边距自动
            margin-left: auto;
            // 右外边距 30px
            margin-right: 30px;
        }
        // Chrome/Sarfri/Opera浏览器 内核 WebKit/Blink (-webkit 前缀)
        // Firefox 等其他浏览器 内核 Gecko (-moz 前缀)
        // IE 浏览器 内核 Trident (ms 前缀)
        // 参考链接: https://www.quirksmode.org/blog/archives/2015/11/styling_and_scr.html
        // https://css-tricks.com/styling-cross-browser-compatible-range-inputs-css/
        // https://segmentfault.com/a/1190000041543171
        // codepen: https://codepen.io/xboxyan/pen/YzERZyE
        // codepen: https://codepen.io/saransh1399/pen/XWMyRxG
        input[type="range"] {
            -webkit-appearance: none;
            appearance: none;
            margin: auto 20px;
            outline: 0;
            background-color: transparent;
            width: 300px;
            height: 20px;
            overflow: hidden;
            cursor: pointer;
        }

        input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            /* your thumb styles */
            appearance: none;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: #7d30fa;
            border: 1px solid transparent;
            margin-top: -4px;
            border-image: linear-gradient(#7d30fa, #7d30fa) 0 fill / 4 10 4 0 /
                0px 0px 0 2000px;
        }

        input[type="range"]::-moz-range-thumb {
            /* again your thumb styles */
            appearance: none;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: #7d30fa;
            border: 1px solid transparent;
            margin-top: -4px;
            border-image: linear-gradient(#7d30fa, #7d30fa) 0 fill / 4 10 4 0 /
                0px 0px 0 2000px;
        }

        input[type="range"]::-ms-thumb {
            /* should come after -webkit- */
            /* again your thumb styles */
            /* may require different margins */
            appearance: none;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: #7d30fa;
            border: 1px solid transparent;
            margin-top: -4px;
            border-image: linear-gradient(#7d30fa, #7d30fa) 0 fill / 4 10 4 0 /
                0px 0px 0 2000px;
        }

        input[type="range"]::-webkit-slider-runnable-track {
            /* your track styles */
            height: 2px;
            background: #ebdfff;
        }

        input[type="range"]::-moz-range-track {
            /* again your track styles */
            height: 2px;
            background: #ebdfff;
        }

        input[type="range"]::-ms-track {
            /* should come after -webkit- */
            border-color: transparent;
            color: transparent;
            /* again your track styles */
            height: 2px;
            background: #ebdfff;
        }
    }
    // 为所有 img 添加共同样式
    & img {
        cursor: pointer;
    }
}
</style>
