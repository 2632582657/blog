<template>
  <div id="blog_card_box" @click="toDetail" class="cur">
    <div class="blog_card">
      <div class="card_author d-flex">
        <div class="position-relative">
          <img src="../assets/images/avatar2.jpg" />
          <i class="fa fa-vimeo"></i>
        </div>
        <div class="ml-3 text-left d-flex flex-column justify-content-between">
          <a href="#" class="uname text-primary">时间</a>
          <p class="time text-secondary pb-0" v-text="articleInfo.create_time"></p>
        </div>
      </div>
      <div class="card_content row m-0 mt-3 h-100">
        <div
          class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-5 p-0 position-relative h-100 overflow-hidden"
        >
          <img class="h-100 img_hover img_fit" v-lazy="articleInfo.cover"/>
          <!-- <img src="../assets/images/timg.gif" :data-src="articleInfo.cover" class="h-100 img_hover img_fit"/> -->
          <!-- <div class="img_hover" :style="`background: url(${articleInfo.cover}) no-repeat center center;background-size: cover`"></div> -->
          <span class="content_tag bg-info" :title="articleInfo.category_name">
            <a href="javascript:;" v-text="articleInfo.category_name"></a>
          </span>
        </div>
        <div
          class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-7 pt-2 px-0 px-xl-3 px-lg-3 px-md-3 px-sm-3 px-3 h-100"
        >
          <div class="w-100 h-100">
            <h3 class="title mb-2 text-primary strong" v-text="articleInfo.title"></h3>
            <div class="content text-secondary" v-html="articleInfo.content"></div>
          </div>
        </div>
      </div>
      <div class="card_zan w-100 mt-2 text-left">
        <span class="text-secondary cur">
          <i class="fa fa-eye"></i>
          {{articleInfo.hot}}
        </span>
        <span class="text-secondary ml-5 cur">
          <i class="fa fa-commenting-o"></i>
          {{articleInfo.comment_count}}
        </span>
        <span class="text-secondary ml-5 cur">
          <i class="fa fa-heart-o"></i>
          {{articleInfo.support}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    articleInfo: Object
  },
  methods: {
    toDetail() {
      this.$router.push({
        path: "/detail",
        query: { id: this.articleInfo.id }
      });
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
  // min-height: 255px;
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
        font-size: 16px;
      }
      .time {
        font-size: 12px;
        line-height: 1;
      }
    }
    .card_content {
      height: 115px !important;
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
      }
      .img_fit {
        object-fit: cover;
      }
      .content_tag {
        // max-width: 30%;
        width: 40px;
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
        // text-overflow: ellipsis;
        // word-break: break-all;
        // display: -webkit-box;
        // -webkit-line-clamp: 1;
        // -webkit-box-orient: vertical;
        white-space: nowrap;
        opacity: 0.8;
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
        max-height: 75px;
      }
    }
  }
}
</style>
