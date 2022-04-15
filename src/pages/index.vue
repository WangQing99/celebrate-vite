<script setup lang='ts'>
import axios from "axios";
axios({
    method: "post",
    url: "/api/login",
    data: {
        username: "wq",
        password: "123456"
    }
}).then(res => {
    console.log(res.data);
})
</script>

<template>
    Home.vue
    <div>
        <i-carbon-direction-straight-right-filled></i-carbon-direction-straight-right-filled>
    </div>
    <div flex>
        <div i-carbon:accessibility-color-filled></div>
        <div i-carbon:arrival></div>
    </div>
    <a-button type="primary"> Primary Button</a-button>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
