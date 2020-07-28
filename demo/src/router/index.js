import Vue from 'vue'
import Router from 'vue-router'

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
export default new Router({
  mode:'hash',
  routes: [
  
    {
      path:"/index",
      component:home,
     
      
      children:[
        {
          path:"caidan",
          component:caidan,
           //别名
           alias:'h',
           name:"菜单管理"
        },
        {
          path:"shouye",
          component:index,
          name:""
        },
        {
          path:"jiaose",
          component:jiaose
          ,name:'角色管理'
        },
        {
          path:'administrator',
          component:administrator,
          name:"管理员管理"
        },
        {
          path:'miaoshahuodo',
          component:miaoshahuodo
        },
        {
          path:'lunbotu',
          component:lunbotu
        },
        {
          path:'spfenlei',
          component:spfenlei
        },
        {
          path:'spguanli',
          component:spguanli
        },
        {
          path:'vipguanli',
          component:vipguanli
        },
        {
          path:'spguige',
          component:spguige
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
