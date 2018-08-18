<template>
    <div>
        <mt-header title="企业信息">
          <router-link to="" slot="left">
            <mt-button icon="back" @click="$router.go(-1);"></mt-button>
          </router-link>
        </mt-header>
        <div style="padding:0 7%;">
            <mt-cell title="企业名称" :value="data.objName"></mt-cell>
            <mt-cell title="busiAddr" :value="data.busiAddr"></mt-cell>
            <mt-cell title="localAddr" :value="data.localAddr"></mt-cell>
            <mt-cell title="负责人" :value="data.fuzeren"></mt-cell>
            <mt-cell title="负责人电话" :value="data.fuzerenPhone"></mt-cell>
            <mt-cell title="监管人" :value="data.jianguanren"></mt-cell>
            <mt-cell title="监管人电话" :value="data.jiangguanPhone"></mt-cell>
            <mt-button type="primary" style="width: 100%;margin-top: 20px" @click="$router.go(-1);">返回上一级</mt-button>
        </div>
    </div>
</template>
<style media="screen">
    .mint-cell-wrapper,.mint-cell:last-child{
        background-image: none !important;
    }
    .mint-cell-wrapper {
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
</style>
<script>
    import { Header,Toast } from 'mint-ui';
    export default {
        name: 'home',
        data() {
            return {
                id:'',
                data:{
                    "id":"201",
                    "regionCode":"开发区街道",
                    "objName":"XXX餐馆",
                    "busiAddr":"科隆大道与牧野路交叉口",
                    "localAddr":"XXX街道",
                    "fuzeren":"张三",
                    "fuzerenPhone":"13612341234",
                    "jianguanren":"李四",
                    "jiangguanPhone":"1232123131231",
                    "seatNum":"50",
                    "caotouNum":"4",
                    "guimo":"50",
                    "yyjhqNum":"4",
                    "statusCode":"200",
                    "message":"OK"
                }
            }
        },
        components:{
            Header,
            Toast
        },
        methods: {
            getData(){
                let self = this;
                $.post( realmName + 'sf_zhzf/msys/enterprise/qrcode',{
                    code : self.id
                },function(data,status){
                    //成功直接返回企业信息，失败时statusCode为300/310
                    if(data.statusCode){    //失败
                        if(data.statusCode == 310){
                            localStorage.clear();
                            window.location.href = "login.html";
                        }else{
                            Toast(data.message);
                        }
                    }else{                  //成功
                        self.data = data;
                    }
                });
            }
        },
        mounted(){
            this.id = this.$route.params.id;
            // this.getData();
        }
    }
</script>
