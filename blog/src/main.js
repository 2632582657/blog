// import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Utils from './assets/js/utils';
import './assets/css/global.css';
import './assets/css/custom.scss';
import APlayer from '@moefe/vue-aplayer';
import VueLazyLoad from 'vue-lazyload';

Vue.use(APlayer, {
  defaultCover: 'https://github.com/u3u.png',
  productionTip: false,
});
Vue.use(VueLazyLoad,{
  preLoad: 1.3,
  loading: require('./assets/images/timg.gif'),
  attempt: 1
})
// Vue.config.productionTip = false;
Vue.use(Utils);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
