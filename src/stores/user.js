import { jwtDecode } from 'jwt-decode'
import { defineStore } from 'pinia'
import { detailUser, loginWithJWT } from '@/lib/api/user'
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
      isAdmin: (state) => state.role === 'ADM',
      isCashier: (state) => state.role === 'CSR',
      isWarehouse: (state) => state.role === 'WRH',
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
      getInfo() {
         const { userid, fullname, roleid, exp } = jwtDecode(this.token)
         const today = new Date().getTime()

         if (today > exp * 1000) {
            this.logout()
            throw new Error("Token's expired")
         }

         this.userId = userid
         this.role = roleid
         this.fullname = fullname
      },
      fetchInfo() {
         return new Promise((resolve, reject) => {
            detailUser(this.userId)
               .then((res) => {
                  const { data } = res.data
                  if (!data) {
                     reject('Verification failed, please Login again.')
                  }
                  const { userid, fullname, role } = data

                  this.userId = userid
                  this.fullname = fullname
                  this.role = role.roleid
                  resolve(data)
               })
               .catch((error) => {
                  reject(error)
               })
         })
      },
   },
})
