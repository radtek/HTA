<template>
    <div>
        <mt-header title="企业信息">
          <router-link to="" slot="left">
            <mt-button icon="back" @click="$router.go(-1);"></mt-button>
          </router-link>
        </mt-header>
        <div style="padding:0 7%;">
            <div id="myScr" style="height: 85vh; overflow:scroll;">
                <mt-cell title="县（市、区）" :value="data.regionCode"></mt-cell>
                <mt-cell title="企业名称" :value="data.objName"></mt-cell>
                <mt-cell title="企业位置" :value="data.busiAddr"></mt-cell>
                <mt-cell title="所属街道办" :value="data.json.localAddr"></mt-cell>
                <mt-cell title="负责人" :value="data.fuzeren"></mt-cell>
                <mt-cell title="负责人电话" :value="data.fuzerenPhone"></mt-cell>
                <mt-cell title="监管人" :value="data.saferen"></mt-cell>
                <mt-cell title="监管人电话" :value="data.saferenPhone"></mt-cell>
                <mt-cell title="座位数" :value="data.json.seatNum"></mt-cell>
                <mt-cell title="灶头数" :value="data.json.zaotouNum"></mt-cell>
                <mt-cell title="规模" :value="data.json.guimo"></mt-cell>
                <mt-cell title="油烟净化器个数" :value="data.json.yyjhqNum"></mt-cell>
                <mt-cell title="查看附件" :to="{ name: 'Append', params: { id: id}}" is-link></mt-cell>
                <mt-button type="primary" style="width: 100%;margin: 10px 0" @click="$router.go(-1);">返回</mt-button>
            </div>
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
    .mint-cell-value {
        max-width: 60%;
        padding: 10px 0;
    }
</style>
<script>
    import { Header,Toast,Indicator } from 'mint-ui';
    export default {
        name: 'home',
        data() {
            return {
                id:'',
                data:{
                    json:{
                        localAddr:'',
                        seatNum:'',
                        zaotouNum:'',
                        guimo:'',
                        yyjhqNum:'',
                    }
                }
            }
        },
        components:{
            Header,
            Toast,
            Indicator
        },
        methods: {
            getData(){
                Indicator.open();
                let self = this;
                $.get( getUrl('sf_zhzf/msys/enterprise/qrcode'),{
                    code : self.id
                },function(data,status){
                    Indicator.close();
                    if(data.statusCode == 200){
                        self.data = data;
                    }else if(data.statusCode == 310){
                        window.location.href = "login.html";
                    }else{
                        Toast(data.message);
                    }
                },'json');
            }
        },
        mounted(){
            this.id = this.$route.params.id;
            this.getData();
        }
    }
</script>
