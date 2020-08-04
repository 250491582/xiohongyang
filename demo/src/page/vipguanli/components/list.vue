<template>
  <div class="box">
    <el-table :data="list" style="width: 100%" row-key="id" border >
      <el-table-column prop="uid" label="用户编号" width="180">

      </el-table-column>
      <el-table-column prop="nickname" label="昵称" width="180">

      </el-table-column>

      <el-table-column prop="phone" label="手机号">
      </el-table-column>

      <el-table-column  label="状态">
        <template slot-scope="scope">
          <el-button type='primary' v-if='scope.row.status==1'>启用</el-button>
          <el-button type='info' v-else>禁用</el-button>
        </template>
      </el-table-column>


      <el-table-column prop="address" label="编辑">
        <template slot-scope="scope">
          <el-button type='primary' @click='add(scope.row.uid)'>编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>


</template>

<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex'

  export default {

    computed: {
      ...mapGetters({
        list: 'membe/list'
      })
    },
    methods: {
      ...mapActions({
        requestList: 'membe/requestList'
      }),
      add(id){
        this.$emit('add',id)
      }
    },

    data() {
      return {
   
      }
    },
    mounted() {
      this.requestList()
    }
  }

</script>

<style scoped>

</style>
