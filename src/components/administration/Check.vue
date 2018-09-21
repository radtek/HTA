<template>
    <div>
        <div style="width: 100%;height: 40px;"><myHeard back="true" title="日常检查"></myHeard></div>

        <div class="bmt">
            <a @click="popupVisible = true"><myField label="执法对象" placeholder="请选择" v-model="form.obj" left-img="true" red-point="true"></myField></a>
            <myField label="检查人" placeholder="请输入" v-model="form.checkMan" red-point="true"></myField>
            <myField label="协办人员" placeholder="请选择" v-model="form.jointly" left-img="true" red-point="true"></myField>
            <myField label="办理时间" placeholder="请选择" v-model="form.time" left-img="true" red-point="true"></myField>
            <myField label="检查内容" placeholder="请输入" v-model="form.content" red-point="true" type="textarea"></myField>
        </div>

        <div class="bmt">
            <myField label="检查项目" red-point="true" :readonly="true"></myField>
            <a @click="allClick()"><mt-checklist v-model="all" :options="['全选']"></mt-checklist></a>
            <mt-checklist v-model="checkList" :options="checkOptions"></mt-checklist>
        </div>

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
                            <el-button slot="append" icon="el-icon-search"></el-button>
                        </el-input>
                    </div>

                    <div class="mt">

                    </div>
                </div>

            </mt-popup>
        </div>
    </div>
</template>

<script>
    import myHeard from "../customComponent/myHeard";
    import myField from  "../customComponent/myField";
    import {Toast, Indicator} from 'mint-ui';
    export default {
        name: "check",
        components:{
            myHeard,
            myField,
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
            }
        },
        mounted() {
            this.type = this.$route.params.type;
            this.getCheckList();
        }
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
        font-size: 14px !important;
    }
    .myColor{
        color: rgb(0,149,147);
    }
    .selectBut{
        padding: 10px;
        background-color: white;
    }
</style>