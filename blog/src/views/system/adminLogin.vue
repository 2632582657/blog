<template>
  <div id="admin_login" class="admin_login container-fluid">
    <div class="d-flex flex-column align-items-center justify-content-center h-100">
      <div class="row w-100">
        <div
          class="col-12 col-xl-6 col-lg-6 col-md-6 offset-xl-3 offset-lg-3 offset-md-3 bg-white py-4 rounded"
        >
          <h2 class="admin_tip mb-4 text-info">欢迎站长来到后台管理系统，请验证身份</h2>
          <div class="row m-0 d-flex flex-column px-xl-5 px-lg-5 px-md-5">
            <input
              type="text"
              name="userName"
              placeholder="请输入用户名"
              class="admin_input mb-3"
              v-model="userName"
            />
            <input
              type="password"
              name="passWord"
              placeholder="请输入密码"
              class="admin_input mb-3"
              v-model="passWord"
            />
            <button class="btn btn-info" @click="submit">验证</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "adminLogin",
  data() {
    return {
      userName: "",
      passWord: ""
    };
  },
  created() {},
  methods: {
    submit() {
      if (this.userName !== "" && this.passWord !== "") {
        this.$http('adminLogin',{
          method: "post",
          data: {
            userName: this.userName,
            passWord: this.passWord
          }
        },(res)=>{
          if(res.data.code===200){
            this.$router.push({path:"/admin/system"})
          }
        })
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#admin_login {
  width: 100%;
  height: 100vh;
  background: url("../../assets/images/1000048.jpg") no-repeat center;
  background-size: cover;
  .admin_tip {
    color: #fff;
    font-size: 24px;
    font-weight: 400;
  }
  .admin_input {
    width: 100%;
    height: 26px;
    padding: 5px 10px;
    border: 1px solid #efefef;
    font-size: 12px;
    outline: none;
    line-height: 26px;
  }
}
</style>