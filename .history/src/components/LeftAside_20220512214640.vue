<template>
    <div class="left-aside">
        <div class="item">
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
    & p {
        float: left;
    }
}
.item {
    display: flex;
    justify-content: center;
    align-items: center;
    & img {
        width: 24px;
        height: 24px;
        margin-right: 20px;
    }
}
</style>
