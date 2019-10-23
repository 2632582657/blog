import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/frontEnd/index.vue'
import Album from './views/frontEnd/album.vue'
import Study from './views/frontEnd/study.vue'
import Life from './views/frontEnd/life.vue'
import FriendChain from './views/frontEnd/friendChain.vue'
import About from './views/frontEnd/about.vue'
import Detail from './views/frontEnd/detail.vue'
// 后台管理
import AdminLogin from "./views/system/adminLogin.vue"
import AdminIndex from "./views/system/adminIndex.vue"
import Release from "./views/system/release.vue"
import Crm from "./views/system/crm.vue"
import Arm from "./views/system/arm.vue"
import Cm from "./views/system/cm.vue"

const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

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
      component:Album,
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
    },
    {
      name:"adminLogin",
      path:"/admin",
      component:AdminLogin
    },
    {
      name:"adminIndex",
      path:"/adminIndex",
      component:AdminIndex,
      children:[
        {
          name:"release",
          path:"release",
          component:Release
        },
        {
          name:"crm",
          path:"crm",
          component:Crm
        },
        {
          name:"arm",
          path:"arm",
          component:Arm
        },
        {
          name:"cm",
          path:"cm",
          component:Cm
        }
      ]
    }
    
  ]
})
