<template>
    <div class="left-aside">
        <p>Just Music</p>
        <div class="item home">
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
        </div>
    </div>
</template>

<script>
export default {
    name: "LeftAside",
};
</script>
<style scoped lang="scss">
.left-aside {
    width: 200px;
    margin-left: 20px;
    border-right: 1px solid;
    & p {
        // margin-left: 0;
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
        margin-right: 20px;
    }
}
.home {
    border-radius: 8px;
    background-color: #000;
    color: #fff;
}
</style>
