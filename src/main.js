import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible/flexible'
import fastclick from 'fastclick'
import '@/assets/scss/reset.scss'
import '@/assets/scss/base.scss'
import lazyPlugin from 'vue3-lazy'

fastclick.attach(document.body)

const app = createApp(App)

app.use(lazyPlugin, {
  loading: require('@/assets/imgs/no-find@3x.png')
})
app.use(store)
app.use(router)
app.mount('#app')
