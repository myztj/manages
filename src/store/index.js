import Vue from "vue";
import Vuex from "vuex";
import {setToken,getToken,setuserInfo,getUserInfo} from '../utlis/auth'
import {onlogin,getIonfo} from '../utlis/api'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfoToken:getToken()||'',
    userInfos:getUserInfo() || '{}'
  },
  getters: {
    vuexToken(state){
      return state.userInfoToken
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
   async setStoerToken({commit},form){
      const data = await onlogin(form)
      commit('getStoerToken',data.data.token)
      return data.data.token
    },
    async setStoreUserInfo ({commit}){
         const {data} = await getIonfo()
         commit ('setStoreUserInfo',data)
         return data
    }
  },
  modules: {},
});
