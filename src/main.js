import { createApp } from 'vue'
import App from './App.vue'
import router from './router'  // 导入路由配置

const app = createApp(App)

app.config.productionTip = false
app.config.devtools = false // 可选，禁用 Vue DevTools 提示

app.use(router)  // 使用路由
app.mount('#app')