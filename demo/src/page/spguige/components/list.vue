<template>
  <div>

    <el-table :data="list" style="width: 100%">
      <el-table-column prop="id" label="规格编号" width="180">
      </el-table-column>
      <el-table-column prop="specsname" label="规格名称" width="180">
      </el-table-column>
      <el-table-column label="规格属性" width="180">
        <template slot-scope='scope'>
          <el-tag v-for='item in scope.row.attrs' :key='item'>{{item}} </el-tag>
        </template>
      </el-table-column>
      <el-table-column abel="状态">
        <template slot-scope="scope">
          <el-button type='primary' v-if='scope.row.status==1'>启用</el-button>
          <el-button type='info' v-else>禁用</el-button>
        </template>

      </el-table-column>

      <el-table-column abel="操作">
        <template slot-scope="scope">
          <el-button type='primary' @click='edit(scope.row.id)'>编辑</el-button>
          <el-button type="danger " @click='moveListDel(scope.row.id)'>删除</el-button>
        </template>

      </el-table-column>




    </el-table>


    <el-pagination background layout="prev, pager, next" :page-size='size' :total="total" @current-change='cPage'>
    </el-pagination>


  </div>


</template>

<script>
  import {
    requestSpecDel
  } from '../../../util/request'
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  export default {
    props: ['info'],
    computed: {
      ...mapGetters({
        list: 'spec/list',
        total: 'spec/total',
        size: 'spec/size'
      })
    },
    methods: {
      ...mapActions({
        requestList: 'spec/requestList',
        requestTotal: "spec/requestTotal",
        changepage: 'spec/changepage'

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
          requestSpecDel({
            id:id
          }).then(res => {
            //刷新列表
            this.requestList()
            //获取总数
            this.requestTotal();
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
