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
    <Header></Header>
    <router-view />
    <!-- <Footer></Footer> -->
  </div>
</template>

<script>
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";
export default {
  data() {
    return {
      scrolltop: 0
    };
  },
  created() {
    this.setScrollLisener();
  },
  mounted() {},
  methods: {
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
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 0 auto;
  position: relative;
  min-height: 100%;
  background: rgba(36, 45, 211, 0.3) url("assets/images/bg.jpg") repeat;
  // transform: translateX(50%);
  .topback {
    position: fixed;
    bottom: 50px;
    right: 50px;
    z-index: 999;
    transition: all 0.8s;
  }
}
</style>
