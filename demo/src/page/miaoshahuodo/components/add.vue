<template>
  <div class="box">
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">


        <el-form-item label="秒杀名称" label-width="80px">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>


        <el-form-item label="活动名称" label-width="80px">
          <template slot-scope='scope'>
            <el-date-picker v-model="value2" type="datetimerange" align="right" start-placeholder="开始日期"
              end-placeholder="结束日期" :default-time="['12:00:00', '08:00:00']">
            </el-date-picker>
          </template>
        </el-form-item>






        <el-form-item label="一级分类" label-width="80px">
          <el-select v-model="form.first_cateid	" placeholder="请选择分类" @change='changeFistCateid()'>
            <el-option label="顶级菜单" :value="0" disabled></el-option>
            <el-option :label="item.catename" :value="item.id" v-for='item in catelist' :key='item.id'>
            </el-option>
          </el-select>
        </el-form-item>



        <el-form-item label="二级分类" label-width="80px">
          <el-select v-model="form.second_cateid" placeholder="请选择分类" @change='changereclassify()'>
            <el-option label="请选择" :value="0" disabled></el-option>
            <el-option v-for='item in secondCateArr' :label='item.catename' :key='item.id' :value='item.id'></el-option>
          </el-select>
        </el-form-item>




        <el-form-item label="商品" label-width="80px">
          <el-select v-model="form.goodsid" placeholder="请选择分类">
            <el-option label="请选择" :value="0" disabled></el-option>
            <el-option :label="item.goodsname" :value="item.id" v-for='item in goods' :key='item.id'></el-option>
          </el-select>
        </el-form-item>




        <el-form-item label="状态" label-width="80px">
          <!-- 开关 -->
          <el-switch v-model="form.status" active-color="#13ce66" inactive-color="#ff4949" :active-value='1'
            :inactive-value='0'>
          </el-switch>
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
    requestSeckaAdd,
    requestSeckaDetail,
    requestSeckaUpdata,
    requestGoodsList,

  } from '../../../util/request'
  import {
    successAlert,
    warningAlert
  } from "../../../util/alert";
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  export default {
    props: ['info'],

    computed: {
      ...mapGetters({
        catelist: 'cate/list',
        goodslist: 'goods/list',
      })
    },
    data() {
      return {
        goods:{},
        secondCateArr:[],
        //活动时间
        value2:[],
        l:{},
        form: {
          title: "",
          begintime: '',
          endtime: '',
          first_cateid:'',
          second_cateid: '',
          goodsid: '',
          status: 1,

        },
        

      }
    },
    methods: {
      ...mapActions({
        requestcateList: 'cate/requestList',
        requestgoodsList: 'goods/requestList',
        requestList:'seckill/requestList'
      }),


      //修改了一级分类
      changeFistCateid(bool) {
        let index = this.catelist.findIndex(item => item.id == this.form.first_cateid)
        this.secondCateArr = this.catelist[index].children
        if (!bool) {
          this.form.second_cateid = ''
        
        }
     
      },
      
      //修改了二级分类
      changereclassify(bool){
        this.l.fid=this.form.first_cateid
        this.l.sid=this.form.second_cateid
        if(this.l.fid==null ||this.l.sid==null){
        return}

        requestGoodsList(this.l).then(res=>{
           this.goods= res.data.list
        })
        if(!bool){
          this.form.goodsid = ''
        }
      },


      empyt() {
        this.form = {
          title: "",
          begintime: '',
          endtime: '',
          first_cateid: '',
          second_cateid: '',
          goodsid: '',
          status: 1,

        }
        this.value2=[],
        this.secondCateArr=[]
        this.goods={}
      
     
      },
      quxiao() {
        this.info.show = false
        if (!this.info.isAdd) {
          //重置form数据
          this.empyt()
        }
      },
      //点击了添加按钮
      add() {
        console.log(this.value2)
        //将获取到的时间转化成时间戳
        this.form.begintime = this.value2[0].getTime()
        this.form.endtime = this.value2[1].getTime()
    
        requestSeckaAdd(this.form).then((res) => {
          if (res.data.code == 200) {
            successAlert(res.data.msg)
            //重置form数据
            this.empyt()
            //让弹框消失
            this.quxiao()
            //再次请求list数据
            this.requestList()
          } else {
            warningAlert(res.data.msg)
          }

        })
      },
      //获取一条数据
      getDetail(id) {


        requestSeckaDetail({
          id: id
        }).then(res => {
    
          this.form = res.data.list
          this.form.id = id
          //把时间戳转化成时间对象
          this.value2.push(new Date(JSON.parse(res.data.list.begintime)))
          this.value2.push(new Date(JSON.parse(res.data.list.endtime)))

        this.changeFistCateid(true)
        this.changereclassify(true)
        })
      },
      //修改
      updata() {
        requestSeckaUpdata(this.form).then(res => {
          if (res.data.code == 200) {
            successAlert(res.data.msg)

            //让弹框消失
            this.quxiao()
            //再次请求list数据
            this.requestList()
          } else {
            warningAlert(res.data.msg)
          }


        })
      }
    },
    mounted() {
      if (this.catelist.length == 0) {
        this.requestcateList()
      }

    }

  }

</script>

<style scoped>
  .el-switch {
    margin-left: 80px;
  }

</style>
