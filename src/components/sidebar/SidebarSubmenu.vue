<script setup>
import { Icon } from '@iconify/vue'
import SidebarLink from './SidebarLink.vue'

const props = defineProps(['icon', 'label', 'submenu'])
</script>

<template>
   <details open class="sidebar-submenu w-full rounded hover:bg-base-300">
      <summary class="px-2 after:mr-2">
         <Icon :icon="props.icon" class="h-6 w-6"></Icon>
         <span class="sidebar-submenu_title">
            {{ props.label }}
         </span>
      </summary>
      <ul>
         <li
            v-for="(menu, index) in props.submenu"
            v-bind:key="index"
            class="min-h-10 items-start text-base font-medium"
         >
            <SidebarSubmenu
               v-if="menu.submenu"
               :icon="menu.icon"
               :label="menu.label"
               :submenu="menu.submenu"
            >
            </SidebarSubmenu>
            <SidebarLink v-else>
               <template v-if="menu.icon" v-slot:icon>
                  <Icon :icon="menu.icon" class="h-6 w-6"></Icon>
               </template>
               <template v-slot:label>
                  {{ menu.label }}
               </template>
            </SidebarLink>
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
      @apply invisible absolute scale-0 opacity-0;
   }
   .sidebar:not(.active):not(:hover) .sidebar-submenu > *::after {
      @apply hidden h-0 w-0 opacity-0;
   }
}
</style>
