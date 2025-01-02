import 'bootstrap'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.min.css'

import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from "./router/index";
const app= createApp(App)
app.use(router)
app.mount('#app')
