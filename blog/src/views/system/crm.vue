<template>
  <div>
    <div class="row mb-3">
      <div class="col-12 col-md-4 px-2 mb-3">
        <input
          type="text"
          maxlength="15"
          class="form-control form-control-sm rounded-0"
          placeholder="ID"
          v-model="keyWords.id"
          @keyup.enter="search()"
        />
      </div>
      <div class="col-12 col-md-4 px-2 mb-2">
        <input
          type="text"
          minlength="1"
          maxlength="20"
          class="form-control form-control-sm rounded-0"
          placeholder="Name"
          v-model="keyWords.name"
          @keyup.enter="search()"
        />
      </div>
      <div class="col-12 col-md-4 px-2 mb-2">
        <input
          type="email"
          minlength="1"
          maxlength="20"
          class="form-control form-control-sm rounded-0"
          placeholder="Email"
          v-model="keyWords.email"
          @keyup.enter="search()"
        />
      </div>
      <div class="col px-2 text-left">
        <button @click="search()" class="btn btn-secondary btn-sm text-white rounded">查找</button>
        <button v-show="isSearch" @click="back()" class="btn btn-secondary btn-sm text-white rounded ml-2">返回</button>
      </div>
    </div>
    <div id="table">
      <table class="table table-responsive-sm table-borderless">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">昵称</th>
            <th scope="col">邮箱</th>
            <th scope="col">头像</th>
            <th scope="col">网址</th>
            <th scope="col">记录时间</th>
            <th scope="col">状态</th>
            <th scope="col">修改</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-top border-bottom border-info" v-for="(item,i) in userList" :key="i">
            <th scope="row" v-text="item.id"></th>
            <td v-text="item.name"></td>
            <td v-text="item.email"></td>
            <td v-text="item.avatar"></td>
            <td v-text="item.address?item.address:'暂无'"></td>
            <td v-text="item.create_time"></td>
            <td :class="item.status?'text-success':'text-warning'">{{item.status? '正常':'黑名单'}}</td>
            <td class="d-flex justify-content-center">
              <button
                class="btn btn-info mr-2 btn-sm"
                data-toggle="modal"
                data-target="#updateBox"
                @click="toUpdateUser(i)"
              >修改</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="userList.length===0" class="my-5 text-warning text-center">
        <span class="fa fa-warning"></span> 暂无结果
      </div>
    </div>
    <Pagination :control={center:1} v-if="userList.length!==0" :result="result" @func="func" />
    <div
      class="modal fade"
      id="updateBox"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">用户信息修改</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form class="d-flex flex-wrap text-left">
              <div class="form-group col-6">
                <label for="recipient-name" class="col-form-label">用户名</label>
                <input
                  type="text"
                  maxlength="15"
                  class="form-control form-control-sm"
                  v-model="userInfo.name"
                />
              </div>
              <div class="form-group col-6">
                <label for="message-text" class="col-form-label">网址</label>
                <input
                  type="link"
                  maxlength="64"
                  class="form-control form-control-sm"
                  v-model="userInfo.address"
                />
              </div>
              <div class="form-group text-left col-6">
                <label for="recipient-name" class="col-form-label">头像</label>
                <input
                  type="number"
                  min="1"
                  max="15"
                  class="form-control form-control-sm"
                  v-model="userInfo.avatar"
                />
              </div>
              <div class="form-group col-12">
                <label for="message-text" class="col-form-label">状态</label>
                <input
                  type="number"
                  min="0"
                  max="1"
                  class="form-control form-control-sm"
                  v-model="userInfo.status"
                />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-primary btn-sm" @click="submit()">提交</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminSide from "../system/adminSide";
import Pagination from "@/components/pagination.vue";
export default {
  name: "crm", //客户管理
  data() {
    return {
      result: { currentPage: 1, pageCount: 15 },
      userList: [],
      userInfo: {
        name: "",
        address: "",
        avatar: 0,
        status: 0
      },
      copy: {},
      keyWords: {
        id: "",
        name: "",
        email: ""
      },
      isSearch: false,
      userIdIndex: 0
    };
  },
  created() {
    this.getUser(null, res => {
      this.userList = res.data.userList;
      this.result = res.data.page;
      this.isSearch = false;
    });
  },
  methods: {
    back() {
      this.getUser(null, res => {
        this.userList = res.data.userList;
        this.result = res.data.page;
        this.isSearch = false;
      });
    },
    func(page) {
      if (this.isSearch) {
        this.search(page);
      } else {
        this.getUser({ page: page }, res => {
          this.userList = res.data.userList;
          this.result = res.data.page;
          this.isSearch = false;
        });
      }
    },
    getUser(params, callback) {
      this.$http("getUser?adm=1", { params: params }, res => {
        if (res.data.code === 200) {
          callback(res.data);
        }
      });
    },
    search(page = 1) {
      if (!this.keyWords.id && !this.keyWords.name && !this.keyWords.email) {
        this.$toast("请输入关键字");
        return;
      } else {
        let copy = { ...this.keyWords };
        for (let key in copy) {
          if (copy[key] === "") {
            delete copy[key];
          }
        }
        this.getUser({ search: 1,page:page,...copy }, res => {
          this.userList = res.data.userList;
          this.result = res.data.page;
          this.isSearch = true;
        });
      }
    },
    getUserOfId(userId, callback) {
      this.$http(`getUser/${userId}/?adm=1`, res => {
        if (res.data.code === 200) {
          callback(res.data);
        }
      });
    },
    toUpdateUser(i) {
      this.userIdIndex = i;
      this.getUserOfId(this.userList[i].id, res => {
        this.userInfo = res.data;
        this.copy = { ...this.userInfo };
      });
    },
    submit() {
      if (!this.userInfo.name ) {
        this.$toast("用户名不能为空");
        return;
      }
      if (this.userInfo.address ? this.userInfo.address.length > 64 : false) {
        this.$toast("网址不符合规范");
        return;
      }
      if (
        this.userInfo.avatar === "" ||
        this.userInfo.avatar > 15 ||
        this.userInfo.avatar < 0 ||
        this.userInfo.avatar % 1 !== 0
      ) {
        this.$toast("选择有效的头像 介于1~15之间");
        return;
      }
      if (
        this.userInfo.status === "" ||
        this.userInfo.status > 1 ||
        this.userInfo.status < 0 ||
        this.userInfo.status % 1 !== 0
      ) {
        this.$toast("状态为0或1");
        return;
      }
      let obj = {};
      for (let key in this.copy) {
        if (this.userInfo[key] !== this.copy[key]) {
          obj[key] = this.userInfo[key];
        }
      }
      if (JSON.stringify(obj) === "{}") {
        this.$toast("没有要修改的信息");
        return;
      }
      this.$http(
        `updateUser/${this.userList[this.userIdIndex].id}`,
        { method: "put", data: obj },
        res => {
          if (res.data.code === 200) {
            this.$("#updateBox").modal("hide");
            this.$toast("修改成功");
            console.log(this.userList[this.userIdIndex]);
            for (let key in this.userList[this.userIdIndex]) {
              if (obj[key]) {
                this.userList[this.userIdIndex][key] =
                  key === "status" ? parseInt(obj[key]) : obj[key];
              }
            }
          } else {
            this.$toast("修改失败");
          }
        }
      );
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
  min-width: 120px;
  max-width: 160px;
}
#table {
  width: 100%;
  overflow-x: scroll;
}
</style>