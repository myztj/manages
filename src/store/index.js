import Vue from "vue";
import Vuex from "vuex";
import {setToken, getToken, setuserInfo, getUserInfo} from '../utlis/auth'
import {onlogin, getIonfo, loginOut} from '../utlis/api'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfoToken:getToken()||'',
    userInfos:getUserInfo() || '{}'
  },
  getters: {
    vuexToken(state){
      return state.userInfoToken
    },
    vuexinfo(state){
      return state.userInfos
    }
  },
  mutations: {
    getStoerToken(state,token){
      state.userInfoToken=token
      setToken(token)
    },
    setStoreUserInfo(state,data){
         state.userInfos=data
         setuserInfo(data)
    }
  },
  actions: {
    //登录
   async setStoerToken({commit},form){
      const data = await onlogin(form)
      console.log(data);
      commit('getStoerToken',data.data.token)
      return data.data.token
    },
    //获取用户信息
    async setStoreUserInfo ({commit}){
         const {data} = await getIonfo()
         console.log(data);
         commit ('setStoreUserInfo',data)
         return data
    },
    //退出登录
    async setLoginOut({commit}){
      const data = await loginOut()
      commit('getStoerToken',"")
      commit('setStoreUserInfo',"")
      console.log(data);
    }
  },
  modules: {},
});
