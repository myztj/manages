//引入全局router
import router from "./router";

//引入Vuex store
import store from "./store";

router.beforeEach(async (to,from,next)=>{
    const token = store.getters.vuexToken
    console.log(token);
    if (token) {
        if (to.path==='/login') {
            next(from.path)
        }else{
         let userinfo = store.getters.vuexinfo
         userinfo = typeof userinfo === "object" ? JSON.stringify(userinfo) : userinfo
          if (userinfo==="{}" || userinfo ==="") {
            const response = await store.dispatch('setStoreUserInfo')
            if (response) {
                next()
            }else{
                next('/login')
            }
          }else{
            next()
          }
        }
    }else{
       if (to.path=='/login') {
           next()
       } else{
        next('/login')
       }
    }
})