<template></template>

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
            source = audioCtx.createMediaStreamSource(stream);
            source.connect(analyser);
            analyser.connect(distortion);
        },
    },
};
</script>
<style scoped lang="scss"></style>
