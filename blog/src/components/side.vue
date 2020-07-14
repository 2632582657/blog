<template>
  <div>
    <div class="sj_card card mb-3">
      <div class="sj_card_bg"></div>
      <div class="sj_card_body pt-1 position-relative">
        <div class="sj_card_avatar">
          <img
            src="https://cdn.jsdelivr.net/gh/2632582657/blog/blog/src/assets/images/avatar2.jpg"
            width="56"
            height="56"
            class="rounded-circle"
          />
          <i class="fa fa-vimeo vimeo"></i>
        </div>
        <a href="#" class="sj_card_name d-block mb-3 font-weight-bold">时间旅客</a>
        <div class="row sj_card_content pt-2">
          <div class="col-4">
            <p class="num text-info" v-text="count.articleCount || 0"></p>
            <p class="text text-secondary">文章</p>
          </div>
          <div class="col-4 cur" @click="toAlbum()">
            <p class="num text-info" v-text="count.albumCount || 0"></p>
            <p class="text text-secondary">相册</p>
          </div>
          <div class="col-4 cur">
            <p class="num text-info" @click="toAbout()" v-text="count.leaveMsgCount || 0"></p>
            <p class="text text-secondary">留言</p>
          </div>
        </div>
      </div>
    </div>
    <div class="card d-xl-block d-lg-block d-none mb-3">
      <div class="sj_card_body sj_card_info text-left">
        <div class="py-2">
          <i class="fa fa-fw fa-qq text-info mr-2"></i>
          2632582657
        </div>
        <div class="py-2">
          <i class="fa fa-fw fa-weixin text-success mr-2"></i>
          不便透露
        </div>
        <div class="py-2">
          <i class="fa fa-fw fa-envelope text-warning mr-2"></i>
          MjYzMjU4MjY1N0BxcS5jb20=(自行base)
        </div>
        <div class="py-2">
          <i class="fa fa-fw fa-github mr-2"></i>
          <a href="https://github.com/2632582657" target="_blank">https://github.com/2632582657</a>
        </div>
        <div class="py-2">
          <i class="fa fa-fw mr-2 fa-commenting text-info"></i>按时吃饭,按时睡觉,做该做的事,见想见的人
        </div>
      </div>
    </div>
    <!-- <div v-if="this.$route.meta.showLabel" class="card d-xl-block d-lg-block mb-3">
      <div class="sj_card_body sj_card_info text-left">
        <div class="py-2 cur">
          <i class="fa text-info mr-2"></i>
          vue(2)
        </div>
        <div class="py-2 cur">
          <i class="fa text-success mr-2"></i>
          node(1)
        </div>
        <div class="py-2 cur">
          <i class="fa text-warning mr-2"></i>
          html5(3)
        </div>
        <div class="py-2 cur">
          <i class="fa  mr-2"></i>
          css3(1)
        </div>
        <div class="py-2 cur">
          <i class="fa  mr-2 text-info"></i>
          flutter(1)
        </div>
        <div class="py-2 cur font-weight-bold">
          <i class="fa  mr-2 text-info"></i>
          查看全部...
        </div>
      </div>
    </div>-->
  </div>
</template>

<script>
export default {
  name: "side",
  data() {
    return {
      count: {}
    };
  },
  created() {
    this.$http("getAllCount", res => {
      if (res.data.code === 200) {
        this.count = res.data.data;
      }
    });
  },
  methods: {
    toAlbum() {
      this.$router.push({ path: "/album" });
    },
    toAbout() {
      this.$router.push({ path: "/about" });
    }
  }
};
</script>

<style lang="scss" scoped>
@media screen and (min-width: 768px) and (max-width: 991px) {
  .sj_card_avatar {
    left: 8px !important;
  }
}
.sj_card,
.card {
  &:hover .sj_card_name {
    color: #0099cc;
  }
  .sj_card_bg {
    width: 100%;
    height: 100px;
    max-height: 100px;
    background: #fff
      url("https://cdn.jsdelivr.net/gh/2632582657/blog/blog/src/assets/images/1000048.jpg")
      no-repeat scroll center center;
    background-size: cover;
  }
  .sj_card_body {
    background: #fff;
    padding: 20px;
    .sj_card_avatar {
      position: absolute;
      top: -28px;
      left: 20px;
      .vimeo {
        color: #ffba50;
        position: relative;
        bottom: -20px;
        left: -14px;
      }
    }
    .sj_card_name {
      transition: all 0.3s linear;
      letter-spacing: 2px;
    }
    .sj_card_content {
      p {
        margin-bottom: 0;
        font-weight: bold;
      }
      .num {
        font-size: 16px;
      }
      .text {
        font-size: 14px;
      }
    }
  }
  .sj_card_info > div {
    border-bottom: 1px solid #f0f0f0;
    font-size: 14px;
  }
}
</style>
