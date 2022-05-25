<template>
    <div class="right-aside">
        <div class="inner-grid">
            <img
                src="../assets/images/IcRoundAccountCircle.svg"
                alt=""
                class="medium-image"
            />
            <div>
                <h3>User</h3>
                <p>Premium Member</p>
            </div>
            <img
                src="../assets/images/IcRoundNotificationsNone.svg"
                alt=""
                class="grid-right"
            />
            <h3 class="two-column">Recent Played</h3>
            <p class="grid-right">See All</p>
        </div>
        <!-- 利用扩展运算符将 playedSongIndex (Set) 转换为数组 -->
        <div v-for="(item, index) in [...playedSongIndex]" :key="index">
            <p>{{ musicData[item].title }}</p>
        </div>
        <!-- RightAside 最底下 音乐可视化 -->
        <div class="right-aside-bottom">
            <MusicVisualization></MusicVisualization>
        </div>
    </div>
</template>

<script>
import MusicVisualization from "./MusicVisualization.vue";
import musicData from "/public/data/musicData.json";

export default {
    name: "RightAside",
    components: {
        MusicVisualization,
    },
    data() {
        return {
            musicData: musicData,
            playedSongIndex: "",
        };
    },
    mounted() {
        this.playedSongIndex = this.$store.state.globalPlayedSongIndex;
    },
};
</script>
<style scoped lang="scss">
.right-aside {
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    margin-right: 20px;
    position: relative;
    & .right-aside-bottom {
        position: absolute;
        bottom: 0;
        text-align: center;
    }
}
.inner-grid {
    display: grid;
    justify-content: center;
    align-items: center;
    grid-template-columns: repeat(3, auto);
    grid-template-rows: auto;
    grid-gap: 1rem;
    & .two-column {
        grid-column: 1 / 3;
    }
    & .grid-right {
        justify-self: end;
    }
    & .medium-image {
        width: 40px;
        height: 40px;
    }
}
img {
    width: 28px;
    height: 28px;
    filter: invert(33%) sepia(90%) saturate(7048%) hue-rotate(260deg)
        brightness(101%) contrast(96%);
}
</style>
