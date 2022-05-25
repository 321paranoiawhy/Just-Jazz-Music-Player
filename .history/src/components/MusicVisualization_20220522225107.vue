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
    <canvas width="100" height="100" ref="canvas"
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
        <p @click="musicVisualization()">{{ currentVisualizer }}</p>
        <p @click="musicVisualization()">{{ currentColor }}</p>
    </div>
</template>

<script>
export default {
    name: "MusicVisualization",
    data() {
        return {
            // canvas 可视化可选项 数组
            canvasVisulaizer: ["Curve", "Wave-1", "Wave-2"],
            // canvas 填充色(配色) 数组
            canvasFillStyle: ["#70DB74", "#A46CFF", "#FFAC46"],
            // 当前可视化选项
            currentVisualizer: "Curve",
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
        musicVisualization() {
            // 1. 创建一个音频对象 AudioContext
            var audioCtx = new (window.AudioContext ||
                window.webkitAudioContext)();
            var analyser = audioCtx.createAnalyser();
            analyser.fftSize = 512;
            var bufferLength = analyser.fftSize;
            var dataArray = new Uint8Array(bufferLength);
            console.log(dataArray);
            // 将获取到的时域数据放入数组 dataArray

            // 获取 audio DOM 元素
            var currentAudio = this.$refs.audio;
            // 创建音频源 MediaElementAudioSourceNode (currentAudio 作为音频源)
            var source = audioCtx.createMediaElementSource(currentAudio);
            // 将音频源关联到分析器
            source.connect(analyser);
            // 将分析器关联到输出设备, 如耳机、扬声器、蓝牙等
            analyser.connect(audioCtx.destination);

            // canvas
            var canvas = this.$refs.canvas;
            // https://github.com/mdn/voice-change-o-matic/blob/gh-pages/scripts/app.js#L109
            var canvasCtx = canvas.getContext("2d");
            // https://github.com/mdn/voice-change-o-matic/blob/gh-pages/scripts/app.js#L145
            var WIDTH = canvas.width;
            var HEIGHT = canvas.height;
            console.log(WIDTH, HEIGHT);

            function draw() {
                requestAnimationFrame(draw);
                // 将获取到的时域数据放入数组 dataArray
                analyser.getByteFrequencyData(dataArray);
                canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

                // canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

                // canvasCtx.lineWidth = 2;
                // canvasCtx.strokeStyle = "red";

                // canvasCtx.beginPath();

                // 条状宽度
                var barWidth = 3;
                // 条状高度
                var barHeight;
                // x 坐标
                var x = 0;

                // for (var i = 0; i < bufferLength; i++) {
                //     barHeight = dataArray[i] / 2;
                //     canvasCtx.fillStyle = "canvasFillStyle[currentColor]";
                //     // 自上而下绘制直线
                //     canvasCtx.moveTo(x, -barHeight / 2);
                //     canvasCtx.lineTo(x, barHeight / 2);
                //     // 移动 x 坐标
                //     x += barWidth + 1;
                // }
                for (var i = 0, x = 0; i < bufferLength; i++) {
                    barHeight = dataArray[i];

                    var r = barHeight + 25 * (i / bufferLength);
                    var g = 250 * (i / bufferLength);
                    var b = 50;

                    canvasCtx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
                    canvasCtx.fillRect(
                        x,
                        HEIGHT - barHeight,
                        barWidth,
                        barHeight
                    );

                    x += barWidth + 2;
                }
                // canvasCtx.lineTo(canvas.width, canvas.height / 2);
                // canvasCtx.stroke();
            }
            //  执行 draw()
            draw();
        },
        // draw() {},
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
