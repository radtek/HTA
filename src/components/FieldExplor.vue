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
                    <mt-radio
                            :title="'【必选】'+item.inspDesc"
                            v-model="answer[item.inspCode]"
                            :options="item.replyOption.split(',')">
                    </mt-radio>
                </div>
                <mt-field label="其他" placeholder="请输入内容，可不填" type="textarea" rows="4" v-model="other"></mt-field>
                <hr style="border-color: rgba(0,0,0,0.1);border-top: 0;">
                <mt-field label="【必填】姓名" placeholder="请输入陪同人姓名" v-model.trim="officerName"></mt-field>
                <mt-button type="primary" style="width: 100%;margin: 20px 0" @click="sub">提交</mt-button>
            </div>
        </div>
    </div>
</template>
<style media="screen">
    .content{
        margin: 25px 0;
    }
    .mint-radiolist-title {
        font-size: 16px;
        margin: 8px;
        display: block;
        color: #303133;
    }
    .demo-input-suffix{
        margin: 20px 0;
    }
</style>
<script>
    import { Header, Radio ,Toast } from 'mint-ui';
    export default {
        name: 'home',
        data() {
            return {
                id:'',
                other:'',
                officerName:'',
                value: '',
                answer:[],
                problems:[
                    {
                        "id":"123",
                        "inspCode":"302728",
                        "inspType":"餐饮油烟检查",
                        "inspDesc":"油烟净化器是否正常使用",
                        "replyOption":"是,否"
                    },
                    {
                        "id":"123",
                        "inspCode":"302729",
                        "inspType":"餐饮油烟检查",
                        "inspDesc":"油烟净化器是否正常使用",
                        "replyOption":"是,否"
                    },
                    {
                        "id":"123",
                        "inspCode":"302730",
                        "inspType":"餐饮油烟检查",
                        "inspDesc":"油烟净化器是否正常使用",
                        "replyOption":"是,否"
                    },
                    {
                        "id":"123",
                        "inspCode":"302731",
                        "inspType":"餐饮油烟检查",
                        "inspDesc":"油烟净化器是否正常使用",
                        "replyOption":"是,否"
                    }
                ]
            }
        },
        components:{
            Header,
            Radio
        },
        methods: {
            sub(){
                this.answer.forEach(function (value,index) {
                    if(value == ''){
                        Toast('有选项未选择！');
                        return;
                    }
                    console.log(index+":"+value);
                });
                return;
                let self = this;
                $.post(realmName + 'sf_zhzf/msys/inspnotes/add',{
                    //TODO::不知道怎么传参数
                },function(data,status){
                    if(data.statusCode == 200){
                        Toast('提交成功');
                        self.$router.push({ name: 'CleanRecord', params: { id: self.id }})
                    }else if(data.statusCode == 310){
                        localStorage.clear();
                        window.location.href = "login.html";
                    }else{
                        Toast(data.message);
                    }
                });
            },
            getProblem(){
                let self = this;
                $.post(realmName + 'sf_zhzf/msys/inspstandard/list',{
                    inspType:'待确定'
                },function(data,status){
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
                });
            },
        },
        mounted() {
            this.id = this.$route.params.id;
            // this.getProblem();
            let self = this;
            this.problems.forEach(function (value) {
                self.answer[value.inspCode] = '';
            });
        }
    }
</script>
