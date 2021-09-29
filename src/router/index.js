import { createRouter, createWebHashHistory } from 'vue-router'
import recommend from '../views/recommend.vue'
/**
 * @type {import('vue-router').RouteRecordRaw[]}
 * */
const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: { name: 'Recommend' }
  },
  {
    path: '/recommend',
    name: 'Recommend',
    component: recommend
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/search.vue')
  },
  {
    path: '/singer',
    name: 'Singer',
    component: () => import('@/views/singer.vue')
  },
  {
    path: '/top-list',
    name: 'Top-list',
    component: () => import('@/views/top-list.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
