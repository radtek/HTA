<template>
    <div>
        <myHeard title="个人中心" ></myHeard>
        <div class="separate"></div>
        <el-row :gutter="24" class="person" style="margin: 40px 0 0;" >
            <el-col :span="7">
                <div class="grid-content bg-purple divPhoto">
                    <div class="bg-img">
                        <img src="../../assets/img/img.png" alt=""> 
                    </div>
                </div>
            </el-col>
            <el-col :span="17">
                <div class="grid-content bg-purple">
                    <el-row type="flex" class="row-bg">
                        <el-col :span="10"><div class="grid-content bg-purple">{{uesrInfo.relName}}</div></el-col>
                        <el-col :span="8"><div class="grid-content bg-purple-light department">{{uesrInfo.deptName}}</div></el-col>
                        <el-col :span="8"><div class="grid-content bg-purple post">{{uesrInfo.roleName}}</div></el-col>
                    </el-row>

                    <el-row type="flex" class="row-bg">
                        <el-col :span="10"><div class="grid-content bg-purple phone">联系方式</div></el-col>
                        <el-col :span="14"><div class="grid-content bg-purple-light phoneNum">{{uesrInfo.phone}}</div></el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>
        <div class="separate"></div>
        <mt-cell title="个人信息" to="/PersonalInfo" is-link>
            <span slot="icon" class="fa fa-user-o icon"></span>
        </mt-cell>
        <mt-cell title="消息提醒" to="/PersonalMessage" >
            <span v-if="unreadMessageCount != 0">
                未读消息
                <mt-badge type="error">{{unreadMessageCount}}</mt-badge>
            </span>
            <span v-if="unreadMessageCount == 0">
                无未读消息
            </span>
            <span slot="icon" class="fa fa-commenting-o icon"></span>
        </mt-cell>
        <mt-cell title="修改密码" to="/ResetPassword" is-link>
            <span slot="icon" class="fa fa-key icon" ></span>
        </mt-cell>
        <mt-cell title="系统设置" to="/Config" is-link>
            <span slot="icon" class="fa fa-cogs icon" ></span>
        </mt-cell>
        <myMenu active="4"></myMenu>
    </div>
</template>

<script>
    import myMenu from "../customComponent/myMenu";
    import myHeard from "../customComponent/myHeard";
    export default {
        name: "personal",
        data(){
            return {
                unreadMessageCount: 0,
                uesrInfo: {relName: ''},
            }
        },
        components:{
            myMenu,
            myHeard,
        },
        methods:{
            getUserInfo:function(){
                let self = this;
                let uesrInfo = sessionStorage.getItem("personInfo");

                $.get(getUrl('sf_zhzf/msys/user/getinfo'),function(data, status) {
                    if(data.statusCode == 200){
                        self.uesrInfo = data;
                    } else if (data.statusCode == 310) {
                        window.location.href = "login.html";
                    } else {
                        Toast(data.message);
                    }
                }, 'json');
            },
            getMessageCount:function(){
                let self = this;
                $.get(getUrl('sf_zhzf/msys/notice/unreadcnt'),function(data,status) {
                    if (data.statusCode == 200) {
                        self.unreadMessageCount = data.count;
                    }else if(data.statusCode == 310){
                        window.location.href = "login.html";
                    }else{
                        Toast(data.message);
                    }
                },'json');
            }
        },
        mounted() {
            this.getUserInfo();
            this.getMessageCount();
        },
    }
</script>

<style scoped>
    .icon{
        width:24px;
        height:24px;
        margin-left: 10px
    }
    .person{
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