<template>
    <div>
        <mt-header title="个人中心"></mt-header>
        <div style="padding: 0 7%">
            <div class="info">
                <img class="infoImg" src="../assets/logo.png" alt="">
                <p>{{ personInfo.relName }}</p>
            </div>

            <mt-cell title="个人信息" to="/PersonInfo" is-link>
                <img slot="icon" src="../assets/logo.png" width="24" height="24">
            </mt-cell>
            <mt-cell title="消息提醒" to="/Message" is-link>
                <img slot="icon" src="../assets/logo.png" width="24" height="24">
            </mt-cell>
            <mt-cell title="修改密码" to="/ResetPassword" is-link>
                <img slot="icon" src="../assets/logo.png" width="24" height="24">
            </mt-cell>
            <mt-button type="danger" style="width: 100%;margin-top: 20px">退出登录</mt-button>
        </div>
    </div>
</template>
<style>
    .info{
        width: 100%;
        text-align: center;
        padding-bottom: 10px;
    }
    .infoImg{
        width: 100px;
        height: 100px;
    }
    .mint-cell-wrapper,.mint-cell:last-child{
        background-image: none !important;
    }
    .mint-cell-wrapper {
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
</style>
<script>
    import { Header,Cell,Toast,Button  } from 'mint-ui';
    export default {
        name: 'home',
        data() {
            return {
                personInfo:{
                    "statusCode":"200",
                    "message"   :"OK",
                    "ukey"      :"1",
                    "login"     :"zhagnsan",
                    "relName"   :"张三",
                    "phone"     :"13812341234",
                    "sysRole"   :"科员",
                    "deptId"    :"食药监",
                    "lastsend"  :"12345123451234512345"
                },
            }
        },
        components:{
            Header,
            Cell,
        },
        methods: {
            getInfo(){
                let self = this;
                if(self.personInfo.statusCode == 200) return;
                $.post(realmName + 'sf_zhzf/msys/user/getinfo',{

                },function(data,status){
                    if(data.statusCode == 200){
                        sessionStorage.setItem('personInfo', data);
                        self.personInfo = data;
                    }else if(data.statusCode == 310){
                        window.location.href = "index.html";
                    }else{
                        Toast(data.message);
                    }
                });
            },
        },
        mounted() {
            // this.personInfo = sessionStorage.getItem('personInfo');
            this.getInfo();
        }
    }
</script>