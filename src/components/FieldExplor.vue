<template>
    <div>
        <mt-header title="现场勘查">
          <router-link to="" slot="left">
            <mt-button icon="back" @click="$router.go(-1);"></mt-button>
          </router-link>
        </mt-header>
        <div style="padding:0 7%;">
            <div style="height: 85vh; overflow:scroll;">
                <div class="content" v-for="item in problems">
                    <mt-radio v-if="item.inspCode != '1240005'"
                            :title="'【必选】'+item.inspDesc"
                            v-model="answer[item.inspCode]"
                            :options="item.replyOption.split(',')">
                    </mt-radio>
                </div>
                <mt-field label="其他" placeholder="有其他特殊情况时填写，如没有请忽略" type="textarea" rows="4" v-model.trim="other"></mt-field>
                <hr style="border-color: rgba(0,0,0,0.1);border-top: 0;">
                <mt-cell title="检查人" :value="relName"></mt-cell>
                <mt-field label="陪同人" :attr="{ maxlength: 10 }" placeholder="请输入陪同人姓名" v-model.trim="officerName"></mt-field>
                <a @click="openPicker">
                    <mt-cell title="检查日期" :value="time" is-link></mt-cell>
                </a>
                <mt-button type="primary" style="width: 100%;margin: 20px 0" @click="sub">提交</mt-button>
            </div>
            <mt-datetime-picker
                    ref="picker"
                    type="date"
                    @confirm="handleConfirm"
            >
            </mt-datetime-picker>
        </div>
    </div>
</template>
<style media="screen">
    .content{
        margin: 25px 0;
    }
    .mint-radiolist-title {
        font-size: 16px !important;
        margin: 8px;
        display: block;
        color: #303133;
    }
    .demo-input-suffix{
        margin: 20px 0;
    }
</style>
<script>
    import { Header, Radio ,Toast, Indicator } from 'mint-ui';
    export default {
        name: 'home',
        data() {
            return {
                id:'',
                good:'1',
                bad:'2',
                other:'',
                officerName:'',
                value: '',
                answer:[],
                problems:[],
                relName:'',
                time:'',
            }
        },
        components:{
            Header,
            Radio,
            Indicator
        },
        methods: {
            sub(){
                let unSelect = false;
                this.answer.forEach(function (value,index) {
                    if(value == '' && index != '1240005'){
                        Toast('有选项未选择！');
                        unSelect = true;
                        return;
                    }
                });
                if(unSelect) return;
                if(this.officerName == ''){
                    Toast('请填写陪同人！');
                    return;
                }

                //中文逗号替换为英文逗号
                this.answer['1240005'] = this.other.replace(/,/g,'，');

                let self = this;
                let inspCodes  = '';
                let inspResult = '';
                let inspStatus = '';
                self.answer.forEach(function (value, index) {
                    if(index == '1240005'){
                        if(value.length != 0){
                            //不能将inspCodes和inspResult的赋值提取到外面，因为当其他的长度为0时不做任何操作，这三个字段分割后的长度要保持一致
                            inspCodes  += index+',';
                            inspResult += value+',';
                            inspStatus += self.bad+',';
                        }
                    }else{
                        inspCodes  += index+',';
                        inspResult += value+',';
                        if(index == '1240003' || index == '1240004'){
                            value == '是' ? (inspStatus += self.bad +',') : (inspStatus += self.good +',');
                        }else{
                            value == '是' ? (inspStatus += self.good +',') : (inspStatus += self.bad +',');
                        }
                    }
                });
                inspCodes  = inspCodes.substring(0,inspCodes.length-1);
                inspResult = inspResult.substring(0,inspResult.length-1);
                inspStatus = inspStatus.substring(0,inspStatus.length-1);

                Indicator.open();
                $.get(getUrl('sf_zhzf/msys/inspnotes/syjadd1'),{
                    execObjId  : self.id,
                    inspCode   : inspCodes,
                    inspResult : inspResult,
                    inspStatus : inspStatus,
                    officerName: self.officerName,
                    inspdate   : self.time
                },function(data,status){
                    Indicator.close();
                    if(data.statusCode == 200){
                        Toast('提交成功');
                        self.$router.push({ name: 'CheckRecord', params: { id: self.id }});
                    }else if(data.statusCode == 310){
                        localStorage.clear();
                        window.location.href = "login.html";
                    }else{
                        Toast(data.message);
                    }
                },'json');
            },
            getProblem(){
                Indicator.open();
                let self = this;
                $.get(getUrl('sf_zhzf/msys/inspnotes/inspstandard'),{
                    inspType: inspType
                },function(data,status){
                    Indicator.close();
                    if(data.statusCode == 200){
                        self.problems = data.list;
                        self.problems.forEach(function (value) {
                            self.answer[value.inspCode] = '';
                        });
                    }else if(data.statusCode == 310){
                        localStorage.clear();
                        window.location.href = "login.html";
                    }else{
                        Toast(data.message);
                    }
                },'json');
            },
            getName(){
                let self = this;
                $.get(getUrl('sf_zhzf/msys/user/getinfo'),{
                },function(data,status){
                    if(data.statusCode == 200){
                        self.relName = data.relName;
                    }else if(data.statusCode == 310){
                        localStorage.clear();
                        window.location.href = "login.html";
                    }else{
                        Toast(data.message);
                    }
                },'json');
            },
            openPicker() {
                this.$refs.picker.open();
            },
            handleConfirm(value){
                let dateVal = new Date(value);
                this.time = this.myFormat(dateVal);
            },
            myFormat(dateVal){

                let year    = dateVal.getFullYear();
                let month   = dateVal.getMonth() + 1;
                let date    = dateVal.getDate();

                month   < 10 && (month   = '0'+month);
                date    < 10 && (date    = '0'+date);

                return year + '-' + month + '-' + date;
            }
        },
        mounted() {
            this.id = this.$route.params.id;
            this.getName();
            this.getProblem();
            let self = this;
            this.problems.forEach(function (value) {
                self.answer[value.inspCode] = '';
            });
            this.time = this.myFormat(new Date());
        }
    }
</script>
