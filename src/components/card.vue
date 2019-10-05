<template>
  <div id="blog_card_box" @click="toDetail">
    <div class="blog_card">
      <div class="card_author d-flex">
        <div class="position-relative">
          <img src="../assets/images/avatar.jpg" />
          <i class="fa fa-vimeo"></i>
        </div>
        <div class="ml-3 text-left d-flex flex-column justify-content-between">
          <a href="#" class="uname text-primary">Moe_Nya</a>
          <p class="time text-secondary pb-0">2019- 9 -31</p>
        </div>
      </div>
      <div class="card_content row m-0 mt-3 h-100">
        <div
          class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-5 p-0 position-relative overflow-hidden"
        >
          <!-- <img src="../assets/images/1000048.jpg" class=" h-100 img_hover" /> -->
          <div class="img_hover"></div>
          <span class="content_tag bg-info">
            <a href="#">随笔</a>
          </span>
        </div>
        <div
          class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-7 pt-3 px-0 px-xl-3 px-lg-3 px-md-3 px-sm-3 px-3"
        >
          <a href="#" class="d-block w-100 h-100">
            <h3 class="title mb-2 text-primary strong">博客主页换音乐啦~~</h3>
            <p class="content text-secondary">
              这首歌是AniFace的《夜 萤火虫和你》，超好听ww
              我本来想直接用Hermit插件的代码来放到侧边栏，但是并不是很顺利，出了bug，所以就直接去网易云买了单曲然后下载下来放在博客上。
              还是要在PC端页面上才能看到哦
            </p>
          </a>
        </div>
      </div>
      <div class="card_zan w-100 mt-2 text-left">
        <span class="text-secondary cur">
          <i class="fa fa-eye"></i> 71
        </span>
        <span class="text-secondary ml-5 cur">
          <i class="fa fa-commenting-o"></i> 2
        </span>
        <span class="text-secondary ml-5 cur">
          <i class="fa fa-heart-o"></i> 1
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods:{
    toDetail(){
      this.$router.push("detail")
    }
  }
};
</script>

<style lang="scss" scoped>
#blog_card_box {
  &:hover .img_hover {
    transform: scale(1.2);
  }
  width: 100%;
  padding: 12px 16px;
  margin-bottom: 8px;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
  background: #fff;
  position: relative;
  overflow: hidden;
  border-radius: 4px;
  .blog_card {
    .card_author {
      width: 100%;
      height: 48px;
      img {
        width: 48px;
        height: 48px;
        border-radius: 100%;
      }
      i {
        color: #ffba50;
        position: absolute;
        bottom: 0;
        right: 0;
        margin-bottom: -5%;
        margin-right: -2%;
      }
      .uname {
        font-size: 18px;
      }
      .time {
        font-size: 12px;
        line-height: 1;
      }
    }
    .card_content {
      height: 135px !important;
      background: #fff;
      border-radius: 4px;
      text-align: left;
      position: relative;
      border: 1px solid #e5e9ef;
      overflow: hidden;
      z-index: 1;
      transition: all 0.3s ease-in-out;
      .img_hover {
        transition: all 1.5s ease;
        width: 100%;
        height: 100%;
        background: url("../assets/images/1000048.jpg") no-repeat center center;
        background-size: cover;
      }
      .content_tag {
        max-width: 30%;
        position: absolute;
        left: 8px;
        top: 8px;
        text-align: center;
        line-height: 18px;
        border-radius: 4px;
        color: #fff;
        padding: 2px 8px;
        z-index: 101px;
        overflow: hidden;
        font-size: 12px;
        text-overflow: ellipsis;
        word-break: break-all;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        opacity: .8;
        a {
          color: #fff;
        }
      }
      .title,
      .content {
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
      }
      .title {
        -webkit-transition: color 0.2s cubic-bezier(0.22, 0.58, 0.12, 0.98);
        transition: color 0.2s cubic-bezier(0.22, 0.58, 0.12, 0.98);
        font-size: 14px;
        line-height: 20px;
        font-weight: 600;
        white-space: nowrap;
      }
      .content {
        font-size: 12px;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        letter-spacing: 1px;
      }
    }
  }
}
</style>