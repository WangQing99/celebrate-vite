<script setup lang='ts'>
import { AppProvider } from '@/components/Application';
</script>

<template>
    <AppProvider>
        <router-view />
    </AppProvider>
</template>
