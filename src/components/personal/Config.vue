<template>
    <div>
        <myHeader back=true title="系统设置"></myHeader>
        <div id="content">
            <mt-cell title="当前版本" value="V2.0"></mt-cell>
            <mt-cell title="检查更新" value="已是最新版本"></mt-cell>
            <mt-button size="large" class="logout">退出登录</mt-button>
            <mt-button size="large" @click="$router.go(-1)" class="btn">返回</mt-button>
        </div>
    </div>
</template>

<script>
    import myHeader from '../../components/customComponent/myHeard.vue'
    export default {
        name: "config",
        components:{
            myHeader
        },
        data(){
            return{

            }
        }
    }
</script>

<style scoped>
    .btn{
        position: fixed;
        bottom: 0px;
        color: rgb(0,149,147);
    }
    #content{
        margin-top: 55px;
    }
    .logout{
        color: black;
        font-size: 14px;
        background-color: white;
        border-color: white;
        margin-top: 20px;
        box-shadow:white;
    }
</style>