<script setup>
import { useAppStore } from '@/stores/app'
import { useUserStore } from '@/stores/user'
import { useRouter, useRoute } from 'vue-router'
import { SidebarMenu } from '@/components/sidebar'

const appStore = useAppStore()
const userStote = useUserStore()
const router = useRouter()
const route = useRoute()

const logout = async () => {
   userStote.logout()
   await router.push({ name: 'login', query: { redirect: route.fullPath } })
}
</script>

<template>
   <main>
      <SidebarMenu></SidebarMenu>
      <div
         class="transition-all duration-300"
         :class="{
            'md:pl-[72px]': appStore.isSidebarCollapes,
            'md:pl-72': !appStore.isSidebarCollapes,
         }"
      >
         <nav class="w-full border-b border-gray-100 bg-white shadow-sm">
            <div class="px-2">
               <div class="navbar min-h-[56px] gap-x-4">
                  <div class="navbar-start gap-2">
                     <SidebarBurger
                        class="h-9 min-h-9 w-9 min-w-9 md:hidden"
                        @click="appStore.sidebarToogle()"
                        v-model="appStore.isSidebarCollapes"
                     ></SidebarBurger>
                     <nuxt-link to="/" class="text-2xl font-bold">Kasir</nuxt-link>
                  </div>
                  <div class="navbar-end">
                     <button class="btn btn-ghost btn-sm" @click="logout">Logout</button>
                  </div>
               </div>
            </div>
         </nav>
         <router-view></router-view>
      </div>
   </main>
</template>
