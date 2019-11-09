<template>
  <nav aria-label="Page navigation example" class="mt-3">
    <ul class="pagination justify-content-center">
      <li :class="'page-item '+(result.currentPage===1?'disabled':'')" @click="handlePageClick(result.currentPage-1)">
        <a class="page-link" href="#">&lt;</a>
      </li>
      <li v-if="result.currentPage>4" class="page-item mx-1 d-none d-b d-sm-block d-md-block d-lg-block d-xl-block" @click="handlePageClick(1)">
        <a class="page-link" href="#">1</a>
      </li>
      <li v-if="result.currentPage>4" class="page-item mx-1 d-none d-sm-block d-md-block d-lg-block d-xl-block">
        <a class="page-link" href="#">...</a>
      </li>
      <li v-show="item>result.currentPage-3&&item<result.currentPage+3" :class="'page-item mx-1'+(item===result.currentPage?' active':'')" v-for="item in result.pageCount" :key="item" @click="handlePageClick(item)">
        <a class="page-link" href="#" v-text="item"></a>
      </li>
      <li v-if="result.currentPage<result.pageCount-3" class="page-item mx-1 d-none d-sm-block d-md-block d-lg-block d-xl-block">
        <a class="page-link" href="#">...</a>
      </li>
      <li v-if="result.currentPage<result.pageCount-3" class="page-item mx-1 d-none d-sm-block d-md-block d-lg-block d-xl-block" @click="handlePageClick(result.pageCount)">
        <a class="page-link" href="#" v-text="result.pageCount"></a>
      </li>
      <li :class="'page-item '+(result.currentPage===result.pageCount?'disabled':'')" @click="handlePageClick(result.currentPage+1)">
        <a class="page-link" href="#">&gt;</a>
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
    func: Function
  },
  created() { 
    
  },
  methods: {
    handlePageClick(page) {
      console.log(this.result.currentPage)
      this.$emit('func', page)
    }
  }
};
</script>
<style scoped>
</style>
