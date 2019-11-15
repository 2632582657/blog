<template>
  <div id="blog_comments" class="blog_comments container-fluid text-left">
    <div class="d-inline-block comments_title pr-5 py-2 text-info mx-1 mb-4">叨叨几句:</div>
    <div class="row m-0">
      <div class="col-12 mb-4">
        <div class="text-info mb-4 position-relative">
          <!-- todo 边框颜色 -->
          <textarea
            class="form-control form-control-sm mb-2"
            id="myTextarea"
            name="comment"
            @blur="blur"
            cols="30"
            rows="6"
            placeholder="想说啥"
            v-model="comment.content"
          ></textarea>
          <div class="emojiDiv w-100 dropdown-menu p-0" data-toggle="dropdown">
            <span
              class="d-inline-block mx-2 mt-2 cur px-3 bg-light rounded"
              v-for="(item,i) in emoji"
              :key="i"
              :title="item.title"
              v-text="item.owo"
              @click="addEmoji(item.owo)"
            ></span>
          </div>
          <span class="icon_btn" data-toggle="dropdown">
            <i class="fa fa-smile-o"></i> 表情
          </span>
        </div>
        <div class="form-row m-0">
          <div class="form-group col-12 col-xl-6 col-lg-6 pl-0">
            <input
              type="text"
              id="name_input"
              placeholder="昵称"
              class="form-control form-control-sm"
              v-model="comment.userName"
            />
          </div>
          <div class="form-group col-12 col-xl-6 col-lg-6 pl-0">
            <input
              type="email"
              id="email_input"
              placeholder="邮箱"
              class="form-control form-control-sm"
              v-model="comment.email"
            />
          </div>
        </div>
        <div>
          <button
            class="btn btn-block col-12 col-xl-3 col-lg-4 col-md-4 btn-info btn-sm text-white"
            @click="submit()"
          >发表</button>
        </div>
      </div>
      <div class="row mx-3 w-100 ">
        <div class="col-12 pt-3 px-xl-3 px-lg-3 px-md-3 px-sm-3">
          <div v-for="(item,i) in commentList" :key="i" class="">
            <div
              v-if="!item.parent_id && !item.reply_user_id"
              :class="i>1?'pt-3 comment_border':''"
            >
              <div>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="d-flex align-items-center">
                    <img
                      :src="AVATAR_URL+item.avatar+'.png'"
                      width="35"
                      height="35"
                      class="mr-2 rounded-circle"
                    />
                    <div>
                      <div class="text-info">
                        <span v-text="item.name"></span>
                        <span v-if="item.user_id===10000" class="text-warning fa fa-star"></span>
                      </div>
                      <div class="f12 text-secondary" v-text="item.create_time"></div>
                    </div>
                  </div>
                  <span
                    class="badge text-white bg-info cur px-2 py-1"
                    @click="reply(item.id,item.user_id,item.name)"
                  >回复</span>
                </div>
                <div class="ml-5">
                  <div
                    class="mb-2 text-primary comment_detail"
                    v-text="item.status?item.content : '等待站长审核后显示...'"
                  ></div>
                  <div v-for="(citem,ci) in commentList" :key="ci">
                    <div v-if="citem.parent_id && citem.reply_user_id && citem.parent_id===item.id">
                      <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center">
                          <img
                            :src="AVATAR_URL+citem.avatar+'.png'"
                            width="35"
                            height="35"
                            class="mr-2 rounded-circle"
                          />
                          <div>
                            <div class="text-info" v-text="citem.name"></div>
                            <div class="f12 text-secondary" v-text="citem.create_time"></div>
                          </div>
                        </div>
                        <span
                          class="badge text-white bg-info cur px-2 py-1"
                          @click="reply(item.id,citem.user_id,citem.name)"
                        >回复</span>
                      </div>
                      <div class="ml-5 mb-3 text-primary comment_detail">
                        <div class="text-info" v-if="citem.user_id!==citem.reply_user_id" v-text="'回复了'+citem.reply_name"></div>
                        <span>{{citem.status?citem.content : '等待站长审核后显示...'}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="commentList && commentList.length===0" class="mb-5 text-center text-info">
            <i class="fa fa-hand-o-up"></i>
            暂无评论~ 快来抢沙发吧~
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import emoji from "../assets/lib/emoji";
export default {
  name: "comments",
  data() {
    return {
      emoji: emoji.emoji,
      comment: {
        content: "",
        userName: "",
        email: "",
        parentId: null,
        replyUserId: null //被回复人 就是回复的谁
      },
      replyName: "",
      commentList: [],
      cur: null
    };
  },
  props:{
    articleId:Object
  },
  created() {
    if (localStorage.getItem("commentator")) {
      let commentator = JSON.parse(localStorage.getItem("commentator"));
      this.comment.userName = commentator.name;
      this.comment.email = commentator.email;
    }
    this.getComment(this.articleId.id, res => {
      this.commentList = res.data;
    });
  },
  mounted() {},
  methods: {
    addEmoji(owo) {
      this.comment.content = `${
        this.cur
          ? this.comment.content.slice(0, this.cur) +
            owo +
            this.comment.content.slice(this.cur)
          : (this.comment.content += owo)
      }`;
      this.cur = this.cur + owo.length;
      document.getElementById("myTextarea").focus();
    },
    blur() {
      this.cur = document.getElementById("myTextarea").selectionEnd;
    },
    reply(parentId, replyUserId, replyName) {
      this.comment.parentId = parentId;
      this.comment.replyUserId = replyUserId;
      this.replyName = replyName;
      document.getElementById("myTextarea").focus();
      
    },
    getComment(articleId, callback) {
      this.$http("getComment", { params: { articleId: articleId } }, res => {
        if (res.data.code === 200) {
          callback(res.data);
        } else {
          this.$toast(res.data.message);
        }
      });
    },
    submit() {
      if (!confirm("确定发表评论吗")) {
        return;
      }
      if (this.comment.content) {
        if (
          this.comment.content.length < 2 ||
          this.comment.content.length > 200
        ) {
          this.$toast("内容长度为2-200");
          return;
        }
      } else {
        this.$toast("没有填写内容哦~(ˉ▽￣～)~~");
        return;
      }
      if (this.comment.userName) {
        if (
          this.comment.userName.length < 2 ||
          this.comment.userName.length > 10
        ) {
          this.$toast("昵称长度为2-10");
          return;
        }
      } else {
        this.$toast("没有填写昵称哦~(ˉ▽￣～)~~");
        return;
      }
      if (this.comment.email) {
        let reg = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/;
        if (!reg.test(this.comment.email)) {
          this.$toast("请填写合格的邮箱");
          return;
        }
      } else {
        this.$toast("没有填写邮箱哦~(ˉ▽￣～)~~");
        return;
      }
      let data = {
        content: this.comment.content,
        userName: this.comment.userName,
        email: this.comment.email
      };
      if (this.comment.parentId && this.comment.replyUserId) {
        data.parentId = this.comment.parentId;
        data.replyUserId = this.comment.replyUserId;
      }
      data.articleId = this.articleId.id;
      this.$http("addComment", { method: "post", data: data }, res => {
        if (res.data.code === 200) {
          alert(res.data.message);
          this.comment.content = "";
          localStorage.setItem(
            "commentator",
            JSON.stringify({
              name: this.comment.userName,
              email: this.comment.email
            })
          );
        } else {
          this.$toast("评论发表失败");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.form-control:focus {
  box-shadow: none;
  border-color: #0099cc;
}
.blog_comments {
  .comments_title {
    border-bottom: 2px solid #0099cc;
    font-size: 18px;
    letter-spacing: 0.15em;
    font-weight: 550;
  }
  .emojiDiv {
    width: 100%;
    max-height: 300px;
    min-height: 160px;
    border: 1px solid #0099cc;
    bottom: 22px;
    overflow-y: scroll;
  }
  #comment_input,
  #name_input,
  #email_input {
    border: 1px dotted #0099cc;
  }
  .icon_btn {
    font-size: 12px;
    border: 1px solid #0099cc;
    padding: 3px 15px;
    border-radius: 4px;
    cursor: pointer;
  }
  .comment_border {
    border-top: 1px solid #e5e9ef;
  }
  .comment_detail {
    font-size: 14px;
    letter-spacing: 1px;
    //   color: rgb(34,34,34);
  }
}
</style>