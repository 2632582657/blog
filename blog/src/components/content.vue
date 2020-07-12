<template>
  <div class="bg-white px-4 pb-3 h-100">
    <div class="author_box d-flex py-3">
      <div class="mr-2">
        <img src="../assets/images/avatar1.jpg" width="45" height="45" alt />
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
    <div class="article_handle small row d-flex justify-content-between m-0 py-2 mt-3 mb-3">
      <div class="col-4 cur border-right p-0">
        <span @click="clickZan()">
          <i :class="'fa fa-heart-o '+(zan ? 'zan' : '')"></i>
          喜欢
        </span>
      </div>
      <div class="col-4 cur border-right p-0" data-toggle="modal" data-target="#QRcode">
        <i class="fa fa-yen"></i>
        打赏
      </div>
      <div class="col-4 cur p-0" @click="forward()">
        <i class="fa fa-mail-reply"></i>
        转发
      </div>
    </div>
    <Comments :articleId="{id:article.id}" class="p-0"></Comments>
    <div class="modal fade" id="QRcode" tabindex="-1" role="dialog">
      <div class="modal-dialog  modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header p-0 p-2">
            <h5 class="modal-title " id="exampleModalLabel">请作者吃个鸡腿</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body  d-flex justify-content-around">
            <div class="row">
              <img src="../assets/images/zhifubao_code.jpg" class="col-6" height="100%">
              <img src="../assets/images/weixin_code.png" class="col-6" height="100%">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Comments from "@/components/comments";
export default {
  name: "Content",
  data() {
    return {
      zan: false,
      zanCount: 0,
      isSupport: null,
    };
  },
  props: {
    article: Object
  },
  created() {
    this.isSupport =
      localStorage.getItem("supportArr") &&
      JSON.parse(localStorage.getItem("supportArr"));
    if (this.isSupport && this.isSupport.indexOf(this.article.id) !== -1) {
      this.zan = true;
    }
  },
  methods: {
    clickZan() {
      if (!this.zan) {
        if (!this.isSupport) {
          this.$http(
            `zan/${this.article.id}`,
            { params: { support: parseInt(this.article.support) } },
            res => {
              if (res.data.code === 200) {
                this.zan = true;
                let arr = [];
                arr.push(parseInt(this.article.id));
                localStorage.setItem("supportArr", JSON.stringify(arr));
              } else {
                this.$toast(res.data.message);
              }
            }
          );
        } else {
          if (this.isSupport.indexOf(this.article.id) === -1) {
            this.$http(
              `zan/${this.article.id}`,
              { params: { support: parseInt(this.article.support) } },
              res => {
                if (res.data.code === 200) {
                  this.zan = true;
                  this.isSupport.push(parseInt(this.article.id));
                  localStorage.setItem(
                    "supportArr",
                    JSON.stringify(this.isSupport)
                  );
                } else {
                  this.$toast(res.data.message);
                }
              }
            );
          } else {
            this.$toast("你已经点过赞了哟");
          }
        }
      } else {
        this.$toast("你已经点过赞了哟");
      }
    },
    forward() {
      this.$toast("转发功能正在开发中...转发请复制链接转发哦");
    }
  },
  components: {
    Comments
  }
};
</script>

<style lang="scss" scoped>
.author_box {
    border-bottom: 1px dashed rgb(153, 162, 170);
  }
  .article_content {
    font: 14px 宋体, arial narrow, HELVETICA !important;
    line-height: 1.5;
    // overflow-x: scroll;
  }
  .article_handle {
    border-top: 1px solid #dddcdb;
    box-shadow: #999 2px 2px 3px;
  }

</style>