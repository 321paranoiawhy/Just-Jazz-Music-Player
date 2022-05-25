<template>
    <div class="container">
        <LeftAside></LeftAside>
        <abc></abc>
        <RightAside></RightAside>
    </div>
</template>

<script>
// @ is an alias to /src
import LeftAside from "@/components/LeftAside.vue";
import abc from "@/components/Music.vue";
import RightAside from "@/components/RightAside.vue";

export default {
    name: "HomeView",
    components: {
        LeftAside,
        abc,
        RightAside,
    },
};
</script>

<style scoped lang="scss">
.container {
    display: flex;
}
</style>
