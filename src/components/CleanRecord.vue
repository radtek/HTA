<template>
    <div>
        <mt-header title="清洗记录">
            <router-link to="" slot="left">
                <mt-button icon="back" @click="$router.go(-1);"></mt-button>
            </router-link>
        </mt-header>
        <div style="padding:0 7%;">
            <div id="myScr" style="height: 85vh; overflow:scroll;">
                <p v-if="pageList.length == 0" style="width: 100%; text-align: center">暂无数据</p>
                <v-loadmore :bottom-method="loadBottom"
                            bottomPullText="下拉加载" bottomDropText="释放加载更多" bottomLoadingText="加载中···"
                            :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
                    <div class="clear-list" v-for="item in pageList">
                        <h3 class="time"> {{ item.cretime }} </h3>
                        <mt-cell title="上报内容" :value="item.remark"></mt-cell>
                        <mt-cell title="是否合格" :value="item.statusName"></mt-cell>
                        <mt-cell title="审批答复" v-if="item.ckexplain" :value="item.ckexplain"></mt-cell>
                        <mt-cell title="审批答复" v-else value="无"></mt-cell>
                        <a v-on:click="click(item.id)" style="display: block">
                            <mt-cell title="查看照片详情" is-link></mt-cell>
                        </a>
                    </div>
                </v-loadmore>
                <mt-popup
                        v-model="showPopup" position="right">
                    <div style="max-height: 70vh; overflow:scroll;">
                        <div class="myBox">
                            <img class="myImg" v-for="img in imgList" :src="img.urlPath" alt="">
                            <p>已加载全部</p>
                        </div>
                    </div>
                </mt-popup>
            </div>
        </div>
    </div>
</template>
<style media="screen">
    .myBox{
        width: 80%;
        margin:0 auto;
        padding: 10px;
        text-align: center;
        background: #EBEEF5;
        border: 2px solid rgba(0,0,0,0.2);
        border-radius: 5px;
    }
    .myImg{
        display: block;
        width: 100%;
    }
    .clear-list {
        width: 100%;
        background: #EBEEF5;
        margin: 10px 0;
        border-radius: 5px;
        overflow: hidden;
        padding-top: 10px;
    }
    .time{
        width: 100%;
        color: #606266;
        text-align: center;
    }
    .mint-cell-text{
        color: rgba(0,0,0,0.9);
    }
    .mint-cell{
        background-color: rgba(0, 0, 0, 0) !important;
    }
    .mint-cell-wrapper,.mint-cell:last-child{
        background-image: none !important;
    }
    .mint-cell-wrapper {
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
    .mint-cell-value {
        max-width: 60%;
        padding: 10px 0;
    }
</style>
<script>
    import {Header, Loadmore, Toast} from 'mint-ui';

    export default {
        name: 'home',
        data() {
            return {
                imgList:[],
                showPopup : false,
                id: '20',
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
                $.get( getUrl('sf_zhzf/msys/cleanhist/list'), {
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
                $.get( getUrl('sf_zhzf/msys/cleanhist/list'), {
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
            click(clearId){
                this.showPopup = true;
                let self = this;
                $.get( getUrl('sf_zhzf/msys/cleanhist/photolst'), {
                    releId: clearId,
                }, function (data, status) {
                    if (data.statusCode == 200) {
                        self.imgList = data.list;
                    } else if (data.statusCode == 310) {
                        localStorage.clear();
                        window.location.href = "login.html";
                    } else {
                        Toast(data.message);
                    }
                },'json');
            }
        },
        mounted() {
            this.id = this.$route.params.id;
            this.loadPageList();
            check();
        }
    }
</script>