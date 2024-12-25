import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const routers = [
   {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login-view.vue'),
      meta: {
         noRequiresAuth: true,
      },
   },
   {
      path: '/404',
      name: '404',
      component: () => import('@/views/404-view.vue'),
      meta: {
         noRequiresAuth: true,
      },
   },
   {
      path: '/',
      component: DefaultLayout,
      redirect: '/dashboard',
      children: [
         {
            path: 'dashboard',
            name: 'Home',
            component: () => import('@/views/home-view.vue'),
            meta: {
               roles: ['ADM', 'CSR', 'WRH'],
               layout: DefaultLayout,
               title: 'Home',
            },
         },
      ],
   },
   {
      path: '/employee/',
      component: DefaultLayout,
      meta: {
         title: 'Pegawai',
      },
      children: [
         {
            path: '',
            name: 'Employee',
            component: () => import('@/views/employee/employee-view.vue'),
            meta: {
               roles: ['ADM'],
               title: 'Daftar Pegawai',
            },
         },
         {
            path: 'add',
            name: 'AddEmployee',
            component: () => import('@/views/employee/add-view.vue'),
            meta: {
               roles: ['ADM'],
               title: 'Tambah Pegawai',
            },
         },
      ],
   },
]

const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes: routers,
})

export default router
