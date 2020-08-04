import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


import {mutations,getters,state} from './mutations'
import actions from './actions'
import menu from './modules/menu'
import role from './modules/role'
import manage from './modules/manage'
import cate from './modules/cate'
import spec from './modules/spec'
import goods from './modules/goods'
import membe from './modules/membe'
import banner from './modules/banner'
import seckill from './modules/seckill'
export default new Vuex.Store({
state,
mutations,
actions,
getters,
modules:{
    menu,
    role,
    manage,
    cate,
    spec,
    goods,
    membe,
    banner,
    seckill

}


})
