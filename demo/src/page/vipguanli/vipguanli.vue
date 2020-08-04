<template>
<div class="box">

  <v-add ref='add'  :info='info'></v-add>
<v-list @add='add' ></v-list>
</div>

    
</template>
  
  <script>
  import vList from './components/list'
  import vAdd from './components/add'
  export default {
    components:{
      vList,
      vAdd
    },
    data(){
      return{

      info:{
       show:false
      }
    }
    },
    methods:{
      add(id){
        this.info.show=true
        this.$refs.add.getDetail(id)
      }
    }

  
  }
  </script>
  
  <style>

  </style>
  