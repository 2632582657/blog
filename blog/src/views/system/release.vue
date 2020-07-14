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
        <!-- <label for="exampleInputEmail1" class="d-block">文章封面</label>
        <img v-show="true" :src="article.cover" class="cover" alt />
        <input v-show="false" type="file" ref="file" id="customFile" class @change="imageChange" />
        <label for="customFile" class="text-info d-block cursor_p">选择</label>-->
        <label for="exampleInputEmail2">文章封面</label>
        <input
          id="exampleInputEmail2"
          type="text"
          class="form-control"
          placeholder="请输入封面链接"
          minlength="5"
          maxlength="100"
          required
          v-model="article.cover"
        />
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
      :disabled="!isRepeat"
    >提交</button>
  </div>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";

export default {
  name: "release",
  data() {
    return {
      cate: [],
      init: {
        language_url: "/tinymce-lang/zh_CN.js",
        language: "zh_CN",
        plugins:
          "link lists image code table colorpicker textcolor wordcount contextmenu",
        toolbar:
          //  "undo redo |  formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table code",
          "bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent blockquote | undo redo | link unlink image table  code | removeformat",
        branding: false,
        height: 800,
        images_upload_handler: (blobInfo, success, failure) => {
          let file = blobInfo.blob();
          let reader = new FileReader();
          reader.onloadend = () => {
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
      },
      isRepeat: true
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
    // imageChange(e) {
    //   this.$imageChange(e, event => {
    //     this.article.cover = event.target.result;
    //   });
    // },
    submitArticle() {
      if (this.isRepeat) {
        if (
          this.article.title !== "" &&
          this.article.content !== "" &&
          this.article.cate !== "" &&
          this.article.cover !== ""
        ) {
          let formData = new FormData();
          formData.append("title", this.article.title);
          formData.append("cate", this.article.cate);
          formData.append("content", this.article.content);
          formData.append("cover", this.CDN_COVER_URL + this.article.cover);
          this.isRepeat = false;
          this.$http("release", { method: "post", data: formData }, res => {
            this.isRepeat = true;
            if (res.data.code === 200) {
              this.$toast("提交成功");
              this.$router.push({ path: "/admin/arm" });
            }
          });
        } else {
          this.$toast("请完善表单");
        }
      } else {
        this.$toast("文件上传中，请勿重复提交");
      }
    }
  },
  components: {
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
