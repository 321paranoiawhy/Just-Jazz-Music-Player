<template>
    <div class="right-aside">
        <div class="inner-grid">
            <img src="../assets/images/IcRoundAccountCircle.svg" alt="" />
            <div>
                <h3>User</h3>
                <p>Premium Member</p>
            </div>
            <img src="../assets/images/IcRoundNotificationsNone.svg" alt="" />
            <h3>Recent Played</h3>
            <div></div>
            <p>See All</p>
        </div>
        <!-- <div class="flex-column recent-played">
            <p>Recent Played</p>
            <p>See All</p>
        </div> -->
    </div>
</template>

<script>
export default {
    name: "RightAside",
};
</script>
<style scoped lang="scss">
.right-aside {
    display: flex;
    flex-direction: column;
}
.inner-grid {
    display: grid;
    justify-content: center;
    align-items: center;
    grid-template-columns: auto minmax(100px, 1fr) auto;
    grid-template-rows: auto;
}
// .right-aside {
//     display: flex;
//     flex-direction: column;
//     width: 300px;
//     & .flex-column {
//         display: flex;
//         // justify-content: center;
//         align-items: center;
//         width: 100%;
//     }
//     & .recent-played {
//         & :first-child {
//             width: 50%;
//             text-align: left;
//         }
//         & :last-child {
//             width: 50%;
//             text-align: right;
//         }
//     }
// }
img {
    width: 32px;
    height: 32px;
}
</style>
