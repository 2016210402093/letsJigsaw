import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Circle, Icon, ImagePreview, Overlay, Button, Lazyload } from 'vant'
import 'vant/lib/index.css'

const app = createApp(App)

app.use(router)
app.use(Circle)
app.use(Icon)
app.use(ImagePreview)
app.use(Overlay)
app.use(Button)
app.use(Lazyload)

app.mount('#app')
