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
        <img v-show="true" :src="article.cover" class="cover" alt />
        <input v-show="false" type="file" ref="file" id="customFile" class @change="imageChange" />
        <label for="customFile" class="text-info d-block cursor_p">选择</label>
      </div>
      <div class="form-group">
        <label class="d-block">分类</label>
        <!-- <select id="inputState" class="form-control" required>
          <option v-for="(item,i) in cate" :key="i" v-text="item"></option>
        </select>-->
        <div class="form-check form-check-inline" v-for="(item,i) in cate" :key="i">
          <input
            class="form-check-input"
            type="radio"
            name="cate"
            :id="'inlineRadio'+i"
            :value="item.id"
            v-model="article.cate"
          />
          <label class="form-check-label" :for="'inlineRadio'+i" v-text="item.name"></label>
        </div>
      </div>
    </div>
    <Editor api-key="your-api-key" :init="init" v-model="article.content" />
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
      cate: [],
      init: {
        language_url: "/tinymce-lang/zh_CN.js",
        language: "zh_CN",
        plugins: "lists link image paste help wordcount",
        toolbar:
          "undo redo |  formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table | removeformat",
        branding: false,
        height: 800,
        images_upload_handler: function(blobInfo, success, failure) {
          var file = blobInfo.blob();
          var reader = new FileReader();
          reader.onloadend = function() {
            if (reader.result.length > 1048576) {
              alert("error");
              return;
            }
            success(reader.result);
          };
          if (file) {
            reader.readAsDataURL(file);
          }
        }
      },
      article: {
        title: "",
        cover: "",
        content: "",
        cate: 10001
      }
    };
  },
  created() {
    this.$http("getCate", res => {
      if (res.data.code === 200) {
        this.cate = res.data.data;
      }
    });
  },
  mounted() {},
  methods: {
    imageChange(e) {
      this.$imageChange(e, event => {
        this.article.cover = event.target.result;
      });
    },
    submitArticle() {
      if (
        this.article.title !== "" &&
        this.article.content !== "" &&
        this.article.cate !== ""
      ) {
        var formData = new FormData();
        formData.append("title", this.article.title);
        formData.append("cate", this.article.cate);
        formData.append("content", this.article.content);
        if (this.$refs.file.files.length !== 0) {
          formData.append("cover", this.$refs.file.files[0]);
        } else {
          this.$toast("请上传封面");
          return;
        }
        this.$http("release", { method: "post", data: formData }, res => {
          if (res.data.code === 200) {
            this.$toast("提交成功");
            this.$router.push({ path: "/admin/arm" });
          }
        });
      } else {
        this.$toast("请完善表单");
      }
    }
  },
  components: {
    AdminSide,
    Editor
  }
};
</script>

<style lang="scss" scoped>
.form-control:focus {
  box-shadow: none;
  border-color: #0099cc;
}
.cover {
  max-width: 100%;
  max-height: 400px;
}
</style>