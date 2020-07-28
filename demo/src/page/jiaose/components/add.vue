<template>
  <div>

    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="角色权限" :label-width="formLabelWidth">


          <el-tree :default-checked-keys="listkey" :data="menuList" show-checkbox node-key="id" :props="defaultProps"
            ref="tree">
          </el-tree>
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
    requestRoleAdd,
    requestRoleDetail,
    requestRoleUpdata
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
        "menuList": 'menu/list'
      })
    },
    mounted() {
      //如果之前menu的list没有请求就发请求，请求过了就不发了
      if (this.menuList.length === 0) {
        this.requestMenuList()
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
          rolename: '',
          menus: '',
          status: 1

        },
        formLabelWidth: '120px',
        listkey: []
      };
    },
    methods: {
      ...mapActions({
        requestMenuList: 'menu/requestList',
        requestRoleList: 'role/requestList'
      }),



      empty1() {
        this.form = {
          rolename: '',
          menus: '',
          status: ''
        }
        //将树型结构的数据,选中的key置空
        this.$refs.tree.getCheckedKeys([])
      },
      xiaoshi() {
        this.info.show = false
      },

      add() {
        //获取terr的key赋值给form的menus
        this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys())
        //发起添加的请求
        requestRoleAdd(this.form).then(res => {
          if (res.data.code == 200) {
            successAlert(res.data.msg)
            //清空
            this.empty1()
            //弹框消失
            this.xiaoshi()
            //重新获取列表数据
            this.requestRoleList()
          } else {
            warningAlert(res.data.msg)
          }
        })
      },
      //获取一条数据
      getDetail(id) {
        requestRoleDetail({
          id: id
        }).then(res => {
          this.listkey = JSON.parse(res.data.list.menus)
          this.form = res.data.list
          this.form.id = id
        })
      },

      //点击了修改
      updata(id) {
        //获取terr的key赋值给form的menus
        this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys())
        requestRoleUpdata(this.form).then(res => {
          if (res.data.code == 200) {
            successAlert(res.data.msg)
            //清空
            this.empty1()
            //弹框消失
            this.xiaoshi()
            //重新获取列表数据
            this.requestRoleList()
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
