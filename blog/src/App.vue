<template>
  <div id="app" class>
    <img
      @click="topback"
      v-show="scrolltop>1000"
      src="./assets/images/gotop.png"
      width="40"
      height="40"
      class="topback cur"
      alt
    />
    <Header v-if="!this.$route.meta.showHeader"  :isShowDrawer=isShowDrawer @showHeader=showHeader></Header>
    <div class="mask" v-if="isShowDrawer" @click="hideMask()">
    </div>
    <transition name="component-fade" mode="out-in">
        <router-view :class="!this.$route.meta.showHeader? 'pt-5 pt-sm-5 pt-md-0 pt-lg-0 pt-xl-0' : ''"/>
      </transition>
    <Footer v-if="!this.$route.meta.showHeader" ></Footer>
    <div v-if="!this.$route.meta.showHeader" style="width:100%;height:128px;z-index:-1"></div>
    <aplayer v-if="!this.$route.meta.showHeader" :audio="audio" :lrcType="3" :listFolded='true' fixed />
  </div>
</template>

<script>
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";
export default {
  data() {
    return {
      scrolltop: 0,
      isShowDrawer:false,
       audio: [
        // {
        //   name: '东西（Cover：林俊呈）',
        //   artist: '纳豆',
        //   url: 'https://cdn.moefe.org/music/mp3/thing.mp3',
        //   cover: 'https://p1.music.126.net/5zs7IvmLv7KahY3BFzUmrg==/109951163635241613.jpg?param=300y300', // prettier-ignore
        //   lrc: 'https://cdn.moefe.org/music/lrc/thing.lrc',
        // },
        // {
        //   name: '东西（Cover：林俊呈）',
        //   artist: '纳豆',
        //   url: 'https://cdn.moefe.org/music/mp3/thing.mp3',
        //   cover: 'https://p1.music.126.net/5zs7IvmLv7KahY3BFzUmrg==/109951163635241613.jpg?param=300y300', // prettier-ignore
        //   lrc: 'https://cdn.moefe.org/music/lrc/thing.lrc',
        // }
       ]
    };
  },
  created() {
    this.setScrollLisener();
    this.setRoute(this.$route.path);
  },
  mounted() {
    // let radioPlayer=this.$('.aplayer-body');
    // let radioBtn=this.$('.aplayer-miniswitcher');
    // radioPlayer.css({'left':'-66px','transition' :' all .3s ease'});
    // console.log(radioBtn)
    // radioBtn.mouseenter(function(){
    //   radioPlayer.css({'left':'0'});
    // })
    // radioPlayer.mouseleave(function(){
    //    radioPlayer.css({'left':'-66px'});
    // })
  },
  watch:{
    $route(route){
      this.setRoute(route.path)
    }
  },
  methods: {
    hideMask(){
      this.isShowDrawer=false
    },
    showHeader(bool){
      if(bool===false){
        this.isShowDrawer=bool
      }else{
        this.isShowDrawer=!this.isShowDrawer
      }
    },
    setScrollLisener() {
      var that = this;
      window.onscroll = function() {
        that.scrolltop =
          document.documentElement.scrollTop || document.body.scrollTop;
      };
    },
    topback() {
      document.body.scrollIntoView({ behavior: "smooth" });
    }
  },
  components: {
    Header,
    Footer
  }
};
</script>

<style lang="scss" scoped>
.mask{
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, .5);
  z-index: 1050;
  overflow: hidden;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 0 auto;
  position: relative;
  min-height: 100%;
  background: rgba(36, 45, 211, 0.3) url('http://127.0.0.1:81/images/about_img/about_12.jpg') no-repeat center center fixed;
  background-size:cover;
  .topback {
    position: fixed;
    bottom: 50px;
    right: 50px;
    z-index: 999;
    transition: all 0.8s;
  }
}
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to {
  opacity: 0;
}
</style>
