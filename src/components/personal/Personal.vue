<template>
    <div>
        <myHeard title="个人中心" ></myHeard>
        <div class="separate"></div>
        <el-row :gutter="24" class="person" >
            <el-col :span="7">
                <div class="grid-content bg-purple divPhoto">
                    <div class="bg-img">
                        <img src="../../assets/img/img.png" alt=""> 
                    </div>
                </div>
            </el-col>
            <el-col :span="15">
                <div class="grid-content bg-purple">
                    <el-row type="flex" class="row-bg">
                        <el-col :span="8"><div class="grid-content bg-purple">试一试</div></el-col>
                        <el-col :span="8"><div class="grid-content bg-purple-light department">食药监</div></el-col>
                        <el-col :span="8"><div class="grid-content bg-purple post">科长</div></el-col>
                    </el-row>

                    <el-row type="flex" class="row-bg">
                        <el-col :span="10"><div class="grid-content bg-purple phone">联系方式</div></el-col>
                        <el-col :span="6"><div class="grid-content bg-purple-light phoneNum">15136791852</div></el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>
        <div class="separate"></div>
        <div>
            <mt-cell title="个人信息" icon="more" to="">
                <img slot="icon" src="../../assets/img/img.png" width="24" height="24">
            </mt-cell>
             <mt-cell title="消息提醒" icon="more" to="">
                <span>
                    未读消息
                    <mt-badge type="error">10</mt-badge>
                </span>
                <img slot="icon" src="../../assets/img/img.png" width="24" height="24">
            </mt-cell>
             <mt-cell title="系统设置" icon="more" to="">
                <img slot="icon" src="../../assets/img/img.png" width="24" height="24">
            </mt-cell>
        </div>
        <myMenu active="4"></myMenu>
    </div>
</template>

<script>
    import myMenu from "../customComponent/myMenu";
    import myHeard from "../customComponent/myHeard";
    export default {
        name: "",
        components:{
            myMenu,
            myHeard,
        },
    }
</script>

<style scoped>
    .person{
        margin-top: 40px;
        background-color: #fff;
        padding: 10px;
    }
    .separate{
        width: 100%;
        height: 10px;
    }
    .el-col {
        border-radius: 4px;
    }
    .divPhoto{
        overflow: hidden;
        margin: 20px 0px 15px;

    }
    .bg-img{
       text-align: center;
    }
    .bg-img img{
        border-radius: 100%;
    }
    .row-bg{
        text-align: left;
        margin: 15px 5px 15px;
    }
    .department{
        color: orange;
    }
    .post{
        color:teal;
    }
    .phone{
        color: gray;
    }
    .phoneNum{
        color: #607D8B;
    }
</style>