<template>
  <div id="blog_album" class="container p-0 pt-xl-3">
    <PageHead :componentName="componentName"></PageHead>
    <div
      class="row album_body m-0 pt-xl-3 pt-lg-3 pt-md-3 pt-3 mb-5 px-3 border-0"
      :style="ablumList && ablumList.length===0?'min-height:50vh' :''"
    >
      <!-- <div :class="'d-flex'+ablumList && ablumList.length===0? 'w-100' : ''"> -->
      <div
        v-for="(item,i) in ablumList"
        :key="i"
        @click="toDetail(item.id)"
        class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 mb-3 album_item"
      >
        <img :src="item.cover" class="w-100 h-100" />
        <div class="album_mask text-left font-weight-bold">
          <p class="m-0">
            {{item.title}}
            <span class="time d-block text-secondary">
              <i></i>
              {{item.create_time}}
            </span>
          </p>
          <div class="card_zan w-100 mt-2 small">
            <span class="text-secondary cur">
              <i class="fa fa-eye"></i>
              {{item.hot}}
            </span>
            <span class="text-secondary ml-3 cur">
              <i class="fa fa-commenting-o"></i>
              {{item.comment_count}}
            </span>
            <span class="text-secondary ml-3 cur">
              <i class="fa fa-heart-o"></i>
              {{item.support}}
            </span>
          </div>
        </div>
      </div>
      <div v-if="ablumList && ablumList.length===0" class="w-100 mb-3">
        <div class="card" style="opacity:.9">
          <div class="card-body text-info">
            <i class="fa fa-calendar-o"></i>
            暂无文章
          </div>
        </div>
      </div>
      <!-- </div> -->

      <Pagination
        class="w-100"
        :control="{center:1,sm:1}"
        :result="result"
        @func="func"
        v-if="ablumList&&ablumList.length!==0"
      />
    </div>
  </div>
</template>

<script>
import PageHead from "../../components/pageHead";
import Pagination from "@/components/pagination.vue";

export default {
  name: "album", //相册
  data() {
    return {
      componentName: {
        title: "相册",
        introduce: "一句话影集......"
      },
      ablumList: [],
      result: {}
    };
  },
  created() {
    this.getAblum({ page: 1, cateId: 10001 }, res => {
      this.ablumList = res.data.articleInfo;
      this.result = res.data.page;
    });
  },
  methods: {
    func(page) {
      this.getAblum({ page, cateId: 10001 }, res => {
        this.ablumList = res.data.articleInfo;
        this.result = res.data.page;
      });
    },
    getAblum(params, callback) {
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
    PageHead,
    Pagination
  }
};
</script>

<style lang="scss" scoped>
#blog_album {
  overflow: hidden;
  .album_body {
    background: rgba(255, 255, 255, 0.5);
    .album_item {
      &:hover .album_mask {
        // left: 0.5rem;
        opacity: 1;
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
        left: 0.5rem;
        // border-radius: 8px;
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
        background: rgba(0, 0, 0, 0.7);
        transition: all 0.3s linear;
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: #fff;
        padding-left: 20%;
        opacity: 0;
        .time {
          font-size: 12px;
        }
      }
    }
  }
}
</style>
