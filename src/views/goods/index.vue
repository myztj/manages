<template>
    <div>
    <!-- 搜索部分没有封装 -->
 <el-form :inline="true" ref="ruleForm" :model="goodsQuery" class="demo-form-inline">
  <el-form-item prop="name">
    <el-input v-model="goodsQuery.name" placeholder="商品名称"></el-input>
  </el-form-item>
  <el-form-item prop="code">
    <el-input v-model="goodsQuery.code" placeholder="商品编号"></el-input>
  </el-form-item>
<el-form-item prop="supplierName">
    <el-input v-model="goodsQuery.supplierName" @click.native="topOpenDialog" placeholder="选者供应商"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="handergoodsQuery">查询</el-button>
    <el-button type="primary" @click="addEditGoodsList">新增</el-button>
    <el-button  @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
<!-- 搜索部分没有封装 -->
     <my-table :tableData="tableData" :tablaHeader="tablaHeader" @addEditMenberList="addEditMenberList" @menberDelete="goodsDelete"/>
     <my-paging :page="page" :size="size" :total="total" @SizeChange="SizeChange" @CurrentChange="CurrentChange"/>
     <!-- 弹出框没有封装 -->
<el-dialog
  :title="goodsTitle"
  :visible.sync="dialogVisible"
  width="30%">
  <el-form :model="dialogForm" :rules="rules" ref="dialogRuleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="商品名称" prop="name">
    <el-input v-model="dialogForm.name"></el-input>
  </el-form-item>
   <el-form-item label="商品编码" prop="code">
    <el-input v-model="dialogForm.code"></el-input>
  </el-form-item>
   <el-form-item label="商品规格" prop="spec">
    <el-input v-model="dialogForm.spec"></el-input>
  </el-form-item>
   <el-form-item label="零售价" prop="retailPrice">
    <el-input v-model="dialogForm.retailPrice"></el-input>
  </el-form-item>
  <el-form-item label="进货价" prop="purchasePrice">
    <el-input v-model="dialogForm.purchasePrice"></el-input>
  </el-form-item>
  <el-form-item label="库存数量" prop="storageNum">
    <el-input v-model="dialogForm.storageNum"></el-input>
  </el-form-item>
  <el-form-item label="供应商" prop="supplierName">
    <el-input v-model="dialogForm.supplierName" @click.native="openDialog"></el-input>
  </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addGoodsSubmit('dialogRuleForm')">确 定</el-button>
  </span>
</el-dialog>
     <!-- 弹出框没有封装 -->
     <!-- 品牌弹窗 -->
       <el-dialog
  title="选者供应商"
  :visible.sync="brandDialogVisible"
  width="30%">
  <!-- 表单 -->
   <el-form :inline="true" :model="formInline" class="demo-form-inline">
  <el-form-item>
    <el-input v-model="formInline.user" placeholder="供应商名称"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="brandOnSubmit">查询</el-button>
  </el-form-item>
</el-form>
<!-- 表单 -->
<!-- 表格 -->
 <el-table
    :data="tableData"
    height="380"
    border
    @row-click="onChoose"
    style="width: 100%">
    <el-table-column
      type="index"
      label="序号">
    </el-table-column>
    <el-table-column
      prop="supplierName"
      label="供应商名称">
    </el-table-column>
    <el-table-column
      prop="name"
      label="联系人">
    </el-table-column>
  </el-table>
<!-- 表格 -->
  <span slot="footer" class="dialog-footer">
    <el-button @click="brandDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="brandDialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
     <!-- 品牌弹窗 -->
    </div>
</template>

<script>
import MyTable from '../../components/publiccompents/MyTable'
import MyPaging from '../../components/publiccompents/MyPaging'
import {getGoodsList,findGoodsApi,deletGoodsApi,editGoosdApi,addGoodsApi} from '../../utlis/goods/goods'
export default {
   components:{MyTable,MyPaging},
   data() {
    return {
      formInline:{},
       brandDialogVisible:false,
        goodsTitle:'添加商品',
        dialogForm:{
         name:'',
         code:'',
         spec:'',
         retailPrice:'',
         purchasePrice:'',
         storageNum:'',
         supplierName:'',
        },
        rules:{
            name: [{ required: true, message: '请输入商品名称', trigger: 'blur' },],
            code: [{ required: true, message: '请输入商品编码', trigger: 'blur' },],
            retailPrice: [{ required: true, message: '请输入商品编码', trigger: 'blur' },],
        },
        dialogVisible:false,
        tableData:[],
        page:1,
        size:10,
        total:10,
        tablaHeader:[
            {
                label:'商品名称',
                prop:"name",
                id:1
            },
            {
                label:'商品编码',
                prop:"code",
                id:2
            },
            {
                label:'商品规格',
                prop:"spec",
                id:3
            },
            {
                label:'零售价',
                prop:"retailPrice",
                id:4
            },
            {
                label:'进货价',
                prop:"purchasePrice",
                id:5
            },
             {
                label:'库存数量',
                prop:"storageNum",
                id:6
            },
             {
                label:'供应商',
                prop:"supplierName",
                id:7
            },
        ],
        goodsQuery:{
            name:'',
            code:'',
            supplierName:'',
        },
        isopen:false
    }
   },
   methods: {
    onChoose(val){
      console.log(val);
      this.isopen? this.goodsQuery.supplierName=val.supplierName:this.dialogForm.supplierName=val.supplierName
      this.brandDialogVisible=false
      this.isopen=false
    },
    //供应商查询
    brandOnSubmit(){},
    //打开供应商弹窗
    topOpenDialog(val){
      this.brandDialogVisible=true
      this.isopen=true
    },

    openDialog(){
      console.log(123);
      this.brandDialogVisible=true
    },
    //模态框提交事件
    addGoodsSubmit(formName){
    this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dialogForm.id?this.editGoods():this.addGoods()
            this.dialogVisible=false
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    //获取商品列表
   async getList(data){
        try {
          let res = await getGoodsList(this.page,this.size,data)
          console.log(res);
          this.tableData=res.data.data
          this.total=res.data.totla
        } catch (error) {
            console.log(error);
        }
    },
    //编辑查询
   async addEditMenberList(id){
    this.goodsTitle="商品编辑"
       try {
        let res = await findGoodsApi(id)
        this.dialogVisible=true
        console.log(res);
        this.dialogForm=res.data.data
       } catch (error) {
        
       }
    },
    //删除
    goodsDelete(id){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          try {
            let res = await deletGoodsApi(id)
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
    //添加商品事件
    async addGoods(){
     try {
        let res = await addGoodsApi(this.dialogForm)
        this.$message.success('添加成功')
        this.resetForm('dialogRuleForm')
     } catch (error) {
        
     }
    },
    //编辑事件
    async editGoods(){
      try {
        let res = await editGoosdApi(this.dialogForm.id,this.dialogForm)
        console.log(res);
        this.$message.success('编辑成功')
        this.resetForm('dialogRuleForm')
        this.dialogForm.id=''
      } catch (error) {
        
      }
    },
    //查询
    handergoodsQuery(){
      this.getList(this.goodsQuery)
      this.page=1
    },
    //新增按钮
    addEditGoodsList(){
        this.goodsTitle="商品添加"
        this.dialogVisible=true

    },
    //重置
    resetForm(formName){
         this.$refs[formName].resetFields();
    },
    //分页
    SizeChange(val){
        this.size=val
        this.getList()
    },
    CurrentChange(val){
        this.page=val
        this.getList()
    }
   },
   created() {
    this.getList()
   },
}
</script>

<style>

</style>
