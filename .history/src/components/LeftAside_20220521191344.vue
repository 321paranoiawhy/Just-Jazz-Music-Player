<template>
    <div class="left-aside">
        <!-- 鼠标悬停文字下划线动效 -->
        <div class="p-container"><p class="p-hover">Just Music</p></div>
        <!-- 截断 pictureData 数组对象 -->
        <div
            v-for="(item, index) in pictureData.slice(0, 3)"
            :key="index"
            class="item"
            :class="{ isSelected: index === currentIndex }"
            @click="changeIndex(index)"
        >
            <img
                :src="require('../assets/images/' + item.picture_src + '.svg')"
                alt=""
            />
            <div class="p-container">
                <p class="p-hover">{{ item.content }}</p>
            </div>
        </div>
        <div class="p-container"><p class="p-hover">Discover</p></div>
        <div
            v-for="(item, index) in pictureData.slice(3, 6)"
            :key="index"
            class="item"
            :class="{ isSelected: index + 3 === currentIndex }"
            @click="changeIndex(index + 3)"
        >
            <img
                :src="require('../assets/images/' + item.picture_src + '.svg')"
                alt=""
            />
            <div class="p-container">
                <p class="p-hover">{{ item.content }}</p>
            </div>
        </div>
        <div class="p-container"><p class="p-hover">Your Collection</p></div>
        <div
            v-for="(item, index) in pictureData.slice(6)"
            :key="index"
            class="item"
            :class="{ isSelected: index + 6 === currentIndex }"
            @click="changeIndex(index + 6)"
        >
            <img
                :src="require('../assets/images/' + item.picture_src + '.svg')"
                alt=""
            />
            <div class="p-container">
                <p class="p-hover">{{ item.content }}</p>
            </div>
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
        changeIndex(index) {
            this.currentIndex = index;
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
// 文字下划线动效 参考链接: https://codepen.io/ssmkhrj/pen/MWjpWKp?editors=1100
.p-hover {
    position: relative;
}
.p-hover::after {
    position: absolute;
    content: " ";
    width: 0%;
    height: 4px;
    background-color: #7d30fa;
    left: 50%;
    top: 20px;
    transition: all 0.4s ease-in-out;
}
.p-container:hover .p-hover::after {
    width: 100%;
    left: 0;
}
.p-container:hover .p-hover {
    color: #7d30fa;
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
    cursor: pointer;
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
.item:hover {
    & img {
        filter: invert(33%) sepia(90%) saturate(7048%) hue-rotate(260deg)
            brightness(101%) contrast(96%);
        transition: all 0.5s ease-in-out;
    }
}
</style>
