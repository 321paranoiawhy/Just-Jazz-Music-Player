<template>
    <audio
        :src="
            require('../assets/musics/' +
                'Just The Two Of Us - 王若琳' +
                '.mp3')
        "
        ref="audio"
    ></audio>
    <!-- canvas -->
    <canvas width="200" height="200" ref="canvas"
        >Your broswer does not support canvas, please consider to open this
        website on Chrome or Firefox.</canvas
    >
    <div class="grid-bottom">
        <!-- 可视化选项 (下拉菜单) -->
        <label for="visual">Visualizer Setting</label>
        <label for="coloe">Color Setting</label>
        <select
            name="visual"
            @change="visualizerSelected()"
            ref="selectVisualizer"
        >
            <option
                v-for="(item, index) in canvasVisulaizer"
                :key="index"
                :value="item"
            >
                {{ item }}
            </option>
        </select>
        <!-- 配色方案 -->
        <select name="color" @change="colorSelected()" ref="selectColor">
            <option
                v-for="(item, index) in canvasFillStyle"
                :key="index"
                :value="item"
            >
                {{ item }}
            </option>
        </select>
        <p @click="init()">{{ currentVisualizer }}</p>
        <p @click="init()">{{ currentColor }}</p>
    </div>
</template>

<script>
export default {
    name: "MusicVisualization",
    data() {
        return {
            // canvas 可视化可选项 数组
            canvasVisulaizer: [
                "Bars",
                "Bars-Center",
                "Curve",
                "Wave-1",
                "Wave-2",
            ],
            // canvas 填充色(配色) 数组
            canvasFillStyle: ["#70DB74", "#A46CFF", "#FFAC46"],
            // 当前可视化选项
            currentVisualizer: "Bars",
            // 当前配色
            currentColor: "#70DB74",
        };
    },
    methods: {
        visualizerSelected() {
            // 更新当前可视化选项
            this.currentVisualizer = this.$refs.selectVisualizer.value;
        },
        colorSelected() {
            // 更新当前配色
            this.currentColor = this.$refs.selectColor.value;
        },
        init() {
            this.$refs.audio.play();
            this.musicVisualization();
        },
        // 参考链接: https://codepen.io/jchenn/pen/LYPdjWN?utm_source=wechat_session&utm_medium=social&utm_oi=1071532971839766528
        musicVisualization() {
            // 创建一个音频对象 AudioContext
            const audioCtx = new (window.AudioContext ||
                window.webkitAudioContext)();
            const analyser = audioCtx.createAnalyser();
            analyser.fftSize = 512;

            // 获取 audio DOM 元素
            const currentAudio = this.$refs.audio;
            // 创建音频源 MediaElementAudioSourceNode (currentAudio 作为音频源)
            const source = audioCtx.createMediaElementSource(currentAudio);
            // 将音频源关联到分析器
            source.connect(analyser);
            // 将分析器关联到输出设备, 如耳机、扬声器、蓝牙等
            analyser.connect(audioCtx.destination);

            const bufferLength = analyser.frequencyBinCount;
            var dataArray = new Uint8Array(bufferLength);
            console.log(dataArray);
            // 将获取到的时域数据放入数组 dataArray

            // canvas
            const canvas = this.$refs.canvas;
            const canvasCtx = canvas.getContext("2d");
            const WIDTH = canvas.width;
            const HEIGHT = canvas.height;
            const barWidth = (WIDTH / bufferLength) * 1.5;
            let barHeight;

            // 内层函数 draw() 里, this 指向改变为 undefined, 故 this.currentColor 在 draw() 函数体内不能使用
            // 1. 数据存于变量, 无法响应式
            // let color = this.currentColor;
            // 2. this 存于变量 _that
            let _that = this;
            // 3. draw() 函数改为箭头函数
            function draw() {
                requestAnimationFrame(draw);

                analyser.getByteFrequencyData(dataArray);

                canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

                switch (_that.currentVisualizer) {
                    case "Bars":
                        for (let i = 0, x = 0; i < dataArray.length; i++) {
                            barHeight = dataArray[i];
                            canvasCtx.fillStyle = _that.currentColor;
                            canvasCtx.fillRect(
                                x,
                                HEIGHT - barHeight / 2,
                                barWidth,
                                barHeight / 2
                            );
                            x += barWidth + 3;
                        }
                        break;
                    case "Bars-Center":
                        for (let i = 0, x = 0; i < dataArray.length; i++) {
                            barHeight = dataArray[i];
                            canvasCtx.fillStyle = _that.currentColor;
                            canvasCtx.fillRect(
                                x,
                                (HEIGHT - barHeight / 2) / 2,
                                barWidth,
                                barHeight / 2
                            );
                            x += barWidth + 3;
                        }
                        break;
                    case "Curve":
                        let x = 0;
                        let sliceWidth = (WIDTH * 1.0) / bufferLength;
                        // let sliceWidth = WIDTH * 1.0;
                        // canvasCtx.fillStyle = _that.currentColor;
                        // canvasCtx.stokeStyle = _that.currentColor;
                        canvasCtx.beginPath();
                        for (let i = 0; i < dataArray.length; i++) {
                            let v = dataArray[i] / 128.0;
                            let y = (v * HEIGHT) / 2;
                            if (i === 0) {
                                canvasCtx.moveTo(x, y);
                            } else {
                                canvasCtx.lineTo(x, y);
                                canvasCtx.stokeStyle = _that.currentColor;
                            }

                            x += sliceWidth;
                        }
                        // canvasCtx.lineTo(canvas.width, canvas.height / 2);
                        canvasCtx.stroke();
                        break;
                    default:
                        break;
                }
            }
            // 执行 draw()
            draw();
        },
    },
};
</script>
<style scoped lang="scss">
.grid-bottom {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-items: center;
    align-items: center;
    text-align: center;
    & select {
        text-align: center;
        margin-top: 15px;
    }
}
</style>
