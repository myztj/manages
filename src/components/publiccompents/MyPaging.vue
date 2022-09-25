<template>
 <div class="box">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
 </div>
</template>

<script>
export default {
props:{
    size:Number,
    total:Number,
    page:Number
},
  methods: {
    handleSizeChange(num){
        this.$emit('SizeChange',num)
    },
    handleCurrentChange(num){
       this.$emit('CurrentChange',num)
    }
  },
  created() {
    console.log(this.size,this.total,this.page);
},
}

</script>

<style lang="scss" scoped>
.box{
  margin-top: 20px;
}
</style>

