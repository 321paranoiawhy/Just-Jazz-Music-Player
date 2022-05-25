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
            <!-- TODO 计算距离当前时间 -->
            <!-- <p>{{ currentTime }}</p> -->
            <!-- <p>{{ firstPlayTime[index] }}</p> -->

            <p>{{ formateTime(currentTime, firstPlayTime[index]) }}</p>
            <!-- <p>{{ formateTime(firstPlayTime[index], firstPlayTime[index]) }}</p> -->
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
            timer: "",
            currentTime: "",
            firstPlayTime: [],
        };
    },
    watch: {
        // 侦听 playedSongIndex, 当其变化时, 更新 firstPlayTime
        // playedSongIndex: function () {
        //     this.firstPlayTime.push(new Date());
        // },
        // 侦听 playedSongIndex 的 size 属性, 注意加双引号
        "playedSongIndex.size": function () {
            this.firstPlayTime.push(new Date());
        },
    },
    mounted() {
        this.playedSongIndex = this.$store.state.globalPlayedSongIndex;
        this.timer = setInterval(() => {
            this.currentTime = new Date();
        });
    },
    // 销毁
    destroyed() {
        clearInterval(this.timer);
    },
    methods: {
        // 时间格式化函数
        formateTime(time1, time2) {
            // 年 year
            let year = time1.getFullYear() - time2.getFullYear();
            // 月 month
            let month = time1.getMonth() - time2.getMonth();
            // 日 date
            let date = time1.getDate() - time2.getDate();
            // 时 hour
            let hour = time1.getHours() !== time2.getHours();
            // 分 minute
            let minute = time1.getMinutes() - time2.getMinutes();
            // 年份不等, 返回 X year ago
            if (time1.getFullYear() !== time2.getFullYear()) {
                return `${time1.getFullYear() - time2.getFullYear()} year ago`;
            } else if (time1.getDay() !== time2.getDay()) {
                // 年份相等, 天数不等, 返回 X day ago
                return `${time1.getDay() - time2.getDay()} day ago`;
            } else if (time1.getHours() !== time2.getHours()) {
                // 年份和天数相等, 小时不等, 返回 X hour ago
                return `${time1.getHours() - time2.getHours()} hour ago`;
            } else {
                // 年份和天数相等, 小时不等, 返回 X minute ago
                return `${time1.getHours() - time2.getHours()} h ${
                    time1.getMinutes() - time2.getMinutes()
                } minute ago`;
            }
        },
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
