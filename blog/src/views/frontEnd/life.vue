<template>
  <div id="blog_life" class="container">
    <div class="row h-100">
      <div class="col-xl-4 col-lg-4 col-md-4 pt-2">
        <Side></Side>
      </div>
      <div class="col-xl-8 col-lg-8 col-md-8 pt-2">
        <!-- 卡片 -->
        <Card v-for="(item,i) in lifeList" :key="i" :articleInfo=item></Card>
        <Pagination class="w-100" :control={center:1,sm:1} :result="result" @func="func" v-if="lifeList.length!==0 && lifeList.length>10" />
      </div>
    </div>
  </div>
</template>

<script>
import Card from "../../components/card";
import Side from "../../components/side";
import Pagination from "@/components/pagination.vue";
export default {
  name: "life",
  data(){
    return{
      result:{},
      lifeList:[],
    }
  },
  created(){
    this.getLife({ page: 1, cateId: 10003 },(res)=>{
      this.lifeList = res.data.articleInfo;
      this.result = res.data.page;
    })
  },
  methods:{
    func(page) {
      this.getLife({ page: page, cateId: 10003 }, res => {
        this.lifeList = res.data.articleInfo;
        this.result = res.data.page;
      });
    },
    getLife(params,callback){
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