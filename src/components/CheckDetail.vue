<template>
    <div>
        <mt-header title="检查详情">
            <router-link to="" slot="left">
                <mt-button icon="back" @click="$router.go(-1);"></mt-button>
            </router-link>
        </mt-header>
        <div style="padding:0 7%;">
            <div id="myScr" style="height: 85vh; overflow:scroll;">
                <mt-cell title="企业名称" :value="pageList[0].exeobjName"></mt-cell>
                <mt-cell title="检查类型" :value="pageList[0].inspSpecial"></mt-cell>
                <mt-cell v-for="item in pageList"
                         :title="item.inspDesc"
                         :key="item.id"
                         :value="item.inspResult">
                </mt-cell>
                <mt-cell title="检查人" :value="relName"></mt-cell>
                <mt-cell title="陪同人" :value="pageList[0].officerName"></mt-cell>
                <mt-cell title="检查日期" :value="pageList[0].inspdate.split(' ')[0]"></mt-cell>
                <mt-button type="primary"
                           style="width: 100%;margin: 10px 0"
                           @click="$router.go(-1);">
                    返回
                </mt-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {Header, Toast, Indicator} from 'mint-ui';

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
            Header,
            Toast,
            Indicator,
        },
        methods: {
            loadPageList() {
                Indicator.open();
                let self = this;
                $.get(getUrl('sf_zhzf/msys/inspnotes/list'), {
                    execobjId: self.id,
                    inspVersion: self.inspVersion
                }, function (data, status) {
                    Indicator.close();
                    if (data.statusCode == 200) {
                        self.pageList = data.list.reverse();
                    } else if (data.statusCode == 310) {
                        //登录超时
                        window.location.href = "login.html";
                    } else {
                        Toast(data.message);
                    }
                }, 'json');
            },
            getName() {
                let self = this;
                $.get(getUrl('sf_zhzf/msys/user/getinfo'), {}, function (data, status) {
                    if (data.statusCode == 200) {
                        self.relName = data.relName;
                    } else if (data.statusCode == 310) {
                        window.location.href = "login.html";
                    } else {
                        Toast(data.message);
                    }
                }, 'json');
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
    .mint-cell-value {
        max-width: 70%;
        padding: 10px 0;
    }
</style>