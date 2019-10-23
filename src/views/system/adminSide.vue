<template>
  <div class="admin_side border-top">
    <ul class="text-center text-xl-left text-lg-left text-md-left text-sm-left">
      <li class="py-3 px-lg-5 px-xl-5 px-md-5 px-sm-5 border-bottom cur" v-for="(item,i) in adminMenu"  :key="i" @click="toPath(item.path)">
          <i :class="[{fa:true},item.icon]"></i>
          <span class="d-none d-sm-inline-block d-md-inline-block d-lg-inline-block d-xl-inline-block" v-text="item.title"></span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      adminMenu: [
        { icon: "fa-institution", title: "首页", path: "/adminIndex" },
        { icon: "fa-institution", title: "发布文章", path: "/adminIndex/release" },
        { icon: "fa-institution", title: "管理文章", path: "/adminIndex/arm" },
        { icon: "fa-institution", title: "用户管理", path: "/adminIndex/crm" },
        { icon: "fa-institution", title: "评论管理", path: "/adminIndex/cm" },
      ]
    };
  },
  methods:{
    toPath(url){
      this.$router.push(url);
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
  top: 0;
  bottom:0;
  padding-top: 40px;
  height: 100vh;
  background: rgb(216, 245, 246);
  overflow: hidden;
}
</style>