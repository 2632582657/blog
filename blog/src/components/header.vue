<template>
  <div id="blog_header" class="container-fluid d-flex align-items-center justify-content-center">
    <div class="row h-100 w-100">
      <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6 pl-0 h-100">
        <a href="#" class="h-100 d-block d-flex justify-content-center">
          <img src="../assets/images/blog_logo2.png" width="180px" />
        </a>
        <!-- <ruby>
          <h2>时间旅客</h2>
        </ruby>-->
      </div>
      <div
        class="menu_z col-xl-6 col-lg-6 col-md-6 d-xl-blcok d-lg-block d-md-block d-sm-none d-none h-100"
      >
        <ul class="d-flex justify-content-between align-items-center h-100">
          <li class="link_vertical" v-for="(item,i) in menuLink" :key="i">
            <router-link :to="item.url" exact>
              <span>
                <i :class="[{fa:true},item.icon]"></i>
                {{item.title}}
              </span>
            </router-link>
          </li>
        </ul>
      </div>
      <div
        class="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6 d-flex align-items-center justify-content-end pr-0 h-100"
      >
        <div class="w-75 d-flex justify-content-end">
          <input
            type="text"
            name="keyword"
            v-model="keyword"
            placeholder="想要找点什么呢"
            @keyup.enter="search()"
            class="search_keyword d-xl-block d-lg-block d-md-none d-sm-none d-none"
          />
          <input
            type="button"
            @click="search()"
            class="search_btn d-xl-block d-lg-block d-md-block d-sm-none d-none"
          />
        </div>
        <div
          class="hide_nav show_nav d-xl-none d-lg-none d-md-none d-sm-block d-block"
          @click="showDrawer()"
        >
          <div :class="[{line:true} ,{l2:isShowDrawer}]" style="top:3px"></div>
          <div :class="[{line:true} ,{l1:isShowDrawer}]" style="top:11px"></div>
          <div :class="[{line:true} ,{l3:isShowDrawer}]" style="top:11px"></div>
          <div :class="[{line:true} ,{l4:isShowDrawer}]" style="top:19px"></div>
        </div>
      </div>
    </div>
    <Drawer :menuData="menuLink" :isShowDrawer="isShowDrawer" @fn="fn"></Drawer>
  </div>
</template>

<script>
import Drawer from "./drawer";

export default {
  data() {
    return {
      menuLink: [
        { icon: "fa-institution", title: "首页", url: "/index" },
        { icon: "fa-image", title: "相册", url: "/album" },
        { icon: "fa-pencil", title: "学习", url: "/study" },
        { icon: "fa-paper-plane", title: "随笔", url: "/life" },
        { icon: "fa-users", title: "友链", url: "/friendChain" },
        { icon: "fa-graduation-cap", title: "关于", url: "/about" }
      ],
      keyword: ""
    };
  },
  props: {
    isShowDrawer: Boolean,
    showHeader: Function
  },
  components: {
    Drawer
  },
  created() {},
  methods: {
    showDrawer() {
      // this.isShowDrawer=!this.isShowDrawer
      this.$emit("showHeader");
    },
    search() {
      if (!this.keyword) {
        this.$toast("请输入关键字");
      } else {
        this.$router.push({ path: "/index", query: { keyword: this.keyword } });
      }
    },
    fn(bool) {
      this.$emit("showHeader", bool);
    }
  }
};
</script>

<style lang="scss" scoped>
@media screen and (min-width: 768px) and (max-width: 991px) {
  .search_btn {
    border: none !important;
  }
}
@media screen and (min-width: 576px) and (max-width: 767px) {
  .search_btn {
    border: none !important;
  }
  #blog_header {
    position: fixed;
    top: 0;
    margin-bottom: 40px;
    opacity: 1 !important;
  }
}
@media screen and(max-width:575px) {
  .search_btn {
    border: none !important;
  }
  #blog_header {
    position: fixed;
    top: 0;
    margin-bottom: 40px;
    opacity: 1 !important;
  }
}
#blog_header {
  box-sizing: border-box;
  min-height: 42px;
  background: transparent;
  height: 42px;
  overflow: hidden;
  line-height: 42px;
  margin: 0 auto;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
  // background: rgb(216, 245, 246);
  // background: transparent;
  // background: rgba(255, 255, 255, .9);
  background: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 1051;
  opacity: 0.9;
  &:hover {
    opacity: 1;
    .menu_z {
      li {
        a {
          color: rgb(34, 34, 34);
          &:hover {
            color: #0099cc;
          }
        }
      }
    }
  }
  .menu_z {
    z-index: 9;
    li {
      a {
        transition: all 0.3s ease;
      }
      .router-link-active {
        color: #0099cc;
      }
    }
  }
}
.link_vertical {
  width: 100%;
  text-align: center;
  padding: 0 15px;
  a {
    display: inline-block;
    width: 100%;
    height: 100%;
    white-space: nowrap;
  }
}
.search_keyword {
  width: 100%;
  height: 26px;
  padding: 5px 10px;
  border: 1px solid #222;
  font-size: 12px;
  border-right: none;
  outline: none;
  line-height: 26px;
}
.search_btn {
  height: 26px;
  width: 2rem;
  background: url(../assets/images/header_icon.png) -90px -4px;
  border: 1px solid #444;
  border-left: none;
}
.hide_nav {
  margin-left: 5px;
  width: 25px;
  height: 25px;
  cursor: pointer;
  position: relative;
  .line {
    width: 30px;
    height: 2px;
    background: #666;
    transition: all 0.2s ease;
    position: absolute;
    top: 7px;
    left: 50%;
    margin-left: -15px;
  }
  .l1 {
    transform: rotateZ(45deg);
  }
  .l3 {
    transform: rotateZ(-45deg);
  }
  .l2,
  .l4 {
    opacity: 0;
  }
}
</style>
