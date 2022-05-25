<template>
    <div class="container">
        <LeftAside></LeftAside>
        <Music></Music>
        <RightAside></RightAside>
    </div>
</template>

<script>
// @ is an alias to /src
import LeftAside from "@/components/LeftAside.vue";
import Music from "@/components/Music.vue";
import RightAside from "@/components/RightAside.vue";

export default {
    name: "HomeView",
    components: {
        LeftAside,
        Music,
        RightAside,
    },
};
</script>

<style scoped lang="scss">
.container {
    display: flex;
}
</style>
