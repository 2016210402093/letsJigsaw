import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Circle } from 'vant'
import 'vant/lib/index.css'

const app = createApp(App)

app.use(router)
app.use(Circle)

app.mount('#app')
