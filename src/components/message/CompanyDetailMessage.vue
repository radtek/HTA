<template>
    <div>
        <div style="width: 100%;height: 40px"><myHeard title="企业信息" back="true"></myHeard></div>

        <div v-if="data.deptId == 1">
            <div class="bmt">
                <div class="item"><mt-cell title="企业名称" :value="data.objName"></mt-cell></div>
                <div class="item"><mt-cell title="行政区划" :value="data.regionCode"></mt-cell></div>
                <div class="item"><mt-cell title="企业地址" :value="data.busiAddr"></mt-cell></div>
                <div class="item"><mt-cell title="组织机构代码证" :value="data.identityNo"></mt-cell></div>
                <div class="item"><mt-cell title="污染类型" :value="data.infraction"></mt-cell></div>
                <div class="item"><mt-cell title="关注程度" :value="data.heedLevel"></mt-cell></div>
            </div>

            <div class="bmt">
                <div class="item"><mt-cell title="法人" :value="data.faren"></mt-cell></div>
                <div class="item"><mt-cell title="法人电话" :value="data.farenPhone"></mt-cell></div>
                <div class="item"><mt-cell title="负责人" :value="data.fuzeren"></mt-cell></div>
                <div class="item"><mt-cell title="负责人电话" :value="data.fuzerenPhone"></mt-cell></div>
            </div>

            <div class="bmt">
                <div class="item"><mt-cell title="环评文号" :value="data.json.huanpingNo"></mt-cell></div>
                <div class="item"><mt-cell title="环评文号日期" :value="data.json.huanpingDate"></mt-cell></div>
                <div class="item"><mt-cell title="验收文号" :value="data.json.yanshouNo"></mt-cell></div>
                <div class="item"><mt-cell title="验收日期" :value="data.json.yanshouDate"></mt-cell></div>
                <div class="item"><mt-cell title="排污许可证" :value="data.json.paiwuxukeNo"></mt-cell></div>
                <div class="item"><mt-cell title="排污许可证日期" :value="data.json.paiwuxukeDate"></mt-cell></div>
            </div>

            <div class="bmt">
                <div class="item"><mt-cell title="是否上报企业" :value="data.reportFirm"></mt-cell></div>
            </div>
        </div>

        <div v-else-if="data.deptId == 2">
            <div v-if="data.objType == 1">
                <div class="bmt">
                    <div class="item"><mt-cell title="单位名称" :value="data.objName"></mt-cell></div>
                    <div class="item"><mt-cell title="单位类别" :value="data.json.danweileibie"></mt-cell></div>
                    <div class="item"><mt-cell title="企业地址" :value="data.busiAddr"></mt-cell></div>
                    <div class="item"><mt-cell title="组织机构代码证" :value="data.identityNo"></mt-cell></div>
                    <div class="item"><mt-cell title="行政区划" :value="data.regionCode"></mt-cell></div>
                </div>

                <div class="bmt">
                    <div class="item"><mt-cell title="法定代表人" :value="data.faren"></mt-cell></div>
                    <div class="item"><mt-cell title="法人电话" :value="data.farenPhone"></mt-cell></div>
                    <div class="item"><mt-cell title="负责人" :value="data.fuzeren"></mt-cell></div>
                    <div class="item"><mt-cell title="负责人电话" :value="data.fuzerenPhone"></mt-cell></div>
                </div>

                <div class="bmt">
                    <div class="item"><mt-cell title="是否上报企业" :value="data.reportFirm"></mt-cell></div>
                </div>
            </div>
            <div v-else-if="data.objType == 2">
                <div class="bmt">
                    <div class="item"><mt-cell title="姓名" :value="data.objName"></mt-cell></div>
                    <div class="item"><mt-cell title="身份证号" :value="data.identityNo"></mt-cell></div>
                    <div class="item"><mt-cell title="联系电话" :value="data.farenPhone"></mt-cell></div>
                    <div class="item"><mt-cell title="个人住址" :value="data.busiAddr"></mt-cell></div>
                </div>
            </div>
        </div>

        <div v-else-if="data.deptId == 3">
            <div class="bmt">
                <div class="item"><mt-cell title="企业名称" :value="data.objName"></mt-cell></div>
                <div class="item"><mt-cell title="行政区划" :value="data.regionCode"></mt-cell></div>
                <div class="item"><mt-cell title="生产经营地址" :value="data.busiAddr"></mt-cell></div>
                <div class="item"><mt-cell title="代码证类型" :value="data.identityType"></mt-cell></div>
                <div class="item"><mt-cell title="代码证号" :value="data.identityNo"></mt-cell></div>
                <div class="item"><mt-cell title="所属行业" :value="data.busiType1+' '+data.busiType2"></mt-cell></div>
            </div>

            <div class="bmt">
                <div class="item"><mt-cell title="法定代表人" :value="data.faren"></mt-cell></div>
                <div class="item"><mt-cell title="法人电话" :value="data.farenPhone"></mt-cell></div>
                <div class="item"><mt-cell title="企业主要负责人" :value="data.fuzeren"></mt-cell></div>
                <div class="item"><mt-cell title="主要负责人手机" :value="data.fuzerenPhone"></mt-cell></div>
                <div class="item"><mt-cell title="安全负责人" :value="data.saferen"></mt-cell></div>
                <div class="item"><mt-cell title="安全负责人电话" :value="data.saferenPhone"></mt-cell></div>
            </div>

            <div class="bmt">
                <div class="item"><mt-cell title="监管层级" :value="data.json.jianguancengji"></mt-cell></div>
                <div class="item"><mt-cell title="监管机构" :value="data.json.jianguanjigou"></mt-cell></div>
            </div>

            <div class="bmt">
                <div class="item"><mt-cell title="是否有重大危险源" :value="data.json.weixianyuan"></mt-cell></div>
                <div class="item"><mt-cell title="是否上报企业" :value="data.json.reportFirm"></mt-cell></div>
            </div>
        </div>

        <div v-else-if="data.deptId == 4">
            <div v-if="data.infraction.length == 0">
                <div class="bmt">
                    <div class="item"><mt-cell title="企业名称" :value="data.objName"></mt-cell></div>
                    <div class="item"><mt-cell title="行政区划" :value="data.regionCode"></mt-cell></div>
                    <div class="item"><mt-cell title="经营地址" :value="data.busiAddr"></mt-cell></div>
                    <div class="item"><mt-cell title="经营类别" :value="data.busiType1"></mt-cell></div>
                </div>

                <div class="bmt">
                    <div class="item"><mt-cell title="负责人" :value="data.fuzeren"></mt-cell></div>
                    <div class="item"><mt-cell title="负责人电话" :value="data.fuzerenPhone"></mt-cell></div>
                </div>

                <div class="bmt">
                    <div class="item"><mt-cell title="工商营业执照" :value="data.identityNo"></mt-cell></div>
                    <div class="item"><mt-cell title="工商营业执照期限" :value="data.json.yingyezhizhaoDate"></mt-cell></div>
                    <div class="item"><mt-cell title="食品经营许可证" :value="data.json.jingyingxuke"></mt-cell></div>
                    <div class="item"><mt-cell title="食品经营许可证期限" :value="data.json.jingyingxukeDate"></mt-cell></div>
                </div>
            </div>
            <div v-else-if="data.infraction == '|5|'">
                <div class="bmt">
                    <div class="item"><mt-cell title="县（市、区）" :value="data.regionCode"></mt-cell></div>
                    <div class="item"><mt-cell title="企业名称" :value="data.objName"></mt-cell></div>
                    <div class="item"><mt-cell title="企业地址" :value="data.busiAddr"></mt-cell></div>
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
            </div>
        </div>

        <div v-else-if="data.deptId == 5 || data.deptId == 6">
            <div v-if="data.objType == 1">
                <div class="bmt">
                    <div class="item"><mt-cell title="单位名称" :value="data.objName"></mt-cell></div>
                    <div class="item"><mt-cell title="企业地址" :value="data.busiAddr"></mt-cell></div>
                    <div class="item"><mt-cell title="组织机构代码证" :value="data.identityNo"></mt-cell></div>
                    <div class="item"><mt-cell title="行政区划" :value="data.regionCode"></mt-cell></div>
                </div>

                <div class="bmt">
                    <div class="item"><mt-cell title="法定代表人" :value="data.faren"></mt-cell></div>
                    <div class="item"><mt-cell title="法人电话" :value="data.farenPhone"></mt-cell></div>
                    <div class="item"><mt-cell title="负责人" :value="data.fuzeren"></mt-cell></div>
                    <div class="item"><mt-cell title="负责人电话" :value="data.fuzerenPhone"></mt-cell></div>
                </div>
            </div>
            <div v-else-if="data.objType == 2">
                <div class="bmt">
                    <div class="item"><mt-cell title="姓名" :value="data.objName"></mt-cell></div>
                    <div class="item"><mt-cell title="身份证号" :value="data.identityNo"></mt-cell></div>
                    <div class="item"><mt-cell title="联系电话" :value="data.farenPhone"></mt-cell></div>
                    <div class="item"><mt-cell title="个人住址" :value="data.busiAddr"></mt-cell></div>
                </div>
            </div>
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
    import {getRequest} from "../../assets/js/public";

    export default {
        name: "company-detail-message",
        data() {
            return {
                id  : 0,
                json:{
                    guimo            :'',
                    seatNum          :'',
                    yyjhqNum         :'',
                    yanshouNo        :'',
                    localAddr        :'',
                    zaotouNum        :'',
                    cleanCycle       :'',
                    huanpingNo       :'',
                    reportFirm       :'',
                    yanshouDate      :'',
                    paiwuxukeNo      :'',
                    weixianyuan      :'',
                    huanpingDate     :'',
                    danweileibie     :'',
                    jingyingxuke     :'',
                    jianguanjigou    :'',
                    paiwuxukeDate    :'',
                    jianguancengji   :'',
                    jingyingxukeDate :'',
                    yingyezhizhaoDate:'',
                },
                data:{

                }
            }
        },
        components:{
            myHeard
        },
        methods: {
            click:function () {
                this.$router.push({name: 'Append', params: { id : this.data.id,type : 1 }});
            },
            getData:function () {
                let self = this;
                getRequest('sf_zhzf/msys/enterprise/qrcode',{
                    code : self.id
                },function (data) {
                    self.data = data;
                });
            },
        },
        mounted(){
            this.id = JSON.parse(this.$route.params.id);
            if (this.id != 0)
                this.getData();
            else
                this.data = JSON.parse(this.$route.params.data);

            if(!this.data.json) this.data.json = this.json;
        }
    }
</script>

<style scoped>

</style>