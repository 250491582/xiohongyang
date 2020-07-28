<template>
  <div class="box">
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">


        <el-form-item label="菜单名称" label-width="80px">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" label-width="80px">
          <el-select v-model="form.pid" placeholder="请选择活动区域">
            <el-option label="顶级菜单" :value="0" ></el-option>
            <el-option :label="item.title" :value="item.id" v-for='item in list' :key='item.id'></el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="菜单类型" label-width="80px">
          <template>
            <el-radio v-model="form.type" :label="1">目录</el-radio>
            <el-radio v-model="form.type" :label="2">菜单</el-radio>
          </template>
        </el-form-item>


        <el-form-item label="菜单图标" label-width="80px" v-if='form.type==2'>
          <el-select v-model="form.icon" placeholder="请选择图标">
            <el-option v-for='item in icons' :key='item' :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单地址" label-width="80px">
          <el-select v-model="form.url" placeholder="请选择">
            <el-option v-for='item in urls' :key='item' :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>


        <!-- 开关 -->
        <el-switch v-model="form.status" active-color="#13ce66" inactive-color="#ff4949" :active-value='1'
          :inactive-value='0'>
        </el-switch>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="quxiao">取 消</el-button>
        <el-button type="primary" @click="add" v-if='info.isAdd'>添 加 </el-button>
        <el-button type="primary" @click="updata" v-else>修 改 </el-button>
      </div>
    </el-dialog>

  </div>

</template>

<script>
  import {requestMenuAdd,requestMDetail ,requestMenuUpdata} from '../../../util/request'
  import { successAlert,warningAlert } from "../../../util/alert";
  import {mapGetters,mapActions} from 'vuex'
  export default {
    props: ['info'],

    computed:{
      ...mapGetters({
        list:'menu/list'
      })
    },
    data() {
      return {

        form: {
          pid: 0,
          title: '',
          icon: '',
          type: 1,
          url: '',
          status: 1,

        },
        radio: '1',
        icons: [
          "   el-icon-eleme",
          "el-icon-s-tools",
          "el-icon-setting"
        ],
        urls: ['/jiaose', '/caidan', '/administrator', '/miaoshahuodo', '/lunbotu', '/spfenlei', '/spguanli',
          '/vipguanli', '/spguige'
        ]
      }
    },
    methods: {
      ...mapActions({
        requestList:'menu/requestList'
      }),
      empyt(){
       this.form={
          pid: 0,
          title: '',
          icon: '',
          type: 1,
          url: '',
          status: 1,

        }
      },
      quxiao() {
        this.info.show=false
        if(!this.info.isAdd){
         //重置form数据
         this.empyt()
        }
      },
      //点击了添加按钮
      add(){
        requestMenuAdd(this.form).then((res) => {
          if(res.data.code==200){
            successAlert(res.data.msg)
            //重置form数据
            this.empyt()
            //让弹框消失
            this.quxiao() 
            //再次请求list数据
            this.requestList()       
          }else{
            warningAlert(res.data.msg)
          }
        
        })
      },
      //获取一条数据
      getDetail(id){
        requestMDetail({id:id}).then(res=>{
          this.form=res.data.list
          this.form.id=id
        })
      },
      //修改
      updata(){
        requestMenuUpdata(this.form).then(res=>{
          if(res.data.code==200){
            successAlert(res.data.msg)
              
             //让弹框消失
             this.quxiao() 
            //再次请求list数据
            this.requestList()    }
            else{
              warningAlert(res.data.msg)
            }
               

        })
      }
    }

  }

</script>

<style scoped>
  .el-switch {
    margin-left: 80px;
  }

</style>
