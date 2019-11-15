<template>
    <div id="blog_footer">
        <div class=" row">
          <div class=" col small" style="color:#c5ccd2">
            <div>
               版权所有 ©2018-2019 <a href="#" class="text-white">时间旅客</a>
            </div>
            <div>本博客已萌萌哒运行了天</div>
          </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  mounted () {

  }
}
</script>

<style lang="scss" scoped>
    #blog_footer{
        width: 100%;
        height: 138px;
        padding: 30px 0;
        // border: 1px solid #333;
        position: absolute;
        left: 0;
        bottom: 0;
        background: transparent;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
