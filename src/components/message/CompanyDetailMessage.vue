<template>
    <div>
        <div style="width: 100%;height: 40px"><myHeard title="企业信息" back="true"></myHeard></div>
        <div class="bmt">
            <div class="item"><mt-cell title="县（市、区）" :value="data.regionCode"></mt-cell></div>
            <div class="item"><mt-cell title="企业名称" :value="data.objName"></mt-cell></div>
            <div class="item"><mt-cell title="企业位置" :value="data.busiAddr"></mt-cell></div>
            <div class="item"><mt-cell title="所属街道办" :value="data.json.localAddr"></mt-cell></div>
        </div>

        <div class="bmt">
            <div class="item"><mt-cell title="负责人" :value="data.fuzeren"></mt-cell></div>
            <div class="item"><mt-cell title="负责人电话" :value="data.fuzerenPhone"></mt-cell></div>
            <div class="item"><mt-cell title="监管人" :value="data.saferen"></mt-cell></div>
            <div class="item"><mt-cell title="监管人电话" :value="data.saferenPhone"></mt-cell></div>
        </div>

        <div class="bmt">
            <div class="item"><mt-cell title="座位数" :value="data.json.seatNum"></mt-cell></div>
            <div class="item"><mt-cell title="灶头数" :value="data.json.zaotouNum"></mt-cell></div>
            <div class="item"><mt-cell title="规模" :value="data.json.guimo"></mt-cell></div>
            <div class="item"><mt-cell title="油烟净化器个数" :value="data.json.yyjhqNum"></mt-cell></div>
            <div class="item"><mt-cell title="清洗周期" :value="data.json.cleanCycle"></mt-cell></div>
        </div>

        <div class="bmt">
            <div class="item">
                <a @click="click">
                    <mt-cell title="查看附件" is-link></mt-cell>
                </a>
            </div>
        </div>

        <div class="mt" style="width: 100%;height: 40px;"></div>
        <a @click="$router.go(-1);">
            <div class="myReturn">
                返回
            </div>
        </a>

    </div>
</template>

<script>
    import myHeard from  "../customComponent/myHeard";
    export default {
        name: "company-detail-message",
        data() {
            return {
                id  : 0,
                data:{
                    json:{
                        localAddr   :'',
                        seatNum     :'',
                        zaotouNum   :'',
                        guimo       :'',
                        yyjhqNum    :'',
                        cleanCycle  :''
                    }
                }
            }
        },
        components:{
            myHeard
        },
        methods: {
            click:function () {
                this.$router.push({name: 'Append', params: { id : this.data.id }});
            },
            getData:function () {
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
            },
        },
        mounted(){
            this.id = JSON.parse(this.$route.params.id);
            if (this.id != 0)
                this.getData();
            else
                this.data = JSON.parse(this.$route.params.data);
        }
    }
</script>

<style scoped>

</style>