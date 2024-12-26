<script setup>
import { Icon } from '@iconify/vue'
import { useRoute } from 'vue-router'

const props = defineProps({
   to: String,
   icon: String,
   label: String,
})

const route = useRoute()
</script>

<template>
   <router-link
      :to="props.to"
      class="w-full text-nowrap px-2 group"
      :class="{
         'relative before:bg-primary before:absolute before:left-0 before:h-full before:w-1 before:rounded':
            route.fullPath == props.to,
      }"
   >
      <Icon :icon="props.icon" class="h-6 w-6" />
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
