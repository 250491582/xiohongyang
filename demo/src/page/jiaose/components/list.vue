<template>
  <div>

    <el-table :data="list" style="width: 100%">
      <el-table-column prop="id" label="角色编号" width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="角色名称" width="180">
      </el-table-column>
      <el-table-column abel="状态">
        <template slot-scope="scope">
       <el-button type='primary' v-if='scope.row.status==1'>启用</el-button>
       <el-button type='info' v-else >禁用</el-button>
        </template>    

      </el-table-column>

        <el-table-column abel="操作" >
          <template slot-scope="scope">
         <el-button type='primary' @click='edit(scope.row.id)'>编辑</el-button>
         <el-button type="danger " @click='moveListDel(scope.row.id)'>删除</el-button>
          </template>    
  
        </el-table-column>
  
      


    </el-table>

  </div>


</template>

<script>
  import {requestRoleDelete} from '../../../util/request'
  import {mapGetters,mapActions} from 'vuex'
  export default {
    props:['info'],
    computed:{
       ...mapGetters({
         list:'role/list'
       })
    },
    methods:{
          ...mapActions({
            requestList:'role/requestList'
          })
          ,
          edit(id){
   this.$emit('edit',id)
    },
    moveListDel(id){

      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          requestRoleDelete({id:id}).then(res=>{

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
    },
    
    data() {
      return {
      
      }
    }

  }

</script>

<style>

</style>
