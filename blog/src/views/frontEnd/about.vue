<template>
  <div id="blog_about" class="container-fluid p-0">
    <div class="about_bg">
      <img :src="ABOUT_URL+'14'+'.jpg'" class="w-100 h-75" alt />
      <img src="../../assets/images/about__bg_di.png" alt class="about_di" />
      <div class="about_info w-100">
        <div>
          <img src="../../assets/images/avatar2.jpg" class="rounded-circle mr-3 about_avatar" />
        </div>
        <div class="about_author">
          <p class="author_name">
            时间旅客
            <i class="fa fa-send text-warning"></i>
          </p>
          <p class="author_info">前端工程师......没什么拿得出手的才艺...就是一个普通人，偶尔有点文艺...</p>
        </div>
      </div>
    </div>
    <div class="bg-white w-100">
      <div class="container py-3 hobby text-left">
        <div class="row hobby_title d-inline-block mx-3 text-warning py-2 pr-5 mx-2 mb-4">资料</div>
        <div class="row mx-3">
          <div
            class="col-6 col-xl-3 col-lg-3 col-md-3 col-sm-3 text-info"
            v-for="(item,i) in sjInfo"
            :key="i"
          >
            <div class="hobby_name py-2 mb-1" v-text="item.title"></div>
            <div v-text="item.info"></div>
          </div>
        </div>
      </div>
      <div class="container py-3 hobby text-left">
        <div class="row hobby_title d-inline-block mx-3 text-warning py-2 pr-5 mx-2 mb-4">交流</div>
        <div class="row mx-3">
          <div class="col-6 col-xl-3 col-lg-3 col-md-3 col-sm-3 text-white communication">
            <div class="text-center py-2 rounded border border-info content">
              <i class="fa fa-github"></i>
              <a href="https://github.com/2632582657" target="_blank">GitHub</a>
            </div>
          </div>
          <div class="col-6 col-xl-3 col-lg-3 col-md-3 col-sm-3 text-white communication">
            <div class="text-center py-2 rounded border border-info content">
              <i class="fa fa-commenting-o"></i>
              没了...
            </div>
          </div>
        </div>
      </div>
      <div class="container py-3 hobby text-left">
        <div class="row hobby_title d-inline-block mx-3 text-warning py-2 pr-5 mx-2 mb-4">声明</div>
        <div class="row mx-3">
          <div class="col-12">
            <div class="py-2 text-info">
              本网站的布局灵感集百家之长，分别来源于
              <a
                class="text-danger"
                href="https://www.wikimoe.com"
                target="blank"
              >维基萌</a>丶
              <a href="https://shawnzeng.com" target="blank" class="text-danger">诗与酒</a> ，网站所有内容均由时间一人开发，
              本网站仅用作学习交流，无任何商业目的。网站素材均来源于网络，侵删。
              <div>
                <span class="d-block small mt-1 proof" @click="isSeeProof">{{isSee?"查看":"关闭"}}</span>
                <div v-show="!isSee" class="row">
                  <div class="col-12 col-xl-6 col-lg-6 col-md-6">
                    <img src="../../assets/images/pingzheng.png" class="proof_img" />
                  </div>
                  <div class="col-12 col-xl-6 col-lg-6 col-md-6">
                    <img src="../../assets/images/pingzheng2.png" class="proof_img" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container py-3 hobby">
        <div class="row">
          <div class="col-12">
            <Comments :articleId="{id:10001}"></Comments>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Comments from "../../components/comments";
export default {
  name: "about",
  data() {
    return {
      sjInfo: [
        { title: "常用昵称", info: "丶" },
        { title: "星座", info: "巨蟹座" },
        { title: "爱好", info: "躺着" },
        { title: "食物", info: "肉和酸甜的水果" },
        { title: "职业", info: "前端攻城狮" },
        { title: "物种", info: "紫阳" }
      ],
      isSee: true
    };
  },
  methods: {
    isSeeProof() {
      this.isSee = !this.isSee;
    }
  },
  components: {
    Comments
  }
};
</script>

<style lang="scss" scoped>
@media screen and (min-width: 768px) and (max-width: 991px) {
}
@media screen and (min-width: 576px) and (max-width: 767px) {
}
@media screen and(max-width:575px) {
  #blog_about {
    .about_bg {
      .about_info {
        top: 25% !important;
        padding: 0 8% !important;
        .about_avatar {
          width: 64px !important;
          height: 64px !important;
        }
        .about_author {
          .author_name {
            margin-bottom: 0;
            font-size: 20px !important;
            font-weight: 400;
          }
          .author_info {
            font-size: 12px !important;
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
#blog_about {
  .about_bg {
    // max-height: 400px;
    position: relative;
    .about_di {
      width: 100%;
      position: absolute;
      left: 0;
      bottom: -2px;
    }
    .about_info {
      position: absolute;
      left: 0;
      top: 30%;
      display: flex;
      justify-content: center;
      padding: 0 15%;
      .about_avatar {
        width: 128px;
        height: 128px;
      }
      .about_author {
        text-align: left;
        color: #fff;
        border-bottom: 1px dashed #fff;
        .author_name {
          margin-bottom: 0;
          font-size: 32px;
          font-weight: 400;
        }
        .author_info {
          font-size: 18px;
          margin-bottom: 0;
        }
      }
    }
  }
  .hobby {
    .hobby_title {
      font-size: 18px;
      letter-spacing: 0.15em;
      font-weight: 550;
      border-bottom: #ff9900 2px solid;
    }
    .hobby_name {
      border-bottom: 2px solid #0099cc;
      font-size: 12px;
    }
  }
  .communication {
    &:hover .content {
      color: #fff;
      background: #0099cc;
    }
    &:hover .content a {
      color: #fff;
    }
    .content {
      color: #0099cc;
      cursor: pointer;
      font-size: 18px;
      font-weight: 400;
      transition: all 0.3s ease;
      a {
        color: #0099cc;
        transition: all 0.3s ease;
      }
    }
  }
  .proof {
    cursor: pointer;
    color: #ff9999;
  }
  .proof_img {
    max-width: 100%;
  }
}
</style>