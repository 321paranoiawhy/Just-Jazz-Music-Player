<template>
    <div class="container">
        <LeftAside></LeftAside>
        <Content></Content>
        <RightAside></RightAside>
    </div>
</template>

<script>
// @ is an alias to /src
import LeftAside from "@/components/LeftAside.vue";
import Content from "@/components/Content.vue";
import RightAside from "@/components/RightAside.vue";

export default {
    name: "HomeView",
    components: {
        LeftAside,
        Content,
        RightAside,
    },
};
</script>

<style scoped lang="scss">
.container {
    display: flex;
}
</style>
