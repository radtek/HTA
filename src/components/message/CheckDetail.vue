<template>
    <div>
        <div style="width: 100%;height: 40px;"><myHeard back="true" title="检查详情"></myHeard></div>

        <div class="bmt">
            <div class="item">
                <mt-cell title="企业名称" :value="pageList[0].exeobjName"></mt-cell>
            </div>
            <div class="item">
                <mt-cell title="检查类型" :value="pageList[0].inspSpecial"></mt-cell>
            </div>
        </div>
        <div class="bmt">
            <div class="item">
                <mt-cell v-for="item in pageList"
                         :title="item.inspDesc"
                         :key="item.id"
                         :value="item.inspResult">
                </mt-cell>
            </div>
        </div>
        <div class="bmt">
            <div class="item">
                <mt-cell title="检查人" :value="relName"></mt-cell>
            </div>
            <div class="item">
                <mt-cell title="陪同人" :value="pageList[0].officerName"></mt-cell>
            </div>
            <div class="item">
                <mt-cell title="检查日期" :value="pageList[0].inspdate.split(' ')[0]"></mt-cell>
            </div>
        </div>

        <div style="width: 100%;height: 41px"></div>
        <a @click="$router.go(-1);">
            <div class="myReturn">
                返回
            </div>
        </a>
    </div>
</template>

<script>
    import myHeard   from  "../customComponent/myHeard";
    import {getRequest} from "../../assets/js/public";

    export default {
        name: 'check-detail',
        data() {
            return {
                id: '',
                inspVersion: '',
                pageList: [{exeobjName: '', inspSpecial: '', inspdate: ''}],
                relName: '',
            }
        },
        components: {
            myHeard,
        },
        methods: {
            loadPageList() {
                let self = this;
                getRequest('sf_zhzf/msys/inspnotes/list',{
                    execobjId   : self.id,
                    inspVersion : self.inspVersion
                },function (data) {
                    self.pageList = data.list.reverse();
                });
            },
            getName() {
                let self = this;
                getRequest('sf_zhzf/msys/user/getinfo',{},function (data) {
                    self.relName = data.relName;
                });
            },
        },
        mounted() {
            this.id = this.$route.params.id;
            this.inspVersion = this.$route.params.inspVersion;
            this.getName();
            this.loadPageList();
        }
    }
</script>

<style scoped>

</style>