<template>
    <div class="container">
        <LeftAside></LeftAside>
        <center-main></center-main>
        <RightAside></RightAside>
    </div>
</template>

<script>
// @ is an alias to /src
import LeftAside from "@/components/LeftAside.vue";
import CenterMain from "@/components/CenterMain.vue";
import RightAside from "@/components/RightAside.vue";

export default {
    name: "HomeView",
    components: {
        LeftAside,
        CenterMain,
        RightAside,
    },
};
</script>

<style scoped lang="scss">
.container {
    display: flex;
}
</style>
