<template>
    <div class="box">
<el-form :inline="true" ref="ruleForm" :model="memberQuery" class="demo-form-inline">
  <el-form-item prop="cardNum">
    <el-input v-model="memberQuery.cardNum" placeholder="会员卡号"></el-input>
  </el-form-item>
  <el-form-item prop="name">
    <el-input v-model="memberQuery.name" placeholder="会员名字"></el-input>
  </el-form-item>
  <el-form-item payType prop="payType">
    <el-select v-model="memberQuery.payType" placeholder="支付类型">
      <el-option v-for="(item,index) in menbercode" :key="index" :label="item.name" :value="item.type"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item prop="birthday">
     <el-date-picker
     value-format="yyyy-MM-dd"
      v-model="memberQuery.birthday"
      type="date"
      placeholder="出生日期">
    </el-date-picker>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="menberQuery">查询</el-button>
    <el-button type="primary" @click="addEditMenberList">新增</el-button>
    <el-button  @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
<!-- 表格 -->
  <el-table
    :data="memberList"
    height="380"
    border
    style="width: 100%">
    <el-table-column
      type="index"
      label="序号" width="60">
    </el-table-column>
    <el-table-column
      prop="cardNum"
      label="会员卡号">
    </el-table-column>
    <el-table-column
      prop="name"
      label="会员名称">
    </el-table-column>
      <el-table-column
      prop="birthday"
      label="会员生日">
    </el-table-column>
      <el-table-column
      prop="phone"
      label="手机号码">
    </el-table-column>
      <el-table-column
      prop="integral"
      label="可用积分">
    </el-table-column>
      <el-table-column
      prop="money"
      label="开卡金额">
    </el-table-column>
      <el-table-column
      prop="payType"
      label="支付类型">
   <template slot-scope="scope">
         {{scope.row.payType | filterCode}}
   </template>
    </el-table-column>
      <el-table-column
      prop="address"
      label="会员地址">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="150">
        <template slot-scope="scope">
        <el-button
          size="mini"
          @click="addEditMenberList(scope.row.id)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="menberDelete(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页 -->
  <!-- <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="page"
      :page-sizes="[10, 20, 30, 40]"
      :page-size.sync="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination> -->
    <my-paging :size="size" :page="page" :total="total" @CurrentChange="handleCurrentChange" @SizeChange="handleSizeChange"></my-paging>
    <!-- 弹窗 -->
  <el-dialog :title="memberTitle" :visible.sync="dialogVisible" width="30%">
  <el-form :model="memberRuleForm" :rules="rules" ref="ruleFormParms" label-width="100px" class="demo-ruleForm">
  <el-form-item label="会员卡号" prop="cardNum">
    <el-input v-model="memberRuleForm.cardNum"></el-input>
  </el-form-item>
   <el-form-item label="会员名称" prop="name">
    <el-input v-model="memberRuleForm.name"></el-input>
  </el-form-item>
   <el-form-item label="会员生日" prop="birthday">
   <el-date-picker
     value-format="yyyy-MM-dd"
      v-model="memberRuleForm.birthday"
      type="date"
      placeholder="出生日期">
    </el-date-picker>
  </el-form-item>
  <el-form-item label="手机号码" prop="phone">
    <el-input v-model="memberRuleForm.phone"></el-input>
  </el-form-item>
  <el-form-item label="开卡金额" prop="money">
    <el-input v-model="memberRuleForm.money"></el-input>
  </el-form-item>
  <el-form-item label="可用积分" prop="integral">
    <el-input v-model="memberRuleForm.integral"></el-input>
  </el-form-item>
  <el-form-item label="支付类型" prop="payType">
  <el-select v-model="memberRuleForm.payType" placeholder="支付类型">
      <el-option v-for="(item,index) in menbercode" :key="index" :label="item.name" :value="item.type"></el-option>
    </el-select>
  </el-form-item>
   <el-form-item label="会员地址" prop="address">
     <el-input type="textarea" v-model="memberRuleForm.address"></el-input>
  </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="cancel">取 消</el-button>
    <el-button type="primary" @click="addMember('ruleFormParms')">确 定</el-button>
  </span>
</el-dialog>
    </div>
</template>

<script>
import MyPaging from '../../components/publiccompents/MyPaging'
let thih 
import {getMemberList,findMemberIitm,deleteMemderItem,addMemItem,editMemItem} from '../../utlis/mender/menber'
export default {
  components:{MyPaging},
   data() {
    return {
      //弹出框表单数据
      memberRuleForm:{
        cardNum:'',
        name:'',
        birthday:'',
        phone:'',
        money:'',
        integral:'',
        payType:'',
        address:'',
      },
      //弹出框验证
      rules:{
         name: [{ required: true, message: '请输入会员卡号', trigger: 'blur' },],
         cardNum: [{ required: true, message: '请输入会员名称', trigger: 'blur' },],
        //  payType: [{ required: true, message: '请输入支付方式', trigger: 'click' },]
      },
      memberTitle:'会员添加',//弹窗标题
      dialogVisible:false, //弹出框
      //下拉框字段
      menbercode:[
        {
          type:"1",
          name:'现金支付'
        },
         {
          type:"2",
          name:'微信支付'
        },
         {
          type:"3",
          name:'支付宝'
        },
         {
          type:"4",
          name:'银行卡'
        },
      ],
      //查询字段
       memberQuery:{
        cardNum:'',
        name:'',
        payType:'',
        birthday:''
       },
       page:1, //分页页码
       size:10, //分页页数
       memberList:[], //总数据
       total:0 //数据总条数
    }
   },
   filters:{
      filterCode(code){
      let name = thih.menbercode.find(item=>item.type==code)
      return name.name
      }
   },
   //获取this
   beforeCreate() {
    thih = this
   },
   methods: {
    //查询事件
    menberQuery(){
      this.getlist()
    },
    // 顶端form表单重置
    resetForm(formName){
      this.$refs[formName].resetFields();
    },
    //获取全部信息
   async getlist(){
   try {
    let {data} = await getMemberList(this.page,this.size,this.memberQuery)
    this.memberList=data.data
    this.total=data.total
   } catch (error) {
    console.log(error);
   }
    },
    //分页条数
    handleSizeChange(num){
      console.log(num);
      this.size=num
      this.getlist()
    },
    //分页页码
    handleCurrentChange(num){
      console.log(num);
      this.page=num
     this.getlist()
    },
    //新增事件与编辑
    async addEditMenberList(id){
        this.dialogVisible=true
        try {
        if (typeof id === "number") {
        this.memberTitle="会员编辑"
        let {data} = await findMemberIitm(id)
        this.memberRuleForm=data.data
           console.log(data.data,"21313213132");
        return
      }
        } catch (error) {
          
        }
      this.memberTitle="会员添加"
    },
    //删除事件
    menberDelete(id){
       this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
            try {
            let res = await deleteMemderItem(id)
            this.getlist()
            } catch (error) {
              console.log(error);
            }
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    //编辑添加确认按钮
    addMember(formName){
         this.$refs[formName].validate((valid) => {
          if (valid) {
        this.memberRuleForm.id ? this.memberEditItem():this.memberAddItem()
        console.log(this.memberRuleForm.id);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
     },
     //添加用户
    async memberAddItem(){
      try {
         let res = await addMemItem(this.memberRuleForm)
           console.log(res);
           this.$message.success('添加成功')
           this.resetForm('ruleFormParms')
           this.dialogVisible=false
      } catch (error) {
        
      }
     },
     //编辑用户
   async memberEditItem(){
      try {
        let res = await editMemItem(this.memberRuleForm.id,this.memberRuleForm)
        console.log(res);
        this.$message.success('编辑成功')
        this.dialogVisible=false
        this.memberRuleForm.id=""
        this.resetForm('ruleFormParms')
      } catch (error) {
        
      }
     },
     //取消事件
     cancel(){
       this.resetForm('ruleFormParms')
       this.dialogVisible=false
     }
   },
   created() {
    this.getlist()

   },
}
</script>
<style lang="scss" scoped>
.box {
  margin-top: 20px;
}
</style>

