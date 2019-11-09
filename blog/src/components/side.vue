<template>
  <div>
    <div class="sj_card card mb-3">
      <div class="sj_card_bg"></div>
      <div class="sj_card_body pt-1 position-relative">
        <div class="sj_card_avatar">
          <img src="../assets/images/avatar2.jpg" width="56" height="56" class="rounded-circle" />
          <i class="fa fa-vimeo vimeo"></i>
        </div>
        <a href="#" class="sj_card_name d-block mb-3 font-weight-bold">Moe_Nya</a>
        <div class="row sj_card_content pt-2">
          <div class="col-4">
            <p class="num text-info">108</p>
            <p class="text text-secondary">文章</p>
          </div>
          <div class="col-4">
            <p class="num text-info">18</p>
            <p class="text text-secondary">相册</p>
          </div>
          <div class="col-4">
            <p class="num text-info">66</p>
            <p class="text text-secondary">留言</p>
          </div>
        </div>
      </div>
    </div>
    <div  class="card d-xl-block d-lg-block d-none mb-3">
      <div class="sj_card_body sj_card_info text-left">
        <div class="py-2">
          <i class="fa fa-fw fa-qq text-info mr-2"></i>
          2632582657
        </div>
        <div class="py-2">
          <i class="fa fa-fw fa-weixin text-success mr-2"></i>
          shi2632582657
        </div>
        <div class="py-2">
          <i class="fa fa-fw fa-envelope text-warning mr-2"></i>
          2632582657@qq.com
        </div>
        <div class="py-2">
          <i class="fa fa-fw fa-github mr-2"></i>
          2632582657
        </div>
        <div class="py-2">
          <i class="fa fa-fw mr-2 fa-commenting text-info"></i>
          帅比一个
        </div>
      </div>
    </div>
    <!-- <div v-if="this.$route.meta.showLabel" class="card d-xl-block d-lg-block mb-3">
      <div class="sj_card_body sj_card_info text-left">
        <div class="py-2 cur">
          <i class="fa text-info mr-2"></i>
          vue(2)
        </div>
        <div class="py-2 cur">
          <i class="fa text-success mr-2"></i>
          node(1)
        </div>
        <div class="py-2 cur">
          <i class="fa text-warning mr-2"></i>
          html5(3)
        </div>
        <div class="py-2 cur">
          <i class="fa  mr-2"></i>
          css3(1)
        </div>
        <div class="py-2 cur">
          <i class="fa  mr-2 text-info"></i>
          flutter(1)
        </div>
        <div class="py-2 cur font-weight-bold">
          <i class="fa  mr-2 text-info"></i>
          查看全部...
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name:"side"
};
</script>

<style lang="scss" scoped>
.sj_card,
.card {
  &:hover .sj_card_name {
    color: #0099cc;
  }
  .sj_card_bg {
    width: 100%;
    height: 100px;
    max-height: 100px;
    background: #fff url("../assets/images/1000048.jpg") no-repeat scroll center
      center;
    background-size: cover;
  }
  .sj_card_body {
    background: #fff;
    padding: 20px;
    .sj_card_avatar {
      position: absolute;
      top: -28px;
      left: 20px;
      .vimeo {
        color: #ffba50;
        position: relative;
        bottom: -20px;
        left: -14px;
      }
    }
    .sj_card_name {
      transition: all 0.3s linear;
    }
    .sj_card_content {
      p {
        margin-bottom: 0;
        font-weight: bold;
      }
      .num {
        font-size: 16px;
      }
      .text {
        font-size: 14px;
      }
    }
  }
  .sj_card_info > div {
    border-bottom: 1px solid #f0f0f0;
    font-size: 14px;
  }
}
</style>