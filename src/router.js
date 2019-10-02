import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index.vue'
import Album from './views/album.vue'
import Study from './views/study.vue'
import Life from './views/life.vue'
import FriendChain from './views/friendChain.vue'
import About from './views/about.vue'
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
    }
  ]
})
