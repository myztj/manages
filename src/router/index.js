import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);
const Login = ()=>import('../views/login')
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path:'/login',
    name:'login',
    component:Login
  },
  {
    path: "/about",
    name: "about",
    component: () =>import("../views/AboutView.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
