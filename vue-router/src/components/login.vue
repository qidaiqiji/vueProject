<template>
  <div class="login">
    <div class="login-box">
      <h2>登录</h2>
      <form @submit.prevent='sendLogin' autocomplete="off">
        <!-- ref相当于id，作用是操作DOM元素的 -->
        <div><input placeholder="请输入用户名" type="text" name="user" ref="userInput" /></div>
        <div><input placeholder="请输入密码" type="password" name="password" /></div>
        <div class="login-btn"><input type="submit" value="一键登入" /></div>
      </form>
      <div class="back-index">
        <router-link  to="/">首页>>></router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data () {
      return {}
    },
    methods: {
      sendLogin(){ //登陆
        // $refs存储的是ref所对应的元素，通过ref的值可以获取到当前的Input元素
        // console.log(this.$refs);  //Object { userInput: input }
        let userId = this.$refs.userInput.value;
        this.$local.save("miaov",{
          login:true,
          userName:userId
        })
        let redirect = this.$route.query.redirect;
        // console.log(redirect);
        if(!redirect){
          this.$router.push('/project')
        }else{
           this.$router.push({
            path:'/'+redirect
          })
        }
       

      }
    }
  }
</script>
<style>

</style>
