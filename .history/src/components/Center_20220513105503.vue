<template>
    <div class="container">
        <div class="head">
            <img src="../assets/images/IcRoundArrowBackIos.svg" alt="" />
            <img src="../assets/images/IcRoundArrowForwardIos.svg" alt="" />
            <input type="text" />
        </div>
        <div class="slideshow">
            <img src="../assets/images/Ono-Lisa-best-2002-2006.jpg" alt="" />
        </div>
        <div class="popular-song">
            <p class="left">Popular</p>
            <p class="right">See All</p>
        </div>
        <div class="grid">
            <p class="row1-left left">Popular</p>
            <p class="row1-right right">See All</p>
            <p class="left">#</p>
            <p>Title</p>
            <p>PLAYING</p>
            <p>TIME</p>
            <P class="right">ALBUM</P>
            <p class="left">#</p>
            <p>Title</p>
            <p>PLAYING</p>
            <p>TIME</p>
            <P class="right">ALBUM</P>
            <p class="left">#</p>
            <p>Title</p>
            <p>PLAYING</p>
            <p>TIME</p>
            <P class="right">ALBUM</P>
        </div>
    </div>
</template>

<script>
export default {
    name: "Center",
};
</script>
<style scoped lang="scss">
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    & .slideshow {
        width: 300px;
        height: 300px;
        margin: 50px;
    }
    & .popular-song {
        display: flex;
        width: 100%;
        justify-content: space-between;
        & .left {
            margin-left: 20px;
        }
        & .right {
            margin-right: 25px;
        }
    }
    & .grid {
        display: grid;
        justify-items: center;
        width: 650px;
        grid-template-columns: 1fr 5fr 3fr 2fr 2fr;
        margin-left: 20px;
        margin-right: 20px;
        grid-template-areas:
            "row1-left row1-left row1-left row1-left row1-right"
            "row2-column1 row2-column2 row2-column3 row2-column4 row2-column5"
            "row3-column1 row3-column2 row3-column3 row3-column4 row3-column5"
            "row4-column1 row4-column2 row4-column3 row4-column4 row4-column5";
        & .row1-left {
            grid-area: row1-left;
            // justify-self: start;
        }
        & .row1-right {
            grid-area: row1-right;
            // justify-self: end;
        }
        & .left {
            justify-self: start;
        }
        & .right {
            justify-self: end;
        }
    }
}
.head {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    & img {
        width: 24px;
        height: 24px;
        &:first-child {
            margin: 0 30px;
        }
    }
    & input {
        width: 300px;
        height: 30px;
        margin-left: 50px;
        border-radius: 16px;
    }
}
</style>
