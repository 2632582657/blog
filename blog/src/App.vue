<template>
  <div
    id="app"
    :style="`background-image: url(${BG_URL+9}.jpg); ${isShowDrawer? 'height:100vh;overflow:hidden;' : ''}`"
  >
    <!-- 返回顶部图标 -->
    <img
      @click="topback"
      v-show="scrolltop>1000"
      src="./assets/images/gotop.png"
      width="40"
      height="40"
      class="topback cur"
    />
    <Header
      v-if="!this.$route.meta.showHeader"
      :isShowDrawer="isShowDrawer"
      @showHeader="showHeader"
    ></Header>
    <!-- 遮罩 -->
    <div class="mask" v-if="isShowDrawer" @click="hideMask()"></div>

    <transition name="component-fade" mode="out-in">
      <router-view :class="!this.$route.meta.showHeader? 'app_pt pt-md-0 pt-lg-0 pt-xl-0' : ''" />
    </transition>

    <Footer v-if="!this.$route.meta.showHeader"></Footer>
    <div v-if="!this.$route.meta.showHeader" style="width:100%;height:128px;z-index:-1"></div>
    <!-- 音乐播放器 -->
    <aplayer
      class="text-left"
      v-if="!this.$route.meta.showHeader"
      :audio="audio"
      :lrcType="3"
      :listFolded="true"
      fixed
    />
  </div>
</template>

<script>
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";

export default {
  data() {
    return {
      scrolltop: 0,
      isShowDrawer: false,
      audio: []
    };
  },
  created() {
    this.setScrollLisener();
    this.setRoute(this.$route.path);
    this.$http("getAudio", res => {
      if (res.data.code === 200) {
        this.audio = res.data.data;
      }
    });
  },
  watch: {
    $route(route) {
      this.setRoute(route.path);
    }
  },
  methods: {
    hideMask() {
      this.isShowDrawer = false;
    },
    showHeader(bool) {
      if (bool === false) {
        this.isShowDrawer = bool;
      } else {
        this.isShowDrawer = !this.isShowDrawer;
      }
    },
    setScrollLisener() {
      // let that = this;
      window.onscroll = () => {
        this.scrolltop =
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
@media screen and (min-width: 576px) and (max-width: 767px) {
  .app_pt {
    padding-top: 42px !important;
  }
}
@media screen and(max-width:575px) {
  .app_pt {
    padding-top: 42px !important ;
  }
}
.mask {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
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
  background-color: rgb(255, 255, 255);
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
  background-size: cover;
  .topback {
    position: fixed;
    bottom: 50px;
    right: 20px;
    z-index: 999;
    transition: all 0.8s;
  }
  .switchTheme {
    position: fixed;
    bottom: 0px;
    right: 15px;
    z-index: 999;
  }
  .app_pt {
    padding-top: 0px;
  }
}
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter,
.component-fade-leave-to {
  opacity: 0;
}
</style>
