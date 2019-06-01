import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store'

import iView from 'iview';
import 'iview/dist/styles/iview.css';
import egUtils from 'eg-utils'

Vue.use(iView);

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false
Vue.prototype.egUtils = egUtils

new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
