<template>
  <div>

    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="所属角色" label-width="80px">
          <el-select v-model="form.roleid" placeholder="请选择活动区域">
            <el-option label="顶级菜单" :value="0" ></el-option>
            <el-option :label="item.rolename" :value="item.id" v-for='item in rolelist' :key='item.id'></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="用户名"  label-width='80px'>
          <el-input v-model='form.username'></el-input>
        </el-form-item>

        <el-form-item label="密码"  label-width='80px'>
          <el-input v-model='form.password'  show-password></el-input>
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
    requestManageAdd,
    requestManageDetail,
    requestManageUpdata
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
      if (this. rolelist.length === 0) {
        this.requestRoleList()
      }
      
      
    },


    data() {
      return {
        //树型结构的数据
        defaultProps: {
          children: 'children',
          label: 'title'
        },
        //提交表单的数据
        form: {
          roleid: '',
          username: '',
          password:'',
          status: 1

        },
        formLabelWidth: '120px',
        listkey: []
      };
    },
    methods: {
      ...mapActions({
        requestRoleList: 'role/requestList',
        requestManageList:'manage/requestList'
      }),



      empty1() {
        this.form = {
          roleid: '',
          username: '',
          password:'',
          status: 1

        }
        
      },
      xiaoshi() {
        this.info.show = false
      },

      add() {
        
        //发起添加的请求
        requestManageAdd(this.form).then(res => {
          if (res.data.code == 200) {
            successAlert(res.data.msg)
            //清空
            this.empty1()
            //弹框消失
            this.xiaoshi()
            //重新获取列表数据
            this.requestManageList()
          } else {
            warningAlert(res.data.msg)
          }
        })
      },
      //获取一条数据
      getDetail(id) {
        requestManageDetail({
          uid: id
        }).then(res => {
          this.form = res.data.list
          this.form.password=''
        })
      },

      //点击了修改
      updata(id) {
  
        requestManageUpdata(this.form).then(res => {
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

<style>

</style>
