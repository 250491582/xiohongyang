import Vue from 'vue'
import Router from 'vue-router'

import store from '../store/index'

Vue.use(Router)
// import home from "../page/home/index"
// import login from "../page/login/login"
// import caidan from "../page/caidan/caidan"
// import shouye from "../page/shouye/shouye"
// import jiaose from "../page/jiaose/jiaose"

//懒加载
const home=()=>import( "../page/home/index")
const caidan=()=>import( "../page/caidan/caidan")
const jiaose=()=>import( "../page/jiaose/jiaose")
const login=()=>import('../page/login/login')
const index=()=>import("../page/index/index")
const administrator=()=>import('../page/guanliyuan/administrator')

const miaoshahuodo=()=>import("../page/miaoshahuodo/miaoshahuodo")
const lunbotu=()=>import("../page/lunbotu/lunbotu")
const spfenlei=()=>import("../page/spfenlei/spfenlei")
const spguanli=()=>import("../page/spguanli/spguanli")
const vipguanli=()=>import("../page/vipguanli/vipguanli")
const spguige=()=>import("../page/spguige/spguige")


//路由独享守卫
function havePower(url){
  return store.state.user.menus_url.some(i=>i==url)
}


let router= new Router({
  mode:'hash',
  routes: [
  
    {
      path:"/",
      component:home,
     
      
      children:[
        {
          path:"caidan",
          component:caidan,
           //别名
           alias:'h',
           name:"菜单管理",
           beforeEnter(to,from,next){
           havePower('/caidan')?next():next('/')
           }
        },
        {
          path:"shouye",
          component:index,
          name:" "
        },
        {
          path:"jiaose",
          component:jiaose
          ,name:'角色管理',
          beforeEnter(to,from,next){
            havePower('/jiaose')?next():next('/')
            }
        },
        {
          path:'administrator',
          component:administrator,
          name:"管理员管理",
          beforeEnter(to,from,next){
            havePower('/administrator')?next():next('/')
            }
        },
        {
          path:'miaoshahuodo',
          component:miaoshahuodo,
          name:'秒杀活动',
          beforeEnter(to,from,next){
            havePower('/miaoshahuodo')?next():next('/')
            }
        },
        {
          path:'lunbotu',
          component:lunbotu,
          name:'轮播图',
          beforeEnter(to,from,next){
            havePower('/lunbotu')?next():next('/')
            }
        },
        {
          path:'spfenlei',
          component:spfenlei,
          name:'商品分类',
          beforeEnter(to,from,next){
            havePower('/spfenlei')?next():next('/')
            }
        },
        {
          path:'spguanli',
          component:spguanli,
          name:"商品管理",
          beforeEnter(to,from,next){
            havePower('/spguanli')?next():next('/')
            }
        },
        {
          path:'vipguanli',
          component:vipguanli,
          name:'会员管理',
          beforeEnter(to,from,next){
            havePower('/vipguanli')?next():next('/')
            }
        },
        {
          path:'spguige',
          component:spguige,
          name:'商品规格',
          beforeEnter(to,from,next){
            havePower('/spguige')?next():next('/')
            }
        },
        {
          path:'',
          redirect:'shouye'
        }
      ]
     
    },{
      path:"/login",
      component:login,
  
    }	,
      //一级重定向
      {
          path:"*",
          redirect:"/login"
      },
  

  ]
})

// 登录拦截
router.beforeEach((to,from,next)=>{
  // 如果去的是登录就next
  if(to.path==='/login'){
    next()
    return
  }
//  如果去的不是登录，就要判断store.user. user是true，next（）； 如果是null就next到登录
if(store.state.user){
  next()
  return
}
next('/login')
})


export default router