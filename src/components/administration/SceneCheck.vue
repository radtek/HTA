<template>
    <div>
        <div style="width: 100%;height: 40px;"><myHeard back="true" title="现场检查"></myHeard></div>

        <div v-for="item in problems">

            <!--<mt-radio v-model="answer[item.inspCode]"-->
                      <!--:options="item.replyOption.split(',')">-->
            <!--</mt-radio>-->
        </div>

        <div style="width: 100%;height: 53px;"><myFlaxSub title="提交"></myFlaxSub></div>
    </div>
</template>

<script>
    import myHeard from "../customComponent/myHeard";
    import myField from  "../customComponent/myField";
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
            };
        },
        methods: {
            getProblem(){
                Indicator.open();
                let self = this;
                $.get(getUrl('sf_zhzf/msys/inspnotes/inspstandard2'),{
                    items: self.form.items
                },function(data,status){
                    Indicator.close();
                    if(data.statusCode == 200){
                        console.log(data.list);
                        self.problems = data.list;
                        self.problems.forEach(function (value) {
                            self.answer[value.inspCode] = '';
                        });
                    }else if(data.statusCode == 310){
                        window.location.href = "login.html";
                    }else{
                        Toast(data.message);
                    }
                },'json');
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