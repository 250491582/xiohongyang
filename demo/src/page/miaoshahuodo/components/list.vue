<template>
    <div class="box">
    
  
      <el-table :data="list" style="width: 100%;margin-bottom: 20px;"border 
        >
        <el-table-column prop="title" label="菜单名称" sortable width="180"></el-table-column>

 

        <el-table-column prop="status" label="状态">
      <template slot-scope='scope'> 
          <el-button type="primary" v-if='scope.row.status==1'>启用</el-button>
          <el-button type="primary" v-else>禁用</el-button>
      </template>
  
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope='scope'> 
              <el-button type="primary" @click='edit(scope.row.id)'>编辑</el-button>
              <el-button type="danger" @click='moveListDel(scope.row.id)'>删除</el-button>
          </template>
          
        </el-table-column>
      </el-table>
    </div>
  
  </template>
  
  <script>
    import {requestSeckaDel} from '../../../util/request'
        import {mapGetters,mapActions} from 'vuex'
        import { successAlert,warningAlert } from "../../../util/alert";
    export default {
  
      props:['addfrom'],
     computed:{
       ...mapGetters({
        'list':'seckill/list'
       })
     },
      data() {
        return {
        
        }
      },
      methods:{
        ...mapActions({
          requestList:'seckill/requestList'
        }),
        //把这条数据的id传递过去
        edit(id){
          this.$emit('edit',id)
        },
        //删除文件
        moveListDel(id){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            requestSeckaDel({id:id}).then(res=>{
              if(res.data.code==200){
                successAlert(res.data.msg)
                this.requestList()
              }else{
                warningAlert(res.data.msg)
              }
            })
           
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });          
          });
         
        }
      },
      mounted(){
        this.requestList()
      }
  
    }
  
  </script>
  
  <style scoped>
  
  
  </style>
  