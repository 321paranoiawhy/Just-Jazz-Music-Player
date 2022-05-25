<template>
    <LeftAside></LeftAside>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import LeftAside from "@/components/LeftAside.vue";

export default {
    name: "HomeView",
    components: {
        HelloWorld,
    },
};
</script>
