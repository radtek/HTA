<template>
    <div>
        <div style="width: 100%;height: 40px;">
            <myHeard v-if="type == 1" back="true" title="日常检查"></myHeard>
            <myHeard v-else back="true" title="专项检查"></myHeard>
        </div>

        <div class="bmt">
            <a @click="popupVisible = true;getObj();">
                <myField label="执法对象" placeholder="请选择" v-model="onjName" left-img="true" red-point="true"></myField>
            </a>

            <div class="block">
                <span class="red-point">*</span>
                <div style="padding-left: 8px">
                    <mt-field
                            label="检查人"
                            v-model="form.checkMan"
                            placeholder="请输入">
                    </mt-field>
                </div>
            </div>

            <myField label="协办人员" placeholder="请输入" v-model="form.jointly" red-point="true"></myField>
            <myTimeDate label="检查时间" placeholder="请选择" type="date" @changeTime="changeTime"></myTimeDate>
            <myField label="检查内容" placeholder="请输入" v-model="form.content" type="textarea"></myField>
        </div>

        <div class="bmt">
            <myField label="检查项目" red-point="true" :readonly="true"></myField>
            <a @click="allClick()"><mt-checklist v-model="all" :options="['全选']"></mt-checklist></a>
            <a @click="checkListClick()"><mt-checklist v-model="checkList" :options="checkOptions"></mt-checklist></a>
        </div>

        <div style="width: 100%;height: 53px;"><myFlaxSub title="开始检查" @click="sub"></myFlaxSub></div>
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
                        <a v-for="item in objList" :key="item.id" @click="selectedObj(item.objName,item.id)">
                            <div class="myObj">
                                <p>{{ item.objName }}</p>
                            </div>
                        </a>
                    </div>
                </div>
            </mt-popup>
        </div>
    </div>
</template>

<script>
    import myHeard  from "../customComponent/myHeard";
    import myField  from  "../customComponent/myField";
    import myFlaxSub from  "../customComponent/myFlaxSub";
    import myTimeDate from "../customComponent/myTimeDate";
    import {getRequest} from "../../assets/js/public";
    import {Toast} from 'mint-ui';
    export default {
        name: "check",
        components:{
            myHeard,
            myField,
            myFlaxSub,
            myTimeDate,
            Toast,
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
                onjName     : '',
                form : {
                    objId   : '',
                    checkMan: null,
                    jointly : '',
                    time    : '',
                    content : '',
                    items   : ''
                },
                tpCheckList : [],
            };
        },
        methods: {
            changeTime:function (time) {
                this.form.time = time;
            },
            allClick:function () {
                //this.all.length是点击之前的值
                this.all.length === 0 ? this.checkList = this.checkOptions : this.checkList = [];
            },
            checkListClick:function () {
                this.all = [];
            },
            getCheckList:function () {
                let self = this;
                getRequest('sf_zhzf/msys/inspnotes/inspitems',{
                    inspSpecial: self.type
                },function (data) {
                    self.tpCheckList = data.list;
                    data.list.forEach(function (value,index) {
                        self.checkOptions.push(value.inspName);
                    })
                });
            },
            getObj:function () {
                let self = this;
                getRequest('sf_zhzf/msys/enterprise/querybyname2',{
                    inspSpecial: self.type,
                    objName    : self.selectValue
                },function (data) {
                    self.objList = data.list;
                });
            },
            getName(){
                let self = this;
                getRequest('sf_zhzf/msys/user/getinfo',{},function (data) {
                    self.form.checkMan = data.relName;
                });
            },
            selectedObj:function (obj,id) {
                this.onjName = obj;
                this.form.objId = id;
                this.popupVisible = false;
            },
            test:function () {
                if(this.form.objId.length == 0){
                    Toast('请选择执法对象');
                    return false;
                }
                if(this.form.checkMan.length == 0){
                    Toast('请输入检查人');
                    return false;
                }
                if(this.form.jointly.length == 0){
                    Toast('请输入协办人员');
                    return false;
                }
                if(this.form.items.length == 0){
                    Toast('请选择检查项目');
                    return false;
                }
                return true;
            },
            sub:function () {
                let self = this;
                self.checkList.forEach(function (value1) {
                    self.tpCheckList.forEach(function (value2) {
                        if(value2.inspName == value1){
                            self.form.items += value2.id+',';
                        }
                    })
                });
                self.form.items = self.form.items.substring(0,self.form.items.length-1);
                if(this.test())
                    self.$router.push({name: 'SceneCheck', params: {
                        objId   : self.form.objId,
                        jointly : self.form.jointly,
                        time    : self.form.time,
                        items   : self.form.items
                    }});
            },
        },
        mounted() {
            this.type = this.$route.params.type;
            this.getCheckList();
            this.getName();
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

    .block{
        position: relative;
        background-color: white;
        border-bottom: 1px solid rgb(248,248,248);
    }
    .red-point{
        color: red;
        position: absolute;
        z-index: 1;
        height: 14px;
        top: 50%;
        margin-top: -10px;
        left: 8px;
    }
</style>