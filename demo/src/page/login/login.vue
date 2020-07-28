<template>
<div class="box">

    

  <div>
    
    账号：<input type="text" v-model='user.name'>
  </div>
 <div>
  
   密码：<input type="text" v-model='user.pass'>

 </div>

<div>
<select v-model='user.type'>
<option value="" disabled>请选择</option>
<option value="0">用户</option>
<option value="1">管理员</option>
</select>

</div>

<button @click='denglu'>登录</button>


</div>

    
</template>
  
  <script>
  
  
  export default {

    data(){

      return{
        user:{
          type:'',
           name:'',
           pass:''
        }
      }
    },
    methods:{
      denglu(){
        if(this.user.name=='admin' &&this.user.pass=='123'){
          this.$router.push('/index')
        }else{
          alert('账号密码错误')
        }

      }

    }

  
  }
  </script>
  
  <style scoped>
 .box{
   width: 300px;
   height: 200px;
   border: 1px solid;
   margin: 0 auto;
 }
 
  </style>
  