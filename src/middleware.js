import router from './router'
import { useUserStore } from '@/stores/user'
import { getToken } from '@/lib/auth'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useAppStore } from '@/stores/app'

router.beforeEach(async (to, from, next) => {
   NProgress.start()
   const hasToken = getToken()

   if (hasToken) {
      if (to.name == 'login') {
         next({ name: 'home' })
         NProgress.done()
      } else {
         const userStore = useUserStore()
         const appStore = useAppStore()
         try {
            // await user.getInfo()
            appStore.generateSidebarMenu()
            next()
            NProgress.done()
         } catch (e) {
            userStore.logout()
            console.error(e)
            next({ name: 'login' })
            NProgress.done()
         }
      }
   } else {
      if (to.meta.requiresAuth) {
         next(`/login?redirect=${to.path}`)
         NProgress.done()
      } else {
         next()
         NProgress.done()
      }
   }
})
