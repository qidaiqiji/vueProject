<template>
  <div class="clearFix el-menu--dark">
    <ul class="el-menu menu-horizontal el-menu--dark el-menu--horizontal header-nav" >
      <router-link to="/" class="el-menu-item logo" exact tag="li">
      <img src="../assets/logo2.png">
    </router-link>
      <router-link to="/project" class="el-menu-item" tag="li" >
        <i class="fa fa-home"></i>
        我的项目
      </router-link>
      <router-link to='/workbench' class="el-menu-item"  tag="li">
        <i class="fa fa-code"></i>
        工作台
      </router-link>
      <router-link to="/doc" class="el-menu-item" tag="li">
        <i class="fa fa-book"></i>
        文档
      </router-link>
    </ul>
    <div class="user-info-box" v-show="isLogin">
      <div class="el-submenu__title">
        <img src="../assets/portrait.png">
        <span>{{userName}}</span>
      </div>
      <div class="header-menu">
        <ul class="menu-nav">
          <li class="el-menu-item" @click="loginOut">登出</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Header',
    data () {
      return {
        userName: '',
        isLogin: false
      }
    },
    // 在一上来的时候就要判断，所以写在生命周期函数中
    // 如果当前是登录状态的话就显示头像和用户名
    created(){
      let info = this.$local.fetch("miaov")
      this.isLogin = info.login;
      this.userName = info.userName
    },
    methods: {
      loginOut(){
        // 登出的时候把localStorage设置为空就可以了
        this.$local.save("miaov",null)
        this.$router.push('/login')
      }
    }
  }
</script>
<style>

</style>
