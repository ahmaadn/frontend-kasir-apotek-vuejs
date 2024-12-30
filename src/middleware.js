import router from './router'
import { useUserStore } from '@/stores/user'
import { getToken } from '@/lib/auth'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useAppStore } from '@/stores/app'

const whiteList = ['/404']

async function handlePermission(to, next) {
   const userStore = useUserStore()
   const appStore = useAppStore()

   const { role } = await userStore.getInfo()

   if (to.meta.roles && to.meta.roles.includes(role.roleid)) {
      appStore.generateSidebarMenu()
      next()
   } else {
      next({ name: '404' })
   }
}

async function handleAuthenticatedUser(to, next) {
   if (whiteList.includes(to.path)) {
      next()
   } else if (to.name === 'Login') {
      next({ name: 'Home' })
   } else {
      try {
         await handlePermission(to, next)
      } catch (e) {
         const userStore = useUserStore()
         userStore.logout()
         console.error(e) // for debug
         next({ name: 'Login' })
      }
   }
   NProgress.done()
}

function handleUnauthenticatedUser(to, next) {
   if (to.meta.noRequiresAuth) {
      next()
   } else {
      next(`/login`)
   }
   NProgress.done()
}

router.beforeEach(async (to, from, next) => {
   NProgress.start()
   const hasToken = getToken()

   if (hasToken) {
      await handleAuthenticatedUser(to, next)
   } else {
      handleUnauthenticatedUser(to, next)
   }
})
