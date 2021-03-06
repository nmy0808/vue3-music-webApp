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
        path: 'detail/:id/:type',
        name: 'RecommendDetail',
        component: () => import('@/views/recommend/Recommend-detail')
      }
    ]
  },
  {
    path: '/rank',
    component: () => import('@/views/rank/Rank.vue'),
    children: [
      {
        path: 'detail/:id',
        component: () => import('@/views/rank/Rank-detail.vue')
      }
    ]
  },
  {
    path: '/search',
    component: () => import('@/views/search/Search.vue')
  },
  {
    path: '/singer',
    component: () => import('@/views/singer/Singer.vue'),
    children: [
      {
        path: 'detail/:id/:type',
        name: 'singer-detail',
        component: () => import('@/views/recommend/Recommend-detail')
      }
    ]
  },
  {
    path: '/user',
    component: () => import('@/views/user/User.vue')
  }
]

const
  router = createRouter({
    history: createWebHistory(),
    routes
  })

export default router
