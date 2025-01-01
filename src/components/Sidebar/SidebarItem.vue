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
      class="w-full text-nowrap px-2 group sidebar-item"
      :class="{
         'relative before:bg-primary before:absolute before:left-0 before:inset-y-0 before:my-0.5 before:w-1 before:rounded-md':
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
   .sidebar:not(.active) .sidebar-item span {
      @apply hidden;
   }
   .sidebar.hoverable:not(.active):hover .sidebar-item span {
      @apply block;
   }
}
</style>
