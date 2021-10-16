import { createRouter, createWebHistory } from 'vue-router'
import Recommend from '@/views/recommend/Recommend.vue'

/**
 * @type {import('vue-router').RouteRecordRaw[]}
 * */
const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    component: Recommend,
    children: [
      {
        path: 'detail',
        name: 'RecommendDetail',
        component: () => import('@/views/recommend/Recommend-detail')
      }
    ]
  },
  {
    path: '/rank',
    component: () => import('@/views/Rank.vue')
  },
  {
    path: '/search',
    component: () => import('@/views/Search.vue')
  },
  {
    path: '/singer',
    component: () => import('@/views/Singer.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
