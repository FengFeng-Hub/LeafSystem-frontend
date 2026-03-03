// Vue
import { createApp } from 'vue'

// 路由
import router from './router'

// pinia
import { createPinia } from "pinia"

// antd
import Antd from 'ant-design-vue'
import * as antdIcons from '@ant-design/icons-vue'

// 应用入口
import App from './App.vue'

// 全局样式
import '@/styles/index.css'

// LeafSystem
import initLS from '@/utils/_ls/init'

const app = createApp(App)
app.use(router)

app.use(createPinia())
app.use(Antd)

// 注册图标组件
Object.keys(antdIcons).forEach((key) => {
    app.component(key, antdIcons[key]);
})
app.config.globalProperties.$antdIcons = antdIcons;

initLS(app)
app.mount('#app')
