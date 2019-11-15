<template>
  <div id="blog_detail" class="blog_detail container">
    <div class="row h-100">
      <div
        class="col-xl-4 col-lg-4 col-md-4 py-0 p-sm-0 p-md-3 p-xl-4 p-lg-4 d-none d-md-block d-xl-block d-lg-block"
      >
        <Side></Side>
      </div>
      <div class="col-xl-8 col-lg-8 col-md-8 p-0 pt-0 pt-sm-5 pt-md-3 pt-xl-4 pt-lg-4">
        <div class="bg-white px-4 h-100">
          <div class="author_box d-flex py-3">
            <div class="mr-2">
              <img src="../../assets/images/avatar1.jpg" width="45" height="45" alt />
            </div>
            <div class="text-left d-flex flex-column justify-content-between">
              <div class="font-weight-bold" v-text="article.title"></div>
              <div class="text-secondary f12">
                <span>作者 : 时间</span>
                <span class="mx-2">|</span>
                <span v-text="'时间 : '+article.create_time"></span>
                <span class="mx-2">|</span>
                <span v-text="'分类 : '+article.category_name"></span>
              </div>
            </div>
          </div>
          <div class="article_content text-left my-4" v-html="article.content"></div>
          <div class="article_handle  small row d-flex justify-content-between m-0 py-2 mt-3 mb-3 ">
            <div class="col-4 cur border-right p-0">
              <span @click="clickZan()">
                <i :class="'fa fa-heart-o '+(zan ? 'zan' : '')"></i>
                喜欢
              </span>
            </div>
            <div class="col-4 cur border-right p-0" data-toggle="modal" data-target="#QRcode">
              <i class="fa fa-yen" ></i>
              打赏
            </div>
            <div class="col-4 cur p-0" @click="forward()">
              <i class="fa fa-mail-reply"></i>
              转发
            </div>
          </div>
          <Comments :articleId="{id:$route.query.id}" class="p-0"></Comments>
        </div>
      </div>
    </div>
    <div class="modal fade" id="QRcode" tabindex="-1" role="dialog">
      <div class="modal-dialog  modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header p-0 p-2">
            <h5 class="modal-title " id="exampleModalLabel">请作者吃个鸡腿</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body p-0 p-2 d-flex justify-content-around">
            <img src="../../assets/images/zhifubao_code.jpg" width="200">
            <img src="../../assets/images/weixin_code.png" width="200">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Side from "../../components/side";
import Comments from "../../components/comments";
export default {
  name: "detail",
  data() {
    return {
      zan: false,
      zanCount: 0,
      article: {},
      isSupport:null,
      id:this.$route.query.id
    };
  },
  created() {
    this.isSupport =localStorage.getItem("supportArr") && JSON.parse(localStorage.getItem("supportArr"));
    if(this.isSupport && this.isSupport.indexOf(this.id)!==-1){
      this.zan=true
    }
    this.getArticle(this.id, res => {
      this.article = res.data;
    });
  },
  methods: {
    getArticle(articleId, callback) {
      this.$http(`/getArticle/${articleId}`, res => {
        if (res.data.code === 200) {
          callback(res.data);
        } else {
          this.$toast(res.data.message);
        }
      });
    },
    clickZan() {
      if (!this.zan) {
        if (!this.isSupport) {
          this.$http(
            `zan/${this.id}`,
            { params: { support: parseInt(this.article.support) } },
            res => {
              if (res.data.code === 200) {
                this.zan = true;
                  let arr=[];
                  arr.push(parseInt(this.id))
                localStorage.setItem(
                  "supportArr",
                  JSON.stringify(arr)
                );
              } else {
                this.$toast(res.data.message);
              }
            }
          );
        } else {
          if (this.isSupport.indexOf(this.id) === -1) {
            this.$http(
              `zan/${this.id}`,
              { params: { support: parseInt(this.article.support) } },
              res => {
                if (res.data.code === 200) {
                  this.zan = true;
                  this.isSupport.push(parseInt(this.id))
                  localStorage.setItem(
                    "supportArr",
                    JSON.stringify(this.isSupport)
                  );
                } else {
                  this.$toast(res.data.message);
                }
              }
            );
          }else{
            this.$toast('你已经点过赞了哟')
          }
        }
      }else{
        this.$toast('你已经点过赞了哟')
      }
    },
    forward() {
      this.$toast("转发功能正在开发中...转发请复制链接转发哦");
    }
  },
  components: {
    Side,
    Comments
  }
};
</script>

<style lang="scss" scoped>
#blog_detail {
  .author_box {
    border-bottom: 1px dashed rgb(153, 162, 170);
  }
  .article_content {
    font: 14px 宋体, arial narrow, HELVETICA !important;
    line-height: 1.5;
  }
  p {
    line-height: 24px !important;
    color: red !important;
  }
  .article_handle {
    border-top: 1px solid #dddcdb;
    box-shadow: #999 2px 2px 3px;
  }
}
</style>