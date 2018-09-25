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
            <a @click="openPicker">
                <myField label="办理时间" placeholder="请选择" v-model="time" left-img="true" red-point="true"></myField>
            </a>
            <myField label="协办人员" placeholder="请输入" v-model="jointly" red-point="true"></myField>
            <myField label="备注说明" placeholder="请输入" type="textarea" v-model="remarks"></myField>
        </div>
        <div style="width: 100%;height: 53px;"><myFlaxSub title="提交" @click="sub"></myFlaxSub></div>

        <mt-datetime-picker
                v-model="dataValue"
                ref="picker"
                type="date"
                @confirm="handleConfirm"
        >
        </mt-datetime-picker>
    </div>
</template>

<script>
    import myHeard   from  "../customComponent/myHeard";
    import myField   from  "../customComponent/myField";
    import myFlaxSub from  "../customComponent/myFlaxSub";
    import {Toast, Indicator} from 'mint-ui';
    export default {
        name: "supervise",
        components:{
            myHeard,
            myField,
            myFlaxSub,
            Toast,
            Indicator,
        },
        data() {
            return {
                data         : {limitDate:''},
                reformResult : null,
                remarks      : '',
                jointly      : '',
                dataValue    : new Date(),
                time         : ''
            };
        },
        methods: {
            sub:function () {
                let self = this;
                let status = self.reformResult == '通过' ? 1 : 2;
                //TODO::上传图片
                $.get(getUrl('sf_zhzf/msys/rectify/recheck'), {
                    id          : self.data.id,
                    status      : status,
                    explain     : self.remarks,
                    offiName    : self.jointly,
                    doitTime    : self.time
                }, function (data, status) {
                    Indicator.close();
                    if (data.statusCode == 200) {

                    } else if (data.statusCode == 310) {
                        //登录超时
                        window.location.href = "login.html";
                    } else {
                        Toast(data.message);
                    }
                }, 'json');
            },
            openPicker:function () {
                this.$refs.picker.open();
            },
            handleConfirm:function (value) {
                let dateVal = new Date(value);
                this.time = this.myFormat(dateVal);
            },
            myFormat:function (dateVal) {

                let year    = dateVal.getFullYear();
                let month   = dateVal.getMonth() + 1;
                let date    = dateVal.getDate();

                month   < 10 && (month   = '0'+month);
                date    < 10 && (date    = '0'+date);

                return year + '-' + month + '-' + date;
            },
        },
        mounted() {
            this.data = JSON.parse(this.$route.params.data);
            this.time = this.myFormat(new Date());
            console.log(this.data);
        },
    }
</script>

<style scoped>

</style>