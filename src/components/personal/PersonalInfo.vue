<template>
    <div>
        <myHeard back="true" title="个人信息"></myHeard>
        <div id="content">
            <div class="item"><mt-cell title="姓名" :value="userInfo.relName"></mt-cell></div>
            <div class="item"><mt-cell title="部门" :value="userInfo.deptName"></mt-cell></div>
            <div class="item"><mt-cell title="职位" :value="userInfo.roleName"></mt-cell></div>
            <div class="item"><mt-cell title="联系方式" :value="userInfo.phone"></mt-cell></div>
        </div>
        <a @click="$router.go(-1);">
            <div class="myReturn">
                返回
            </div>
        </a>
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