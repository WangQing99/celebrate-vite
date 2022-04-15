<script setup lang='ts'>

const msg = $ref("这是一条ref消息")

</script>

<template>
    <Header />
    Home.vue {{ msg }}
    <router-view></router-view>
</template>
