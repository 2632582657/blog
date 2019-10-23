<template>
  <div class="text-left">
    <div>
      <div class="form-group">
        <label for="exampleInputEmail1">文章标题</label>
        <input
          id="exampleInputEmail1"
          type="text"
          class="form-control"
          placeholder="请输入文章标题"
          minlength="5"
          maxlength="100"
          required
        />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1" class="d-block">文章封面</label>
        <img v-show="true" src class="cover" alt />
        <input v-show="false" type="file" ref="file" id="customFile" />
        <label for="customFile" class="text-info d-block cursor_p">选择</label>
      </div>
      <div class="form-group">
        <label for="inputState">分类</label>
        <select id="inputState" class="form-control" required>
          <option v-for="(item,i) in cate" :key="i" v-text="item"></option>
        </select>
      </div>
    </div>
    <div id="summernote"></div>
    <button
      class="btn btn-info btn-block btn-sm my-4 col-12 col-xl-2 col-lg-3 col-md-4 text-white"
    >提交</button>
  </div>
</template>

<script>
import $ from "jquery";
import "../../../node_modules/summernote/dist/summernote-bs4";
import "../../../node_modules/summernote/dist/summernote-bs4.css";
import AdminSide from "../system/adminSide";
export default {
  name: "release",
  data() {
    return {
      cate: ["学习", "随笔", "相册"]
    };
  },
  mounted() {
    $("#summernote").summernote({
      minHeight: 550,
      lang: "zh-CN",
      placeholder: "冒险家你来啦~~"
    });
  },
  components: {
    AdminSide
  }
};
</script>

<style lang="scss" scoped>
</style>