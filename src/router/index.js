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
         headerTitle: 'Home',
      },
   },
   {
      path: '/login',
      name: 'Login',
      component: () => import('../views/LoginView.vue'),
      meta: {
         layout: false,
         noRequiresAuth: true,
      },
   },
   {
      path: '/404',
      name: '404',
      component: () => import('../views/404View.vue'),
      meta: {
         layout: false,
         noRequiresAuth: true,
      },
   },
   {
      path: '/employee',
      name: 'Employee',
      component: () => import('../views/EmployeeView.vue'),
      meta: {
         roles: ['ADM'],
         layout: DefaultLayout,
         headerTitle: 'Daftar Pegawai',
      },
   },
]

const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes: routers,
})

export default router
