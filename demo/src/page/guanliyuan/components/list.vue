<template>
  <div>

    <el-table :data="list" style="width: 100%">
      <el-table-column prop="id" label="用户编号" width="180">
      </el-table-column>
      <el-table-column prop="username" label="用户名" width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="所属角色" width="180">
      </el-table-column>
      <el-table-column abel="状态">
        <template slot-scope="scope">
          <el-button type='primary' v-if='scope.row.status==1'>启用</el-button>
          <el-button type='info' v-else>禁用</el-button>
        </template>

      </el-table-column>

      <el-table-column abel="操作">
        <template slot-scope="scope">
          <el-button type='primary' @click='edit(scope.row.uid)'>编辑</el-button>
          <el-button type="danger " @click='moveListDel(scope.row.uid)'>删除</el-button>
        </template>

      </el-table-column>




    </el-table>


    <el-pagination background layout="prev, pager, next" :page-size='size' :total="total"  @current-change='cPage'>
    </el-pagination>


  </div>


</template>

<script>
  import {
    requestManageDelete
  } from '../../../util/request'
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  export default {
    props: ['info'],
    computed: {
      ...mapGetters({
        list: 'manage/list',
        total: 'manage/total',
        size: 'manage/size'
      })
    },
    methods: {
      ...mapActions({
        requestList: 'manage/requestList',
        requestTotal: "manage/requestTotal",
        changepage: 'manage/changepage'

      }),
      edit(id) {
        this.$emit('edit', id)
      },
      moveListDel(id) {

        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          requestManageDelete({
            uid: id
          }).then(res => {
            this.requestList()
          })


        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      
      cPage(a) {
        this.changepage(a)
     this.requestList()
      }

    },

    mounted() {
      this.requestTotal();

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
