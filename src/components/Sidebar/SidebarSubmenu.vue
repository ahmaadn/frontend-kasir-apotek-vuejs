<script setup>
import { Icon } from '@iconify/vue'
import SidebarLink from './SidebarLink.vue'

const props = defineProps(['label', 'icon', 'submenu'])
</script>

<template>
   <details open class="sidebar-submenu w-full rounded hover:bg-base-200">
      <summary class="px-2 after:mr-2 group">
         <Icon :icon="props.icon" class="h-6 w-6 group-hover:text-primary"></Icon>
         <span class="sidebar-submenu_title whitespace-nowrap">
            {{ props.label }}
         </span>
      </summary>
      <ul class="md:transition-all md:duration-300">
         <li
            v-for="(menu, index) in props.submenu"
            v-bind:key="index"
            class="min-h-10 items-start text-base font-medium"
         >
            <SidebarSubmenu
               v-if="menu.submenu && menu.submenu.length != 0"
               :icon="menu.icon"
               :label="menu.label"
               :submenu="menu.submenu"
            >
            </SidebarSubmenu>
            <SidebarLink v-else :to="menu.url" :label="menu.label" :icon="menu.icon" />
         </li>
      </ul>
   </details>
</template>
<style scoped>
@media screen and (min-width: 768px) {
   .sidebar:not(.active) .sidebar-submenu_title {
      @apply invisible absolute left-0 w-0 opacity-0;
   }
   .sidebar:not(.active):hover .sidebar-submenu_title {
      @apply visible relative w-full opacity-100;
   }
   .sidebar:not(.active):not(:hover) .sidebar-submenu ul {
      @apply m-0 p-0;
   }
   .sidebar:not(.active):not(:hover) .sidebar-submenu ul::before {
      @apply hidden;
   }
   .sidebar:not(.active):not(:hover) .sidebar-submenu > *::after {
      @apply hidden h-0 w-0 opacity-0;
   }
}
</style>
