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
        <!-- 可视化示意 -->
        <img
            :src="
                require('../assets/images/' +
                    visualizationData[currentIndex].picture_src +
                    '.svg')
            "
            alt=""
            width="100"
            height="64"
            ref="filterColor"
        />
        <!-- 颜色示意 -->
        <div
            @click="init()"
            :style="{
                backgroundColor: currentColor,
                width: '50px',
                height: '20px',
            }"
        ></div>
    </div>
</template>

<script>
import visualizationData from "/public/data/visualizationData.json";
export default {
    name: "MusicVisualization",
    data() {
        return {
            visualizationData: visualizationData,
            // canvas 可视化可选项 数组
            canvasVisulaizer: [
                "Bars-Bottom",
                "Bars-Center",
                "Bars-Up",
                "Curve-1",
                "Curve-2",
                "Curve-3",
                "Curve-Test",
                "Circle-Bars-Inner",
                "Circle-Bars-Center",
                "Circle-Bars-Outter",
                "Circle-Beat",
            ],
            // canvas 填充色(配色) 数组
            canvasFillStyle: [
                "#3CADFF",
                "#70DB74",
                "#A46CFF",
                "#FF4C45",
                "#FFAC46",
            ],
            // 参考链接: https://codepen.io/sosuke/pen/Pjoqqp
            filterColor: [
                "invert(55%) sepia(69%) saturate(1258%) hue-rotate(180deg) brightness(99%) contrast(104%)",
                "invert(74%) sepia(54%) saturate(437%) hue-rotate(68deg) brightness(96%) contrast(85%)",
                "invert(46%) sepia(66%) saturate(2573%) hue-rotate(232deg) brightness(103%) contrast(104%)",
                "invert(48%) sepia(61%) saturate(5342%) hue-rotate(336deg) brightness(115%) contrast(113%)",
                "invert(65%) sepia(90%) saturate(401%) hue-rotate(336deg) brightness(101%) contrast(101%)",
            ],
            // 当前可视化选项
            currentVisualizer: "Bars-Bottom",
            // 当前可视化选项索引
            currentIndex: 0,
            // 当前配色
            currentColor: "#3CADFF",
        };
    },
    mounted() {
        // 初始化
        // this.init();
    },
    methods: {
        visualizerSelected() {
            // 更新当前可视化选项
            this.currentVisualizer = this.$refs.selectVisualizer.value;
            // 更新当前可视化选项索引
            this.currentIndex = this.canvasVisulaizer.indexOf(
                this.currentVisualizer
            );
        },
        colorSelected() {
            // 更新当前配色
            this.currentColor = this.$refs.selectColor.value;
            // 更新 img 标签的 filter 属性, 使其与当前配色一致
            this.$refs.filterColor.style.filter =
                this.filterColor[
                    this.canvasFillStyle.indexOf(this.currentColor)
                ];
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
            let dataArray = new Uint8Array(bufferLength);
            // canvas
            const canvas = this.$refs.canvas;
            const canvasCtx = canvas.getContext("2d");
            const WIDTH = canvas.width;
            const HEIGHT = canvas.height;
            // 定义变量, 暂未赋值
            let barWidth;
            let barHeight;
            let x;
            let r;
            let theta;
            let sliceWidth;
            // 矩形四个角点坐标
            let Ax, Ay, Bx, By, Cx, Cy, Dx, Dy;
            // 内层函数 draw() 里, this 指向改变为 undefined, 故 this.currentColor 在 draw() 函数体内不能使用
            // 1. 数据存于变量, 无法响应式
            // let color = this.currentColor;
            // 2. this 存于变量 _that
            let _that = this;
            // 3. draw() 函数改为箭头函数
            function draw() {
                // 更新数据 requestAnimationFrame()
                requestAnimationFrame(draw);
                // 清除 canvas 画布
                canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

                // let fps = 0;
                // let lastRun = performance.now();
                // const getFPS = () => {
                //     let delta = (performance.now() - lastRun) / 1000;
                //     lastRun = performance.now();
                //     fps = 1 / delta;
                //     canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
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
                    case "Curve-1":
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
                            canvasCtx.lineTo(x, y);
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
                                    canvasCtx.moveTo(0, HEIGHT / 2);
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
                    // 两条曲线
                    case "Curve-Test":
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
                                    canvasCtx.moveTo(0, HEIGHT / 2);
                                }
                                canvasCtx.lineTo(
                                    x,
                                    ((HEIGHT / 2 - (HEIGHT / 2 - y)) *
                                        (3 - 2 * j)) /
                                        j
                                );

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
                                    canvasCtx.moveTo(0, HEIGHT / 2);
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
                    case "Circle-Bars-Inner":
                        // analyser 频域数据传递给 dataArray
                        // https://developer.mozilla.org/zh-CN/docs/Web/API/AnalyserNode/getByteTimeDomainData
                        analyser.getByteFrequencyData(dataArray);
                        barWidth = WIDTH / bufferLength;
                        r = WIDTH / 4;
                        theta = (Math.PI * 2) / bufferLength;
                        canvasCtx.strokeStyle = _that.currentColor;
                        // 保存当前状态, canvas 原点为左上角 (0,0)
                        canvasCtx.save();
                        // 移动 canvas 原点至圆心(矩形画布中心)
                        canvasCtx.translate(WIDTH / 2, HEIGHT / 2);
                        for (let i = 0; i < bufferLength; i++) {
                            barHeight = dataArray[i] / 10;
                            Ax = r * Math.sin(theta * i);
                            Ay = -r * Math.cos(theta * i);
                            Bx = (r - barHeight) * Math.sin(theta * i);
                            By = -(r - barHeight) * Math.cos(theta * i);
                            Cx = Bx + barWidth * Math.cos(theta * i);
                            Cy = By + barWidth * Math.sin(theta * i);
                            Dx = Ax + barWidth * Math.cos(theta * i);
                            Dy = Ay + barWidth * Math.sin(theta * i);
                            canvasCtx.beginPath();
                            // 斜矩形四条边
                            canvasCtx.moveTo(Ax, Ay);
                            canvasCtx.lineTo(Bx, By);
                            canvasCtx.lineTo(Cx, Cy);
                            canvasCtx.lineTo(Dx, Dy);
                            canvasCtx.lineTo(Ax, Ay);
                            canvasCtx.moveTo(0, 0);
                            canvasCtx.stroke();
                        }
                        // 恢复至最初状态, canvas 原点为左上角 (0,0)
                        canvasCtx.restore();
                        break;
                    // 圆环状
                    case "Circle-Bars-Center":
                        // analyser 频域数据传递给 dataArray
                        // https://developer.mozilla.org/zh-CN/docs/Web/API/AnalyserNode/getByteTimeDomainData
                        analyser.getByteFrequencyData(dataArray);
                        barWidth = WIDTH / bufferLength;
                        r = WIDTH / 4;
                        theta = (Math.PI * 2) / bufferLength;
                        canvasCtx.strokeStyle = _that.currentColor;
                        // 保存当前状态, canvas 原点为左上角 (0,0)
                        canvasCtx.save();
                        // 移动 canvas 原点至圆心(矩形画布中心)
                        canvasCtx.translate(WIDTH / 2, HEIGHT / 2);
                        for (let i = 0; i < bufferLength; i++) {
                            barHeight = dataArray[i] / 5;
                            Ax = (r - barHeight / 2) * Math.sin(theta * i);
                            Ay = -(r - barHeight / 2) * Math.cos(theta * i);
                            Bx = (r + barHeight / 2) * Math.sin(theta * i);
                            By = -(r + barHeight / 2) * Math.cos(theta * i);
                            Cx = Bx + barWidth * Math.cos(theta * i);
                            Cy = By + barWidth * Math.sin(theta * i);
                            Dx = Ax + barWidth * Math.cos(theta * i);
                            Dy = Ay + barWidth * Math.sin(theta * i);
                            canvasCtx.beginPath();
                            // 斜矩形四条边
                            canvasCtx.moveTo(Ax, Ay);
                            canvasCtx.lineTo(Bx, By);
                            canvasCtx.lineTo(Cx, Cy);
                            canvasCtx.lineTo(Dx, Dy);
                            canvasCtx.lineTo(Ax, Ay);
                            canvasCtx.moveTo(0, 0);
                            canvasCtx.stroke();
                        }
                        // 恢复至最初状态, canvas 原点为左上角 (0,0)
                        canvasCtx.restore();
                        break;
                    // 圆环状
                    case "Circle-Bars-Outter":
                        // analyser 频域数据传递给 dataArray
                        // https://developer.mozilla.org/zh-CN/docs/Web/API/AnalyserNode/getByteTimeDomainData
                        analyser.getByteFrequencyData(dataArray);
                        barWidth = WIDTH / bufferLength;
                        r = WIDTH / 4;
                        theta = (Math.PI * 2) / bufferLength;
                        canvasCtx.strokeStyle = _that.currentColor;
                        // 保存当前状态, canvas 原点为左上角 (0,0)
                        canvasCtx.save();
                        // 移动 canvas 原点至圆心(矩形画布中心)
                        canvasCtx.translate(WIDTH / 2, HEIGHT / 2);
                        for (let i = 0; i < bufferLength; i++) {
                            barHeight = dataArray[i] / 10;
                            Ax = r * Math.sin(theta * i);
                            Ay = -r * Math.cos(theta * i);
                            Bx = (r + barHeight) * Math.sin(theta * i);
                            By = -(r + barHeight) * Math.cos(theta * i);
                            Cx = Bx + barWidth * Math.cos(theta * i);
                            Cy = By + barWidth * Math.sin(theta * i);
                            Dx = Ax + barWidth * Math.cos(theta * i);
                            Dy = Ay + barWidth * Math.sin(theta * i);
                            canvasCtx.beginPath();
                            // 斜矩形四条边
                            canvasCtx.moveTo(Ax, Ay);
                            canvasCtx.lineTo(Bx, By);
                            canvasCtx.lineTo(Cx, Cy);
                            canvasCtx.lineTo(Dx, Dy);
                            canvasCtx.lineTo(Ax, Ay);
                            canvasCtx.moveTo(0, 0);
                            canvasCtx.stroke();
                        }
                        // 恢复至最初状态, canvas 原点为左上角 (0,0)
                        canvasCtx.restore();
                        break;
                    // 圆形振动
                    case "Circle-Beat":
                        // analyser 时域数据传递给 dataArray
                        // https://developer.mozilla.org/zh-CN/docs/Web/API/AnalyserNode/getByteTimeDomainData
                        analyser.getByteTimeDomainData(dataArray);
                        canvasCtx.lineWidth = 2;
                        canvasCtx.strokeStyle = _that.currentColor;
                        // 保存当前状态, canvas 原点为左上角 (0,0)
                        canvasCtx.save();
                        // 移动 canvas 原点至圆心(矩形画布中心)
                        canvasCtx.translate(WIDTH / 2, HEIGHT / 2);
                        r = WIDTH / 4;
                        theta = (Math.PI * 2) / bufferLength;
                        // 创建路径
                        canvasCtx.beginPath();
                        for (let i = 0; i < bufferLength; i++) {
                            barHeight = dataArray[i] / 2;
                            canvasCtx.lineTo(
                                (r + barHeight / 2) * Math.sin(i * theta),
                                -(r + barHeight / 2) * Math.cos(i * theta)
                            );
                        }
                        // 终点 (补回 第 0 个点)
                        canvasCtx.lineTo(0, -(r + dataArray[0] / 4));
                        // 描绘路径
                        canvasCtx.stroke();
                        // 恢复至最初状态, canvas 原点为左上角 (0,0)
                        canvasCtx.restore();
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
