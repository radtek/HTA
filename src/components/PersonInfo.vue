

<template>
    <div>
        <mt-header title="个人信息">
            <router-link to="" slot="left">
                <mt-button icon="back" @click="$router.go(-1)">&nbsp;&nbsp;</mt-button>
            </router-link>
        </mt-header>
        <div style="padding: 0 7%">
            <mt-cell title="姓名" :value="personInfo.relName"></mt-cell>
            <mt-cell title="手机号" :value="personInfo.phone"></mt-cell>
            <mt-cell title="职位" :value="personInfo.sysRole"></mt-cell>
            <mt-cell title="部门" :value="personInfo.deptId"></mt-cell>
            <mt-button type="primary" @click="$router.go(-1)" style="width: 100%;margin-top: 20px">返回</mt-button>
        </div>
    </div>
</template>

<script>
    import { Header,Cell,Toast,Button  } from 'mint-ui';
    export default {
        name: 'person-info',
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
                        localStorage.clear();
                        window.location.href = "login.html";
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

<style scoped>

</style>
