<template>
    <div>
        <el-card>
            <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/' }">{{title}}</el-breadcrumb-item>
</el-breadcrumb>
         
        </el-card>
    </div>
</template>

<script>

export default {
    name:'bread',
    computed:{
        title(){
            return this.$route.meta.title
        }
    }
}
</script>

<style>

</style>
