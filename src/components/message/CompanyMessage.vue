<template>
    <div>
        <div style="width: 100%;height: 40px"><myHeard title="一企一档" back="true"></myHeard></div>
        <div class="bmt cm">
            <div class="item">
                <a @click="click1">
                    <mt-cell title="企业信息" is-link>
                        <span slot="icon" class="fa fa-newspaper-o icon"></span>
                    </mt-cell>
                </a>
            </div>
            <div class="item">
                <a @click="click2">
                    <mt-cell title="检查记录" is-link>
                        <span slot="icon" class="fa fa-calendar-check-o icon"></span>
                    </mt-cell>
                </a>
            </div>
            <!--食药监才显示-->
            <div class="item" v-if="data2.deptId == 4">
                <a @click="click3">
                    <mt-cell title="清洗记录" is-link>
                        <span slot="icon" class="fa fa-tint icon"></span>
                    </mt-cell>
                </a>
            </div>

            <div class="item">
                <a @click="click4">
                    <mt-cell title="日常检查" is-link>
                        <span slot="icon" class="fa fa-calendar-o icon"></span>
                    </mt-cell>
                </a>
            </div>

            <div class="item">
                <a @click="click5">
                    <mt-cell title="后督察" is-link>
                        <span slot="icon" class="fa fa-life-ring icon"></span>
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
            },
            click4:function () {
                this.$router.push({name: 'Check', params: { type : 1, id : this.data2.id, name : this.data2.objName }});
            },
            click5:function () {
                this.$router.push({name: 'RectifyRecord', params: { objId : this.data2.id }});
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
    .fa{
        vertical-align: middle;
    }
</style>