import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible/flexible'
import fastclick from 'fastclick'
import '@/assets/scss/reset.scss'
import '@/assets/scss/base.scss'
import lazyPlugin from 'vue3-lazy'
import regDirective from '@/directive/regDirective'

const plugins = {
  install: (app, options) => {
    app.say = () => {
      alert('hello')
    }
  }
}
fastclick.attach(document.body)

const app = createApp(App)
regDirective(app)
app.use(lazyPlugin, {
  loading: require('@/assets/imgs/no-find@3x.png')
})
app.use(plugins)
app.use(store)
app.use(router)
app.mount('#app')
