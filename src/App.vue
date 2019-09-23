<template>
  <div id="app">
    <Header></Header>
    <router-view/>
    <!-- <Footer></Footer> -->
  </div>
</template>

<script>
import Header from '@/components/header.vue'
import Footer from '@/components/footer.vue'
export default {
  data () {
    return {

    }
  },
  mounted () {
  },
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin:0 auto;
  position: relative;
  min-height: 100%;
  background: rgba(36,45,211,0.3);
  // transform: translateX(50%);
}
</style>
