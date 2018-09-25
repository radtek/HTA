<template>
    <div>
        <myHeard back="true" title="个人信息"></myHeard>
        <div id="content">
            <mt-cell title="姓名" :value="userInfo.relName"></mt-cell>
            <mt-cell title="部门" :value="userInfo.deptName"></mt-cell>
            <mt-cell title="职位" :value="userInfo.roleName"></mt-cell>
            <mt-cell title="联系方式" :value="userInfo.phone"></mt-cell>
            <mt-button size="large" @click="$router.go(-1)" class="btn">返回</mt-button>
        </div>
    </div>
</template>

<script>
    import myHeard from "../customComponent/myHeard";
    export default {
        name: "personal-info",
        data(){
            return{
                userInfo:{}
            }
        },
        components:{
            myHeard,
        },
        methods:{
             getUserInfo:function(){
                
                let self = this;
                $.get(getUrl('sf_zhzf/msys/user/getinfo'),function(data, status) {
                    if(data.statusCode == 200){
                        sessionStorage.setItem('userInfo', data);
                        self.userInfo = data;
                    }
                }, 'json');
            }
        },
        mounted(){
            this.getUserInfo();
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
    .mint-cell-text{
        margin-left: 10px;
    }
    .mint-cell-value{
        margin-right: 10px;
    }
</style>