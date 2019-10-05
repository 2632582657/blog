<template>
  <div id="blog_detail" class="blog_detail container">
    <div class="row h-100">
      <div class="col-xl-4 col-lg-4 col-md-4 py-0 p-sm-0 p-md-3 p-xl-4 p-lg-4">
        <Side></Side>
      </div>
      <div class="col-xl-8 col-lg-8 col-md-8 py-0 p-sm-0 p-md-3 p-xl-4 p-lg-4">
      </div>
    </div>
  </div>
</template>

<script>
import Side from '../../components/side'
export default {
    name:"detail",
    components:{
        Side
    }
};
</script>

<style lang="scss" scoped>
</style>