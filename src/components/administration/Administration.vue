<template>
    <div>
        <div style="width: 100%;height: 40px"><myHeard title="行政执法"></myHeard></div>

        <!--<img class="myImg" src="../../assets/img/new/1.jpg" alt="">-->

        <el-row class="mySpan" :span="24">
            <router-link to="/Check/1">
                <el-col class="spanContent" :span="6">
                    <img src="" alt="">
                    <p class="title">日常检查</p>
                </el-col>
            </router-link>
            <router-link to="/Check/2">
                <el-col class="spanContent" :span="6">
                    <img src="" alt="">
                    <p class="title">专项检查</p>
                </el-col>
            </router-link>
            <router-link to="/RectifyRecord">
                <el-col class="spanContent" :span="6">
                    <img src="" alt="">
                    <p class="title">后督察</p>
                </el-col>
            </router-link>
            <router-link to="/Reform">
                <el-col class="spanContent" :span="6">
                    <img src="" alt="">
                    <p class="title">下达限期整改</p>
                </el-col>
            </router-link>
            <router-link to="/AdminCheckRecord">
                <el-col class="spanContent" :span="6">
                    <img src="" alt="">
                    <p class="title">已完成检查</p>
                </el-col>
            </router-link>
            <router-link to="/AddObj">
                <el-col class="spanContent" :span="6">
                    <img src="" alt="">
                    <p class="title">新增执法对象</p>
                </el-col>
            </router-link>
        </el-row>

        <div style="width: 100%;height: 55px"><myMenu active="2"></myMenu></div>
    </div>
</template>

<script>
    import myHeard from "../customComponent/myHeard";
    import myMenu from "../customComponent/myMenu";
    export default {
        name: "administration",
        components:{
            myHeard,
            myMenu,
        }
    }
</script>

<style scoped>
    .myImg{
        width: 100%;
        margin: 20px auto;
    }
    .mySpan{
        background-color: white;
    }
    .spanContent{
        padding: 10px 0 20px;
        border: 1px solid rgb(248,249,249);
    }
    .spanContent img{
        display: block;
        width: 50px;
        height: 50px;
        margin: 0 auto;
    }
    .title{
        width: 100%;
        text-align: center;
        font-size: 12px;
    }
</style>