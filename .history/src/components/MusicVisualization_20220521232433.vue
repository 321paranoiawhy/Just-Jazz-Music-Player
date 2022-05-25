<template></template>

<script>
export default {
    name: "MusicVisualization",
    methods: {
        musicVisualization() {
            var audioCtx = new (window.AudioContext ||
                window.webkitAudioContext)();
            var analyser = audioCtx.createAnalyser();
        },
    },
};
</script>
<style scoped lang="scss"></style>
