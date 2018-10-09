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
                    "creatorId":"8",
                    "creatorName":"食药监01,李四",
                    "cretime":"2018-09-18 21:26:17",
                    "deptId":"4",
                    "exeobjId":"4",
                    "exeobjName":"河南新飞电器股份有限公司",
                    "id":"1",
                    "inspdate":"2018-09-17 18:00:00",
                    "inspnoteId":"0",
                    "inspnoteSeral":"201809130959464948",
                    "limitDate":"2018-09-18 22:18:29",
                    "officerId":"8",
                    "officerName":"张三",
                    "rectifyStatus":"2",
                    "reformContent":"整改内容全部整改内容全部",
                    "remark":"整改合格",
                    "updtime":"2018-09-18 22:18:29"
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
            // this.getData();
        },
    }
</script>

<style scoped>

</style>