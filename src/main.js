import { createApp } from 'vue' //import vue
import App from './App.vue' //import app component
import router from './router/index.js'

createApp(App).use(router).mount('#app')