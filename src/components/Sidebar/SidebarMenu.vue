<script setup>
import { Icon } from '@iconify/vue'
import SidebarItem from './SidebarItem.vue'
import SidebarTooltip from './SidebarTooltip.vue'

const props = defineProps({
   label: String,
   icon: String,
   submenu: Array,
})
</script>

<template>
   <details
      open
      class="sidebar-menu w-full rounded hover:bg-base-300 hover:text-base-content/60 group"
   >
      <summary
         class="px-2 after:mr-2 sidebar-tooltip group-hover:active:bg-base-300 group-hover:active:text-base-content group-hover:text-base-content"
      >
         <Icon :icon="props.icon" class="h-6 w-6"></Icon>
         <span class="sidebar-menu_title whitespace-nowrap">{{ props.label }}</span>
         <SidebarTooltip class="left-14" :label="props.label" />
      </summary>
      <ul class="before:border-base-100 before:border-[1px] group-hover:before:border-neutral">
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
            <SidebarItem
               v-else
               :to="menu.url"
               :label="menu.label"
               :icon="menu.icon"
               class="hover:bg-base-300 hover:text-base-content focus:text-base-content focus:bg-base-300 active:text-white"
            />
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
