<script setup>
import { Icon } from '@iconify/vue'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
</script>

<template>
   <button class="btn btn-square btn-ghost" @click="appStore.sidebarToogle()">
      <Icon
         :icon="appStore.isSidebarCollapes ? 'mdi:menu-close' : 'mdi:menu-open'"
         class="w-5 h-5"
      />
   </button>
</template>
