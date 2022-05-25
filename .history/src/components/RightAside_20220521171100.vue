<template>
    <div class="right-aside">
        <div class="flex-column user-information">
            <img src="../assets/images/IcRoundAccountCircle.svg" alt="" />
            <div>
                <h3>User</h3>
                <p>Premium Member</p>
            </div>
            <img src="../assets/images/IcRoundNotificationsNone.svg" alt="" />

            <!-- <h3>User</h3>
            <p>Premium Member</p> -->
        </div>
        <div class="flex-column recent-played">
            <p>Recent Played</p>
            <p>See All</p>
        </div>
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
    width: 200px;
    & .flex-column {
        display: flex;
        align-items: center;
    }
    & .recent-played {
        &:first-child {
            width: 100px;
            text-align: left;
        }
        &:last-child {
            width: 100px;
            text-align: right;
        }
    }
}
img {
    width: 32px;
    height: 32px;
}
</style>
