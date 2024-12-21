<script setup>
import { Toaster } from 'vue-sonner'
</script>

<template>
   <Toaster position="top-right" richColors closeButton :expand="true" />
   <component :is="$route.meta.layout || 'main'">
      <router-view></router-view>
   </component>
</template>
<style>
:root {
   @apply bg-base-200;
}
</style>
