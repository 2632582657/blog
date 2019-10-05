import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/frontEnd/index.vue'
import Album from './views/frontEnd/album.vue'
import Study from './views/frontEnd/study.vue'
import Life from './views/frontEnd/life.vue'
import FriendChain from './views/frontEnd/friendChain.vue'
import About from './views/frontEnd/about.vue'
import Detail from './views/frontEnd/detail.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      name: 'index',
      path: '/',
      component: Index
    },
    {
      name:"album",
      path:'/album',
      component:Album
    },
    {
      name:"study",
      path:"/study",
      component:Study
    },
    {
      name:"life",
      path:"/life",
      component:Life
    },
    {
      name:"friendChain",
      path:"/friendChain",
      component:FriendChain
    },
    {
      name:"about",
      path:"/about",
      component:About
    },
    {
      name:"detail",
      path:"/detail",
      component:Detail
    }
  ]
})
