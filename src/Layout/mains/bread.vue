<template>
    <div class="bread">
        <el-card v-if="!(title=='首页')">
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
.bread{
    margin-bottom: 20px;
}
</style>
