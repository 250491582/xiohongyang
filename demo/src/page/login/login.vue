<template>
  <div class="box">



    <div>

      账号：<input type="text" v-model='user.username'>
    </div>
    <div>

      密码：<input type="text" v-model='user.password'>

    </div>

    <div>


    </div>

    <button @click='denglu'>登录</button>


  </div>


</template>

<script>
  import {
    requestLoing
  } from './../../util/request'
  import {
    successAlert,
    warningAlert
  } from "./../../util/alert";
  import {mapActions} from 'vuex'
  export default {

    data() {

      return {
        user: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      ...mapActions({
        'changeUser':'changeUser'
      }),

      denglu() {
        requestLoing(this.user).then(res => {
          if(res.data.code===200){
               //Vuex保存了用户信息
               this.changeUser(res.data.list)
               successAlert(res.data.msg)
               this.$router.push('/')
               }else{
                warningAlert(res.data.msg)
               }
        })

      }

    }


  }

</script>

<style scoped>
  .box {
    width: 300px;
    height: 200px;
    border: 1px solid;
    margin: 0 auto;
  }

</style>
