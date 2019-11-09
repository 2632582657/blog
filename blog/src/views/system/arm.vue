<template>
  <div>
    <div class="row mb-3">
      <div class="col-12 col-md-6 px-2 mb-3">
        <input
          type="text"
          minlength="5"
          maxlength="10"
          class="form-control form-control-sm rounded-0"
          placeholder="ID"
          v-model="keyWords.id"
          @keyup.enter="search()"
        />
      </div>
      <div class="col-12 col-md-6 px-2 mb-2">
        <input
          type="text"
          minlength="1"
          maxlength="20"
          class="form-control form-control-sm rounded-0"
          placeholder="Name"
          v-model="keyWords.title"
          @keyup.enter="search()"
        />
      </div>
      <div class="col px-2 text-left">
        <button @click="search()" class="btn btn-secondary btn-sm text-white rounded-0">查找</button>
      </div>
    </div>
    <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
      <li class="nav-item border small mr-2" v-for="(item,i) in cate" :key="i">
        <a
          :class="'nav-link '+(i===activeCate ? ' active' : '')"
          id="pills-profile-tab"
          data-toggle="pill"
          href="#table"
          role="tab"
          v-text="item.name"
          @click="handleCateClick(i)"
        ></a>
      </li>
    </ul>
    <div class="tab-content" id="pills-tabContent">
      <div
        class="tab-pane fade show active"
        id="table"
        role="tabpanel"
        aria-labelledby="pills-home-tab"
      >
        <table class="table table-responsive-sm table-borderless w-100">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">标题</th>
              <th scope="col">分类</th>
              <th scope="col">时间</th>
              <th scope="col">热度</th>
              <th scope="col">赞</th>
              <th scope="col">评论</th>
              <th scope="col">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="border-top border-bottom border-info cur"
              v-for="(item,i) in articleList"
              :key="i"
              @click="toEditPage(i)"
            >
              <th scope="row" v-text="item.id"></th>
              <td class="elli" v-text="item.title"></td>
              <td v-text="cateTurn(item.category_id)"></td>
              <td class="small" v-text="item.create_time"></td>
              <td v-text="item.hot"></td>
              <td v-text="item.support"></td>
              <td v-text="item.comment_count"></td>
              <td class="d-flex justify-content-center">
                <button
                  v-if="item.category_id"
                  class="btn btn-info mr-2 btn-sm"
                  @click.stop="deleteArticle(i)"
                >删除</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="articleList.length===0" class="my-5 text-warning text-center">
          <span class="fa fa-warning"></span> 暂无结果
        </div>
      </div>
    </div>
    <!-- <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Previous</span>
          </a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#">1</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#">2</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#">3</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>-->
    <Pagination :result="result" @func="func" v-if="articleList.length!==0" />
  </div>
</template>

<script>
import AdminSide from "../system/adminSide";
import Pagination from "@/components/pagination.vue";
export default {
  name: "arm", //文章管理
  data() {
    return {
      result: {},
      articleList: [],
      cate: [],
      activeCate: 0,
      keyWords: {
        id: "",
        title: ""
      }
    };
  },
  created() {
    this.$http("getCate", res => {
      if (res.data.code === 200) {
        this.cate = res.data.data;
        this.cate.push({ id: null, name: "特殊" });
        this.cate.forEach((item, i) => {
          if (this.$route.query.cate === item.id) {
            this.activeCate = i;
          }
        });
        this.getArticleOfCateId(this.cate[this.activeCate].id, null, resp => {
          this.articleList = resp.data.articleInfo;
          this.result = resp.data.page;
        });
      }
    });
  },
  methods: {
    cateTurn(id){
      let cateName;
      this.cate.forEach((item,i)=>{
        if(id===item.id){
          cateName=item.name
        }
      })
      return cateName;
    },
    //分页器触发这个方法 每次点击都会请求当前页的数据 根据下面保存的当前分类下标获取当前分类id
    func(page) {
      // this.result.current_page = page;
      this.getArticleOfCateId(this.cate[this.activeCate].id, page, res => {
        this.articleList = res.data.articleInfo;
        this.result = res.data.page;
      });
    },
    //点击导航将当前下标保存 请求第一页数据
    handleCateClick(i) {
      this.activeCate = i;
      this.getArticleOfCateId(this.cate[i].id, null, res => {
        this.articleList = res.data.articleInfo;
        this.result = res.data.page;
      });
    },
    //根据分类id和页码获取文章
    getArticleOfCateId(cateId, page, callback) {
      this.$http(
        "/getArticle?adm=1",
        { params: { cateId: cateId, page: page } },
        res => {
          if (res.data.code === 200) {
            callback(res.data);
          }
        }
      );
    },
    deleteArticle(i) {
      if (this.articleList[i].category_id) {
        if (confirm("确定要删除吗")) {
          this.$http(
            "deleteArticle?adm=1",
            { params: { articleId: this.articleList[i].id } },
            res => {
              console.log(res);
              if (res.data.code === 200) {
                this.$toast("删除成功");
                this.articleList.splice(i, 1);
              } else {
                this.$toast(res.data.message | "删除失败");
              }
            }
          );
        }
      } else {
        this.$toast("特殊文章无法删除");
      }
    },
    search(page = 1) {
      if (!this.keyWords.id && !this.keyWords.title) {
        this.$toast('请输入关键字');
        return;
      }else{
        let copy={...this.keyWords}
        for(let key in copy){
          if(copy[key]===""){
            delete copy[key]
          }
        }
        this.$http(
          "/getArticle?adm=1",
          { params: {search:1,page: page, ...copy}},
          res => {
            console.log(res.data.data)
            if(res.data.code===200){
               this.articleList = res.data.data.articleInfo;
               this.result = res.data.data.page;
            }
          }
        );
      }
    },
    toEditPage(i) {
      if (this.articleList[i].category_id) {
        this.$router.push({
          path: "/admin/edit",
          query: { articleId: this.articleList[i].id }
        });
      }
    }
  },
  components: {
    AdminSide,
    Pagination
  }
};
</script>

<style lang="scss" scoped>
th {
  font-weight: 700;
}
th,
td {
  max-width: 160px;
  min-width: 120px;
}
#table {
  width: 100%;
  overflow-x: scroll;
}
</style>