<script setup>
const props = defineProps(['to', 'icon', 'label'])
import { Icon } from '@iconify/vue'
</script>

<template>
   <router-link :to="props.to" class="w-full text-nowrap px-2 group">
      <Icon :icon="props.icon" class="h-6 w-6 group-hover:text-primary" />
      <span class="sidebar-link whitespace-nowrap">
         {{ props.label }}
      </span>
   </router-link>
</template>
<style scoped>
@media screen and (min-width: 768px) {
   .sidebar:not(.active) .sidebar-link {
      @apply invisible absolute left-0 w-0 opacity-0;
   }
   .sidebar:not(.active):hover .sidebar-link {
      @apply visible relative w-full opacity-100;
   }
}
</style>
