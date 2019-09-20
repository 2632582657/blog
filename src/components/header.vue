<template>
  <div id="blog_header" class=" container-fluid">
    <div class="row ">
      <div class="col-xl-3">
        <div class=" h-100 d-flex align-items-center">
          <img src="../assets/images/blog_logo.png" alt="" width="70%">
        </div>
      </div>
      <div class="col-xl-6" >
        <ul class="d-flex justify-content-between h-100">
          <li class="h-100 link_vertical">
            <a href="#">首页</a>
          </li>
          <li class="h-100 link_vertical">
            <a href="#">相册</a>
          </li>
          <li class="h-100 link_vertical">
            <a href="#">学习</a>
          </li>
          <li class="h-100 link_vertical">
            <a href="#">随笔</a>
          </li>
          <li class="h-100 link_vertical"> 
            <a href="#">友链</a>
          </li>
          <li class="h-100 link_vertical">
            <a href="#">关于</a>
          </li>
        </ul>
      </div>
      <div class="col-xl-3"></div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  #blog_header{
    box-sizing: border-box;
    min-height: 60px;
    background: white;
    
  }
  .link_vertical{
    width: 100%;
    line-height: 60px;
    text-align: center;
  }
</style>
