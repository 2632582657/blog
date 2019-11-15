<template>
  <div class="admin_side border-top bg-primary">
    <ul class="text-center  text-white text-xl-left text-lg-left text-md-left text-sm-left">
      <li :class="'py-3 px-lg-5 px-xl-5 px-md-5 px-sm-5  cur '+(navActive===i?'active':'')" v-for="(item,i) in adminMenu"  :key="i" @click="toPath(i)">
          <i :class="[{fa:true},item.icon]"></i>
          <span class="ml-2 d-none d-sm-inline-block d-md-inline-block d-lg-inline-block d-xl-inline-block" v-text="item.title"></span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      adminMenu: [
        { icon: "fa-flag", title: "首页", path: "/admin/system" },
        { icon: "fa-edit", title: "发布文章", path: "/admin/release" },
        { icon: "fa-folder", title: "管理文章", path: "/admin/arm" },
        { icon: "fa-group ", title: "用户管理", path: "/admin/crm" },
        { icon: "fa-comments", title: "评论管理", path: "/admin/cm" },
        { icon: "fa-link", title: "友链管理", path: "/admin/frm" }
      ],
      navActive:0
    };
  },
  created(){
    props:{func:Function}
    this.adminMenu.forEach((item,i)=>{
      if(item.path===this.$route.path){
        this.navActive=i
      }
    })
  },
  methods:{
    toPath(i){
      this.navActive=i
      this.$emit('func',this.adminMenu[i].title)
      this.$router.push(this.adminMenu[i].path);
    }
  }
};
</script>

<style lang="scss" scoped>
@media screen and(max-width: 576px) {
  .admin_side {
    width: 60px !important;
  }
}
.admin_side {
  width: 200px;
  position: fixed;
  left: 0;
  top: 42px;
  bottom:0;
  // padding-top: 40px;
  height: 100vh;
  z-index: 999;
  // background: rgb(216, 245, 246);
  overflow: hidden;
  ul{
    li:hover,li.active{
      background: rgba(255, 255, 255, 0.05);
    }
  }
}
</style>