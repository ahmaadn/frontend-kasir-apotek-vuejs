<script setup>
import { useAppStore } from '@/stores/app'
import { Icon } from '@iconify/vue'
import SidebarBurger from './SidebarBurger.vue'
import SidebarLink from './SidebarLink.vue'
import SidebarSubmenu from './SidebarSubmenu.vue'

const appStore = useAppStore()
</script>

<template>
   <aside
      class="sidebar z-20 max-md:w-72"
      :class="{
         'w-[72px]': appStore.isSidebarCollapes,
         'w-72 active': !appStore.isSidebarCollapes,
      }"
      :aria-expanded="!appStore.isSidebarCollapes"
   >
      <div class="relative z-20 h-full border-r bg-base-100 p-2">
         <div class="mb-2 flex h-14 min-h-14 w-full flex-nowrap items-center justify-center">
            <router-link
               to="/"
               class="sidebar-title flex flex-1 items-center overflow-hidden p-2 text-2xl font-bold leading-4"
            >
               <Icon icon="mdi:cart" size="2rem" class="w-8 overflow-hidden rounded-sm" />
               <h1 class="pl-2 text-2xl font-bold">Kasir</h1>
            </router-link>
            <SidebarBurger
               class="relative h-10 min-h-10 w-10 min-w-10 flex-none"
               @click="appStore.sidebarToogle()"
               v-model="appStore.isSidebarCollapes"
            ></SidebarBurger>
         </div>
         <div class="h-full">
            <ul class="sidebar-menu menu">
               <li
                  v-for="(link, index) in appStore.getSidebarMenu"
                  v-bind:key="index"
                  class="min-h-10 items-start text-base font-medium"
               >
                  <SidebarSubmenu
                     v-if="link.submenu && link.submenu.length != 0"
                     :icon="link.icon"
                     :label="link.label"
                     :submenu="link.submenu"
                  >
                  </SidebarSubmenu>
                  <SidebarLink
                     v-if="link.url && !link.submenu"
                     :to="link.url"
                     :label="link.label"
                     :icon="link.icon"
                  >
                  </SidebarLink>
               </li>
            </ul>
         </div>
      </div>
      <label
         class="fixed inset-0 z-10 h-screen min-h-screen w-screen md:hidden"
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
   .sidebar:not(.active):hover {
      @apply w-72;
   }

   .sidebar:not(.active) .sidebar-title {
      @apply invisible absolute w-0 opacity-0;
   }

   .sidebar:not(.active):hover .sidebar-title {
      @apply visible relative w-full opacity-100;
   }
}
</style>
