import { createRouter, createWebHistory } from 'vue-router'
import Notfound from '@/views/404.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component:()=>import('@/views/home.vue')
    },
    //重定向
    {
      path:'/:pathMatch(.*)*',
      component:Notfound
    }

  ]
})

export default router
