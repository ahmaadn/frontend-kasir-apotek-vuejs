<script setup>
import SidebarItem from './SidebarItem.vue'
import SidebarMenu from './SidebarMenu.vue'
import SidebarHeader from './SidebarHeader.vue'
import { useAppStore } from '@/stores/app'

defineProps({
   hoverable: {
      type: Boolean,
      default: false,
   },
})

const appStore = useAppStore()
</script>

<template>
   <aside
      class="sidebar max-md:w-72"
      :class="{
         'w-[72px]': appStore.isSidebarCollapes,
         'w-72 active': !appStore.isSidebarCollapes,
         hoverable: hoverable,
      }"
      :aria-expanded="!appStore.isSidebarCollapes"
   >
      <div class="relative z-[1] h-full border-r bg-neutral text-neutral-content">
         <SidebarHeader class="hover:text-base-100" />
         <div class="h-full overflow-auto p-2">
            <ul class="menu space-y-4">
               <li
                  v-for="(link, index) in appStore.getSidebarMenu"
                  v-bind:key="index"
                  class="min-h-10 items-start text-base font-medium"
               >
                  <SidebarMenu
                     v-if="link.submenu && link.submenu.length != 0"
                     :icon="link.icon"
                     :label="link.label"
                     :submenu="link.submenu"
                  />
                  <SidebarItem
                     v-if="link.url && !link.submenu"
                     :to="link.url"
                     :label="link.label"
                     :icon="link.icon"
                     class="hover:text-white focus:text-white active:text-white"
                  />
               </li>
            </ul>
         </div>
      </div>
      <label
         v-if="!appStore.isSidebarCollapes"
         class="fixed inset-0 h-screen min-h-screen w-screen md:hidden"
         @click="appStore.closeSidebarMobile()"
      ></label>
   </aside>
</template>
<style scoped>
.sidebar {
   @apply fixed inset-y-0 left-0 min-h-screen duration-300;
}

@media screen and (max-width: 768px) {
   .sidebar:not(.active) {
      @apply invisible -translate-x-full opacity-0;
   }

   .sidebar.active {
      @apply translate-x-0;
   }
}

@media screen and (min-width: 768px) {
   .sidebar.hoverable:not(.active):hover {
      @apply w-72;
   }
}
</style>
