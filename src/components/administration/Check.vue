<template>
    <div>
        <div style="width: 100%;height: 40px;"><myHeard back="true" title="日常检查"></myHeard></div>

        <div class="bmt">
            <a @click="popupVisible = true;getObj();">
                <myField label="执法对象" placeholder="请选择" v-model="form.obj" left-img="true" red-point="true"></myField>
            </a>
            <myField label="检查人" placeholder="请输入" v-model="form.checkMan" red-point="true"></myField>
            <myField label="协办人员" placeholder="请输入" v-model="form.jointly" red-point="true"></myField>
            <a @click="openPicker">
                <myField label="办理时间" placeholder="请选择" v-model="form.time" left-img="true" red-point="true"></myField>
            </a>
            <myField label="检查内容" placeholder="请输入" v-model="form.content" red-point="true" type="textarea"></myField>
        </div>

        <div class="bmt">
            <myField label="检查项目" red-point="true" :readonly="true"></myField>
            <a @click="allClick()"><mt-checklist v-model="all" :options="['全选']"></mt-checklist></a>
            <mt-checklist v-model="checkList" :options="checkOptions"></mt-checklist>
        </div>

        <myFlaxSub title="提交" @click="sub"></myFlaxSub>

        <div class="select">
            <mt-popup
                    v-model="popupVisible"
                    position="right">
                <div style="height:100%;overflow:scroll;">
                    <div style="width: 100%;height: 40px;">
                        <mt-header fixed title="执法对象">
                            <router-link to="" slot="left">
                                <mt-button class="myColor" icon="back" @click="popupVisible = false"></mt-button>
                            </router-link>
                        </mt-header>
                    </div>

                    <div class="selectBut">
                        <el-input placeholder="请输入内容" v-model="selectValue" class="input-with-select" size="medium">
                            <el-button slot="append" icon="el-icon-search" @click="getObj"></el-button>
                        </el-input>
                    </div>

                    <div class="mt">
                        <a v-for="item in objList" :key="item.id" @click="selectedObj(item.objName)">
                            <div class="myObj">
                                <p>{{ item.objName }}</p>
                            </div>
                        </a>
                    </div>
                </div>
            </mt-popup>
        </div>

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
    import myHeard from "../customComponent/myHeard";
    import myField from  "../customComponent/myField";
    import myFlaxSub from  "../customComponent/myFlaxSub";
    import {Toast, Indicator} from 'mint-ui';
    export default {
        name: "check",
        components:{
            myHeard,
            myField,
            myFlaxSub,
            Toast,
            Indicator
        },
        data() {
            return {
                type : 1,
                all  : [],
                popupVisible: false,
                checkOptions: [],
                checkList   : [],
                selectValue : '',
                objList     : [],
                dataValue  :new Date(),
                form : {
                    obj     :'',
                    checkMan:'',
                    jointly :'',
                    time    :'2018-08-23 14:22',
                    content :'',
                }
            };
        },
        methods: {
            allClick:function () {
                //this.all.length是点击之前的值
                this.all.length === 0 ? this.checkList = this.checkOptions : this.checkList = [];
            },
            getCheckList:function () {
                Indicator.open();
                let self = this;
                $.get(getUrl('sf_zhzf/msys/inspnotes/inspitems'), {
                    inspSpecial: self.type
                }, function (data, status) {
                    Indicator.close();
                    if (data.statusCode == 200) {
                        data.list.forEach(function (value,index) {
                            self.checkOptions.push(value.inspName);
                        })
                    } else if (data.statusCode == 310) {
                        window.location.href = "login.html";
                    } else {
                        Toast(data.message);
                    }
                }, 'json');
            },
            getObj:function () {
                Indicator.open();
                let self = this;
                $.get(getUrl('sf_zhzf/msys/enterprise/querybyname2'), {
                    inspSpecial: self.type,
                    objName    : self.selectValue
                }, function (data, status) {
                    Indicator.close();
                    console.log(data);
                    if (data.statusCode == 200) {
                        self.objList = data.list;
                    } else if (data.statusCode == 310) {
                        window.location.href = "login.html";
                    } else {
                        Toast(data.message);
                    }
                }, 'json');
            },
            selectedObj:function (obj) {
                this.form.obj = obj;
                this.popupVisible = false;
            },
            openPicker:function () {
                this.$refs.picker.open();
            },
            handleConfirm:function (value) {
                let dateVal = new Date(value);
                this.form.time = this.myFormat(dateVal);
            },
            myFormat:function (dateVal) {

                let year    = dateVal.getFullYear();
                let month   = dateVal.getMonth() + 1;
                let date    = dateVal.getDate();

                month   < 10 && (month   = '0'+month);
                date    < 10 && (date    = '0'+date);

                return year + '-' + month + '-' + date;
            },
            sub:function () {
                console.log(555);
            }
        },
        mounted() {
            this.type = this.$route.params.type;
            this.getCheckList();
            this.form.time = this.myFormat(new Date());
        },
    }
</script>

<style scoped>
    .select{
        width: 100%;
        height: 100%;
    }
    .select .mint-popup{
        width: 100%;
        height: 100%;
        background-color: rgb(248,249,249);
    }
    .select .mint-header{
        background-color: white;
        color: rgb(0,149,147);
        font-size: 16px !important;
    }
    .myColor{
        color: rgb(0,149,147);
    }
    .selectBut{
        padding: 10px;
        background-color: white;
    }
    .myObj{
        margin-bottom: 1px;
        background-color: white;
        height: 30px;
        line-height: 30px;
        padding: 2px 15px;
        font-size: 14px;
        color: rgb(96,96,96);
    }
</style>