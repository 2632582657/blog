<template>
  <div id="blog_detail" class="blog_detail container">
    <div class="row h-100">
      <div
        class="col-xl-4 col-lg-4 col-md-4 py-0 p-sm-0 p-md-3 p-xl-4 p-lg-4 d-none d-md-block d-xl-block d-lg-block"
      >
        <Side></Side>
      </div>
      <div class="col-xl-8 col-lg-8 col-md-8 p-0 pt-0 pt-sm-5 pt-md-3 pt-xl-4 pt-lg-4">
        <Content v-if="article" :article="article"></Content>
        <div v-if="!article">
          <div class="card" style="opacity:.9">
            <div class="card-body text-info">
              <i class="fa fa-spin fa-spinner"></i>
              正在加载...请稍候...
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Side from "../../components/side";
import Content from "../../components/content";

export default {
  name: "detail",
  data() {
    return {
      article: null,
      id: this.$route.query.id
    };
  },
  created() {
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
    }
  },
  components: {
    Side,
    Content
  }
};
</script>

<style lang="scss" scoped>
</style>
