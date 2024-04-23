import { createRouter, createWebHashHistory } from 'vue-router'
import { useRoutesStore, useUserStore } from '@/store/index.js'
import Layout from '@/layout/index.vue'
import Login from '@/views/login/index.vue'
import error from '@/views/404.vue'
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: '首页',
      component: Layout,
      children: []
    },
    {
      path: '/login',
      name: '登录',
      component: Login
    },
    {
      path: '/404',
      name: '404',
      component: error
    }
  ]
})

export default router
