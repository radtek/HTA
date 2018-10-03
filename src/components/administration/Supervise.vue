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
                <myField label="督察时间" placeholder="请选择" v-model="time" left-img="true" red-point="true"></myField>
            </a>
            <myField label="协办人员" placeholder="请输入" v-model.trim="jointly" red-point="true"></myField>
            <myField label="备注说明" placeholder="请输入" type="textarea" red-point="true" v-model.trim="remarks"></myField>
        </div>

        <div class="bmt"><myBase64Img @changeImg="changeImg"></myBase64Img></div>

        <div class="bmt" style="width: 100%;height: 53px;"><myFlaxSub title="提交" @click="sub"></myFlaxSub></div>

        <mt-datetime-picker
                v-model="dataValue"
                ref="picker"
                type="datetime"
                @confirm="handleConfirm"
        >
        </mt-datetime-picker>
    </div>
</template>

<script>
    import myHeard   from  "../customComponent/myHeard";
    import myField   from  "../customComponent/myField";
    import myFlaxSub from  "../customComponent/myFlaxSub";
    import myBase64Img from "../customComponent/myUploadImg";
    import {Toast, Indicator} from 'mint-ui';
    export default {
        name: "supervise",
        components:{
            myHeard,
            myField,
            myFlaxSub,
            myBase64Img,
            Toast,
            Indicator,
        },
        data() {
            return {
                data         : {limitDate:''},
                reformResult : '',
                remarks      : '',
                jointly      : '',
                dataValue    : new Date(),
                time         : '',
                imgs         : null,
            };
        },
        methods: {
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
            openPicker:function () {
                this.$refs.picker.open();
            },
            handleConfirm:function (value) {
                let dateVal = new Date(value);
                this.time = this.myFormat(dateVal);
            },
            myFormat:function (dateVal) {
                let year     = dateVal.getFullYear();
                let month    = dateVal.getMonth() + 1;
                let date     = dateVal.getDate();
                let hours    = dateVal.getHours();
                let minutes  = dateVal.getMinutes();

                month    < 10 && (month   = '0'+month);
                date     < 10 && (date    = '0'+date);
                hours    < 10 && (hours   = '0'+hours);
                minutes  < 10 && (minutes = '0'+minutes);

                return year + '-' + month + '-' + date + ' ' + hours + ':' + minutes;
            },
        },
        mounted() {
            this.data = JSON.parse(this.$route.params.data);
            this.time = this.myFormat(new Date());
        },
    }
</script>

<style scoped>

</style>