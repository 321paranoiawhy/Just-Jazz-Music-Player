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
            //
            let source = audioCtx.createMediaStreamSource(stream);
            source.connect(analyser);
            analyser.connect(distortion);
            //
            analyser.fftSize = 2048;
            var bufferLength = analyser.fftSize;
            var dataArray = new Uint8Array(bufferLength);

            // this.$refs.canvas
            var WIDTH = this.$refs.canvas.width;
            // https://github.com/mdn/voice-change-o-matic/blob/gh-pages/scripts/app.js#L109
            var canvasCtx = this.$refs.canvas.getContext("2d");
        },
    },
};
</script>
<style scoped lang="scss"></style>
