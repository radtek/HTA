<template>
    <div>
        <myHeader back=true title="系统设置"></myHeader>
        <div id="content">
            <div class="item"><mt-cell title="当前版本" value="V2.0"></mt-cell></div>
            <div class="item"><mt-cell title="检查更新" value="已是最新版本"></mt-cell></div>

            <mt-button size="large" class="logout" @click="logOut()">退出登录</mt-button>
        </div>
        <a @click="$router.go(-1);">
            <div class="myReturn">
                返回
            </div>
        </a>
    </div>
</template>

<script>
    import myHeader from '../customComponent/myHeard.vue';
    export default {
        name: "config",
        components:{
            myHeader,
        },
        data(){
            return{

            }
        },
        methods:{
            logOut:function () {
                $.get(getUrl('sf_zhzf/msys/user/logout'),function(data,status){
                    if(data.statusCode == 200 || data.statusCode == 310){
                        localStorage.clear();
                        window.location.href = "login.html";
                    }else{
                        Toast(data.message);
                    }
                },'json');
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
        -webkit-box-shadow: 0 0 0px #b8bbbf;
        box-shadow: 0 0 0px #b8bbbf;
    }
</style>