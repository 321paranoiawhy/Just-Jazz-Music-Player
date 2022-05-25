<template>
    <div class="right-aside">
        <img src="../assets/images/IcRoundAccountCircle.svg" alt="" />
        <h3>User</h3>
        <p>Premium Member</p>
        <img src="../assets/images/IcRoundNotificationsNone.svg" alt="" />
        <div class="recent-played">
            <p>Recent Played</p>
            <p>See all</p>
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
}
img {
    width: 32px;
    height: 32px;
}
</style>
