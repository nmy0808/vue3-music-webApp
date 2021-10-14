import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible/flexible'
import fastclick from 'fastclick'
import '@/assets/scss/reset.scss'
import '@/assets/scss/base.scss'
fastclick.attach(document.body)

const app = createApp(App)

app.use(store)
app.use(router)
app.mount('#app')
