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
            // 已播放歌曲索引
            playedSongIndex: "",
            // 计时器
            timer: "",
            // 当前时间
            currentTime: "",
            // 首次播放时间
            firstPlayTime: [],
        };
    },
    watch: {
        // 侦听 playedSongIndex 的 size 属性, 注意加双引号
        "playedSongIndex.size": function () {
            this.firstPlayTime.push(new Date());
            // TODO localStorage
            // localStorage.setItem("");
        },
    },
    mounted() {
        // 获取 vuex globalPlayedSongIndex
        this.playedSongIndex = this.$store.state.globalPlayedSongIndex;
        this.timer = setInterval(() => {
            this.currentTime = new Date();
        }, 1000);
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
            // 日 day (注意使用的是 getDate(),表示月份中的某一天,而 getDay() 表示周几)
            let day = time1.getDate() - time2.getDate();
            // 时 hour
            let hour = time1.getHours() !== time2.getHours();
            // 分 minute
            let minute = time1.getMinutes() - time2.getMinutes();
            // 年份不等, 返回 X year(s) ago
            if (year) {
                return year === 1 ? `${year} year ago` : `${year} years ago`;
            } else if (month) {
                // 年份相等, 月份不等, 返回 X month(s) ago
                return month === 1
                    ? `${month} month ago`
                    : `${month} months ago`;
            } else if (day) {
                // 年份和月份相等, 日期不等, 返回 X day(s) ago
                return day === 1 ? `${day} day ago` : `${day} days ago`;
            } else if (hour) {
                // 年份、月份h和日期相等, 小时不等, 返回 X hour(s) ago
                return hour === 1 ? `${hour} hour ago` : `${hour} hours ago`;
            } else {
                // 仅分钟不等, 返回 X minute(s) ago
                return minute === 1
                    ? `${minute} minute ago`
                    : `${minute} minutes ago`;
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
