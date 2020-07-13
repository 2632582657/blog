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
        <div class="form-check form-check-inline" v-for="(item,i) in cate" :key="i">
          <input
            class="form-check-input"
            type="radio"
            name="cate"
            :id="'inlineRadio'+i"
            :value="item.id"
            v-model="article.category_id"
          />
          <label class="form-check-label" :for="'inlineRadio'+i" v-text="item.name"></label>
        </div>
      </div>
    </div>
    <Editor api-key="your-api-key" :init="init" v-model="article.content" />
    <button
      class="btn btn-info btn-block btn-sm my-4 col-12 col-xl-2 col-lg-3 col-md-4 text-white"
      @click="submit()"
    >提交修改</button>
  </div>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";

export default {
  name: "edit",
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
        category_id: 10001
      },
      updatedArticle: {},
      articleId: this.$route.query.articleId || ""
    };
  },
  created() {
    this.$http("getCate", res => {
      if (res.data.code === 200) {
        this.cate = res.data.data;
        this.$http(`getArticle/${this.articleId}?adm=1`, resC => {
          if (resC.data.code === 200) {
            this.article = resC.data.data;
            this.updatedArticle = { ...this.article };
          }
        });
      }
    });
  },
  mounted() {},
  methods: {
    submit() {
      if (
        this.article.title !== "" &&
        this.article.content !== "" &&
        this.article.cate !== "" &&
        this.article.cover !== ""
      ) {
        let formData = new FormData();
        formData.append("id", this.article.id);
        for (let key in this.article) {
          if (this.article[key] !== this.updatedArticle[key]) {
            formData.append(key, this.article[key]);
          }
        }
        this.$http(
          `updateArticle/${this.articleId}`,
          { method: "put", data: formData },
          res => {
            if (res.data.code === 200) {
              this.$toast("修改成功");
              this.$router.push({
                path: "/admin/arm",
                query: { cate: this.article.category_id }
              });
            } else {
              this.$toast(res.data.message || "修改失败");
            }
          }
        );
      } else {
        this.$toast("请完善表单");
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
