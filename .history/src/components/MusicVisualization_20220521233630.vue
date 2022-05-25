<template>
    <canvas class="visualizer" width="640" height="100" ref="canvas"></canvas>
</template>

<script>
export default {
    name: "MusicVisualization",
    methods: {
        musicVisualization() {
            // 1. 创建一个音频对象
            var audioCtx = new (window.AudioContext ||
                window.webkitAudioContext)();
            var analyser = audioCtx.createAnalyser();
            // 连接音频输入 stream
            let source = audioCtx.createMediaStreamSource(stream);
            source.connect(analyser);
            analyser.connect(distortion);

            //
            analyser.fftSize = 2048;
            var bufferLength = analyser.fftSize;
            var dataArray = new Uint8Array(bufferLength);
            // 将获取到的时域数据放入数组 dataArray
            analyser.getByteTimeDomainData(dataArray);

            // canvas
            var canvas = this.$refs.canvas;
            // https://github.com/mdn/voice-change-o-matic/blob/gh-pages/scripts/app.js#L109
            var canvasCtx = canvas.getContext("2d");
            // https://github.com/mdn/voice-change-o-matic/blob/gh-pages/scripts/app.js#L145
            var WIDTH = canvas.width;
            var HEIGHT = canvas.height;

            function draw() {
                //}
        }
    },
};
</script>
<style scoped lang="scss"></style>
