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
            component: () => import('@/views/employee/index-view.vue'),
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
         {
            path: 'update/:id',
            name: 'UpdateEmployee',
            component: () => import('@/views/employee/update-view.vue'),
            props: true,
            meta: {
               roles: ['ADM'],
               title: 'Update Pegawai',
            },
         },
      ],
   },
   {
      path: '/medicine/',
      component: DefaultLayout,
      children: [
         {
            path: '',
            name: 'Medicine',
            component: () => import('@/views/medicine/index-view.vue'),
            meta: {
               roles: ['ADM', 'WRH'],
               title: 'Daftar Obat',
            },
         },
         {
            path: 'add',
            name: 'AddMedicine',
            component: () => import('@/views/medicine/add-view.vue'),
            meta: {
               roles: ['ADM', 'WRH'],
               title: 'Tambah Obat',
            },
         },
         {
            path: 'update/:id',
            name: 'UpdateMedicine',
            component: () => import('@/views/medicine/update-view.vue'),
            props: true,
            meta: {
               roles: ['ADM', 'WRH'],
               title: 'Update Obat',
            },
         },
         {
            path: 'categories',
            name: 'MedicineCategory',
            component: () => import('@/views/category/index-view.vue'),
            meta: {
               roles: ['ADM', 'WRH'],
               title: 'Daftar Kategori Obat',
            },
         },
      ],
   },
   {
      path: '/history-medicine',
      component: DefaultLayout,
      children: [
         {
            path: '',
            name: 'HistoryMedicine',
            component: () => import('@/views/history/index-view.vue'),
            meta: {
               roles: ['ADM', 'WRH'],
               title: 'Histori Obat',
            },
         },
         {
            path: ':id',
            name: 'DetailHistoryMedicine',
            component: () => import('@/views/history/detail-view.vue'),
            meta: {
               roles: ['ADM', 'WRH'],
               title: 'Histori Obat',
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
