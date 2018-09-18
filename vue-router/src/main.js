// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/assets/css/app.css'

import utils from './lib/utils'

Vue.config.productionTip = false
Vue.use(utils)

/*Vue.prototype.$code="自定义的插件"
var obj={
	install:function(Vue,options){
		Vue.prototype.$code="自定义"; //在Install中给构造函数的原型身上添加属性作为插件
		console.log(Vue);  //function Vue()这个构造函数
		console.log(options); //自定义的信息  Object { a: 1 }
	}
};
Vue.use(obj,{a:1})
Vue.use(obj)*/

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
