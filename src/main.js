import { createApp } from 'vue'
import App from './App.vue'
import routers from "@/routers";
import store from "@/store";

import './assets/less/main.less';

const app = createApp(App)
app.use(routers);
app.use(store);
app.mount('#app')
