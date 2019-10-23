<template>
  <div id="release" class="blog_release container-fluid pr-0 pr-sm-0 pr-md-0 pr-xl-0 pr-lg-0">
    <AdminSide></AdminSide>
    <div class="row m-0 py-3 bg-white h-100">
      <div class="col-12">
         <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import AdminSide from "../system/adminSide";
export default {
  name: "adminIndex",
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
}
</style>