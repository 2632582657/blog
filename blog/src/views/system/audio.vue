<template>
  <div>
    <div class="row mb-3">
      <div class="col-12 col-md-4 px-2 mb-2">
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
          placeholder="Author"
          v-model="keyWords.author"
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
          data-target="#audioModal"
          class="btn btn-secondary btn-sm text-white rounded ml-2"
        >添加歌曲</button>
      </div>
    </div>
    <div id="table">
      <table class="table table-responsive-sm table-borderless">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">名称</th>
            <th scope="col">作者</th>
            <th scope="col">记录时间</th>
            <th scope="col">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-top border-bottom border-info" v-for="(item,i) in audioList" :key="i">
            <th scope="row" v-text="item.id"></th>
            <td v-text="item.name"></td>
            <td v-text="item.author"></td>
            <td v-text="item.create_time"></td>
            <td class="d-flex justify-content-center align-items-center">
              <button
                class="btn btn-info mr-2 btn-sm"
                data-toggle="modal"
                data-target="#updateBox"
                @click="deleteAudio(i)"
              >删除</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="audioList.length===0" class="my-5 text-warning text-center">
        <span class="fa fa-warning"></span> 暂无结果
      </div>
    </div>
    <Pagination
      :control="{center:1}"
      v-if="audioList&&audioList.length!==0"
      :result="result"
      @func="func"
    />
    <div class="modal fade" id="audioModal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="audioModalTitle">上传歌曲信息</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body text-left">
            <div>
              <div class="form-group">
                <label for="audioName">歌曲名称</label>
                <input
                  id="audioName"
                  type="text"
                  class="form-control"
                  placeholder="请输入歌曲名称"
                  minlength="1"
                  maxlength="15"
                  required
                  v-model="audio.name"
                  @blur="audioChange"
                />
              </div>
              <div class="form-group">
                <label for="audioAvatar">歌曲作者</label>
                <input
                  id="audioAuthor"
                  type="text"
                  class="form-control"
                  placeholder="请输入作者"
                  minlength="1"
                  maxlength="15"
                  required
                  v-model="audio.author"
                />
              </div>
              <div class="form-group">
                <label for="audioAvatar">歌曲封面链接</label>
                <input
                  id="audioCover"
                  type="text"
                  class="form-control"
                  placeholder="请输入封面链接"
                  required
                  v-model="audio.audioCover"
                />
              </div>
              <div class="form-group">
                <label for="audioAvatar">歌曲文件链接</label>
                <input
                  id="audioFileName"
                  type="text"
                  class="form-control"
                  placeholder="请输入歌曲文件链接"
                  required
                  v-model="audio.audioFileName"
                />
              </div>
              <div class="form-group">
                <label for="audioAvatar">歌词文件链接</label>
                <input
                  id="audioLrcName"
                  type="text"
                  class="form-control"
                  placeholder="请输入歌曲文件链接"
                  required
                  v-model="audio.audioLrcName"
                />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="submit()" :disabled="!isRepeat">提交</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/pagination.vue";

export default {
  name: "radio",
  data() {
    return {
      result: {},
      keyWords: {
        //搜索关键字
        id: "",
        name: "",
        author: ""
      },
      audio: {
        //歌曲信息表单
        name: "",
        author: "",
        audioCover: "",
        audioFileName: "",
        audioLrcName: ""
      },
      audioList: [],
      isSearch: false, //是否是搜索
      isHave: true, //歌曲是否存在
      isRepeat: true,
      reg: /((https|http):\/\/)(([a-zA-Z0-9\._-]+\.[a-zA-Z]{2,6})|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,4})*(\/[a-zA-Z0-9\&%_\./-~-]*)?/
    };
  },
  created() {
    this.getAudio(null, res => {
      this.audioList = res.data.audioList;
      this.result = res.data.page;
    });
  },
  methods: {
    func(page) {
      if (this.isSearch) {
        this.search(page);
      } else {
        this.getAudio({ page }, res => {
          this.audioList = res.data.audioList;
          this.result = res.data.page;
          this.isSearch = false;
        });
      }
    },
    getAudio(params, callback) {
      this.$http("getAudio?adm=1", { params }, res => {
        if (res.data.code === 200) {
          callback(res.data);
        }
      });
    },
    audioChange(e) {
      if (this.audio.name !== "") {
        this.$http(
          "/audio",
          { method: "post", data: { name: this.audio.name } },
          res => {
            if (res.data.code === 200) {
              this.isHave = true;
            } else {
              this.$toast("当前歌曲已存在");
              this.isHave = false;
              this.clearForm();
            }
          }
        );
      } else {
        this.$toast("请请输入歌曲名称");
        return;
      }
    },
    submit() {
      if (this.isRepeat) {
        if (
          this.audio.audioCover !== "" &&
          this.audio.audioFileName !== "" &&
          this.audio.name !== "" &&
          this.audio.author !== ""
        ) {
          if (
            !this.reg.test(this.audio.audioCover) ||
            !this.reg.test(this.audio.audioFileName)
          ) {
            this.$toast("表单不符合规范");
            return;
          }
          if (
            this.audio.audioLrcName &&
            !this.reg.test(this.audio.audioLrcName)
          ) {
            this.$toast("表单不符合规范");
            return;
          }
          let result = {
            name: this.audio.name,
            author: this.audio.author
          };
          if (this.isHave) {
            this.isRepeat = false;
            this.$http("/audio", { method: "post", data: this.audio }, res => {
              this.isRepeat = true;
              if (res.data.code === 200) {
                result.id = res.data.data.id;
                result.create_time = res.data.data.create_time;
                this.audioList.unshift(result);
                this.$toast("上传成功");
                this.$("#audioModal").modal("hide");
                this.clearForm();
              } else {
                console.log(111);
                this.$toast(res.data.message);
                this.isRepeat = true;
              }
            });
          } else {
            this.$toast("当前歌曲已经存在");
          }
        } else {
          this.$toast("表单不符合规范");
        }
      } else {
        this.$toast("文件上传中，请勿重复提交");
      }
    },
    search(page = 1) {
      if (!this.keyWords.id && !this.keyWords.name && !this.keyWords.author) {
        this.$toast("请输入关键字");
        return;
      } else {
        let copy = { ...this.keyWords };
        for (let key in copy) {
          if (copy[key] === "") {
            delete copy[key];
          }
        }
        this.getAudio({ search: 1, page, ...copy }, res => {
          this.audioList = res.data.audioList;
          this.result = res.data.page;
          this.isSearch = true;
        });
      }
    },
    back() {
      this.getAudio(null, res => {
        this.audioList = res.data.audioList;
        this.result = res.data.page;
        this.isSearch = false;
      });
    },
    deleteAudio(i) {
      if (this.audioList[i].id) {
        if (confirm("是否要删除吗")) {
          this.$http(`deleteAudio/${this.audioList[i].id}?adm=1`, res => {
            if (res.data.code === 200) {
              this.$toast("删除成功");
              this.audioList.splice(i, 1);
            } else {
              this.$toast(res.data.message || "删除失败");
            }
          });
        }
      }
    },
    clearForm() {
      this.audio.name = "";
      this.audio.author = "";
      this.audio.audioCover = "";
      this.audio.audioFileName = "";
      this.audio.audioLrcName = "";
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
