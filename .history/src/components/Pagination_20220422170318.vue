<template>
    <!-- 分页 -->
    <div class="pagination">
        <ul>
            <!-- 前两页 -->
            <li @click="turnToPage(-2)">
                <img
                    src="../assets/images/TeenyiconsDoubleCaretLeftCircleOutline.svg"
                    alt="DoubleLeft"
                />
            </li>
            <!-- 前一页 -->
            <li @click="turnToPage(-1)">
                <img
                    src="../assets/images/TeenyiconsLeftCircleOutline.svg"
                    alt="Left"
                />
            </li>
            <!-- 页数( v-for ) -->
            <!-- 绑定点击事件 select(item) -->
            <!-- item === currentPage 则添加 active 的类名 -->
            <li
                class="pages"
                :class="{ active: item === currentPage }"
                v-for="(item, index) in pages"
                v-bind:key="index"
                @click="select(item)"
            >
                <span class="pageSpan">{{ item }}</span>
            </li>
            <!-- 后一页 -->
            <li @click="turnToPage(+1)">
                <img
                    src="../assets/images/TeenyiconsRightCircleOutline.svg"
                    alt="right"
                />
            </li>
            <!-- 后两页 -->
            <li @click="turnToPage(+2)">
                <img
                    src="../assets/images/TeenyiconsDoubleCaretRightCircleOutline.svg"
                    alt="right"
                />
            </li>
        </ul>
        <div>当前: 第 {{ currentPage }} 页 / 总页数: {{ totalPages }} 页</div>
    </div>
</template>

<script>
export default {
    name: "Pagination",
    data() {
        return {
            currentPage: 10,
            totalPages: 50,
            // isActive: 10,
        };
    },
    methods: {
        // 数字的点击事件 select(item) 跳转至所选页
        select(item) {
            // 异常处理
            // 1. 点击当前页直接跳出 (返回 undefined)
            if (item === this.currentPage) {
                return;
            }
            // 2. 点击 ... 直接跳出 (返回 undefined)
            if (typeof item === "string") {
                return;
            }
            // 更新当前页
            this.currentPage = item;
            // 更改当前页所在元素的样式
            // this.isActive = this.currentPage;
        },
        // icon 的点击事件: 向前/向后翻页
        turnToPage(number) {
            // 更新当前页
            this.currentPage += number;
            // 边界处理
            this.currentPage < 1
                ? (this.currentPage = 1)
                : this.currentPage === this.totalPages
                ? (this.currentPage = this.totalPages)
                : "";
            // 更改当前页所在元素的样式
            // this.isActive = this.currentPage;
        },
    },
    computed: {
        pages() {
            const currentPage = this.currentPage; // 当前页
            const totalPages = this.totalPages; // 总页数
            //  当前页 小于 5
            if (currentPage < 5) {
                return [1, 2, 3, 4, 5, 6, 7, 8, 9, "...", totalPages];
            } else if (currentPage > totalPages - 4) {
                // 当前页 大于 总页数 - 4 (即当前页为最后几页)
                return [
                    1,
                    "...",
                    totalPages - 9,
                    totalPages - 8,
                    totalPages - 7,
                    totalPages - 6,
                    totalPages - 5,
                    totalPages - 4,
                    totalPages - 3,
                    totalPages - 2,
                    totalPages - 1,
                    totalPages,
                ];
            } else {
                // 当前页 为中间页 (5 ~ totalPages-4)
                return [
                    1,
                    "...",
                    currentPage - 3,
                    currentPage - 2,
                    currentPage - 1,
                    currentPage,
                    currentPage + 1,
                    currentPage + 2,
                    currentPage + 3,
                    "...",
                    totalPages,
                ];
            }
        },
    },
    setup() {},
};
</script>

<style lang="scss">
.pagination {
    & ul {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    & ul li {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
        cursor: pointer;
    }
}
.pagination img {
    width: 24px;
    height: 24px;
}
.pagination .pages {
    width: 20px;
    height: 20px;
    border: 1px solid;
    border-radius: 2px;
}
.active {
    background-color: #2d8cf0;
}
</style>
