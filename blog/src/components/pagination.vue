<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li :class="'page-item '+(result.current_page===1?'disabled':'')" @click="handlePageClick(result.current_page-1)">
        <a class="page-link" href="#">&lt;</a>
      </li>
      <li v-if="result.current_page>4" class="page-item mx-1 d-none d-b d-sm-block d-md-block d-lg-block d-xl-block" @click="handlePageClick(1)">
        <a class="page-link" href="#">1</a>
      </li>
      <li v-if="result.current_page>4" class="page-item mx-1 d-none d-sm-block d-md-block d-lg-block d-xl-block">
        <a class="page-link" href="#">...</a>
      </li>
      <li v-show="item>result.current_page-3&&item<result.current_page+3" :class="'page-item mx-1'+(item===result.current_page?' active':'')" v-for="item in result.page_count" :key="item" @click="handlePageClick(item)">
        <a class="page-link" href="#" v-text="item"></a>
      </li>
      <li v-if="result.current_page<result.page_count-3" class="page-item mx-1 d-none d-sm-block d-md-block d-lg-block d-xl-block">
        <a class="page-link" href="#">...</a>
      </li>
      <li v-if="result.current_page<result.page_count-3" class="page-item mx-1 d-none d-sm-block d-md-block d-lg-block d-xl-block" @click="handlePageClick(result.page_count)">
        <a class="page-link" href="#" v-text="result.page_count"></a>
      </li>
      <li :class="'page-item '+(result.current_page===result.page_count?'disabled':'')" @click="handlePageClick(result.current_page+1)">
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
    result: Object,//{current_page:7,page_count:15}
    func: Function
  },
  created() { },
  methods: {
    handlePageClick(page) {
      this.$emit('func', page)
    }
  }
};
</script>
<style scoped>
</style>
