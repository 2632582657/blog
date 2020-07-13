<template>
  <div
    id="blog_drawer"
    :class="'d-xl-none d-lg-none d-md-none'+(!isShowDrawer?' drawer_out':'')"
    style="width:70vw;height:100vh"
  >
    <div class="my_avatar">
      <img src="../assets/images/avatar2.jpg" />
    </div>
    <p class="nick_name">时间旅客</p>
    <p class="my_link mb-0">
      <a href="#" class="fa fa-github" style="color:#333" target="_blank"></a>
    </p>
    <div class="serach_box">
      <form action method="get">
        <input
          type="text"
          name="keyword"
          v-model="keyword"
          placeholder="搜索..."
          @keyup.enter="search()"
        />
      </form>
    </div>
    <ul class="m_menu">
      <li v-for="(item,i) in menuData" :key="i">
        <router-link :to="item.url">
          <span>
            <i :class="[{fa:true},item.icon]"></i>
            {{item.title}}
          </span>
        </router-link>
      </li>
    </ul>
    <!-- <p class="record">© 2019 时间旅客</p> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: ""
    };
  },
  props: { menuData: Array, isShowDrawer: Boolean, fn: Function },
  mounted() {},
  methods: {
    search() {
      if (!this.keyword) {
        this.$toast("请输入关键字");
      } else {
        this.$router.push({ path: "/index", query: { keyword: this.keyword } });
      }
    }
  },
  watch: {
    $route(route) {
      this.$emit("fn", false);
    }
  }
};
</script>

<style lang="scss" scoped>
.drawer_out {
  transform: translateX(-100%);
  display: block;
}
#blog_drawer {
  position: relative;
  box-sizing: border-box;
  position: fixed;
  left: 0;
  top: 0;
  background: #fff;
  overflow-x: hidden;
  overflow-y: auto;
  transition: all 0.5s ease;
  z-index: 1051;
  .my_avatar {
    width: 100%;
    max-width: 100%;
    height: auto;
    margin: 0 auto;
    padding: 30px 0 10px;
    // padding: 30px 0 20px;
    text-align: center;
    img {
      width: 90px;
      height: 90px;
      border-radius: 100%;
    }
  }
  .nick_name {
    text-align: center;
    color: #333;
    font-weight: 900;
    font-family: "Ubuntu", sans-serif;
    letter-spacing: 1.5px;
    margin: 10px 0 0px;
    // margin: 10px 0 20px;
  }
  .my_link {
    width: 100%;
  }
  .serach_box {
    form {
      position: relative;
      width: 100%;
      margin-bottom: 20px;
      padding: 8px 15px;
      background: #fafafa;
      input {
        width: 100%;
        border: 0;
        text-align: center;
        outline: none;
        border-radius: 3px;
        font-size: 14px;
      }
    }
  }
  .m_menu {
    box-sizing: border-box;
    width: 80%;
    margin: 0 auto;
    padding-bottom: 42px;
    li {
      transition-duration: 0.25s;
      display: block;
      padding: 0px 50px 0px 30px;
      // padding: 10px 50px 10px 30px;
      color: #fff;
      letter-spacing: 0.1em;
      text-align: center;
      a {
        color: #252330;
        font-size: 15px;
      }
    }
  }
  .record {
    width: 100%;
    position: absolute;
    bottom: 20px;
    margin-right: 50%;
    text-align: center;
    font-size: 13px;
    color: #b9b9b9;
  }
}
</style>
