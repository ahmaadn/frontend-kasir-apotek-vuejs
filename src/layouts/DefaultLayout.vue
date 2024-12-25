<script setup>
import { useAppStore } from '@/stores/app'
import { useUserStore } from '@/stores/user'
import { useRouter, useRoute } from 'vue-router'
import { SidebarMain, SidebarBurger } from '@/components/Sidebar'

const appStore = useAppStore()
const userStote = useUserStore()
const router = useRouter()
const route = useRoute()

const logout = async () => {
   userStote.logout()
   await router.push({ name: 'Login', query: { redirect: route.fullPath } })
}
</script>

<template>
   <main>
      <SidebarMain />
      <div
         class="transition-all duration-300"
         :class="{
            'md:pl-[72px]': appStore.isSidebarCollapes,
            'md:pl-72': !appStore.isSidebarCollapes,
         }"
      >
         <nav class="w-full border-b bg-white">
            <div class="px-2">
               <div class="navbar min-h-[56px] gap-x-4">
                  <div class="navbar-start gap-2">
                     <SidebarBurger
                        class="h-9 min-h-9 w-9 min-w-9 md:hidden"
                        @click="appStore.sidebarToogle()"
                        v-model="appStore.isSidebarCollapes"
                     />
                     <router-link :to="route" class="md:text-2xl font-bold text-lg text-nowrap">{{
                        route.meta.headerTitle || router.name
                     }}</router-link>
                  </div>
                  <div class="navbar-end">
                     <button class="btn btn-ghost btn-sm" @click="logout">Logout</button>
                  </div>
               </div>
            </div>
         </nav>
         <div class="p-2 md:p-6 w-full flex h-full">
            <div class="flex-none w-full">
               <router-view></router-view>
            </div>
         </div>
      </div>
   </main>
</template>
