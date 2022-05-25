<template>
    <div class="container">
        <LeftAside></LeftAside>
        <Center></Center>
        <!-- <RightSide></RightSide> -->
    </div>
</template>

<script>
// @ is an alias to /src
import LeftAside from "@/components/LeftAside.vue";
import Center from "@/components/Center.vue";
import RightSide from "@/components/RightSide.vue";

export default {
    name: "HomeView",
    components: {
        LeftAside,
        Center,
        RightSide,
    },
};
</script>

<style scoped lang="scss">
.container {
    display: grid;
}
</style>
