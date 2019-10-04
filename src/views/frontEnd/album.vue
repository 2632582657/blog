<template>
  <div id="blog_album" class="container p-0 pt-xl-3">
    <PageHead :componentName="componentName"></PageHead>
    <div class="row album_body m-0 pt-xl-3 pt-lg-3 pt-md-3 pb-5 px-3 border-0">
      <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 mb-3 album_item">
        <img src="../../assets/images/1000048.jpg" class="w-100 h-100" />
        <div class="album_mask text-left font-weight-bold">
          <p class="m-0">
            国庆，记一次回乡
            <span class="time d-block text-secondary">
              <i></i> 2019-9-30
            </span>
          </p>
          <div class="card_zan w-100 mt-2 small">
            <span class="text-secondary cur">
              <i class="fa fa-eye"></i> 71
            </span>
            <span class="text-secondary ml-3 cur">
              <i class="fa fa-commenting-o"></i> 2
            </span>
            <span class="text-secondary ml-3 cur">
              <i class="fa fa-heart-o"></i> 1
            </span>
          </div>
        </div>
      </div>
      <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 mb-3 album_item">
        <img src="../../assets/images/1000048.jpg" class="w-100 h-100" />
        <div class="album_mask text-left font-weight-bold">
          <p class="m-0">
            国庆，记一次回乡
            <span class="time d-block text-secondary">
              <i></i> 2019-9-30
            </span>
          </p>
          <div class="card_zan w-100 mt-2 small">
            <span class="text-secondary cur">
              <i class="fa fa-eye"></i> 71
            </span>
            <span class="text-secondary ml-3 cur">
              <i class="fa fa-commenting-o"></i> 2
            </span>
            <span class="text-secondary ml-3 cur">
              <i class="fa fa-heart-o"></i> 1
            </span>
          </div>
        </div>
      </div>
      <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 mb-3 album_item">
        <img src="../../assets/images/1000048.jpg" class="w-100 h-100" />
        <div class="album_mask text-left font-weight-bold">
          <p class="m-0">
            国庆，记一次回乡
            <span class="time d-block text-secondary">
              <i></i> 2019-9-30
            </span>
          </p>
          <div class="card_zan w-100 mt-2 small">
            <span class="text-secondary cur">
              <i class="fa fa-eye"></i> 71
            </span>
            <span class="text-secondary ml-3 cur">
              <i class="fa fa-commenting-o"></i> 2
            </span>
            <span class="text-secondary ml-3 cur">
              <i class="fa fa-heart-o"></i> 1
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageHead from "../../components/pageHead"
export default {
  name:"album",  //相册
  data(){
    return{
      componentName:{
        title:"相册",
        introduce:"留意生活，发现美好......"
      }
    }
  },
  components:{
    PageHead
  }
};
</script>

<style lang="scss" scoped>
#blog_album {
  overflow: hidden;
  .album_body {
    background: #fff;
    .album_item {
      &:hover .album_mask {
        left: 0.5rem;
      }
      position: relative;
      height: 200px;
      overflow: hidden;
      border-radius: 8px;
      padding: 0 0.5rem;
      img {
        border-radius: 8px;
      }
      .album_mask {
        width: 80%;
        height: 100%;
        overflow: hidden;
        position: absolute;
        bottom: 0%;
        left: -100%;
        border-radius: 8px;
        background: rgba(0, 0, 0, 0.7);
        transition: all 0.5s linear;
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: #fff;
        padding-left: 20%;
        .time {
          font-size: 12px;
        }
      }
    }
  }
}
</style>