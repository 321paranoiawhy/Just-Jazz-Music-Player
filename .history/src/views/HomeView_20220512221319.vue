<template>
    <LeftAside></LeftAside>
    <Center></Center>
</template>

<script>
// @ is an alias to /src
import LeftAside from "@/components/LeftAside.vue";
import Center from "@/components/Center.vue";

export default {
    name: "HomeView",
    components: {
        LeftAside,
        Center,
    },
};
</script>
