<template>
    <div>
  <el-table :data="tableData" height="368" border style="width: 100%">
    <el-table-column type="index" label="序号" width="60">
    </el-table-column>
    <el-table-column :prop="item.prop" :label="item.label" v-for="item in tablaHeader" :key="item.id">
    </el-table-column>
     <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
        <el-button size="mini" @click="addEditMenberList(scope.row.id)">编辑</el-button>
        <el-button size="mini" type="danger" @click="menberDelete(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
    </div>
</template>

<script>
export default {
   props:{
    tableData:{
      type:Array,
    default:()=>[]
    },
    tablaHeader:{
        type:Array,
        default:()=>{}
    }
   },
   methods: {
    addEditMenberList(id){
      this.$emit('addEditMenberList',id)
    },
    menberDelete(id){
    this.$emit('menberDelete',id) 
    }
   },
   created() {
    console.log(this.tableData,"1231313");
   },
}
</script>

<style>
</style>
