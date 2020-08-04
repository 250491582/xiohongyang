<template>
    <div class="box">
      <el-button type="primary" @click='addfrom'>添加</el-button>
    <list @edit='edit'></list>
    
    <v-add :info='info' ref='add' ></v-add>
    </div>
        
    </template>
      
      <script>
      import vAdd from './components/add'
      import list from './components/list'
      export default {
    components:{
      list,
      vAdd,
      
    },
    data(){
    return{
      //传递给子组件的信息  
      info:{
      show:false,
      title:'菜单添加',
      isAdd:true
      }
    }  
    
      },
      methods:{
       addfrom(){
        this.info.show=true
        this.info.title='菜单添加'
        this.info.isAdd=true
       },
       edit(id){
         this.info.show=true
         //调用表单的方法
         this.$refs.add.getDetail(id)
         //判断编辑还是修改
         this.info.isAdd=false
       }
      }
    }
      </script>
      
      <style scoped>
    
    
      </style>
      