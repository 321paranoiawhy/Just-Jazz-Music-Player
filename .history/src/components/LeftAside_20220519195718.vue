<template>
    <div class="left-aside">
        <p>Just Music</p>
        <!-- 截断 pictureData 数组对象 -->
        <div
            v-for="(item, index) in pictureData.slice(0, 3)"
            :key="index"
            class="item"
            :class="{ isSelected: index === currentIndex }"
            @click="changeIndex()"
            ref="selectedItem"
        >
            <img
                :src="require('../assets/images/' + item.picture_src + '.svg')"
                alt=""
            />
            <p>{{ item.content }}</p>
        </div>
        <p>Discover</p>
        <div
            v-for="(item, index) in pictureData.slice(3, 6)"
            :key="index"
            class="item"
        >
            <img
                :src="require('../assets/images/' + item.picture_src + '.svg')"
                alt=""
            />
            <p>{{ item.content }}</p>
        </div>
        <p>Your Collection</p>
        <div
            v-for="(item, index) in pictureData.slice(6)"
            :key="index"
            class="item"
        >
            <img
                :src="require('../assets/images/' + item.picture_src + '.svg')"
                alt=""
            />
            <p>{{ item.content }}</p>
        </div>
    </div>
</template>

<script>
import pictureData from "/public/data/pictureData.json";
export default {
    name: "LeftAside",
    data() {
        return {
            // JSON 数据
            pictureData: pictureData,
            // 当前索引
            currentIndex: 0,
        };
    },
    methods: {
        // 改变索引
        changeIndex() {
            console.log(this.$refs.selectedItem.key);
            this.currentIndex = this.$refs.selectedItem.index;
        },
    },
};
</script>
<style scoped lang="scss">
.left-aside {
    width: 250px;
    margin-left: 20px;
    // morandi light grey
    border-right: 1px solid #d1d4d0;
    & p {
        margin-left: 20px;
        text-align: left;
    }
}
.item {
    display: flex;
    align-items: center;
    margin-right: 20px;
    & img {
        width: 24px;
        height: 24px;
        margin-left: 20px;
    }
}
.isSelected {
    border-radius: 16px;
    color: #7d30fa;
    background-color: #eee6fc;
    & img {
        // https://codepen.io/sosuke/pen/Pjoqqp
        filter: invert(33%) sepia(90%) saturate(7048%) hue-rotate(260deg)
            brightness(101%) contrast(96%);
    }
}
</style>
