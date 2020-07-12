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
          placeholder="userName"
          v-model="keyWords.userName"
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
        <button
          data-toggle="modal"
          data-target="#updateBox"
          class="btn btn-secondary btn-sm text-white rounded ml-2"
          @click="changeSubmit()"
        >添加友链</button>
      </div>
    </div>
    <div id="table">
      <table class="table table-responsive-sm table-borderless">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">用户名</th>
            <th scope="col">默认头像</th>
            <th scope="col">头像链接</th>
            <th scope="col">地址</th>
            <th scope="col">介绍</th>
            <th scope="col">记录时间</th>
            <th scope="col">状态</th>
            <th scope="col">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="border-top border-bottom border-info cur"
            v-for="(item,i) in flinkList"
            :key="i"
          >
            <td v-text="item.id"></td>
            <td v-text="item.name"></td>
            <td v-text="item.avatar ? item.avatar:'无'"></td>
            <td v-text="item.avatar_link ? item.avatar_link :'暂无'"></td>
            <td v-text="item.address"></td>
            <td v-text="item.info?item.info:'这个人很懒~暂时没有介绍'"></td>
            <td v-text="item.create_time"></td>
            <td
              :class="item.status?'text-success':'text-warning'"
              v-text="item.status ? '正常' : '禁用'"
            ></td>
            <td class="d-flex justify-content-center">
              <button
                :class="'btn mr-2 btn-sm text-white '+(item.status?'btn-success':'btn-warning')"
                @click="updateStatus(i)"
              >{{item.status? '正常':'禁用'}}</button>
              <button
                class="btn btn-info mr-2 btn-sm"
                data-toggle="modal"
                data-target="#updateBox"
                @click="toUpdateFlink(i)"
              >修改</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="flinkList.length===0" class="my-5 text-warning text-center">
        <span class="fa fa-warning"></span> 暂无结果
      </div>
    </div>
    <Pagination :control={center:1} v-if="flinkList&&flinkList.length!==0" :result="result" @func="func" />
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
            <h5 class="modal-title" id="exampleModalLabel">友链信息修改</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="clearUserInfo()"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form class="d-flex flex-wrap text-left">
              <div class="form-group col-6">
                <label for="recipient-name" class="col-form-label">昵称</label>
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
              <div class="form-group col-6">
                <label for="message-text" class="col-form-label">默认头像</label>
                <input
                  type="number"
                  maxlength="15"
                  minlength="1"
                  class="form-control form-control-sm"
                  v-model="userInfo.avatar"
                />
              </div>
              <div class="form-group col-6">
                <label for="message-text" class="col-form-label">头像链接</label>
                <input
                  type="link"
                  maxlength="64"
                  class="form-control form-control-sm"
                  v-model="userInfo.avatar_link"
                />
              </div>
              <div class="form-group col-6">
                <label for="message-text" class="col-form-label">介绍</label>
                <input
                  type="text"
                  maxlength="64"
                  class="form-control form-control-sm"
                  v-model="userInfo.info"
                />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary btn-sm"
              data-dismiss="modal"
              @click="clearUserInfo()"
            >关闭</button>
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
  name: "frm", //友链管理
  data() {
    return {
      result: {},
      flinkList: [],
      keyWords: {
        id: "",
        userName: ""
      },
      userInfo: {
        name: "",
        address: "",
        avatar_link: "",
        avatar: "",
        info: ""
      },
      copy: {},
      isSearch: false,
      flinkIndex: 0,
      isSubmit: false
    };
  },
  created() {
    this.getFlink(null, res => {
      this.flinkList = res.data.flinkList;
      this.result = res.data.page;
    });
  },
  methods: {
    changeSubmit() {
      this.isSubmit = true;
    },
    back() {
      this.getFlink(null, res => {
        this.flinkList = res.data.flinkList;
        this.result = res.data.page;
        this.isSearch = false;
      });
    },
    func(page) {
      if (this.isSearch) {
        this.search(page);
      } else {
        this.getFlink({page:page}, res => {
          this.flinkList = res.data.flinkList;
          this.result = res.data.page;
          this.isSearch = false;
        });
      }
    },
    getFlink(params, callback) {
      this.$http("getFlink?adm=1", { params: params }, res => {
        if (res.data.code === 200) {
          callback(res.data);
        }
      });
    },
    search(page = 1) {
      if (!this.keyWords.id && !this.keyWords.userName) {
        this.$toast("请输入关键字");
        return;
      } else {
        let copy = { ...this.keyWords };
        for (let key in copy) {
          if (copy[key] === "") {
            delete copy[key];
          }
        }
        this.getFlink({ search: 1, page: page, ...copy }, res => {
          this.flinkList = res.data.flinkList;
          this.result = res.data.page;
          this.isSearch = true;
        });
      }
    },
    getFlinkOfId(flinkId, callback) {
      this.$http(`getFlink/${flinkId}/?adm=1`, res => {
        if (res.data.code === 200) {
          callback(res.data);
        }
      });
    },
    toUpdateFlink(i) {
      this.isSubmit = false;
      this.flinkIndex = i;
      this.getFlinkOfId(this.flinkList[i].id, res => {
        this.userInfo = res.data;
        this.copy = { ...this.userInfo };
      });
    },
    updateFlink() {
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
        `updateFlink/${this.flinkList[this.flinkIndex].id}`,
        { method: "put", data: obj },
        res => {
          if (res.data.code === 200) {
            this.$("#updateBox").modal("hide");
            this.$toast("修改成功");
            this.clearUserInfo();
            for (let key in this.flinkList[this.flinkIndex]) {
              if (obj[key]) {
                this.flinkList[this.flinkIndex][key] =
                  key === "avatar" ? parseInt(obj[key]) : obj[key];
              }
            }
          } else {
            this.$toast("修改失败");
          }
        }
      );
    },
    updateStatus(i) {
      let status = this.flinkList[i].status ? 0 : 1;
      this.$http(
        `updateFlinkStatus/${this.flinkList[i].id}`,
        { method: "put", data: { status: status } },
        res => {
          if (res.data.code === 200) {
            this.flinkList[i].status = status;
          } else {
            this.$toast("修改状态失败");
          }
        }
      );
    },
    clearUserInfo() {
      this.userInfo.name = "";
      this.userInfo.address = "";
      this.userInfo.avatar_link = "";
      this.userInfo.avatar = "";
      this.userInfo.info = "";
    },
    submit() {
      if (this.userInfo.name) {
        if (this.userInfo.name.length > 10 || this.userInfo.name.length < 2) {
          this.$toast("昵称在2-10位之间");
          return;
        }
      } else {
        this.$toast("请填写昵称");
      }
      if (this.userInfo.address ? this.userInfo.address.length > 128 : true) {
        this.$toast("网址不符合规范");
        return;
      }
      if (this.userInfo.avatar) {
        if (this.userInfo.avatar > 15 || this.userInfo.avatar < 1 || this.userInfo.avatar % 1!==0) {
          this.$toast("默认头像为1-15的整数");
          return;
        }
      } else {
        this.$toast("默认头像不能为空");
        return;
      }
      if (
        this.userInfo.avatar_link
          ? this.userInfo.avatar_link.length > 128
          : false
      ) {
        this.$toast("头像链接不符合规范");
        return;
      }
      if (this.userInfo.info ? this.userInfo.info.length > 64 : false) {
        this.$toast("介绍不符合规范");
        return;
      }
      let result={...this.userInfo};
      if (this.isSubmit) {
        this.$http("addFlink", { method: "post", data: this.userInfo }, res => {
          if(res.data.code===200){
            result.id=res.data.data.id;
            result.create_time=res.data.data.create_time;
            result.status=1;
            this.flinkList.unshift(result);
            this.$toast('添加成功');
            this.$("#updateBox").modal("hide");
            this.isSubmit=false;
          }
        });
      } else {
        this.updateFlink();
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
th,
td {
  min-width: 120px;
  max-width: 150px;
  word-wrap: break-word;
}
#table {
  width: 100%;
  overflow-x: scroll;
}
</style>