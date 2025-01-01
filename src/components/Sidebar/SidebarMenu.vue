<script setup>
import { Icon } from '@iconify/vue'
import SidebarItem from './SidebarItem.vue'

const props = defineProps({
   label: String,
   icon: String,
   submenu: Array,
})
</script>

<template>
   <details
      open
      class="sidebar-menu w-full rounded hover:bg-base-200 active:bg-neutral active:text-neutral-content"
   >
      <summary class="px-2 after:mr-2">
         <Icon :icon="props.icon" class="h-6 w-6"></Icon>
         <span class="sidebar-menu_title whitespace-nowrap">{{ props.label }}</span>
      </summary>
      <ul class="md:transition-all md:duration-300">
         <li
            v-for="(menu, index) in props.submenu"
            :key="index"
            class="min-h-10 items-start text-base font-medium"
         >
            <SidebarMenu
               v-if="menu.submenu && menu.submenu.length"
               :icon="menu.icon"
               :label="menu.label"
               :submenu="menu.submenu"
            />
            <SidebarItem v-else :to="menu.url" :label="menu.label" :icon="menu.icon" />
         </li>
      </ul>
   </details>
</template>

<style scoped>
@media screen and (min-width: 768px) {
   .sidebar.hoverable:not(.active):hover .sidebar-menu_title {
      @apply block;
   }
   .sidebar:not(.hoverable):not(.active) .sidebar-menu ul,
   .sidebar.hoverable:not(.active):not(:hover) .sidebar-menu ul {
      @apply m-0 p-0;
   }
   .sidebar:not(.active) .sidebar-menu_title,
   .sidebar:not(.hoverable):not(.active) .sidebar-menu ul::before,
   .sidebar:not(.hoverable):not(.active) .sidebar-menu > *::after,
   .sidebar.hoverable:not(.active):not(:hover) .sidebar-menu ul::before,
   .sidebar.hoverable:not(.active):not(:hover) .sidebar-menu > *::after {
      @apply hidden;
   }
}
</style>
