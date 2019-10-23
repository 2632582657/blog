<template>
  <div id="blog_study" class="container mt-2">
    <div class="row h-100">
      <div class="col-xl-4 col-lg-4 col-md-4 py-0 p-sm-0 p-md-3 p-xl-4 p-lg-4">
        <Side></Side>
      </div>
      <div class="col-xl-8 col-lg-8 col-md-8 py-0 p-sm-0 p-md-3 p-xl-4 p-lg-4">
        <!-- 卡片 -->
        <Card></Card>
        <Card></Card>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "../../components/card";
import Side from "../../components/side";
export default {
  name: "study",
  components: {
    Card,
    Side
  }
};
</script>

<style lang="scss" scoped>
</style>