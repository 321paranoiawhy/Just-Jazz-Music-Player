<template>
    <div class="right-aside">
        <div class="user-information">
            <img src="../assets/images/IcRoundAccountCircle.svg" alt="" />
            <h3>User</h3>
            <p>Premium Member</p>
        </div>
        <div class="user-information">
            <img src="../assets/images/IcRoundAccountCircle.svg" alt="" />
            <h3>User</h3>
            <p>Premium Member</p>
        </div>
        <img src="../assets/images/IcRoundNotificationsNone.svg" alt="" />
        <div class="recent-played">
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
    // & .user-information {
    //     display: flex;
    // }
}
img {
    width: 32px;
    height: 32px;
}
</style>
