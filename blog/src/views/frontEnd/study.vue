<template>
  <div id="blog_study" class="container">
    <div class="row h-100">
      <div class="col-xl-4 col-lg-4 col-md-4 pt-2">
        <Side></Side>
      </div>
      <div class="col-xl-8 col-lg-8 col-md-8 pt-2">
        <!-- 卡片 -->
        <Card v-for="(item,i) in studyList" :key="i" :articleInfo=item></Card>
        <Pagination class="w-100" :control={center:1,sm:1} :result="result" @func="func" v-if="studyList.length!==0 && studyList.length>10" />
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/pagination.vue";
import Card from "../../components/card";
import Side from "../../components/side";
export default {
  name: "study",
  data(){
    return{
      result:{},
      studyList:[],
    }
  },
  created(){
    this.getStudy({ page: 1, cateId: 10002 },(res)=>{
      this.studyList = res.data.articleInfo;
      this.result = res.data.page;
    })
  },
  methods:{
    func(page) {
      this.getStudy({ page: page, cateId: 10002 }, res => {
        this.studyList = res.data.articleInfo;
        this.result = res.data.page;
      });
    },
    getStudy(params,callback){
      this.$http("getArticle", { params: params }, res => {
        if (res.data.code === 200) {
          callback(res.data);
        }
      });
    }
  },
  components: {
    Card,
    Side,
    Pagination
  }
};
</script>

<style lang="scss" scoped>
</style>