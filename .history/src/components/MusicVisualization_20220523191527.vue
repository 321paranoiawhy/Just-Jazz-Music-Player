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
                "Bars-Bottom",
                "Bars-Center",
                "Bars-Up",
                "Curve",
                "Curve-2",
                "Curve-3",
                "Wave-1",
                "Wave-2",
                "Circle",
            ],
            // canvas 填充色(配色) 数组
            canvasFillStyle: ["#70DB74", "#A46CFF", "#FFAC46"],
            // 当前可视化选项
            currentVisualizer: "Bars-Bottom",
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
            console.log(bufferLength);
            var dataArray = new Uint8Array(bufferLength);
            // 将获取到的时域数据放入数组 dataArray

            // canvas
            const canvas = this.$refs.canvas;
            const canvasCtx = canvas.getContext("2d");
            const WIDTH = canvas.width;
            const HEIGHT = canvas.height;
            let barWidth;
            let barHeight;
            let x;
            let sliceWidth;
            // 内层函数 draw() 里, this 指向改变为 undefined, 故 this.currentColor 在 draw() 函数体内不能使用
            // 1. 数据存于变量, 无法响应式
            // let color = this.currentColor;
            // 2. this 存于变量 _that
            let _that = this;
            // 3. draw() 函数改为箭头函数
            function draw() {
                requestAnimationFrame(draw);

                canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

                // let fps = 0;
                // let lastRun = performance.now();

                // const getFPS = () => {
                //     let delta = (performance.now() - lastRun) / 1000;
                //     lastRun = performance.now();
                //     fps = 1 / delta;

                //     // canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
                //     canvasCtx.fillStyle = "red";
                //     canvasCtx.fillText("FPS: " + Math.floor(fps), 20, 45);
                //     requestAnimationFrame(getFPS);
                // };
                // getFPS();

                switch (_that.currentVisualizer) {
                    // 底部居中条形图
                    case "Bars-Bottom":
                        // analyser 频域数据传递给 dataArray
                        // https://developer.mozilla.org/zh-CN/docs/Web/API/AnalyserNode/getByteFrequencyData
                        analyser.getByteFrequencyData(dataArray);
                        barWidth = (WIDTH / bufferLength) * 2.5;
                        for (let i = 0, x = 0; i < bufferLength; i++) {
                            barHeight = dataArray[i] / 2;
                            canvasCtx.fillStyle = _that.currentColor;
                            canvasCtx.fillRect(
                                x,
                                HEIGHT - barHeight,
                                barWidth,
                                barHeight
                            );
                            x += barWidth + 1;
                        }
                        break;
                    // 垂直居中条形图
                    case "Bars-Center":
                        // analyser 频域数据传递给 dataArray
                        // https://developer.mozilla.org/zh-CN/docs/Web/API/AnalyserNode/getByteFrequencyData
                        analyser.getByteFrequencyData(dataArray);
                        barWidth = (WIDTH / bufferLength) * 2.5;
                        for (let i = 0, x = 0; i < bufferLength; i++) {
                            barHeight = dataArray[i] / 2;
                            canvasCtx.fillStyle = _that.currentColor;
                            canvasCtx.fillRect(
                                x,
                                (HEIGHT - barHeight) / 2,
                                barWidth,
                                barHeight
                            );
                            x += barWidth + 1;
                        }
                        break;
                    // 顶部居中条形图
                    case "Bars-Up":
                        // analyser 频域数据传递给 dataArray
                        // https://developer.mozilla.org/zh-CN/docs/Web/API/AnalyserNode/getByteFrequencyData
                        analyser.getByteFrequencyData(dataArray);
                        barWidth = (WIDTH / bufferLength) * 2.5;
                        for (let i = 0, x = 0; i < bufferLength; i++) {
                            barHeight = dataArray[i] / 2;
                            canvasCtx.fillStyle = _that.currentColor;
                            canvasCtx.fillRect(x, 0, barWidth, barHeight);
                            x += barWidth + 1;
                        }
                        break;
                    // 一条曲线
                    case "Curve":
                        // analyser 时域数据传递给 dataArray
                        // https://developer.mozilla.org/zh-CN/docs/Web/API/AnalyserNode/getByteTimeDomainData
                        analyser.getByteTimeDomainData(dataArray);
                        x = 0;
                        sliceWidth = (WIDTH * 1.0) / bufferLength;
                        canvasCtx.lineWidth = 2;
                        canvasCtx.strokeStyle = _that.currentColor;
                        // 创建路径
                        canvasCtx.beginPath();
                        for (let i = 0; i < bufferLength; i++) {
                            let v = dataArray[i] / 128.0;
                            let y = (v * HEIGHT) / 2;
                            if (i === 0) {
                                // 起点
                                canvasCtx.moveTo(x, HEIGHT / 2);
                            } else {
                                canvasCtx.lineTo(x, y);
                            }
                            x += sliceWidth;
                        }
                        // 终点
                        canvasCtx.lineTo(WIDTH, HEIGHT / 2);
                        // 描绘路径
                        canvasCtx.stroke();
                        break;
                    // 两条曲线
                    case "Curve-2":
                        // analyser 时域数据传递给 dataArray
                        // https://developer.mozilla.org/zh-CN/docs/Web/API/AnalyserNode/getByteTimeDomainData
                        analyser.getByteTimeDomainData(dataArray);
                        x = 0;
                        sliceWidth = (WIDTH * 1.0) / bufferLength;
                        canvasCtx.lineWidth = 2;
                        canvasCtx.strokeStyle = _that.currentColor;

                        // 创建路径
                        canvasCtx.beginPath();
                        // j: 1 ~ 2
                        for (let j = 1; j < 3; j++) {
                            for (let i = 0; i < bufferLength; i++) {
                                let v = dataArray[i] / 128.0;
                                let y = (v * HEIGHT) / 2;
                                if (i === 0) {
                                    // 起点
                                    canvasCtx.moveTo(x, HEIGHT / 2);
                                } else {
                                    canvasCtx.lineTo(
                                        x,
                                        HEIGHT / 2 - (HEIGHT / 2 - y) / j
                                    );
                                }
                                x += sliceWidth;
                            }
                            canvasCtx.lineTo(WIDTH, HEIGHT / 2);
                            x = 0;
                        }
                        // 终点
                        canvasCtx.lineTo(WIDTH, HEIGHT / 2);
                        // 描绘路径
                        canvasCtx.stroke();
                        break;
                    // 三条曲线
                    case "Curve-3":
                        // analyser 时域数据传递给 dataArray
                        // https://developer.mozilla.org/zh-CN/docs/Web/API/AnalyserNode/getByteTimeDomainData
                        analyser.getByteTimeDomainData(dataArray);
                        x = 0;
                        sliceWidth = (WIDTH * 1.0) / bufferLength;
                        canvasCtx.lineWidth = 2;
                        canvasCtx.strokeStyle = _that.currentColor;
                        // 创建路径
                        canvasCtx.beginPath();
                        // j: 1 ~ 3
                        for (let j = 1; j < 4; j++) {
                            for (let i = 0; i < bufferLength; i++) {
                                let v = dataArray[i] / 128.0;
                                let y = (v * HEIGHT) / 2;
                                if (i === 0) {
                                    // 起点
                                    canvasCtx.moveTo(x, HEIGHT / 2);
                                } else {
                                    canvasCtx.lineTo(
                                        x,
                                        HEIGHT / 2 - (HEIGHT / 2 - y) / j
                                    );
                                }
                                x += sliceWidth;
                            }
                            canvasCtx.lineTo(WIDTH, HEIGHT / 2);
                            x = 0;
                        }
                        // 终点
                        canvasCtx.lineTo(WIDTH, HEIGHT / 2);
                        // 描绘路径
                        canvasCtx.stroke();
                        break;
                    // 圆环状
                    case "Circle":
                        // analyser 频域数据传递给 dataArray
                        // https://developer.mozilla.org/zh-CN/docs/Web/API/AnalyserNode/getByteTimeDomainData
                        analyser.getByteFrequencyData(dataArray);
                        barWidth = (WIDTH / bufferLength) * 2.5;
                        const r = WIDTH / 2;
                        const theta = (Math.PI * 2) / bufferLength;

                        canvasCtx.fillStyle = _that.currentColor;
                        canvasCtx.translate(WIDTH / 2, HEIGHT / 2);
                        for (var j = 0; j < bufferLength; j++) {
                            barHeight = dataArray[i] /2;
                            canvasCtx.rotate((theta);
                            canvasCtx.beginPath();
                            canvasCtx.arc(0, 12.5, barHeight, 0, Math.PI * 2, true);
                            canvasCtx.fill();
                        }

                        // // 移动 canvas 原点至圆心(矩形画布中心)
                        // canvasCtx.translate(WIDTH / 2, HEIGHT / 2);
                        // // 矩形四个角点坐标
                        // let Ax, Ay, Bx, By, Cx, Cy, Dx, Dy;

                        // for (let i = 0; i < bufferLength; i++) {
                        //     barHeight = dataArray[i] * 10;
                        //     Ax = (r - barHeight) * Math.sin(theta * i);
                        //     Ay = -(r - barHeight) * Math.cos(theta * i);
                        //     Bx = (r + barHeight) * Math.sin(theta * i);
                        //     By = -(r + barHeight) * Math.cos(theta * i);
                        //     Cx = Bx + barWidth * Math.cos(theta * i);
                        //     Cy = By + barWidth * Math.sin(theta * i);
                        //     Dx = Ax + barWidth * Math.cos(theta * i);
                        //     Dy = Ay + barWidth * Math.sin(theta * i);
                        //     canvasCtx.beginPath();
                        //     canvasCtx.moveTo(Ax, Ay);
                        //     canvasCtx.lineTo(Bx, By);
                        //     canvasCtx.lineTo(Cx, Cy);
                        //     canvasCtx.lineTo(Dx, Dy);
                        //     canvasCtx.lineTo(Ax, Ay);
                        //     canvasCtx.moveTo(0, 0);
                        //     canvasCtx.stroke();
                        // }
                        // canvasCtx.stroke();

                        // // 移动 canvas 原点至圆心(矩形画布中心)
                        // canvasCtx.translate(WIDTH / 2, HEIGHT / 2);
                        // canvasCtx.save();
                        // canvasCtx.clearRect(-WIDTH / 2, -HEIGHT / 2, WIDTH, HEIGHT);
                        // for (let i = 0; i < bufferLength; i++) {
                        //     // 移动 canvas 原点至圆心(矩形画布中心)
                        //     // canvasCtx.translate(WIDTH / 2, HEIGHT / 2);
                        //     barHeight = dataArray[i] / 10;
                        //     canvasCtx.rotate(i * theta);
                        //     // canvasCtx.save();

                        //     canvasCtx.fillRect(0, r, barWidth, barHeight);
                        //     // 恢复
                        //     canvasCtx.restore();
                        // }
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
