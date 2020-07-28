<template>
<div class="box">

  <div  class="list1">
    <div > <router-link to='/index/shouye'>首页</router-link></div>

  <div @click='showadd=!showadd'>系统设置</div>
  
 <ul v-show='showadd'>
   <li><router-link to='/index/caidan'>菜单管理</router-link></li>
   <li><router-link to="/index/jiaose">角色管理</router-link> </li>
   <li><router-link to="/index/Administrator">管理员管理</router-link> </li>
 </ul>
    
 <div @click='showadd2=!showadd2'>商城管理</div>
 <ul v-show='showadd2'>
  <li><router-link to='/index/spfenlei'>商品分类</router-link></li>
  <li><router-link to="/index/spguige">商品规格</router-link> </li>
  <li><router-link to="/index/spguanli">商品管理</router-link> </li>
  <li><router-link to='/index/vipguanli'>会员管理</router-link></li>
  <li><router-link to="/index/lunbotu">轮播图管理</router-link> </li>
  <li><router-link to="/index/miaoshahuodo">秒杀活动</router-link> </li>
</ul>
  </div>




</div>

    
</template>
  
  <script>
  
  
  export default {
    data(){
      return{
        showadd:false,
        showadd2:false
      }
    }

  
  }
  </script>
  
  <style scoped>
.box{
    width: 200px;
    height: 100vh;
  color: #fff;
  float: left;
  background: #242335;
}
.list1{
margin-top: 100px;
margin-left: 50px;
}
.list1 ul{
   padding-top: 10px;
}
.list1 ul li{
   padding-top: 10px;
}
  </style>
  