<template>
<div class="box">

  <el-container class="page">
    <el-aside width="200px">
      <!-- 导航开始 -->
     
      <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#20222A"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      >

      <el-menu-item index="shouye">
        <i class="el-icon-setting"></i>
        <span slot="title">首页</span>
      </el-menu-item>

      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>

          <template slot="title">分组一</template>
          <el-menu-item index="caidan">菜单管理</el-menu-item>
          <el-menu-item index="jiaose">角色管理</el-menu-item>
          <el-menu-item index="administrator">管理员管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>


      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>

          <template slot="title">分组二</template>
          <el-menu-item index="spfenlei">商品分类</el-menu-item>
          <el-menu-item index="spguige">商品规格</el-menu-item>
          <el-menu-item index="spguanli">商品管理</el-menu-item>
          <el-menu-item index="vipguanli">会员管理</el-menu-item>
          <el-menu-item index="lunbotu">轮播图管理</el-menu-item>
          <el-menu-item index="miaoshahuodo">秒杀活动</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
  
    </el-menu>


      <!-- 导航结束 -->

    </el-aside>
    <el-container>

      <el-header>
        <div class="user">
          <span>admin</span>
          <el-button type='rimary'>注销</el-button>
        </div>
      </el-header>

      <el-main>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: 'shouye' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item> {{$route.name}} </el-breadcrumb-item>
        </el-breadcrumb>
        <router-view></router-view>
        
      </el-main>


    </el-container>

  </el-container>
  

</div>

    



</template>
  
  <script>
  



  export default {
    components:{

    
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
  </script>
  
  <style scoped>
.el-aside{
 
  background-color: #20222A ;
}
.el-header{

  background-color: #B3c0D1;
}
.page{
  
  height: 100vh;
  line-height: 60px;
}
.user{
  float: right;
}
  </style>
  