import { createRouter, createWebHistory } from 'vue-router'

import { initBackendRoute } from './routes/backend'
import { initBackendGuard } from './guard/backend'

const routes = [
    {
        path: '/',
        redirect: '/index',
    },
	{
        path: '/index',
        component: () => import('@/views/index.vue')
    },
]

// 动态构建后台路由
initBackendRoute(routes)

// 创建路由
const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 路由守卫
// 后台
initBackendGuard(router)

export default router
