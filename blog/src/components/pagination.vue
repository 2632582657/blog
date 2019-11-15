<template>
  <nav aria-label="Page navigation example " class="mt-3">
    <ul :class="'pagination  '+(control.sm ? 'pagination-sm ':' ')+(control.center? 'justify-content-center' :'justify-content-end') ">
      <li v-show="result.pageCount!==0" :class="'page-item '+(result.currentPage===1?'disabled':'')" @click="handlePageClick(result.currentPage-1)">
        <a class="page-link text-info" href="#">&lt;</a>
      </li>
      <li v-if="result.currentPage>4" class="page-item mx-1 d-none d-b d-sm-block d-md-block d-lg-block d-xl-block" @click="handlePageClick(1)">
        <a class="page-link " href="#">1</a>
      </li>
      <li v-if="result.currentPage>4" class="page-item mx-1 d-none d-sm-block d-md-block d-lg-block d-xl-block">
        <a class="page-link" href="#">...</a>
      </li>
      <li v-show="item>result.currentPage-3&&item<result.currentPage+3" :class="'page-item mx-1'+(item===result.currentPage?' active':'')" v-for="item in result.pageCount" :key="item" @click="handlePageClick(item)">
        <a class="page-link" :style="item===result.currentPage?'pointer-events: none':''" href="javascript:;" v-text="item"></a>
      </li>
      <li v-if="result.currentPage<result.pageCount-3" class="page-item mx-1 d-none d-sm-block d-md-block d-lg-block d-xl-block">
        <a class="page-link" href="#">...</a>
      </li>
      <li v-if="result.currentPage<result.pageCount-3" class="page-item mx-1 d-none d-sm-block d-md-block d-lg-block d-xl-block" @click="handlePageClick(result.pageCount)">
        <a class="page-link" href="#" v-text="result.pageCount"></a>
      </li>
      <li :class="'page-item '+(result.currentPage===result.pageCount?'disabled':'')" @click="handlePageClick(result.currentPage+1)">
        <a class="page-link text-info" href="#">&gt;</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "pagination",
  data() {
    return {};
  },
  props: {
    result: Object,//{currentPage:7,pageCount:15}
    func: Function,
    control:Object
  },
  created() { 
    
  },
  methods: {
    handlePageClick(page) {
      console.log(this.result)
      if (this.result.pageCount > 1 && page >= 1 && page <= this.result.pageCount) { this.$emit('func', page); }
    }
  }
};
</script>
<style scoped>
  .page-item.active .page-link {
    z-index: 1;
    color: #fff;
    background-color: #0099CC;
    border-color: #0099CC;
}
.page-link{
  color:#0099CC
}
</style>
