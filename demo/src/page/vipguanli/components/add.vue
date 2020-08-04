<template>
  <div>

    <el-dialog title="收货地址" :visible.sync="info.show">
      <el-form :model="form">

        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>


        <el-form-item label="昵称" :label-width="formLabelWidth">
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>



        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
          <div>留空不改</div>
        </el-form-item>


        <el-form-item label="状态" :label-width="formLabelWidth">
            <el-switch v-model="form.status" :active-value='1' :inactive-value='2'>
            </el-switch>
          </el-form-item>
     


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="quxiao()">取 消</el-button>
        <el-button type="primary" @click="updata">确 定</el-button>
      </div>
    </el-dialog>


  </div>


</template>

<script>
      import {
    successAlert,
    warningAlert
  } from "../../../util/alert";
    import {requestMembrInfo,requestMembrUpdata} from  '../../../util/request'
  export default {
      props:['info'],
    data() {
      return {
          form:{
              nickname:'',
              phone:"",
              password:'',
              status: 1,
              uid:''
          },

        formLabelWidth: '120px',
        value:''
      };
    },
    methods:{

        quxiao(){
            this.info.show=false
        },
        getDetail(id){
            requestMembrInfo({uid:id}).then(res=>{
                this.form=res.data.list
               
            })

        },
        updata(id){
                if(this.form.password==''){
                  warningAlert("密码不能为空")
                  return
                }
            requestMembrUpdata(this.form).then(res=>{
                if (res.data.code == 200) {
            successAlert(res.data.msg)
            this.quxiao()
            //清空
       
            //重新获取列表数据
           
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
