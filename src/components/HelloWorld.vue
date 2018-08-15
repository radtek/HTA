<template>
    <div class="content">
        <el-input v-model="input" placeholder="账号"></el-input>
        <el-input v-model="input" placeholder="密码"></el-input>
        <el-row>
          <el-button type="primary">提交</el-button>
        </el-row>
    </div>
</template>

<script>

export default {
    name: 'HelloWorld',
    data() {
        return {

        }
    }
}

</script>

<style scoped>
    .content{
        width: 80%;
        margin: 50% 10%;
    }
    .el-input{
        margin: 15px 0;
    }
    button{
        width: 100%;
        margin: 15px 0;
    }
</style>
