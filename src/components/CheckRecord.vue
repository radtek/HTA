<template>
    <div>
        <mt-header title="检查记录">
            <router-link to="" slot="left">
                <mt-button icon="back" @click="$router.go(-1);"></mt-button>
            </router-link>
        </mt-header>
        <div style="padding:0 7%;">
            <div id="myScr" style="height: 85vh; overflow:scroll;">
                <v-loadmore :bottom-method="loadBottom"
                            bottomPullText="下拉加载" bottomDropText="释放加载更多" bottomLoadingText="加载中···"
                            :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
                    <div class="check-list" v-for="item in pageList">
                        <div class="check-cont">
                            <h3> {{ item.typeDesc }} </h3>
                            <mt-cell title="企业名称" :value="item.exeobjName"></mt-cell>
                            <mt-cell :title="item.inspDesc" :value="item.inspResult"></mt-cell>
                            <mt-cell title="检查类型" :value="item.inspSpecial"></mt-cell>
                            <mt-cell title="检查时间" :value="item.cretime"></mt-cell>
                            <mt-cell title="是否符合标准" :value="item.inspStatus"></mt-cell>
                            <mt-cell title="陪同人" :value="item.officerName"></mt-cell>
                        </div>
                    </div>
                </v-loadmore>
            </div>
        </div>
    </div>
</template>
<style media="screen">
    .check-list {
        width: 100%;
        background: #EBEEF5;
        margin: 10px 0;
        border-radius: 5px;
        overflow: hidden;
    }

    .check-cont > h3 {
        font-size: 20px;
        color: #606266;
        text-align: center;
    }

    .check-cont {
        width: 94%;
        padding: 3% 3% 0;
    }

    .check-cont .mint-cell {
        background-color: rgba(0, 0, 0, 0);
    }

    .mint-cell-value {
        max-width: 70%;
        padding: 10px 0;
    }
</style>
<script>
    import {Header, Loadmore, Toast} from 'mint-ui';

    export default {
        name: 'home',
        data() {
            return {
                id: '',
                searchCondition: {  //分页属性
                    pageNo: "1",
                    pageSize: "15"
                },
                total:0,
                pageList: [],
                allLoaded: false, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
                scrollMode: "auto" //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
            }
        },
        components: {
            Header,
            Toast,
            'v-loadmore': Loadmore
        },
        methods: {
            loadBottom() {
                // 上拉加载
                this.more();// 上拉触发的分页查询
                this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
            },
            loadPageList() {
                let self = this;
                $.get(getUrl('sf_zhzf/msys/inspnotes/list'), {
                    execobjId: self.id,
                    pageNum: self.searchCondition.pageNo,
                    numPerPage: self.searchCondition.pageSize
                }, function (data, status) {
                    if (data.statusCode == 200) {
                        self.pageList = data.list;
                        self.total = data.totalCount;
                        self.checkOver();
                    } else if (data.statusCode == 310) {
                        //登录超时
                        localStorage.clear();
                        window.location.href = "login.html";
                    } else {
                        Toast(data.message);
                    }
                },'json');
            },
            more() {
                //分页查询
                this.searchCondition.pageNo = parseInt(this.searchCondition.pageNo) + 1;

                let self = this;
                $.get(getUrl('sf_zhzf/msys/inspnotes/list'), {
                    execobjId: self.id,
                    pageNum: self.searchCondition.pageNo,
                    numPerPage: self.searchCondition.pageSize
                }, function (data, status) {
                    if (data.statusCode == 200) {
                        self.pageList = self.pageList.concat(data.list);
                        self.total = data.totalCount;
                        self.checkOver();
                    } else if (data.statusCode == 310) {
                        localStorage.clear();
                        window.location.href = "login.html";
                    } else {
                        Toast(data.message);
                    }
                },'json');
            },
            checkOver(){
                this.pageList.length >= this.total && (this.allLoaded = true);
            },
        },
        mounted() {
            this.id = this.$route.params.id;
            this.loadPageList();
            check();
        }
    }
</script>
