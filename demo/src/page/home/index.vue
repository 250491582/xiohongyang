<template>
  <div class="box">

    <el-container class="page">
      <el-aside width="200px">
        <!-- 导航开始 -->

        <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
          background-color="#20222A" text-color="#fff" active-text-color="#ffd04b" router>

          <el-menu-item index="shouye">
            <i class="el-icon-setting"></i>
            <span slot="title">首页</span>
          </el-menu-item>





          <!-- 有目录的循环 -->
          <!-- <el-submenu :index="item.id+''"  v-for='item in user.menus' :keys='item.id' v-show='hasChildren'>
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.title}} </span>
        </template>
        <el-menu-item-group>
          <el-menu-item :index="i.url"  v-for='i in item.children' :key='i.id'>{{i.title}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu> -->


          <!-- 没有目录，只有菜单 -->
          <!-- <el-menu-item v-show='!hasChildren' :index="i.url"  v-for='i in user.menus' :key='i.id'>{{i.title}}</el-menu-item> -->




           <!-- 目录和菜单混合 -->
          <template v-for='item in user.menus'>
            <el-submenu v-if='item.children' :index="item.id+''" :key='item.id' v-show='hasChildren'>
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.title}} </span>
              </template>

              <el-menu-item :index="i.url"  v-for='i in item.children' :key='i.id'>{{i.title}}</el-menu-item>
         

            </el-submenu>
            <el-menu-item v-if='!item.children' :index="item.url" :key='item.id'><span>{{item.title}}</span>
            </el-menu-item>
          </template>









          <!-- <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>商城管理</span>
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
      </el-submenu> -->

        </el-menu>


        <!-- 导航结束 -->

      </el-aside>
      <el-container>

        <el-header>
          <div class="user">
            <span>{{user.username}}</span>
            <el-button type='rimary' @click='exit()'>注销</el-button>
          </div>
        </el-header>


        <!-- //面包屑 -->
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
  import {
    mapActions,
    mapGetters
  } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        user: 'user'
      }),
      hasChildren() {
        return this.user.menus[0].children ? true : false
      }
    },
    components: {


    },
    methods: {
      ...mapActions({
        'changeUser': 'changeUser'

      }),
      exit() {
        this.changeUser(null)
        this.$router.push('/login')
      },
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
  .el-aside {

    background-color: #20222A;
  }

  .el-header {

    background-color: #B3c0D1;
  }

  .page {

    height: 100vh;
    line-height: 60px;
  }

  .user {
    float: right;
  }

</style>
