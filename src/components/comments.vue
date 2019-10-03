<template>
  <div id="blog_comments" class="blog_comments container-fluid text-left">
    <div class="d-inline-block comments_title pr-5 py-2 text-info mx-1 mb-4">叨叨几句:</div>
    <div class="row m-0">
      <div class="col-12 mb-4">
        <div class="text-info mb-4 position-relative">
          <!-- todo 边框颜色 -->
          <textarea
            class="form-control form-control-sm mb-2"
            id="comment_input"
            name="comment"
            cols="30"
            rows="6"
            placeholder="想说啥"
          ></textarea>
          <span class="icon_btn">
            <i class="fa fa-smile-o"></i> 表情
          </span>
        </div>
        <div class="form-row m-0">
          <div class="form-group col-12 col-xl-4 col-lg-4 pl-0">
            <input
              type="text"
              id="name_input"
              placeholder="昵称"
              class="form-control form-control-sm"
            />
          </div>
          <div class="form-group col-12 col-xl-4 col-lg-4 pl-0">
            <input
              type="email"
              id="email_input"
              placeholder="邮箱"
              class="form-control form-control-sm"
            />
          </div>
          <div class="form-group col-12 col-xl-4 col-lg-4 pl-0">
            <input
              type="email"
              id="email_input"
              placeholder="网址"
              class="form-control form-control-sm"
            />
          </div>
        </div>
        <div>
          <button
            class="btn btn-block col-12 col-xl-3 col-lg-4 col-md-4 btn-info btn-sm text-white"
          >发表</button>
        </div>
      </div>
      <div class="row mx-3 w-100 comment_border pt-4">
        <div class="col-12">
          <ul>
            <li v-for="item in 3" :key="item" :class="item>1?'pt-3 comment_border':''">
              <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center">
                  <img
                    src="../assets/images/avatar.jpg"
                    width="35"
                    height="35"
                    class="mr-2 rounded-circle"
                  />
                  <div>
                    <div class="text-info">时间旅客</div>
                    <div class="f12 text-secondary">2019-09-30 15:31</div>
                  </div>
                </div>
                <span class="badge text-white bg-info cur px-2 py-1">回复</span>
              </div>
              <div class="ml-5">
                <div class="mb-3 text-primary comment_detail">评论评论评论评论评论评论评论评论评论评论</div>
                <div>
                  <div v-for="item in 3" :key="item">
                    <div class="d-flex justify-content-between align-items-center">
                      <div class="d-flex align-items-center">
                        <img
                          src="../assets/images/avatar.jpg"
                          width="35"
                          height="35"
                          class="mr-2 rounded-circle"
                        />
                        <div>
                          <div class="text-info">时间旅客</div>
                          <div class="f12 text-secondary">2019-09-30 15:31</div>
                        </div>
                      </div>
                      <span class="badge text-white bg-info cur px-2 py-1">回复</span>
                    </div>
                    <div class="ml-5 mb-3 text-primary comment_detail">评论评论评论评论评论评论评论评论评论评论</div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name:"comments"
};
</script>

<style lang="scss" scoped>
.blog_comments {
  .comments_title {
    border-bottom: 2px solid #0099cc;
    font-size: 18px;
    letter-spacing: 0.15em;
    font-weight: 550;
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
  .comment_detail{
      font-size: 14px;
      letter-spacing: 1px;
    //   color: rgb(34,34,34);
  }
}
</style>