<script setup lang='ts'>
import { useUserStoreWithOut } from '@/store/modules/test';

const userStore = useUserStoreWithOut();

const getUserData = async () => {
  await userStore.getUserInfo()
  console.log(userStore.userInfo);
}

getUserData()
</script>

<template>
  Test.vue
  这是stroe的值
</template>

<route lang="yaml">
meta:
  layout: home
</route>
