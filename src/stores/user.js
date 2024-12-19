import { jwtDecode } from 'jwt-decode'
import { defineStore } from 'pinia'
import { loginWithJWT } from '@/lib/api/user'
import { getToken, removeToken, setToken } from '@/lib/auth'
import { useAppStore } from './app'

export const useUserStore = defineStore('userStore', {
   state: () => ({
      token: getToken(),
      userId: '',
      role: '',
      fullname: '',
   }),
   getters: {
      getToken: (state) => state.token,
      getUserId: (state) => state.userId,
      getRole: (state) => state.role,
      getFullname: (state) => state.fullname,
   },
   actions: {
      login(data) {
         return new Promise((resolve, reject) => {
            loginWithJWT(data, {
               headers: {
                  'Content-Type': 'application/json',
               },
            })
               .then((res) => {
                  const { token } = res.data
                  const { userid, fullname, roleid } = jwtDecode(token)

                  setToken(token)

                  this.token = token
                  this.userId = userid
                  this.role = roleid
                  this.fullname = fullname

                  resolve(res)
               })
               .catch((error) => reject(error))
         })
      },
      logout() {
         const appState = useAppStore()
         appState.removeSidebarMenu()
         removeToken()
         this.token = ''
         this.userId = ''
         this.role = ''
         this.fullname = ''
      },
   },
   persist: true,
})
