<template>
  <div id="blog_index" class="container mt-0">
    <div class="row h-100 pt-2">
      <div class="col-xl-4 col-lg-4 col-md-4">
        <Side></Side>
      </div>
      <div class="col-xl-8 col-lg-8 col-md-8">
        <!-- fixed me  轮播自适应图片 -->
        <div
          id="carouselExampleIndicators"
          :class="'carousel slide carousel-fade ' + (articleList.length!==0 ? 'mb-4' : '')"
          data-ride="carousel"
          data-interval="3000"
        >
          <ol class="carousel-indicators">
            <li
              data-target="#carouselExampleIndicators"
              :data-slide-to="i"
              :class="activeIndex===i?'active':''"
              v-for="(item,i) in hotList "
              :key="i"
            ></li>
          </ol>
          <div class="carousel-inner overflow-hidden h-100">
            <div
              :class="'carousel-item overflow-hidden h-100 '+(activeIndex===i ? 'active' : '') "
              v-for="(item,i) in hotList"
              :key="i"
              @click="toDetail(item.id)"
            >
              <img class="d-block w-100" style="max-height:380px" :src="item.cover" />
              <div class="carousel-caption d-none d-md-none d-xl-block d-lg-none">
                <h5 v-text="item.title" class="mb-0"></h5>
              </div>
            </div>
          </div>
          <a
            class="carousel-control-prev"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a
            class="carousel-control-next"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
        <!-- 卡片 -->
        <Card v-for="(item,i) in articleList" :key="i" :articleInfo="item"></Card>
        <div v-if="articleList && articleList.length===0">
          <div class="card" style="opacity:.9">
            <div class="card-body text-info">
              <i class="fa fa-calendar-o"></i>
              暂无文章
            </div>
          </div>
        </div>
        <Pagination
          class="w-100"
          :control="{center:1,sm:1}"
          :result="result"
          @func="func"
          v-if="articleList&&articleList.length!==0"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Card from "../../components/card";
import Side from "../../components/side";
import Pagination from "@/components/pagination.vue";

export default {
  data() {
    return {
      articleList: [],
      hotList: [],
      activeIndex: 0,
      result: {},
      keyword: this.$route.query.keyword
    };
  },
  created() {
    this.getArticle(null, res => {
      this.articleList = res.data.articleInfo;
      this.result = res.data.page;
    });
    this.$http("hot", res => {
      if (res.data.code === 200) {
        this.hotList = res.data.data;
      }
    });
    if (this.keyword) {
      this.$http(
        "getArticle",
        { params: { search: 1, title: this.keyword } },
        res => {
          if (res.data.code === 200) {
            this.articleList = res.data.data.articleInfo;
          }
        }
      );
    }
  },
  watch: {
    $route(route) {
      if (route.query.keyword) {
        this.$http(
          "getArticle",
          { params: { search: 1, title: route.query.keyword } },
          res => {
            if (res.data.code === 200) {
              this.articleList = res.data.data.articleInfo;
            }
          }
        );
      }
    }
  },
  methods: {
    func(page) {
      this.getArticle({ page }, res => {
        this.articleList = res.data.articleInfo;
        this.result = res.data.page;
      });
    },
    getArticle(params, callback) {
      this.$http("getArticle", { params }, res => {
        if (res.data.code === 200) {
          callback(res.data);
        }
      });
    },
    toDetail(id) {
      this.$router.push({
        path: "/detail",
        query: { id }
      });
    }
  },
  components: {
    Card,
    Side,
    Pagination
  }
};
</script>

<style lang="scss" scoped>
#blog_index {
  min-height: 100%;
  // padding-bottom: 60px;
}
</style>
