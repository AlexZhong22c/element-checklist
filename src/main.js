import Vue from 'vue';
import ElementUI from 'element-ui';
import App from './App.vue';
import store from './store';
import i18n from './lang';
import 'element-ui/lib/theme-chalk/index.css';

import router from './router';

import '@/style/utils.css'

import '@/utils/better-string.js';

import vueExtendsDirectives from './directives'

Vue.config.productionTip = false;
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value),
  size: 'small'
});

Vue.use(vueExtendsDirectives);

const requireComponent = require.context('./components/FormItem/', false, /[A-Z]\w+\.(vue|js)$/);

requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName);

  const componentName = fileName
    .split('/')
    .pop()
    .replace(/\.\w+$/, '');
  Vue.component(componentName, componentConfig.default || componentConfig);
});

new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app');
