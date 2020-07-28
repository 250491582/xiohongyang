<template>
  <div>

    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">

        <el-form-item label="规格名称" label-width='80px'>
          <el-input v-model='form.specsname'></el-input>
        </el-form-item>

        <el-form-item v-for='(item,index) in attrArr' :key='index' label="规格属性" label-width='80px'>
          <el-input v-model='item.value' ></el-input>
          <el-button type='primary' v-if='index==0' @click='addArr'>新增规格属性</el-button>
          <el-button type='danger' v-else @click='delArr(index)'>删除</el-button>
        </el-form-item>



        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch v-model='form.status' :active-value='1' :inactive-value='2'></el-switch>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="xiaoshi()">取 消</el-button>
        <el-button type="primary" @click="add" v-if='info.isAdd==true'>添 加</el-button>
        <el-button type="primary" @click="updata" v-else>编 辑</el-button>
      </div>
    </el-dialog>

  </div>


</template>

<script>
  import {
    requestSpecAdd,
    requestSpecDetail,
    requestSpecUpdata
  } from '../../../util/request'
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  import {
    successAlert,
    warningAlert
  } from "../../../util/alert";
  export default {
    props: ['info'],
    computed: {
      ...mapGetters({
        rolelist: 'role/list'
      })
    },
    mounted() {
      //如果之前menu的list没有请求就发请求，请求过了就不发了
      // if (this.rolelist.length === 0) {
      //   this.requestRoleList()
      // }


    },


    data() {
      return {
        attrArr: [{
            value: ''
          },
         
        ],
        //提交表单的数据
        form: {
          specsname: '',
          attrs: "",
          status: 1

        },
        formLabelWidth: '120px',
        listkey: []
      };
    },
    methods: {
      ...mapActions({
        requestList: 'spec/requestList'
      }),


      addArr() {
        this.attrArr.push({
          value: ''
        })
      },
      //删除规格属性
      delArr(index) {
        this.attrArr.splice(index, 1)
      },



      empty1() {
        this.form ={
          specsname: '',
          attrs: "",
          status: 1

        }
        attrArr: [{
            value: ''
          },
         
        ]

      },
      xiaoshi() {
        this.info.show = false
      },


      //添加
      add() {
        if(this.attrArr.some(item=>item.value==0)){
          warningAlert('属性规格不能为空')
          return
        }
        //
        this.form.attrs =JSON.stringify(this.attrArr.map(item=>item.value))
        //发起添加的请求
        requestSpecAdd(this.form).then(res => {
          if (res.data.code == 200) {
            successAlert(res.data.msg)
            //清空
            this.empty1()
            //弹框消失
            this.xiaoshi()
            //重新获取列表数据
            this.requestList()
     
          } else {
            warningAlert(res.data.msg)
          }
        })
      },
      //获取一条数据
      getDetail(id) {
        requestSpecDetail({
          id: id
        }).then(res => {
          this.form = res.data.list[0]
          this.attrArr=JSON.parse(res.data.list[0].attrs).map(item=>{
            return {
              value:item
            }
          })
        })
      },

      //点击了修改
      updata(id) {
        if(this.attrArr.some(item=>item.value==0)){
          warningAlert('属性规格不能为空')
          return
        }
        //
        this.form.attrs =JSON.stringify(this.attrArr.map(item=>item.value))

        requestSpecUpdata(this.form).then(res => {
          if (res.data.code == 200) {
            successAlert(res.data.msg)
            //清空
            this.empty1()
            //弹框消失
            this.xiaoshi()
            //重新获取列表数据
            this.requestList()
          } else {
            warningAlert(res.data.msg)
          }
        })
      }

    }

  }

</script>

<style scoped>
  .el-input {
    width: 600px;
  }

</style>
