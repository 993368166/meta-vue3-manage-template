import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import 'nprogress/nprogress.css'
import '@/assets/styles/global.scss'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
const pinia = createPinia();
pinia.use(createPersistedState({
  storage: sessionStorage
}));
pinia.use(({ store }) => {
  const initialState = JSON.parse(JSON.stringify(store.$state));
  // 重置pinia
  store.$reset = () => {
    store.$state = JSON.parse(JSON.stringify(initialState));
  };
});

app.use(pinia).use(router);

app.mount('#app')
