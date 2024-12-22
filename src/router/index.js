import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const routers = [
   {
      path: '/',
      name: 'Home',
      component: () => import('../views/HomeView.vue'),
      meta: {
         roles: ['ADM', 'CSR', 'WRH'],
         layout: DefaultLayout,
         requiresAuth: true,
      },
   },
   {
      path: '/login',
      name: 'Login',
      component: () => import('../views/LoginView.vue'),
      meta: {
         layout: false,
         requiresAuth: false,
      },
   },
   {
      path: '/employee',
      name: 'Daftar Pegawai',
      component: () => import('../views/EmployeeView.vue'),
      meta: {
         roles: ['ADM'],
         layout: DefaultLayout,
         requiresAuth: true,
      },
   },
]

const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes: routers,
})

export default router
