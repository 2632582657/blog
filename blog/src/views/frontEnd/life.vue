<template>
  <div id="blog_life" class="container">
    <div class="row h-100">
      <div class="col-xl-4 col-lg-4 col-md-4 pt-2">
        <Side></Side>
      </div>
      <div class="col-xl-8 col-lg-8 col-md-8 pt-2">
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
  name: "life",
  components: {
    Card,
    Side
  }
};
</script>

<style lang="scss" scoped>
</style>