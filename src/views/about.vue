<template>
  <div id="blog_about" class=" container-fluid p-0">
      <div class="about_head">
          <img src="../assets/images/1000048.jpg" class="w-100" alt="">
          <img src="../assets/images/about__bg_di.png" alt="" class="about_di">
      </div>
  </div>
</template>

<script>
export default {
    name:"about"
}
</script>

<style lang="scss" scoped>
    #blog_about{
        .about_head{
            // max-height: 400px;
            position: relative;
            .about_di{
                width: 100%;
                position: absolute;
                left: 0;
                bottom: 0;
            }
        }
    }
</style>