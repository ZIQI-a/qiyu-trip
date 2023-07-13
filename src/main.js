import { createApp } from 'vue'
import App from './App.vue'
import "normalize.css"
import router from './router/index'
import pinia from './stores/index'

import './assets/css/index.css'

const app = createApp(App)

app.use(router)
app.use(pinia)

app.mount('#app')
