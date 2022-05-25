<template>
    <!-- canvas -->
    <canvas width="100%" height="100" ref="canvas"
        >Your broswer does not support canvas, please consider to open this
        website on Chrome or Firefox.</canvas
    >
    <!-- 可视化选项 (下拉菜单) -->
    <div>
        <label for="visual">Visualizer Setting</label>
        <select name="visual" ref="optionalSelect" @change="displaySelect()">
            <option value="Curve">Sinewave</option>
            <option value="Wave-1" selected>Frequency bars</option>
            <option value="Wave-2">Off</option>
        </select>
    </div>
    <div>
        <label for="visual">Color Setting</label>
        <select name="color" @change="displaySelect()">
            <option
                v-for="(item, index) in canvasFillStyle"
                :key="index"
                value="item"
            >
                {{ item }}
            </option>
            <!-- <option value="#70DB74">Sinewave</option>
            <option value="#A46CFF" selected>Frequency bars</option>
            <option value="#FFAC46">Off</option> -->
        </select>
    </div>
    <div><p @click="musicVisualization()">Begin</p></div>
</template>

<script>
export default {
    name: "MusicVisualization",
    data() {
        return {
            // 填充色 数组
            canvasFillStyle: ["#70DB74", "#A46CFF", "#FFAC46"],
            // 当前选项
            currentOption: "Wave-1",
            // 当前配色
            currentColor: "#A46CFF",
        };
    },
    methods: {
        displaySelect() {
            this.currentOption = this.$refs.optionalSelect.value;
            this.currentColor =
                this.canvasFillStyle[this.$refs.optionalSelect.selectedIndex];
        },
        musicVisualization() {
            // 1. 创建一个音频对象
            var audioCtx = new (window.AudioContext ||
                window.webkitAudioContext)();
            var analyser = audioCtx.createAnalyser();

            var audioCtx = new (window.AudioContext ||
                window.webkitAudioContext)();
            var currentAudio = document.querySelector("audio");

            // 连接音频输入 stream
            let source = audioCtx.createMediaStreamSource(stream);
            source.connect(analyser);
            analyser.connect(distortion);

            //
            analyser.fftSize = 2048;
            var bufferLength = analyser.fftSize;
            var dataArray = new Uint8Array(bufferLength);
            console.log(dataArray);
            // 将获取到的时域数据放入数组 dataArray
            analyser.getByteTimeDomainData(dataArray);

            // canvas
            var canvas = this.$refs.canvas;
            // https://github.com/mdn/voice-change-o-matic/blob/gh-pages/scripts/app.js#L109
            var canvasCtx = canvas.getContext("2d");
            // https://github.com/mdn/voice-change-o-matic/blob/gh-pages/scripts/app.js#L145
            var WIDTH = canvas.width;
            var HEIGHT = canvas.height;
            canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

            var optionalSelect = this.$refs.optionalSelect;
            // optionalSelect.value 获取所选项的值

            function draw() {
                drawVisual = requestAnimationFrame(draw);

                analyser.getByteTimeDomainData(dataArray);

                // canvasCtx.fillStyle = "#A46CFF";
                canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

                canvasCtx.lineWidth = 2;
                canvasCtx.strokeStyle = "red";

                canvasCtx.beginPath();

                // 条状宽度
                var barWidth = 3;
                // 条状高度
                var barHeight;
                // x 坐标
                var x = 0;

                for (var i = 0; i < bufferLength; i++) {
                    barHeight = dataArray[i] / 2;
                    canvasCtx.fillStyle = "#A46CFF";
                    // 自上而下绘制直线
                    canvasCtx.moveTo(x, -barHeight / 2);
                    canvasCtx.lineTo(x, barHeight / 2);
                    // 移动 x 坐标
                    x += barWidth + 1;
                }
                // canvasCtx.lineTo(canvas.width, canvas.height / 2);
                canvasCtx.stroke();
            }
            //  执行 draw()
            draw();
        },
    },
};
</script>
<style scoped lang="scss"></style>
