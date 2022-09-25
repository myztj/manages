<template>
    <div>
               <!-- 搜索部分没有封装 -->
 <el-form :inline="true" ref="ruleForm" :model="staffQuery" class="demo-form-inline">
  <el-form-item prop="username">
    <el-input v-model="staffQuery.username" placeholder="账号"></el-input>
  </el-form-item>
  <el-form-item prop="name">
    <el-input v-model="staffQuery.name" placeholder="姓名"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="handerstaffQuery">查询</el-button>
    <el-button type="primary" @click="addEditStaffList">新增</el-button>
    <el-button  @click="resetForm(staffQuery)">重置</el-button>
  </el-form-item>
</el-form>
<!-- 搜索部分没有封装 -->
        <my-table :tablaHeader="tablaHeader" :tableData="tableData" @addEditMenberList="addEditMenberList" @menberDelete="menberDelete"/>
        <my-paging :page="page" :size="size" :total="total" @SizeChange="SizeChange" @CurrentChange="CurrentChange"/>
        <!-- 模态框没有封装 -->
        <el-dialog
  :title="staffTitle"
  :visible.sync="dialogVisible"
  width="30%">
      <el-form :model="dialogRuleForm" :rules="rules" ref="dialogRuleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="账号" prop="username">
    <el-input v-model="dialogRuleForm.username"></el-input>
  </el-form-item>
  <el-form-item label="姓名" prop="name">
    <el-input v-model="dialogRuleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="年龄" prop="age">
    <el-input v-model="dialogRuleForm.age"></el-input>
  </el-form-item>
  <el-form-item label="电话" prop="mobile">
    <el-input v-model="dialogRuleForm.mobile"></el-input>
  </el-form-item>
  <el-form-item label="薪酬" prop="salary">
    <el-input v-model="dialogRuleForm.salary"></el-input>
  </el-form-item>
  <el-form-item label="活动名称" prop="entryDate">
      <el-col :span="11">
      <el-date-picker type="date" placeholder="选择入职时间" v-model="dialogRuleForm.entryDate" style="width: 100%;"></el-date-picker>
    </el-col>
  </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="staffAddEditAffirm">确 定</el-button>
  </span>
</el-dialog>
        <!-- 模态框没有封装 -->
    </div>
</template>

<script>
import MyTable from '../../components/publiccompents/MyTable'
import MyPaging from '../../components/publiccompents/MyPaging'
import {getStaffList,findStaff,deletStaff,editStaff,addStaff} from "../../utlis/staff/staff"
export default {
 components:{MyTable,MyPaging},
 data() {
    return {
      staffTitle:"会员添加",
      //弹窗表单
      dialogRuleForm:{
        username:'',
        name:'',
        age	:'',
        mobile:'',
        salary	:'',
        entryDate:'',
      },
      rules:{
         username: [{ required: true, message: '请输入员工账号', trigger: 'blur' },],
         name: [{ required: true, message: '请输入员名称', trigger: 'blur' },],
      },
      //搜索参数
        staffQuery:{
         username:'',
         name:''
        },
        //弹窗关闭开启
        dialogVisible:false,
        page:1,
        size:10,
        total:10,
        //表格头部
        tablaHeader:[
            {
               label:'账号',
               prop:'username',
               id:1
            },
            {
               label:'姓名',
               prop:'name',
               id:2
            },
            {
               label:'年龄',
               prop:'age',
               id:3
            },
            {
               label:'电话',
               prop:'mobile',
               id:4
            },
            {
               label:'薪酬',
               prop:'salary',
               id:5
            },
             {
               label:'入职时间',
               prop:'entryDate',
               id:6
            },
        ],
        //表格数据
        tableData:[]
    }
 },
 methods: {
   //模态框确认事件
   staffAddEditAffirm(){
      this.dialogVisible=false
      this.dialogRuleForm.id? this.editStaffList():this.addStaffList()
   },
   //添加时间
  async addStaffList(){
     try {
      let res = await addStaff(this.dialogRuleForm)
      console.log(res);
      this.$message.success('添加成功')
      this.resetForm(this.dialogRuleForm)
     } catch (error) {
       console.log(error);
     }
   },
   //编辑提交事件
  async editStaffList(){
     try {
      let res = await editStaff(this.dialogRuleForm.id,this.dialogRuleForm)
      console.log(res);
      this.$message.success('编辑成功')
      this.resetForm(this.dialogRuleForm)
     } catch (error) {
      console.log(error);
     }
   },
   //编辑查询事件
  async addEditMenberList(id){
   this.staffTitle="会员编辑"
      try {
         let res = await findStaff(id)
         this.dialogRuleForm=res.data.data
         this.dialogVisible=true
         this.$message.success('查询成功')
      } catch (error) {
         
      }
   },
   //删除事件
  async menberDelete(id){
    try {
      let res = await deletStaff(id)
      console.log(res);
      this.$message.success('删除成功')
    } catch (error) {
      console.log(error);
    }
   },
    //分页
    SizeChange(val){
      this.size=val
      this.getList()
    },
    //分页
    CurrentChange(val){
        this.page=val
        this.getList()
    },
    //查询
    handerstaffQuery(){
      this.page=1
      this.getList()
    },
    //新增
    addEditStaffList(){
      this.dialogVisible=true,
      this.staffTitle="会员添加"
    },
    //重置
    resetForm(data){
       for(let i in data){
         data[i]=""
       }
    },
    //获取列表
   async getList(){
     try {
        console.log(123132132132132);
        let res = await getStaffList(this.page,this.size,this.staffQuery)
        console.log(res);
        this.total=res.data.totla
        this.tableData=res.data.data
     } catch (error) {
        
     }
    },
 },
  created() {
        this.getList()
    },
}
</script>

<style>
</style>
