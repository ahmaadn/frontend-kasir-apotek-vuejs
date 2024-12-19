import router from './router'
import { useUserStore } from './stores/user'
import { getToken } from './lib/auth'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

router.beforeEach(async (to, from, next) => {
   NProgress.start()
   const hasToken = getToken()

   if (hasToken) {
      if (to.name == 'login') {
         next({ name: 'home' })
         NProgress.done()
      } else {
         const user = useUserStore()
         try {
            // await user.getInfo()
            next()
            NProgress.done()
         } catch (e) {
            user.logout()
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
