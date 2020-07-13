<template>
  <div id="release" class="blog_release container-fluid pr-0 pr-sm-0 pr-md-0 pr-xl-0 pr-lg-0">
    <div class="system_header bg-primary text-white d-flex justify-content-between">
      <div class="px-4">
        <i class="fa fa-windows mr-2"></i>
        <span
          class="font-weight-bold d-none d-sm-inline-block d-md-inline-block d-lg-inline-block d-xl-inline-block"
        >时间旅客后台管理系统</span>
      </div>
      <div class="small pr-2 pr-sm-3 pr-md-4 pr-lg-4 pr-xl-4">
        <span class="mr-2 cur" v-text="'欢迎站长：'+user.name"></span>
        <span @click="logout()" class="cur">退出</span>
      </div>
    </div>
    <AdminSide @func="func"></AdminSide>
    <div class="row mx-0 py-0 bg-white h-100 adm_m">
      <div class="col-12 p-0">
        <div class="show_title w-100 text-left font-weight-bold px-3 mb-3 shadow" v-text="title"></div>
        <router-view class="px-3"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import AdminSide from "./adminSide";

export default {
  name: "adminIndex",
  data() {
    return {
      title: "首页",
      user: JSON.parse(localStorage.getItem("user"))
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("user");
      this.$router.push({ path: "/adminLogin" });
    },
    func(title) {
      this.title = title;
    }
  },
  components: {
    AdminSide
  }
};
</script>

<style lang="scss" scoped>
@media screen and(max-width: 576px) {
  .blog_release {
    padding-left: 60px !important;
  }
}
.blog_release {
  padding-left: 200px;
  height: 100vh;
  .system_header {
    width: 100%;
    min-height: 42px;
    height: 42px;
    overflow: hidden;
    line-height: 42px;
    margin: 0 auto;
    box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
    // background: rgb(216, 245, 246);
    z-index: 999;
    position: fixed;
    top: 0;
    left: 0;
  }
  .adm_m {
    padding-top: 42px !important;
  }
  .show_title {
    height: 40px;
    line-height: 40px;
  }
}
</style>
