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

        <div style="width: 100%;height: 53px; margin-top: 10px"><myFlaxSub @click="sub()" title="提交"></myFlaxSub></div>
    </div>
</template>

<script>
    import myHeard   from  "../customComponent/myHeard";
    import myField   from  "../customComponent/myField";
    import myFlaxSub from  "../customComponent/myFlaxSub";
    import {Toast, Indicator} from 'mint-ui';
    export default {
        name: "scene-check",
        components:{
            myHeard,
            myField,
            myFlaxSub,
            Toast,
            Indicator
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
            };
        },
        methods: {
            getProblem:function () {
                Indicator.open();
                let self = this;
                $.get(getUrl('sf_zhzf/msys/inspnotes/inspstandard2'),{
                    items: self.form.items
                },function(data,status){
                    Indicator.close();
                    if(data.statusCode == 200){
                        //TODO::
                        self.problems = data.list.slice(0,5);
                        console.log(self.problems);
                        self.problems.forEach(function (value) {
                            self.answer[value.inspCode] = '';
                            self.result[value.inspCode] = '';
                        });
                    }else if(data.statusCode == 310){
                        window.location.href = "login.html";
                    }else{
                        Toast(data.message);
                    }
                },'json');
            },
            sub:function () {
                Indicator.open();
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

                $.get(getUrl('sf_zhzf/msys/inspnotes/noteadd2'),{
                    execObjId    : self.form.objId,
                    inspdate     : self.form.time,
                    officerName  : self.form.jointly,
                    list         : list,
                    imgBase64    : ''
                },function(data,status){
                    Indicator.close();
                    if(data.statusCode == 200){
                        //TODO::imgBase64

                    }else if(data.statusCode == 310){
                        window.location.href = "login.html";
                    }else{
                        Toast(data.message);
                    }
                },'json');
            }
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