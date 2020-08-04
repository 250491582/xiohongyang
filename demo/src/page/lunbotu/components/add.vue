<template>
  <div class="box">
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">

      


        <el-form-item label="标题" label-width="80px">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
 


        <el-form-item label="图片"" label-width="80px" >
          <el-upload
          class="avatar-uploader"
          action="#"
          :show-file-list="false"
          :on-change='changeImg'
         >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
  import {requestbannerAdd,requestbannerDetail ,requestbannerUpdata} from '../../../util/request'
  import { successAlert,warningAlert } from "../../../util/alert";
  import {mapGetters,mapActions} from 'vuex'
  export default {
    props: ['info'],

    computed:{
      ...mapGetters({
        list:'banner/list'
      })
    },
    data() {
      return {
          //上传完成图片的地址
          imageUrl:'',
        form: {
          title:'',
          img:null,
          status:1

        },
     
    
      }
    },
    methods: {
      ...mapActions({
        requestList:'banner/requestList'
      }),
      empyt(){
       this.form={
        title:'',
          img:null,
          status:1


        }
        this.imageUrl=''
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
        requestbannerAdd(this.form).then((res) => {
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
        requestbannerDetail({id:id}).then(res=>{
          this.form=res.data.list
          this.form.id=id
          this.imageUrl=this.$imgPre+res.data.list.img
        })
      },
      //修改
      updata(){
        requestbannerUpdata(this.form).then(res=>{
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
      },
      changeImg(e){

           //上传的文件不能超过2m
           if(e.size>2*1024*1024){
              warningAlert('上传的文件不能超过2m')
              return
           }
           
           // 上传的图片必须是jpg jpeg png gif
           var extname=e.name.slice(e.name.lastIndexOf('.'))
              var extArr=['.jpg','.jap','.png','.gif','.jpeg']
              if(!extArr.some(item=>item===extname)){
                  warningAlert('上传的文件必须是图片')
              }
        
          //file是上传的图片
          var file=e.raw
          //生产一个URL地址，赋值给imgeUrl，展示出来
          this.imageUrl=URL.createObjectURL(file)
          this.form.img=file
        
      }
    }

  }

</script>

<style scoped>
  .el-switch {
    margin-left: 80px;
  }

  .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

</style>
