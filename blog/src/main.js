import Vue from 'vue'
import App from './App.vue'
import router from './router' 
import store from './store'
import Utils from './assets/js/utils'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/global.css'
import 'font-awesome/css/font-awesome.min.css'
import './assets/css/custom.scss'
import APlayer from '@moefe/vue-aplayer';

Vue.use(APlayer, {
  defaultCover: 'https://github.com/u3u.png',
  productionTip: true,
});
Vue.config.productionTip = false
Vue.use(Utils)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
