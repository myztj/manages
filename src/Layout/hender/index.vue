<template>
    <div class="el-headers">
        <div class="title_left">
      <img src="../../assets/logo.7156be27.png" alt="">
      <p>梦学谷会员管理系统</p>
    </div>
    <div class="title_right">
      <el-dropdown @command="handleCommand">
  <span class="el-dropdown-link">
    欢迎你 ! {{userinofo.name}}<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item command="修改密码" icon="el-icon-edit">修改密码</el-dropdown-item>
    <el-dropdown-item command="退出系统" icon="el-icon-s-fold">退出系统</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
    </div>
    </div>
</template>

<script>
export default {
computed:{
      userinofo(){
        return this.$store.state.userInfos
      }
  },
  methods: {
    handleCommand(command){
      switch (command) {
        case "退出系统":
          this.handleout()
          break;
      
        default:
          break;
      }
    },
   async handleout(){
    try {
      const flag= await this.$store.dispatch('setLoginOut')
      this.$router.push('/login')
      this.$message.success('退出系统成功')
    } catch (error) {
      console.log(error);
    }
    }
  },
}
</script>

<style lang="scss" scoped>
.el-headers {
  background-color: #2d3a4b;
  color: #fff;
  height: 60px;
  display: flex;
  justify-content: space-between;
  .title_left {
    display: flex;
    align-items: center;
    line-height: 60px;
    img {
      width: 25px;
      vertical-align: middle;
      padding: 0 10px 0 40px;
    }
  }
  .title_right {
    .el-dropdown {
      color: #fff !important;
      margin-right: 20px;
    }

    //   margin-top: 20px !important;
  }
}
</style>

