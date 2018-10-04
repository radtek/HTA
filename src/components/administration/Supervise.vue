<template>
    <div>
        <div style="width: 100%;height: 40px;"><myHeard back="true" title="后督察"></myHeard></div>

        <div class="bmt">
            <div class="item"><mt-cell title="企业名称" :value="data.exeobjName"></mt-cell></div>
            <div class="item"><mt-cell title="地址" :value="data.exeobjName"></mt-cell></div>
            <div class="item"><mt-cell title="整改内容" :value="data.reformContent"></mt-cell></div>
            <div class="item"><mt-cell title="整改期限" :value="data.limitDate.split(' ')[0]"></mt-cell></div>
        </div>

        <div class="bmt">
            <mt-radio
                    title="整改结果"
                    v-model="reformResult"
                    :options="['通过','不通过']">
            </mt-radio>
        </div>

        <div class="bmt">
            <myTimeDate label="督察时间" placeholder="请选择" type="datetime" @changeTime="changeTime"></myTimeDate>
            <myField label="协办人员" placeholder="请输入" v-model.trim="jointly" red-point="true"></myField>
            <myField label="备注说明" placeholder="请输入" type="textarea" red-point="true" v-model.trim="remarks"></myField>
        </div>

        <div class="bmt"><myBase64Img @changeImg="changeImg"></myBase64Img></div>

        <div class="bmt" style="width: 100%;height: 53px;"><myFlaxSub title="提交" @click="sub"></myFlaxSub></div>
    </div>
</template>

<script>
    import myHeard   from  "../customComponent/myHeard";
    import myField   from  "../customComponent/myField";
    import myFlaxSub from  "../customComponent/myFlaxSub";
    import myBase64Img from "../customComponent/myUploadImg";
    import myTimeDate from "../customComponent/myTimeDate";
    import {Toast, Indicator} from 'mint-ui';
    export default {
        name: "supervise",
        components:{
            myHeard,
            myField,
            myFlaxSub,
            myBase64Img,
            myTimeDate,
            Toast,
            Indicator,
        },
        data() {
            return {
                data         : {limitDate:''},
                reformResult : '',
                remarks      : '',
                jointly      : '',
                time         : '',
                imgs         : null,
            };
        },
        methods: {
            changeTime:function (time) {
                this.time = time;
            },
            changeImg:function (imgs) {
                this.imgs = imgs;
            },
            test:function () {
                if(this.reformResult == '') {
                    Toast('请选择整改结果！');
                    return false;
                }
                if(this.jointly == '') {
                    Toast('请填写协办人员！');
                    return false;
                }
                if(this.remarks == '') {
                    Toast('请填写协办人员！');
                    return false;
                }
                return true;
            },
            sub:function () {
                if(!this.test()) return;
                let self = this;
                let status = self.reformResult == '通过' ? '1' : '2';
                $.get(getUrl('sf_zhzf/msys/rectify/recheck'), {
                    id          : self.data.id,
                    status      : status,
                    explain     : self.remarks,
                    offiName    : self.jointly,
                    doitTime    : self.time,
                    attafile    : self.imgs
                }, function (data, status) {
                    Indicator.close();
                    if (data.statusCode == 200) {
                        Toast('提交成功');
                        self.$router.push({name: 'RectifyRecord'});
                    } else if (data.statusCode == 310) {
                        //登录超时
                        window.location.href = "login.html";
                    } else {
                        Toast(data.message);
                    }
                }, 'json');
            },
        },
        mounted() {
            this.data = JSON.parse(this.$route.params.data);
        },
    }
</script>

<style scoped>

</style>