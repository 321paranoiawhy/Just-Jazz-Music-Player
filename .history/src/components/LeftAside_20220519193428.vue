<template>
    <div class="left-aside">
        <p>Just Music</p>
        <div v-for="(item, index) in pictureData" :key="index">
            <img src="" alt="" />
        </div>
        <!-- <div class="item home">
            <img src="../assets/images/TeenyiconsHomeOutline.svg" alt="" />
            <p>Home</p>
        </div>
        <div class="item">
            <img src="../assets/images/TeenyiconsTrendUpSolid.svg" alt="" />
            <p>Trends</p>
        </div>
        <div class="item">
            <img src="../assets/images/PhMusicNotesSimple.svg" alt="" />
            <p>Library</p>
        </div>
        <p>Discover</p>
        <div class="item">
            <img src="../assets/images/IcOutlineNextWeek.svg" alt="" />
            <p>Discover Weekly</p>
        </div>
        <div class="item">
            <img src="../assets/images/PhMusicNotesSimple.svg" alt="" />
            <p>Made For You</p>
        </div>
        <div class="item">
            <img src="../assets/images/PhMusicNotesSimple.svg" alt="" />
            <p>Daily Mix</p>
        </div>
        <p>Your Collection</p>
        <div class="item">
            <img src="../assets/images/PhMusicNotesSimple.svg" alt="" />
            <p>Liked Songs</p>
        </div>
        <div class="item">
            <img src="../assets/images/PhMusicNotesSimple.svg" alt="" />
            <p>Favorite Artists</p>
        </div>
        <div class="item">
            <img src="../assets/images/IcRoundQueueMusic.svg" alt="" />
            <p>Playlist</p>
        </div> -->
    </div>
</template>

<script>
import pictureData from "/public/data/pictureData.json";
export default {
    name: "LeftAside",
    data() {
        return {
            pictureData,
        };
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
.home {
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
