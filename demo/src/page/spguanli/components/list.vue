<template>
  <div>

    <el-table :data="list" style="width: 100%">
      <el-table-column prop="id" label="商品编号" width="180">
      </el-table-column>

      <el-table-column prop="goodsname" label="商品名称" width="180">
      </el-table-column>

    <el-table-column prop="price" label="商品价格" width="180">
      </el-table-column>

      <el-table-column prop="market_price" label="市场价格" width="180">
      </el-table-column>



      <el-table-column label="图片" width="180">
        <template slot-scope='scope'>
       <img :src="$imgPre+scope.row.img" alt="">
        </template>
      </el-table-column>

      <el-table-column abel="是否新品">
        <template slot-scope="scope">
          <el-button type='primary' v-if='scope.row.isnew==1' >是</el-button>
          <el-button type='info' v-else>否</el-button>
        </template>
      </el-table-column>

      <el-table-column abel="是否热卖">
        <template slot-scope="scope">
          <el-button type='primary' v-if='scope.row.ishot==1'>是</el-button>
          <el-button type='info' v-else>否</el-button>
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
    requestGoodsDel
  } from '../../../util/request'
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  export default {
    props: ['info'],
    computed: {
      ...mapGetters({
        list: 'goods/list',
        total: 'goods/total',
        size: 'goods/size'
      })
    },
    methods: {
      ...mapActions({
        //获取列表
        requestList: 'goods/requestList',
        //获取总数
        requestTotal: "goods/requestTotal",
        //获取分页
        changepage: 'goods/changepage'

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
          requestGoodsDel({
            id: id
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

<style scoped>
 
 img{
   width: 80px;
   height: 80px;
 }
</style>
