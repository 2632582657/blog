<template>
  <div>
    <div class="row mb-3">
      <div class="col-12 col-md-6 px-2 mb-2">
        <input
          type="text"
          maxlength="15"
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
          placeholder="userId"
          v-model="keyWords.userId"
          @keyup.enter="search()"
        />
      </div>
      <div class="col-12 col-md-6 px-2 mb-2">
        <input
          type="text"
          minlength="1"
          maxlength="20"
          class="form-control form-control-sm rounded-0"
          placeholder="articleId"
          v-model="keyWords.articleId"
          @keyup.enter="search()"
        />
      </div>
      <div class="col-12 col-md-6 px-2 mb-2">
        <input
          type="text"
          minlength="1"
          maxlength="20"
          class="form-control form-control-sm rounded-0"
          placeholder="content"
          v-model="keyWords.content"
          @keyup.enter="search()"
        />
      </div>
      <div class="col px-2 text-left">
        <button @click="search()" class="btn btn-secondary btn-sm text-white rounded">查找</button>
        <button
          v-show="isSearch"
          @click="back()"
          class="btn btn-secondary btn-sm text-white rounded ml-2"
        >返回</button>
      </div>
    </div>
    <div id="table">
      <table class="table table-responsive-sm table-borderless table-sm">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">用户id</th>
            <th scope="col">用户名</th>
            <th scope="col">文章id</th>
            <th scope="col">文章标题</th>
            <th scope="col">内容</th>
            <th scope="col">记录时间</th>
            <th scope="col">状态</th>
            <th scope="col">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-top border-bottom border-info" v-for="(item,i) in commentList" :key="i">
            <td v-text="item.id"></td>
            <td v-text="item.user_id"></td>
            <td v-text="item.user_name"></td>
            <td v-text="item.article_id"></td>
            <td v-text="item.title"></td>
            <td v-text="item.content"></td>
            <td v-text="item.create_time"></td>
            <td :class="item.status?'text-success':'text-warning'">{{item.status? '正常':'待审核'}}</td>
            <td class="d-flex justify-content-center">
              <button
                :class="'btn mr-2 btn-sm text-white '+(item.status?'btn-success':'btn-warning')"
                @click="updateStatus(i)"
              >{{item.status? '正常':'审核'}}</button>
              <button class="btn btn-info mr-2 btn-sm" @click="deleteComment(i)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="commentList.length===0" class="my-5 text-warning text-center">
        <span class="fa fa-warning"></span> 暂无结果
      </div>
    </div>
    <Pagination
      :control="{center:1}"
      v-if="commentList&&commentList.length!==0"
      :result="result"
      @func="func"
    />
  </div>
</template>

<script>
import Pagination from "@/components/pagination.vue";

export default {
  name: "cm", //评论管理
  data() {
    return {
      result: {},
      keyWords: {
        id: "",
        userId: "",
        articleId: "",
        content: ""
      },
      commentList: [],
      isSearch: false
    };
  },
  created() {
    this.getComment(null, res => {
      this.commentList = res.data.commentList;
      this.result = res.data.page;
      this.isSearch = false;
    });
  },
  methods: {
    func(page) {
      if (this.isSearch) {
        this.search(page);
      } else {
        this.getComment({ page }, res => {
          this.commentList = res.data.commentList;
          this.result = res.data.page;
          this.isSearch = false;
        });
      }
    },
    back() {
      this.getComment(null, res => {
        this.commentList = res.data.commentList;
        this.result = res.data.page;
        this.isSearch = false;
      });
    },
    getComment(params, callback) {
      this.$http("getComment?adm=1", { params }, res => {
        if (res.data.code === 200) {
          callback(res.data);
        }
      });
    },
    search(page = 1) {
      if (
        !this.keyWords.id &&
        !this.keyWords.userId &&
        !this.keyWords.articleId &&
        !this.keyWords.content
      ) {
        this.$toast("请输入关键字");
        return;
      } else {
        let copy = { ...this.keyWords };
        for (let key in copy) {
          if (copy[key] === "") {
            delete copy[key];
          }
        }
        this.getComment({ search: 1, page, ...copy }, res => {
          this.commentList = res.data.commentList;
          this.result = res.data.page;
          this.isSearch = true;
        });
      }
    },
    updateStatus(i) {
      let status = this.commentList[i].status ? 0 : 1;
      this.$http(
        `updateStatus/${this.commentList[i].id}`,
        { method: "put", data: { status } },
        res => {
          if (res.data.code === 200) {
            this.commentList[i].status = status;
          } else {
            this.$toast("修改状态失败");
          }
        }
      );
    },
    deleteComment(i) {
      if (confirm("是否删除当前评论?")) {
        this.$http(`deleteComment/${this.commentList[i].id}`, res => {
          if (res.data.code === 200) {
            this.$toast("删除成功");
            this.commentList.splice(i, 1);
          } else {
            this.$toast("删除失败");
          }
        });
      }
    }
  },
  components: {
    Pagination
  }
};
</script>

<style lang="scss" scoped>
th,
td {
  min-width: 120px;
}
#table {
  width: 100%;
  overflow-x: scroll;
}
</style>
