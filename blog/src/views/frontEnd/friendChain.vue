<template>
  <div id="friendChain" class="friend_chain container p-0 pt-xl-3">
    <PageHead :componentName="componentName"></PageHead>
    <div class="row m-0 link_info">
      <div class="col-12 pt-4 link_bg">
        <div class="text-left link_box px-xl-5">
          <h3 class="link_title text-info">友链公告</h3>
          <ul class="text-info mx-5">
            <li>欢迎交换友链 ꉂ(ˊᗜˋ) 请告诉我你的：</li>
            <li>名字</li>
            <li>介绍</li>
            <li>地址</li>
            <li>头像</li>
          </ul>
          <h3 class="link_title text-info">博客信息</h3>
          <ul class="text-info mx-5">
            <li>名称：时间旅客</li>
            <li>邮箱：MjYzMjU4MjY1N0BxcS5jb20=</li>
            <li>网址：sjlk.vip</li>
            <li>头像：https://www.sjlk.vip/images/avatar2.jpg</li>
            <li>介绍：按时吃饭,按时睡觉,做该做的事,见想见的人。</li>
          </ul>
          <h3 class="link_title text-info">友链条件</h3>
          <ul class="text-info mx-5">
            <li>申请友链的同时，你也需要把我的博客添加为友链。</li>
          </ul>
          <h3 class="link_title text-info">乐园</h3>
          <div class="container mt-4">
            <div class="row m-0">
              <div class="col-12 col-xl-4 col-lg-4 col-md-6 px-2 mb-2" v-for="(item,i) in flinkList" :key="i">
                <div class="friend_box p-2">
                  <div class="friend_card mb-2 pb-2 d-flex">
                    <img
                      :src="item.avatar_link ? item.avatar_link : AVATAR_URL+item.avatar+'.png'"
                      width="50"
                      height="50"
                      class="rounded-circle mr-2"
                    />
                    <div class="d-flex flex-column justify-content-between">
                      <div v-text="item.name"></div>
                      <a :href="item.address" class="visit_btn" target="_blank">访问</a>
                    </div>
                  </div>
                  <div class="f14 introduce cur" :title="item.info ? item.info : '这个人很懒~没有介绍哦'" v-text="item.info ? item.info : '这个人很懒~没有介绍哦'"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Comments :articleId={id:10002}></Comments>
    </div>
  </div>
</template>

<script>
import PageHead from "../../components/pageHead";
import Comments from "../../components/comments"
export default {
  name: "friendChain",
  data(){
    return{
      componentName:{title:"友人",introduce:""},
      flinkList:[],
      banFlink:[]
    }
  },
   created(){
    this.getFlink((res)=>{
      res.data.forEach((item,i)=>{
        if(res.data[i].status){
          this.flinkList.push(res.data[i]);
        }else{
          this.banFlink.push(res.data[i])
        }
      })
    })
  },
  methods:{
    getFlink(callback){
      this.$http("getFlink", res => {
        if (res.data.code === 200) {
          callback(res.data);
        }
      });
    }
  },
  components: {
    PageHead,
    Comments
  }
};
</script>

<style lang="scss" scoped>
#friendChain {
  .link_info {
    background: rgba(255, 255, 255, 0.7);
    .link_bg{
      // background:url("../../assets/images/1.png") no-repeat 100% 0%;
      // background-size: auto 100%;
    }
    .link_box {
      ul {
        list-style: disc;
      }
      .link_title {
        font-size: 1.17em;
        font-weight: 550;
        letter-spacing: 1px;
      }
      .friend_box {
        max-height: 110px;
        border: 1px solid #dfdfdf;
        background: #fff;
        box-shadow: rgba(0,0,0,.2) 0 0 5px 0;
        .friend_card {
          border-radius: 5px;
          border-bottom: 1px solid #dfdfdf;
          .visit_btn {
            // display: inline-block;
            width: 48px;
            padding: 0px 10px;
            font-size: 12px;
            border: 1px solid #dfdfdf;
            transition: all .3s ease;
            &:hover{
              background: #0099cc;
              color: #fff;
              border: 1px solid #0099cc;
            }
          }
        }
        .introduce{
          white-space: nowrap;
          overflow: hidden;
          line-clamp: 1;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>