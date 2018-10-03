<template>
    <div>
        <div style="width: 100%;height: 40px"><myHeard title="信息查询"></myHeard></div>

        <img class="myImg" src="../../assets/img/new/ad.jpg" alt="">

        <el-row class="mySpan" :span="24">
            <router-link to="/CompanyRecord">
                <el-col class="spanContent" :span="6">
                    <img src="../../assets/img/new/info.png" alt="">
                    <p class="title">企业信息</p>
                </el-col>
            </router-link>
            <router-link to="">
                <el-col class="spanContent" :span="6">
                    <img src="../../assets/img/new/law.png" alt="">
                    <p class="title">法律法规</p>
                </el-col>
            </router-link>
            <router-link to="">
                <el-col class="spanContent" :span="6">
                    <img src="../../assets/img/new/number.png" alt="">
                    <p class="title">数量查询</p>
                </el-col>
            </router-link>
        </el-row>

        <div style="width: 100%;height: 55px"><myMenu active="3"></myMenu></div>
    </div>
</template>

<script>
    import myHeard from "../customComponent/myHeard";
    import myMenu from "../customComponent/myMenu";
    export default {
        name: "message",
        components:{
            myHeard,
            myMenu,
        }
    }
</script>

<style scoped>
    .myImg{
        width: 100%;
    }
    .mySpan{
        background-color: white;
    }
    .spanContent{
        padding: 10px 0;
        border: 1px solid rgb(248,249,249);
    }
    .spanContent img{
        display: block;
        width: 50px;
        height: 50px;
        margin: 0 auto 5px;
    }
    .title{
        width: 100%;
        text-align: center;
        font-size: 12px;
    }
</style>