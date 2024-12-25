<script setup>
import { Toaster } from 'vue-sonner'
</script>

<template>
   <Toaster position="top-right" richColors closeButton :expand="true" />
   <router-view></router-view>
</template>
<style>
:root {
   @apply bg-base-200;
}
</style>
