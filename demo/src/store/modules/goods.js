import {requestGoodsList,requestGoodsCount} from '../../util/request'

export const state={
    //列表数据
    list:[],
    size:3,
    //数据的总数量
    total:0,
    //当前的页码配置
    page:1,
   
}

export const mutations={
    //修改list
    changeList(state,arr){
     
        state.list=arr
    },
    changetotal(state,num){
        state.total=num
    },
    changepage(state,page){
        state.page=page
    },
  
    
}


export const actions={

    // 获取列表数据
     requestList(context){
        //如果要获取到所有列表就传个true 分页就不传
       
            var  params={
                page:context.state.page,
                size:context.state.size,
        
            }
      
         requestGoodsList(params).then(res=>{
             
            if (res.data.list.length == 0 && context.state.page > 1) {
                //commit和dispatch都是调用引号里的函数，后面进行传参，区别就是commit是同步操作，dispatch是异步操作
                context.commit('changepage', context.state.page - 1)
                context.dispatch('requestList')
                return
            }

            context.commit('changeList',res.data.list)

        })
     },
     //获取总数据
     requestTotal(context){
        requestGoodsCount().then(res=>{
            context.commit('changetotal',res.data.list[0].total)
        })
     },
     //修改页码
     changepage(context,page ){
      context.commit('changepage',page)
    
     },
 
}

export const getters={
      list(state){
          return state.list
      },
      total(state){
          return state.total
      },
      size(state){
          return state.size
      }
}

export default{
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}