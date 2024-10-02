import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VueKinesis from "vue-kinesis";
const app = createApp(App)

app.use(createPinia())
app.use(ElementPlus)
app.use(VueKinesis);
app.use(router)

app.mount('#app')
