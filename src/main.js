import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../src/style/comtsStyle.css'
import './guard'
Vue.use(ElementUI);
Vue.config.productionTip = false;
console.log("a",process.env.VUE_APP_BASES_V1)
console.log("b",process.env.VUE_APP_SERVICE_URL_v1)
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
