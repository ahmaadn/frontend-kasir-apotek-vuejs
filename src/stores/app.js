import { defineStore } from 'pinia'
import Cookies from 'js-cookie'
import { useUserStore } from './user'
import sidebarItems from '@/components/sidebar/SidebarItems.json'

export const useAppStore = defineStore('appStore', {
   state: () => ({
      sidebarCollapes: !!Cookies.get('sidebarStatus') || true,
      sidebarMenu: [],
   }),
   getters: {
      isSidebarCollapes: (state) => state.sidebarCollapes,
      getSidebarMenu: (state) => state.sidebarMenu,
   },
   actions: {
      sidebarToogle() {
         this.sidebarCollapes = !this.sidebarCollapes
         Cookies.set('sidebarStatus', String(this.sidebarCollapes))
      },
      closeSidebarMobile() {
         this.sidebarCollapes = true
         Cookies.set('sidebarStatus', '1')
      },
      generateSidebarMenu() {
         const userStore = useUserStore()
         const userRoles = userStore.getRole

         const filterMenu = (items, parentUrl = '', parentRoles = []) => {
            return items
               .filter((item) =>
                  (item.roles || parentRoles).some((role) => userRoles.includes(role)),
               )
               .map((item) => {
                  const newItem = { ...item }
                  newItem.url = parentUrl + newItem.url
                  const roles = item.roles || parentRoles
                  if (newItem.submenu) {
                     newItem.submenu = filterMenu(newItem.submenu, newItem.url, roles)
                  }
                  return newItem
               })
         }

         this.sidebarMenu = filterMenu(sidebarItems)
      },
      removeSidebarMenu() {
         this.sidebarMenu = []
      },
   },
   persist: true,
})
