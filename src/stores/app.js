import { defineStore } from 'pinia'
import Cookies from 'js-cookie'

export const useAppStore = defineStore('appStore', {
   state: () => ({
      sidebarCollapes: !!Cookies.get('sidebarStatus') || true,
   }),
   getters: {
      isSidebarCollapes: (state) => state.sidebarCollapes,
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
   },
   persist: true,
})
