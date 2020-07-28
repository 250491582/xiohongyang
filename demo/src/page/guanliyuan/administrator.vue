<template>
  <div>
      <el-button type="primary" @click='addfrom'>添加</el-button>
    <v-add :info='info' ref='add'></v-add>
  <v-list  :info='info' @edit='edit'></v-list>
  
  </div>
  
      
  </template>
    
    <script>
      import vAdd from './components/add'
    import vList from './components/list'
    export default {
    components:{
      vAdd,
      vList
    },
    data(){
      return{
        info:{
          show:false,
          title:'添加管理员',
          isAdd:true
        }
      }
    },
    methods:{
      addfrom(){
        this.info.title='添加管理员',
          this.info.isAdd=true
          this.info.show=true
      },
      edit(id){
        this.info.title='编辑角色',
        this.info.show=true
        //判断添加还是编辑
        this.info.isAdd=false
        //调用表单的方法
        this.$refs.add.getDetail(id)
      }
    }
    
    
    }
    </script>
    
    <style>
  
    </style>
    