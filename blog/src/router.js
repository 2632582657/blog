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
import Admin from "./views/system/admin.vue"
import System from "./views/system/system"
import Release from "./views/system/release.vue"
import Crm from "./views/system/crm.vue"
import Arm from "./views/system/arm.vue"
import Edit from './views/system/edit.vue'
import Cm from "./views/system/cm.vue"
import Frm from "./views/system/frm.vue"

const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

Vue.use(Router)

const router= new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect:'/index',
      name: 'home',
      component:Index
    },
    {
      name:"index",
      path:"/index",
      component:Index
    },
    {
      name:"album",
      path:'/album',
      component:Album,
    },
    {
      name:"study",
      path:"/study",
      component:Study,
      meta:{
        showLabel:true,
      }
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
      path:"/adminLogin",
      component:AdminLogin,
      meta:{
        showHeader:true
      }
    },
    {
      name:"admin",
      path:"/admin",
      component:Admin,
      meta:{
        showHeader:true,
        auth:true
      },
      children:[
        {
          name:"system",
          path:"system",
          component:System,
          meta:{
            showHeader:true,
            auth:true
          }
        },
        {
          name:"release",
          path:"release",
          component:Release,
          meta:{
            showHeader:true,
            auth:true
          }
        },
        {
          name:"crm",
          path:"crm",
          component:Crm,
          meta:{
            showHeader:true,
            auth:true
          }
        },
        {
          name:"arm",
          path:"arm",
          component:Arm,
          meta:{
            showHeader:true,
            auth:true
          }
        },
        {
          name:"edit",
          path:"edit",
          component:Edit,
          meta:{
            showHeader:true,
            auth:true
          },
        },
        {
          name:"cm",
          path:"cm",
          component:Cm,
          meta:{
            showHeader:true,
            auth:true
          }
        },
        {
          name:"frm",
          path:"frm",
          component:Frm,
          meta:{
            showHeader:true,
            auth:true
          }
        }
      ]
    }
  ],
  
})
router.beforeEach((to,from,next)=>{
  if(to.meta.auth){
    if(localStorage.getItem('user')){
      next()
    }else{
      alert('需要登录才能进入哦~')
      next({path:'/adminLogin'})   
    }
  }else{
    next()
  }
})

export default router