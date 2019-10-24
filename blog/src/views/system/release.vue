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
          v-model="article.title"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1" class="d-block">文章封面</label>
        <img v-show="true" src class="cover" alt />
        <input v-show="true" type="file" ref="file" id="customFile" @change="imageChange" />
        <label for="customFile" class="text-info d-block cursor_p">选择</label>
      </div>
      <div class="form-group">
        <label for="inputState">分类</label>
        <select id="inputState" class="form-control" required>
          <option v-for="(item,i) in cate" :key="i" v-text="item"></option>
        </select>
      </div>
    </div>
    <Editor api-key="your-api-key" :init="init" />
    <button
      class="btn btn-info btn-block btn-sm my-4 col-12 col-xl-2 col-lg-3 col-md-4 text-white"
      @click="submitArticle"
    >提交</button>
  </div>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";
import AdminSide from "../system/adminSide";
export default {
  name: "release",
  data() {
    return {
      cate: ["学习", "随笔", "相册"],
      init: {
        language_url: "/tinymce-lang/zh_CN.js",
        language: "zh_CN",
        plugins: "lists link image paste help wordcount",
        toolbar:
          "undo redo |  formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table | removeformat",
        branding: false,
        height: 800,
        images_upload_handler: function(blobInfo, success, failure) {
          var file=blobInfo.blob()
          var reader=new FileReader();
          reader.onloadend=function(){
            if(reader.result.length > 1048576){
              alert("error");
              return;
            }
            success(reader.result)
          }
          if (file) {
            reader.readAsDataURL(file);
          }
        }
      },
      article: {
        title: "",
        cover: "",
        sort: "",
        label: "",
        content: ""
      }
    };
  },
  mounted() {},
  methods: {
    imageChange(e){
      console.log(e)
    },
    submitArticle() {
      console.log(this.article);
    },
    
  },
  components: {
    AdminSide,
    Editor
  }
};
</script>

<style lang="scss" scoped>
.form-control:focus{
  box-shadow: none;
  border-color: #0099CC
}
</style>