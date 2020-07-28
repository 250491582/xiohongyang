import {requestCateList} from '../../util/request'

export const state={
    //列表数据
    list:[]
}

export const mutations={
    //修改list
    changeList(state,arr){
        state.list=arr
    }
    
}


export const actions={
     requestList(context){
        requestCateList({istree:true}).then(res=>{
            context.commit('changeList',res.data.list)

        })
     }
}

export const getters={
      list(state){
          return state.list
      }
}

export default{
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}