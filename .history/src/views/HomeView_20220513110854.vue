<template>
    <div class="container">
        <LeftAside></LeftAside>
        <Main></Main>
        <RightAside></RightAside>
    </div>
</template>

<script>
// @ is an alias to /src
import LeftAside from "@/components/LeftAside.vue";
import Main from "@/components/Main.vue";
import RightAside from "@/components/RightAside.vue";

export default {
    name: "HomeView",
    components: {
        LeftAside,
        Main,
        RightAside,
    },
};
</script>

<style scoped lang="scss">
.container {
    display: flex;
}
</style>
