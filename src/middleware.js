import router from './router'
import { useUserStore } from './stores/user'
import { getToken } from './lib/auth'

router.beforeEach(async (to, from, next) => {
   const hasToken = getToken()

   if (hasToken) {
      if (to.name == 'login') {
         next({ name: 'home' })
      } else {
         const user = useUserStore()
         try {
            // await user.getInfo()
            next()
         } catch (e) {
            user.logout()
            console.error(e)
            next({ name: 'login' })
         }
      }
   } else {
      if (to.meta.requiresAuth) {
         next(`/login?redirect=${to.path}`)
      } else {
         next()
      }
   }
})
