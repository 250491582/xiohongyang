import axios from 'axios'
import qs from 'qs'
import store from '../store'





// 请求拦截
axios.interceptors.request.use(config=>{
if(config.url!=baseUrl+'/api/userlogin'){
    config.headers.authorization=store.state.user.token
}
 return config
})


//响应拦截
axios.interceptors.response.use(res=>{
console.group('本次路径:'+res.config.url)
console.log(res)
console.groupEnd()

return res
})





const baseUrl='/api'


//菜单添加
export const requestMenuAdd = (params) => {
 

    return axios({
        url:baseUrl+"/api/menuadd",
        method:'post',
        data:qs.stringify(params)
    })
}

//菜单列表
export const requestMenuList=(params)=>{
    return axios({
        url:baseUrl+'/api/menulist',
        method:'get',
        params:params
    })
}


//菜单某一条数据的方法
export const requestMDetail=(params)=>{
    return axios({
        url:baseUrl+'/api/menuinfo',
        method:'get',
        params
    })
}

// 菜单的修改
export const requestMenuUpdata=(params)=>{
    return axios({
        url:baseUrl+'/api/menuedit',
        method:'post',
        data:qs.stringify(params)
    })
}


// 菜单的删除
export const requestMenuDel=(params)=>{
    return axios({
        url:baseUrl+'/api/menudelete',
        method:'post',
        data:qs.stringify(params)
    })
}


//角色添加

export const requestRoleAdd=(params)=>{
    return axios({
        url:baseUrl+'/api/roleadd',
        method:'post',
        data:qs.stringify(params)
    })
}


//角色列表
export const requestRoleList=(params)=>{
    return axios({
        url:baseUrl+'/api/rolelist',
        method:'get',
      params:params
    })
}

//获取某一条角色列表数据
export const requestRoleDetail=(params)=>{
    return axios({
        url:baseUrl+'/api/roleinfo',
        method:'get',
        params:params
    })
}



//角色修改 
export const requestRoleUpdata=(params)=>{
    return axios({
        url:baseUrl+'/api/roleedit',
        method:'post',
        data:qs.stringify(params)
    })
}

//角色删除
export const requestRoleDelete=(params)=>{
     return axios({
         url:baseUrl+'/api/roledelete',
         method:'post',
         data:qs.stringify(params)
     })
}
















//管理员添加

export const requestManageAdd=(params)=>{
    return axios({
        url:baseUrl+'/api/useradd',
        method:'post',
        data:qs.stringify(params)
    })
}


//管理员列表
export const requestManageList=(params)=>{
    return axios({
        url:baseUrl+'/api/userlist',
        method:'get',
      params:params
    })
}

//管理员总数
export const requestManageCount=(params)=>{
    return axios({
        url:baseUrl+'/api/usercount',
        method:'get',
      params:params
    })
}


//获取某一条管理员列表数据
export const requestManageDetail=(params)=>{
    return axios({
        url:baseUrl+'/api/userinfo',
        method:'get',
        params:params
    })
}



//管理员修改 
export const requestManageUpdata=(params)=>{
    return axios({
        url:baseUrl+'/api/useredit',
        method:'post',
        data:qs.stringify(params)
    })
}

//管理员删除
export const requestManageDelete=(params)=>{
     return axios({
         url:baseUrl+'/api/userdelete',
         method:'post',
         data:qs.stringify(params)
     })
}















//分类添加
export const requestCateAdd = (params) => {
 
    var formData=new FormData();
    for(let i in params){
        formData.append(i,params[i])
    }
    return axios({
        url:baseUrl+"/api/cateadd",
        method:'post',
        data:formData
    })
}

//分类列表
export const requestCateList=(params)=>{
    return axios({
        url:baseUrl+'/api/catelist',
        method:'get',
        params:params
    })
}


//分类某一条数据的方法
export const requestCateDetail=(params)=>{
    return axios({
        url:baseUrl+'/api/cateinfo',
        method:'get',
        params
    })
}

// 分类的修改
export const requestCateUpdata=(params)=>{
    var formData=new FormData();
    for(let i in params){
        formData.append(i,params[i])
    }
    return axios({
        url:baseUrl+'/api/cateedit',
        method:'post',
        data:formData
    })
}


// 分类的删除
export const requestCateDel=(params)=>{
    return axios({
        url:baseUrl+'/api/catedelete',
        method:'post',
        data:qs.stringify(params)
    })
}







//商品规格添加
export const requestSpecAdd = (params) => {
 
   
    return axios({
        url:baseUrl+"/api/specsadd",
        method:'post',
        data:qs.stringify(params)
    })
}

