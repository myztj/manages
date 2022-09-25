<template>
    <div>
        <!-- 搜索部分没有封装 -->
 <el-form :inline="true" ref="ruleForm" :model="supplierQuery" class="demo-form-inline">
  <el-form-item prop="name">
    <el-input v-model="supplierQuery.name" placeholder="供应商名称"></el-input>
  </el-form-item>
  <el-form-item prop="linkman">
    <el-input v-model="supplierQuery.linkman" placeholder="联系人"></el-input>
  </el-form-item>
<el-form-item prop="mobile">
    <el-input v-model="supplierQuery.mobile" placeholder="联系电话"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="handersupplierQuery">查询</el-button>
    <el-button type="primary" @click="addEditSupplierList">新增</el-button>
    <el-button  @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
<!-- 搜索部分没有封装 -->
        <my-table :tablaHeader="tablaHeader" :tableData="tableData" @addEditMenberList="addEditMenberList" @menberDelete="menberDelete"/>
        <my-paging :page="page" :size="size" :total="totla" @SizeChange="SizeChange" @CurrentChange="CurrentChange"/>
<!-- 弹窗没有封装 -->
<el-dialog :title="suppliertitle" :visible.sync="dialogVisible" width="30%">
<el-form :model="supplierForm" :rules="rules" ref="dialogFuleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="供应商名称" prop="name">
    <el-input v-model="supplierForm.name"></el-input>
  </el-form-item>
   <el-form-item label="联系人" prop="linkman">
    <el-input v-model="supplierForm.linkman"></el-input>
  </el-form-item>
   <el-form-item label="联系电话" prop="mobile">
    <el-input v-model="supplierForm.mobile"></el-input>
  </el-form-item>
   <el-form-item label="备注" prop="remark">
    <el-input type="textarea" v-model="supplierForm.remark"></el-input>
  </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="supplierAddSubmit('dialogFuleForm')">确 定</el-button>
  </span>
</el-dialog>
<!-- 弹窗没有封装 -->
    </div>
</template>

<script>
import MyTable from '../../components/publiccompents/MyTable'
import MyPaging from '../../components/publiccompents/MyPaging'
import {getSupplierList,findSupplier,addSupplierApi,editSupplierApi,delSupplierApi} from '../../utlis/supplier/supplier'
export default {
  components:{MyTable,MyPaging},
  data() {
    return {
      dialogVisible:false,
      suppliertitle:"供应商添加",
        //表格标题
        tablaHeader:[
            {
                label:"供应商名称",
                prop:"name",
                id:1
            },
            {
                label:"联系人",
                prop:"linkman",
                 id:2
            },
             {
                label:"联系电话",
                prop:"mobile",
                 id:3
            },
             {
                label:"备注",
                prop:"remark",
                 id:4
            }
        ],
        //新增供应商弹窗表单数据
        supplierForm:{
          name:'',
          linkman:'',
          mobile:'',
          remark:'',
        },
        rules:{
          name: [{ required: true, message: '请输入供应商名称', trigger: 'blur' },],
          linkman: [{ required: true, message: '请输入联系人', trigger: 'blur' },],
        },
        page:1,
        size:10,
        totla:0,
        //表格总数据
        tableData:[],
        //查询表单参数
       supplierQuery:{
        name:'',
        linkman:'',
        mobile:''
       },
    }
  },
  methods: {
    //获取数据
   async getList(){
    try {
     let res = await getSupplierList(this.page,this.size,this.supplierQuery)
    this.tableData=res.data.data
     this.totla=res.data.totla
    } catch (error) {
        
    }
   },
   //弹框提交按钮
   supplierAddSubmit(formName){
    this.$refs[formName].validate((valid) => {
          if (valid) {
            this.supplierForm.id? this.editSupplier():this.addSupplier()
            this.resetForm('dialogFuleForm')
            this.dialogVisible=false
          } else {
            console.log('error submit!!');
            return false;
          }
        });
   },
   //添加事件
   async addSupplier(){
      try {
        let res = await addSupplierApi(this.supplierForm)
        console.log(res);
        this.$message.success('添加成功')
      } catch (error) {
        console.log(error);
      }
   },
      //编辑事件
  async editSupplier(){
    try {
      let res = await editSupplierApi(this.supplierForm.id,this.supplierForm)
      console.log(res);
      this.supplierForm.id=''
       this.$message.success('编辑成功')
    } catch (error) {
      console.log(error);
    }
   },
   //编辑获取单个供应商
  async addEditMenberList(id){
    this.dialogVisible=true
    this.suppliertitle='供应商编辑'
      try {
        let res = await findSupplier(id)
        this.supplierForm=res.data.data
        // this.resetForm('dialogFuleForm')
      } catch (error) {
        console.log(error);       
      }

   },
   //删除事件
 menberDelete(id){
     this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
               try {
      let res = await delSupplierApi(id)
      console.log(res);
      this.$message.success('删除成功')
     } catch (error) {
      console.log(error);
     }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
   },
   //分页事件页数
   SizeChange(val){
      this.size=val
      this.getList()
   },
   //分页页码
   CurrentChange(val){
    this.page=val
    this.getList()
   },
   //查询
   handersupplierQuery(){
    this.getList()
   },
   //新增
   addEditSupplierList(){
    this.dialogVisible=true
   },
   //重置
   resetForm(formName){
    this.$refs[formName].resetFields();
   }
  },
  created() {
    this.getList()
  },
}
</script>

<style>
</style>
