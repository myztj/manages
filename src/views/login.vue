<template>
    <div class="box">
        <div class="login_form">
             <h2>积云会员管理系统</h2>
             <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="60px" class="demo-ruleForm">
  <el-form-item label="账号" prop="username">
    <el-input v-model="ruleForm.username"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input v-model="ruleForm.password"></el-input>
  </el-form-item>
   <el-form-item>
    <el-button type="primary" @click="LoinSubmit('ruleForm')">登录</el-button>
  </el-form-item>
</el-form>
        </div>
    </div>
</template>

<script>
import {onlogin} from '../utlis/api'

export default {
   name:'login',
   data() {
    return {
        ruleForm:{
          username:'',
          password:''
        },
        rules:{
            username:[
                {required:true,message:'请输入用户名称',trigger:'blur'},
                {min:3,max:15,messge:'长度在3~15个字符',trigger:'blur'},
            ],
             password:[{required:true,message:'请输入用户名称'}]
        }
    }
   },
    methods: {
        //表单验证
      LoinSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            this.getLogin()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
       //登录接口验证
   async getLogin(){
    try{
     const res = await onlogin(this.ruleForm)
     console.log(res,'res+>');
     this.$router.push('/')
    }catch(e){
       console.log(e.msg);
    }
}
    },
}
</script>

<style lang="scss" scoped>
.box{
   width: 100%;
   height: 100%;
   background: url('http://vue.mengxuegu.com/img/login.b665435f.jpg');
   background-size: cover;
   overflow: hidden;
   .login_form{
    h2{
        font-weight: 700;
        font-size: 24px;
        color: #fff;
        text-align: center;
        margin-bottom: 20px;
    }
    padding: 20px;
    width: 380px;
    margin: 160px auto;
    border-radius: 20px;
    background: rgba($color: #fff, $alpha: 0.5)
   }
}
</style>

