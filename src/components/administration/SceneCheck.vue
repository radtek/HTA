<template>
    <div class="scene-check">
        <div style="width: 100%;height: 40px;"><myHeard back="true" title="现场检查"></myHeard></div>

        <div v-for="item in problems" class="mt">
            <mt-radio
                v-if="item.replyOption.length !== 0"
                :title="item.inspDesc"
                v-model="answer[item.inspCode]"
                :options="item.replyOption.split(',')">
            </mt-radio>
            <myField
                v-else
                red-point="true"
                :label="item.inspDesc"
                placeholder="请输入"
                v-model="answer[item.inspCode]"
                type="textarea">
            </myField>
            <mt-radio
                title="检查结果"
                v-model="result[item.inspCode]"
                :options="['合格','不合格']">
            </mt-radio>
        </div>

        <myBase64Img @changeImg="changeImg"></myBase64Img>

        <div style="width: 100%;height: 53px; margin-top: 10px"><myFlaxSub @click="sub()" title="提交"></myFlaxSub></div>
    </div>
</template>

<script>
    import myHeard   from  "../customComponent/myHeard";
    import myField   from  "../customComponent/myField";
    import myFlaxSub from  "../customComponent/myFlaxSub";
    import myBase64Img from "../customComponent/myUploadImg";
    import {getRequest} from "../../assets/js/public";
    import {Toast} from 'mint-ui';
    export default {
        name: "scene-check",
        components:{
            myHeard,
            myField,
            myFlaxSub,
            myBase64Img,
            Toast,
        },
        data() {
            return {
                form : {
                    objId   : '',
                    jointly : '',
                    time    : '',
                    items   : ''
                },
                problems    : [],
                answer      : [],
                result      : [],
                imgs        : null,
            };
        },
        methods: {
            changeImg:function (imgs) {
                this.imgs = imgs;
            },
            getProblem:function () {
                let self = this;
                getRequest('sf_zhzf/msys/inspnotes/inspstandard2',{
                    items: self.form.items
                },function (data) {
                    self.problems = data.list;
                    self.problems.forEach(function (value) {
                        self.answer[value.inspCode] = '';
                        self.result[value.inspCode] = '合格';
                    });
                });
            },
            test:function () {
                let select = true;
                this.answer.forEach(function (value,index) {
                    if(value == ''  && index != '1240005'){
                        Toast('有选项未选择！');
                        select = false;
                        return;
                    }
                });
                if(!select) return select;
                this.result.forEach(function (value) {
                    if(value == ''){
                        Toast('有选项未选择！');
                        select = false;
                        return;
                    }
                });
                return select;
            },
            sub:function () {

                if(!this.test()) return;

                let self = this;
                let list = [];

                self.problems.forEach(function (value) {
                    let obj = {
                        id         : value.id,
                        code       : value.inspCode,
                        inspResult : self.answer[value.inspCode],
                        inspStatus : self.result[value.inspCode] === '合格' ? 1 : 2
                    };
                    list.push(obj);
                });

                let jsonData = {
                    execObjId    : self.form.objId,
                    inspdate     : self.form.time,
                    officerName  : self.form.jointly,
                    list         : list,
                    imgBase64    : self.imgs
                };

                getRequest('sf_zhzf/msys/inspnotes/noteadd2',{
                    jsonData : JSON.stringify(jsonData)
                },function (data) {
                    Toast('提交成功');
                    self.$router.push({name: 'AdminCheckRecord'});
                });
            },
        },
        mounted() {
            this.form.objId     = this.$route.params.objId;
            this.form.jointly   = this.$route.params.jointly;
            this.form.time      = this.$route.params.time;
            this.form.items     = this.$route.params.items;

            this.getProblem();
        },
    }
</script>

<style scoped>

</style>