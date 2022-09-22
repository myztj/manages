<template>
    <div class="box">
        <el-menu
      :default-active="activePath"
      text-color="#fff"
      router
      background-color="#545c64"
      class="el-menu-vertical-demo">
      <el-menu-item index="/index">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/menber">
        <i class="el-icon-setting"></i>
        <span slot="title">会员管理</span>
      </el-menu-item>
      <el-menu-item index="/supplier">
        <i class="el-icon-menu"></i>
        <span slot="title">供应神管理</span>
      </el-menu-item>
      <el-menu-item index="/goods">
        <i class="el-icon-setting"></i>
        <span slot="title">商品管理</span>
      </el-menu-item>
          <el-menu-item index="/staff">
        <i class="el-icon-setting"></i>
        <span slot="title">员工管理</span>
      </el-menu-item>
    </el-menu>
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
   computed:{
    activePath(){
        return this.$route.path
    }
   },
   created() {

   },
}
</script>

<style lang="scss" scoped>
.box{
    height: 100%;
}
</style>

