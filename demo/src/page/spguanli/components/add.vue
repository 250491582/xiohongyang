<template>
  <div class="box">
    <el-dialog :title="info.title" :visible.sync="info.show" @opened='createEditor'>
      <el-form :model="form">

        <el-form-item label="一级分类" label-width="80px">
          <el-select v-model="form.first_cateid" placeholder="请选择" @change='changeFistCateid'>
            <el-option label="请选择" :value="0" disabled></el-option>

            <el-option v-for='item in catelist' :label='item.catename' :key='item.id' :value='item.id'></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类" label-width="80px">
          <el-select v-model="form.second_cateid" placeholder="请选择">
            <el-option label="请选择" :value="0" disabled></el-option>
            <!-- //动态数据 -->
            <el-option v-for='item in secondCateArr' :label='item.catename' :key='item.id' :value='item.id'></el-option>
          </el-select>
        </el-form-item>



        <el-form-item label="商品名称" label-width="80px">
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>


        <el-form-item label="价格" label-width="80px">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="市场价格" label-width="80px">
          <el-input v-model="form.market_price" autocomplete="off"></el-input>
        </el-form-item>


        <el-form-item label="图片"" label-width=" 80px" v-if='form.pid!=0'>
          <el-upload class="avatar-uploader" action="#" :show-file-list="false" :on-change='changeImg'>
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>



        <el-form-item label="商品规格" label-width="80px">
          <el-select v-model="form.specsid" placeholder="请选择活动区域" @change='changeFistspecid'>
            <el-option label="请选择" :value="0" disabled></el-option>

            <el-option :label="item.specsname" :value="item.id" v-for='item in speclist' :key='item.id'></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="规格属性" label-width="80px">
          <el-select v-model="form.specsattr" placeholder="请选择活动区域" multiple>
            <el-option label="顶级菜单" :value="0" disabled></el-option>

            <el-option :label="item" :value="item" v-for='item in attrArr' :key='item'></el-option>

          </el-select>
        </el-form-item>





        <el-form-item label="是否新品" label-width="80px">

          <template>
            <el-radio v-model="form.isnew" :label="1">是</el-radio>
            <el-radio v-model="form.isnew" :label="2">否</el-radio>
          </template>
        </el-form-item>



        <el-form-item label="是否热卖" label-width="80px">

          <template>
            <el-radio v-model="form.ishot" :label="1">是</el-radio>
            <el-radio v-model="form.ishot" :label="2">否</el-radio>
          </template>
        </el-form-item>






        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" active-color="#13ce66" inactive-color="#ff4949" :active-value='1'
            :inactive-value='0'>
          </el-switch>
        </el-form-item>



        <el-form-item label="商品描述" label-width="80px">
          <div id="edito"></div>
        </el-form-item>




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
  import {
    requestGoodsAdd,
    requestGoodsDetail,
    requestGoodsUpdata
  } from '../../../util/request'
  import {
    successAlert,
    warningAlert
  } from "../../../util/alert";
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  import E from 'wangeditor'
  export default {
    props: ['info'],
    mounted() {
      if (this.catelist.length == 0) {
        this.requestcateList()
      }
      if (this.speclist.length == 0) {
        this.requestspecList(true)
      }

    },
    computed: {
      ...mapGetters({
        //分类一级列表
        catelist: 'cate/list',
        // 商品规格列表
        speclist: 'spec/list'

      })
    },
    data() {
      return {
        //编辑器对象
        editor: null,
        //上传完成图片的地址
        imageUrl: '',
        //二级分类的数组
        secondCateArr: [],
        //商品规格属性值
        attrArr: [],
        //提交给后端的事件
        form: {
          first_cateid: '',
          second_cateid: '',
          goodsname: '',
          price: '',
          market_price: '',
          img: null,
          description: '',
          specsid: '',
          specsattr: '',
          isnew: 0,
          ishot: 0,
          status: 1

        },



      }
    },


    methods: {
      ...mapActions({
        //获取分类列表
        requestcateList: 'cate/requestList',
        //获取规格列表
        requestspecList: 'spec/requestList',
        //获取商品列表
        requestGoodsList: 'goods/requestList',
        //获取总数
        requestTotal: "goods/requestTotal",
      }),
      //修改了一级分类
      changeFistCateid(bool) {

        let index = this.catelist.findIndex(item => item.id == this.form.first_cateid)
        this.secondCateArr = this.catelist[index].children
             if(!bool){
              this.form.second_cateid = ''
             }
      },
      //修改了规格属性
      changeFistspecid(bool) {
        let index = this.speclist.findIndex(item => item.id == this.form.specsid)
        this.attrArr = this.speclist[index].attrs
         if(!bool){
          this.form.specsattr = []
         }

      },

      empyt() {
        //上传完成图片的地址
        this.imageUrl = ''
        //二级分类的数组
        this.secondCateArr = []
        //商品规格属性值
        this.attrArr = []
        //提交给后端的事件
        this.form = {
          first_cateid: '',
          second_cateid: '',
          goodsname: '',
          price: '',
          market_price: '',
          img: null,
          description: '',
          specsid: '',
          specsattr: '',
          isnew: 0,
          ishot: 0,
          status: 1

        }
        //编辑器对象
        this.editor.txt.html('')
      },
      quxiao() {
        this.info.show = false
        if (!this.info.isAdd) {
          //重置form数据
          this.empyt()
        }
      },

      //创建富文本编辑器
      createEditor() {
        this.editor = new E('#edito')
        this.editor.create()
        this.editor.txt.html(this.form.description)
      },
      //点击了添加按钮
      add() {

        this.form.description = this.editor.txt.html()
        this.form.specsattr = JSON.stringify(this.form.specsattr)

        requestGoodsAdd(this.form).then((res) => {
          if (res.data.code == 200) {
            successAlert(res.data.msg)
            //重置form数据
            this.empyt()
            //让弹框消失
            this.quxiao()
            // //再次请求list数据
            this.requestGoodsList()
            //获取总数
            this.requestTotal()
          } else {
            warningAlert(res.data.msg)
          }

        })
      },
      //获取一条数据
      getDetail(id) {
        requestGoodsDetail({
          id: id
        }).then(res => {
          this.form = res.data.list
          this.form.id = id
          this.imageUrl = this.$imgPre + this.form.img
          this.form.specsattr = JSON.parse(this.form.specsattr)
          //修改了一级分类
          this.changeFistCateid(true)
          //修改了规格属性
          this.changeFistspecid(true)
          
        })
      },
      //修改
      updata() {
        this.form.description = this.editor.txt.html()
        this.form.specsattr = JSON.stringify(this.form.specsattr)


        requestGoodsUpdata(this.form).then(res => {
          if (res.data.code == 200) {
            successAlert(res.data.msg)
            //重置form表单
            this.empyt()
            //让弹框消失
            this.quxiao()
            //再次请求list数据
            this.requestGoodsList()
          } else {
            warningAlert(res.data.msg)
          }


        })
      },
      changeImg(e) {
        //上传的文件不能超过2m
        if (e.size > 2 * 1024 * 1024) {
          warningAlert('上传的文件不能超过2m')
          return
        }

        // 上传的图片必须是jpg jpeg png gif
        var extname = e.name.slice(e.name.lastIndexOf('.'))
        var extArr = ['.jpg', '.jap', '.png', '.gif', '.jpeg']
        if (!extArr.some(item => item === extname)) {
          warningAlert('上传的文件必须是图片')
        }

        //file是上传的图片
        var file = e.raw
        //生产一个URL地址，赋值给imgeUrl，展示出来
        this.imageUrl = URL.createObjectURL(file)
        this.form.img = file


      },



    },


  }

</script>

<style scoped>
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
