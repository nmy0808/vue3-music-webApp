import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/home.vue'
import About from '@/views/about.vue'

/**
 * @type {import('vue-router').RouteRecordRaw[]}
 * */
const routes = [{
  path: '/',
  component: Home
}, {
  path: '/about',
  component: About
}]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
