import {requestSpecList,requestSpecCount} from '../../util/request'

export const state={
    //列表数据
    list:[],
    size:3,
    //数据的总数量
    total:0,
    //当前的页码配置
    page:1
}

export const mutations={
    //修改list
    changeList(state,arr){
         arr.forEach(i => {
             i.attrs=JSON.parse(i.attrs)
         });
        state.list=arr
    },
    changetotal(state,num){
        state.total=num
    },
    changepage(state,page){
        state.page=page
    }
    
}


export const actions={

    // 获取列表数据
     requestList(context){
         const params={
             page:context.state.page,
             size:context.state.size
         }
         requestSpecList(params).then(res=>{
              if(res.data.list.length==0&&context.state.page>1){
                  context.commit('changepage',context.state.page-1)
                  context.dispatch('requestList')
              }

            context.commit('changeList',res.data.list)

        })
     },
     //获取总数据
     requestTotal(context){
        requestSpecCount().then(res=>{
            context.commit('changetotal',res.data.list[0].total)
        })
     },
     //修改页码
     changepage(context,page ){
      context.commit('changepage',page)
    
     }
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