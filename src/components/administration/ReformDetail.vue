<template>
    <div>
        <div style="width: 100%;height: 40px;"><myHeard back="true" title="企业整改明细"></myHeard></div>

        <div class="bmt">
            <div class="item"><mt-cell title="企业名称" :value="data.exeobjName"></mt-cell></div>
            <div class="item"><mt-cell title="地址" :value="data.exeobjName"></mt-cell></div>
            <div class="item"><mt-cell title="整改内容" :value="data.reformContent"></mt-cell></div>
            <div class="item"><mt-cell title="整改期限" :value="data.limitDate.split(' ')[0]"></mt-cell></div>
        </div>

        <div class="bmt">
            <div class="item"><mt-cell title="督察状态" :value="data.remark"></mt-cell></div>
            <div class="item"><mt-cell title="督察日期" :value="data.updtime"></mt-cell></div>
            <div class="item"><mt-cell title="检查人" :value="data.creatorName"></mt-cell></div>
            <div class="item"><mt-cell title="陪同人" :value="data.officerName"></mt-cell></div>
        </div>

        <a @click="$router.go(-1);">
            <div class="myReturn">
                返回
            </div>
        </a>
    </div>
</template>

<script>
    import myHeard   from  "../customComponent/myHeard";
    import {getRequest} from "../../assets/js/public";
    export default {
        name: "reform-detail",
        components:{
            myHeard,
        },
        data() {
            return {
                id  : 0,
                data: {

                },
            };
        },
        methods: {
            getData:function () {
                let self = this;
                getRequest('sf_zhzf/msys/rectify/info',{
                    rectNoteId : self.id
                },function (data) {
                    self.data = data.rectNote;
                });
            },
        },
        mounted() {
            this.id = this.$route.params.id;
            this.getData();
        },
    }
</script>

<style scoped>

</style>