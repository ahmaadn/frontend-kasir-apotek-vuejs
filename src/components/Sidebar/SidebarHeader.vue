<script setup>
import SidebarTooltip from './SidebarTooltip.vue'
import { Icon } from '@iconify/vue'
</script>

<template>
   <div
      class="sidebar-header min-h-10 font-medium flex flex-shrink-0 w-full text-2xl text-start p-2"
   >
      <router-link
         :to="{ name: 'Home' }"
         class="flex flex-row gap-x-2 items-center p-2 sidebar-tooltip"
      >
         <Icon icon="mdi:cart" class="h-10 w-10 min-h-10 min-w-10" />
         <h1 class="whitespace-nowrap">Kasir</h1>
         <SidebarTooltip label="Home" class="left-14" />
      </router-link>
   </div>
</template>
<style scoped>
@media screen and (min-width: 768px) {
   .sidebar:not(.active) .sidebar-header h1 {
      @apply hidden;
   }

   .sidebar.hoverable:not(.active):hover .sidebar-header h1 {
      @apply block;
   }
}
</style>
