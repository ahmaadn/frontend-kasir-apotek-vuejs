import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const routers = [
   {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: {
         layout: DefaultLayout,
         requiresAuth: true,
      },
   },
   {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: {
         layout: false,
         requiresAuth: false,
      },
   },
]

const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes: routers,
})

export default router
