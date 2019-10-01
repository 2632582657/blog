<template>
  <div id="blog_index"  class=" container mt-4">
    <div class="row h-100">
      <div class="col-xl-4 col-lg-4 col-md-4 py-0 p-sm-0 p-md-3 p-xl-4 p-lg-4">
        <Side></Side>
      </div>
      <div class="col-xl-8 col-lg-8 col-md-8 py-0 p-sm-0 p-md-3 p-xl-4 p-lg-4">
        <!-- fixed me  轮播自适应图片 -->
        <div id="carouselExampleIndicators" class="carousel slide carousel-fade mb-4 overflow-hidden"  data-ride="carousel">
          <ol class="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          </ol>
          <div class="carousel-inner h-100">
            <div class="carousel-item active overflow-hidden h-100">
              <img class="d-block w-100" style="max-height:400px" src="../assets/images/1000048.jpg" >
              <div class="carousel-caption d-none d-md-none d-xl-block d-lg-none ">
                <h5>文章标题</h5>
              </div>
            </div>
            <div class="carousel-item overflow-hidden">
              <img class="d-block w-100" style="max-height:400px" src="../assets/images/1000048.jpg">
            </div>
            <div class="carousel-item overflow-hidden">
              <img class="d-block w-100" style="max-height:400px" src="../assets/images/1000736.jpg">
            </div>
          </div>
          <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>

        <!-- 卡片 -->
        <Card></Card>
        <Card></Card>
      </div>
    </div>
  </div>
</template>

<script>
import Card from '../components/card'
import Side from '../components/side'
export default {
  components:{
    Card,
    Side
  }
}
</script>

<style lang="scss" scoped>
  #blog_index{
    min-height: 100%;
    padding-bottom: 60px;
  }

</style>
