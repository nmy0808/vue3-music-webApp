import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/scss/index.scss'
import scroll from '@/components/base/scroll/scroll'
import lazyPlugin from 'vue3-lazy'
import loading from '@/directive/loading'
import noDetail from '@/directive/no-detail'

const app = createApp(App)
app.component('scroll', scroll)
app.use(lazyPlugin, {
  loading: require('@/assets/images/default.png')
})
app.directive('loading', loading)
app.directive('no-detail', noDetail)
app.use(store)
app.use(router)
app.mount('#app')
