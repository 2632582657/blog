<template>
    <div id="blog_footer">
        <div class=" row">
          <div class=" col small" style="color:#c5ccd2">
            <div>
               ©2019 <span class="text-white cur" title="站长入口" @click="toAdmin()">时间旅客</span>&nbsp;&nbsp; <a class="beian" href="http://beian.miit.gov.cn/" target="_blank">鲁ICP备19060853号-1</a>
            </div>
            <div v-text="`本博客已萌萌哒运行了${runTime}天`"></div>
          </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      runTime:Math.floor((new Date().getTime()-this.$startTime)/86400000)
    }
  },
  created(){
  },
  mounted () {

  },
  methods:{
    toAdmin(){
      this.$router.push({path:'/adminLogin'})
    }
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
        .beian{
          color: #fff;
        }
    }
</style>
