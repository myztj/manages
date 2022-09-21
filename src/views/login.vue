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

export default {
   name:'login',
   data() {
    return {
        ruleForm:{
          username:'',
          password:'',
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
            this.handlerLogin()
          } else {
            console.log('error submit!!');
            return false;
          }
        }); 
      },

        async handlerLogin(){
            try {
            const token =  await this.$store.dispatch('setStoerToken',this.ruleForm)
            if (!token) return
            const ionfo =  await this.$store.dispatch('setStoreUserInfo')
            if (!ionfo) return
            this.$message.success('登录成功，获取用户信息成功')
            this.$router.push('/')
            } catch (error) {
                console.log(error.message);
            }
        }
    //    //登录接口验证
    //     async getLogin(){
    //         try{
    //         const res = await onlogin(this.ruleForm)
    //         this.$router.push('/')
    //         }catch(e){
    //         console.log(e.msg);
    //         }
    //     },
        // async getIonfos(){
        //     try {
        //         const userinfo = await getIonfo()
        //         console.log(userinfo);
        //     } catch (e) {
        //         console.log(e.message);
        //     }
        // }
    },
}
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
  background: url("http://vue.mengxuegu.com/img/login.b665435f.jpg");
  background-size: cover;
  overflow: hidden;
  .login_form {
    h2 {
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
    background: rgba($color: #fff, $alpha: 0.5);
  }
}
</style>

