<template>
    <div>
        <div style="width: 100%;height: 40px"><myHeard title="一企一档" back="true"></myHeard></div>

        <!--<img class="myImg" src="../../assets/img/new/1.jpg" alt="">-->

        <div class="bmt cm">
            <div class="item">
                <a @click="click1">
                    <mt-cell title="企业信息" is-link>
                        <img slot="icon" src="../../assets/img/profile_fill.png" width="24" height="24">
                    </mt-cell>
                </a>
            </div>
            <div class="item">
                <a @click="click2">
                    <mt-cell title="检查记录" is-link>
                        <img slot="icon" src="../../assets/img/profile_fill.png" width="24" height="24">
                    </mt-cell>
                </a>
            </div>
            <!--食药监才显示-->
            <div class="item" v-if="data2.deptId == 4">
                <a @click="click3">
                    <mt-cell title="清洗记录" is-link>
                        <img slot="icon" src="../../assets/img/profile_fill.png" width="24" height="24">
                    </mt-cell>
                </a>
            </div>
        </div>

        <a @click="$router.go(-1);">
            <div class="myReturn">
                返回
            </div>
        </a>
    </div>
</template>

<script>
    import myHeard from  "../customComponent/myHeard";
    import {Toast} from 'mint-ui';
    export default {
        name: "company-message",
        data() {
            return {
                id : 0,
                data: '',
                data2:{}
            }
        },
        components:{
            myHeard,
            Toast,
        },
        methods: {
            click1:function () {
                this.$router.push({name: 'CompanyDetailMessage', params: { id : this.id, data : this.data }});
            },
            click2:function () {
                this.$router.push({name: 'CheckRecord', params: { id : this.data2.id }});
            },
            click3:function () {
                this.$router.push({name: 'ClearRecord', params: { id : this.data2.id }});
            }
        },
        mounted() {
            this.id  = this.$route.params.id;
            this.data = this.$route.params.data;
            this.data2 = JSON.parse(this.data);
        }
    }
</script>

<style scoped>

</style>