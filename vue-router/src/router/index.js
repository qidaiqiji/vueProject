import Vue from 'vue'
import Router from 'vue-router'

import home from '@/components/home'
import login from '@/components/login'
// import layOut from '@/views/layout'
// import project from '@/views/backend/project'
// import workbench from '@/views/backend/workbench'
// import doc from '@/views/backend/doc'

//异步组件和webpack代码分割实现懒加载
// 懒加载是按需加载，只有在需要的时候才会去加载他
// 异步组件使用的是Promise异步函数
let layOut = (resolve)=>{
	return require.ensure([],()=>{
		resolve(require('@/views/layout'))
	})
}

let project = (resolve)=>{
	return require.ensure([],()=>{
		resolve(require('@/views/backend/project'))
	})
}

let workbench = (resolve)=>{
	return require.ensure([],()=>{
		resolve(require('@/views/backend/workbench'))
	},"abc")
}

// let doc = (resolve)=>{
// 	// return require.ensure([],()=>{
// 	// 	resolve(require('@/views/backend/doc'))
// 	// },"abc")
// }

let doc = (resolve)=>{
	return import('@/views/backend/doc')
}


Vue.use(Router)

let router = new Router({
	mode:'history',
	linkActiveClass:'is-active',
	routes:[
		{
			path:'/',
			name:'Home',
			component:home
		},
		{
			path:'/magament',
			name:'Magament',
			component:layOut,
			children:[
				{
					path:'/project',
					name:'Project',
					component:project,
					// 当进入我的项目和工作台时需要登录，所以要先写一个标示来做判断
					meta:{
						login:true
					}
				},
				{
					path:'/workbench',
					name:'Workbench',
					component:workbench,
					meta:{
						login:true
					}
				},
				{
					path:'/doc',
					name:'Doc',
					component:doc

				},
			]
		},
		
		{
			path:'/login',
			name:'Login',
			component:login

		},
		{
			path:'*',
			redirect:'/'
		}
	]
 
})
// 使用钩子函数，在进入导航之前来判断目标页面是否需要登录
router.beforeEach((to,from,next)=>{
	// 因为现在是把meta定义在了子组件上，来判断子组件是否需要登录，有时候如果所有的子组件都需要登录，
	// 那么就可能会把meta设置在父级组件上，所以不光要判断子组件是否需要登录，还需要判断父组件是否需要
	// 在$route下有一个matched,存储的是子组件和父组件的路由信息
	// console.log(to);
	// console.log(to.matched);  //mathced在to下面
	// matched是一个数组，要对数组进行遍历，只要有一个元素的login为true，就表示需要登录
	if(to.matched.some((item)=>item.meta.login)){
		// 判断是否已经登录，如果已经登录就直接执行，否则就先跳转到登录页面
		// 钩子函数中的this不再是Vue这个实例，而router.app则指向vue的实例
		// localStorage这个插件是绑定在vue的原型上的
		let info = router.app.$local.fetch("miaov");
		if(info.login){
			// 当loaclStorage中的login为true时，说明已经登录，所以直接跳转到下一个页面
			next()
		}else{
			// 如果没有登录的话，记住当前点击的位置，登录之后直接跳转到那个页面
			// next('/login')
			router.push({
				path:'/login',
				// 当前点击的path记录在查询字符串中
				query:{
					redirect:to.path.slice(1) //'project'
				}
			})
		}

	}else{
		next();
	}
	

	

})

export default router;
