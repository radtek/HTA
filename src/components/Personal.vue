<template>
    <div>
        <mt-header title="个人中心"></mt-header>
        <div style="padding: 0 7%">
            <div class="info">
                <img class="infoImg" src="../assets/people_fill.png" alt="">
                <p>{{ personInfo.relName }}</p>
            </div>

            <mt-cell title="个人信息" to="/PersonInfo" is-link>
                <img slot="icon" src="../assets/profile_fill.png" width="24" height="24">
            </mt-cell>
            <mt-cell title="消息提醒" to="/Message" is-link>
                <img slot="icon" src="../assets/comment.png" width="24" height="24">
                <mt-badge type="error" v-if="unreadMessageCount != 0">{{ unreadMessageCount }}</mt-badge>
            </mt-cell>
            <mt-cell title="修改密码" to="/ResetPassword" is-link>
                <img slot="icon" src="../assets/write_fill.png" width="24" height="24">
            </mt-cell>
            <mt-button type="danger" style="width: 100%;margin-top: 20px" @click="loginOut()">退出登录</mt-button>
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
                unreadMessageCount:0,
                personInfo:{},
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
                $.get(getUrl('sf_zhzf/msys/user/getinfo'),{

                },function(data,status){
                    if(data.statusCode == 200){
                        sessionStorage.setItem('personInfo', data);
                        self.personInfo = data;
                    }else if(data.statusCode == 310){
                        localStorage.clear();
                        window.location.href = "login.html";
                    }else{
                        Toast(data.message);
                    }
                },'json');
            },
            getMessageCount(){
                let self = this;
                $.get(getUrl('sf_zhzf/msys/notice/unreadcnt'),{

                },function(data,status){
                    if(data.statusCode == 200){
                        self.unreadMessageCount = data.count;
                    }else if(data.statusCode == 310){
                        localStorage.clear();
                        window.location.href = "login.html";
                    }else{
                        Toast(data.message);
                    }
                },'json');
            },
            loginOut(){
                let self = this;
                $.get(getUrl('sf_zhzf/msys/user/logout'),{

                },function(data,status){
                    if(data.statusCode == 200 || data.statusCode == 310){
                        localStorage.clear();
                        window.location.href = "login.html";
                    }else{
                        Toast(data.message);
                    }
                },'json');
            }
        },
        mounted() {
            this.personInfo = sessionStorage.getItem('personInfo');
            this.getInfo();
            this.getMessageCount();
        }
    }
</script>