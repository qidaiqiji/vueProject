<template>
  <div class="doc">
    <div class="doc-nav">
      <ul class="main-menu">
        <li>
          <router-link :to="{path:'#base'}">基础</router-link>
          <ul class="nav-dropdown">
            <li>
              <router-link :to="{path:'#start'}">开始</router-link>
            </li>
            <li>
              <router-link :to="{path:'#dongtai'}">动态路由</router-link>
            </li>
            <li>
              <router-link :to="{path:'#qiantaoluyou'}">嵌套路由</router-link>
            </li>
          </ul>
        </li>
        <li>
          <router-link :to="{path:'#jinjie'}">进阶</router-link>
          <ul class="nav-dropdown">
            <li>
              <router-link :to="{path:'#jinjie1'}">导航钩子</router-link>
            </li>
            <li>
              <router-link :to="{path:'#jinjie2'}">路由元信息</router-link>
            </li>
            <li>
              <router-link :to="{path:'#jinjie3'}">过渡动效</router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="doc-view">
      <doc-view></doc-view>
    </div>
  </div>
</template>

<script>
  import DocView from '@/views/backend/doc-view'
  // 安装tween.js, npm i tween.js --save
  import TWEEN from 'tween.js'

  export default {
    components: {
      DocView
    },
    beforeRouteEnter(to,from,next){
      next((vm)=>{
        vm.animate(to)
      })

    },
    // doc这个组件是复用的，所以要监控路由信息的变化
    beforeRouteUpdate(to,from,next){
      // console.log(to.hash);
      this.animate(to);
      next()
    },
    methods:{
      animate(to){

        // 循环执行
        function animateFunc(time){
          requestAnimationFrame(animateFunc)
          TWEEN.update(time)
        }
        if(to.hash){
          // console.log(to.hash);
          var el = document.querySelector(to.hash);
          // console.log(el);
          var doc = document.querySelector('.doc');

          if(el){
            // new一个tween的实例，调用实例下的Tween,to,onUpdate,start方法
            animateFunc();
            new TWEEN.Tween({
              // 自定义一个属性key值，作为起始位置,其实位置是整个doc的顶部
              number:doc.scrollTop
            }).to({
              // 目标位置,运动的属性是number，时间是500ms
              number:el.offsetTop
            },500).onUpdate(
              // 运动中更新起始位置，把当前的位置赋给起始位置
              // 接受一个回调函数
              function(){
                // 这里不能用箭头函数，因为this的指向问题
                doc.scrollTop = this.number.toFixed(0);
              }
            ).start()  //启动运动框架
          }
        }
      }
    }
  }
</script>
<style>

</style>
