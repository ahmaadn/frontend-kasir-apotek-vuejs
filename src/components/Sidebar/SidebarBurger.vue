<script setup>
import { Icon } from '@iconify/vue'

const model = defineModel({ default: false })
</script>

<template>
   <button class="btn btn-square btn-ghost">
      <Icon :icon="model ? 'mdi:menu-close' : 'mdi:menu-open'" class="w-5 h-5" />
   </button>
</template>
