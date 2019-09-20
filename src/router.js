import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'index',
      path: '/',
      name: 'index',
      component: Index
    }
  ]
})
