<template>
  <div class="home">
      <el-container>
  <el-header>
    <div class="title_left">
      <img src="../assets/logo.7156be27.png" alt="">
      <p>梦学谷会员管理系统</p>
    </div>
    <div class="title_right">
      <el-dropdown @command="handleCommand">
  <span class="el-dropdown-link">
    欢迎你 ! {{userinofo.name}}<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item command="修改密码">修改密码</el-dropdown-item>
    <el-dropdown-item command="退出系统">退出系统</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
    </div>
  </el-header>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-main>Main</el-main>
  </el-container>
</el-container>
  </div>
</template>

<script>
import axios from "axios"
export default {
  name: "HomeView",
  components: {},
  data() {
    return {
    }
  },
  computed:{
      userinofo(){
        return this.$store.state.userInfos
      }
  },
  methods: {
    handleCommand(val){
      console.log(val);
    }
  },
};
</script>

<style lang="scss" scoped>
 .el-header {
    background-color: #2d3a4b;
    color: #fff;
    height: 80px;
    display: flex;
    justify-content: space-between;
    .title_left{
      display: flex;
      align-items: center;
      line-height: 60px;
      img{
        width: 25px;
        vertical-align: middle;
        padding: 0 10px 0 40px;
      }
    }
    .title_right{
      color: #fff;
      margin-top: 20px;
    }
  }
  
  .el-aside {
    background-color: #545c64;
    color: #fff;
    height: 93.6vh;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
  }
  .el-dropdown{
    color:#fff;
  }
</style>