//商品规格列表
export const requestSpecList=(params)=>{
    return axios({
        url:baseUrl+'/api/specslist',
        method:'get',
        params:params
    })
}
//商品规格总数
export const requestSpecCount=()=>{
    return axios({
        url:baseUrl+'/api/specscount',
        method:'get'
        
    })
}


//商品规格某一条数据的方法
export const requestSpecDetail=(params)=>{
    return axios({
        url:baseUrl+'/api/specsinfo',
        method:'get',
        params
    })
}

// 商品规格的修改
export const requestSpecUpdata=(params)=>{

    return axios({
        url:baseUrl+'/api/specsedit',
        method:'post',
        data:qs.stringify(params)
    })
}


// 商品规格的删除
export const requestSpecDel=(params)=>{
    return axios({
        url:baseUrl+'/api/specsdelete',
        method:'post',
        data:qs.stringify(params)
    })
}






//商品管理添加
export const requestGoodsAdd = (params) => {
    var formData=new FormData();
    for(let i in params){
        formData.append(i,params[i])
    }
    return axios({
        url:baseUrl+"/api/goodsadd",
        method:'post',
        data:formData
    })
}

//商品管理列表
export const requestGoodsList=(params)=>{
    return axios({
        url:baseUrl+'/api/goodslist',
        method:'get',
        params:params
    })
}
//商品管理总数
export const requestGoodsCount=()=>{
    return axios({
        url:baseUrl+'/api/goodscount',
        method:'get'
        
    })
}


//商品管理某一条数据的方法
export const requestGoodsDetail=(params)=>{
    return axios({
        url:baseUrl+'/api/goodsinfo',
        method:'get',
        params
    })
}

//商品管理的修改
export const requestGoodsUpdata=(params)=>{
    var formData=new FormData();
    for(let i in params){
        formData.append(i,params[i])
    }
    return axios({
        url:baseUrl+'/api/goodsedit',
        method:'post',
        data:formData
    })
}


//商品管理的删除
export const requestGoodsDel=(params)=>{
    return axios({
        url:baseUrl+'/api/goodsdelete',
        method:'post',
        data:qs.stringify(params)
    })
}





//请求会员列表
export const requestMembrList=()=>{
    return axios({
      url:baseUrl+'/api/memberlist',
      method:'get',
  

    })
}

//请求会员一条
export const requestMembrInfo=(params)=>{
    return axios({
        url:baseUrl+'/api/memberinfo',
        method:'get',
        params:params
    })
}


//会员修改
export const requestMembrUpdata=(params)=>{
      return axios({
          url:baseUrl+'/api/memberedit',
          method:'post',
          data:qs.stringify(params)
      })
}









//轮播图添加
export const requestbannerAdd = (params) => {
 
    var formData=new FormData();
    for(let i in params){
        formData.append(i,params[i])
    }
    return axios({
        url:baseUrl+"/api/banneradd",
        method:'post',
        data:formData
    })
}

//轮播图列表
export const requestbannerList=(params)=>{
    return axios({
        url:baseUrl+'/api/bannerlist',
        method:'get',
        params:params
    })
}


//轮播图某一条数据的方法
export const requestbannerDetail=(params)=>{
    return axios({
        url:baseUrl+'/api/bannerinfo',
        method:'get',
        params
    })
}

// 轮播图的修改
export const requestbannerUpdata=(params)=>{
    var formData=new FormData();
    for(let i in params){
        formData.append(i,params[i])
    }
    return axios({
        url:baseUrl+'/api/banneredit',
        method:'post',
        data:formData
    })
}


// 轮播图的删除
export const requestbannerDel=(params)=>{
    return axios({
        url:baseUrl+'/api/bannerdelete',
        method:'post',
        data:qs.stringify(params)
    })
}










//秒杀添加
export const requestSeckaAdd = (params) => {
 

    return axios({
        url:baseUrl+"/api/seckadd",
        method:'post',
        data:qs.stringify(params)
    })
}

//秒杀列表
export const requestSeckaList=(params)=>{
    return axios({
        url:baseUrl+'/api/secklist',
        method:'get',
        params:params
    })
}


//秒杀某一条数据的方法
export const requestSeckaDetail=(params)=>{
    return axios({
        url:baseUrl+'/api/seckinfo',
        method:'get',
        params
    })
}

// 秒杀的修改
export const requestSeckaUpdata=(params)=>{
    return axios({
        url:baseUrl+'/api/seckedit',
        method:'post',
        data:qs.stringify(params)
    })
}


// 秒杀的删除
export const requestSeckaDel=(params)=>{
    return axios({
        url:baseUrl+'/api/seckdelete',
        method:'post',
        data:qs.stringify(params)
    })
}


//登录
export const requestLoing=(params)=>{
    return axios({
        url:baseUrl+'/api/userlogin',
        method:'post',
        data:qs.stringify(params)
    })
}