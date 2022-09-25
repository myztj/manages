<template>
    <div>
        <el-container>
  <el-header>
    <hender/>
  </el-header>
  <el-container>
    <el-aside width="200px">
        <asides/>
    </el-aside>
    <el-main>
        <mains/>
    </el-main>
  </el-container>
</el-container>
    </div>
</template>

<script>
import asides from '../Layout/asides'
import hender from '../Layout/hender'
import mains from '../Layout/mains'
import {getlist} from "../utlis/api"
export default {
  data() {
    return {
      
    }
  },
    components:{asides,hender,mains},
    watch:{
      $route:{
        immediate:true,
      handler(newPath){
        let token = localStorage.getItem('token')
        let iofn = localStorage.getItem('userInfo')
        if (!token && !iofn) {
          this.$store.dispatch('setLoginOut')
        }else if (!iofn){
          this.$store.dispatch('setStoreUserInfo')
        }else if(!token){
          this.$store.dispatch('setLoginOut')
        }
      }
      }
    },
    // created() {
    //   this.hhh()
    // },
    // methods: {
    //   hhh(){
    //    getlist().then(res=>{
    //     console.log(res);
    //    })
    // }
    // },
}
</script>

<style lang="scss" scoped>
.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    padding: 0;
    height: 60px;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    height: 90vh;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    height: 90vh;
  }
</style>

