<template>
    <div>
        <myHeard title="检查记录" back="true"></myHeard>

        <div class="lm">

            <div class="bmt" style="width: 100%;height: 40px;"></div>

            <p v-if="searchCondition.pageList.length == 0" style="width: 100%; text-align: center;font-size: 12px">暂无数据</p>

            <Loadmore :bottom-method="loadBottom"
                      bottomPullText="下拉加载" bottomDropText="释放加载更多" bottomLoadingText="加载中···"
                      :bottom-all-loaded="searchCondition.allLoaded" :auto-fill="false" ref="loadmore">
                <div class="myBlock" v-for="(list,index) in searchCondition.pageList" :key="index" @click="click(list.inspVersion)">
                    <div class="qyInfo">
                        <p class="myP qyName">{{ list.typeDesc }}</p>
                        <p class="myP">企业名称：{{ list.exeobjName }}</p>
                        <p class="myP">检查时间：{{ list.inspdate }}</p>
                    </div>
                    <img class="myLinkImg" src="../../assets/img/into.png" alt="无法加载">
                </div>
            </Loadmore>
            <div class="mt" style="width: 100%;height: 40px;"></div>
        </div>

        <a @click="$router.go(-1);">
            <div class="myReturn">
                返回
            </div>
        </a>
    </div>
</template>

<script>
    import myHeard   from  "../customComponent/myHeard";
    import {Toast, Indicator, Loadmore} from 'mint-ui';
    export default {
        name: "check-record",
        components:{
            myHeard,
            Toast,
            Indicator,
            Loadmore
        },
        data() {
            return {
                id : 0,
                searchCondition: {  //分页属性
                    pageNo   : "1",
                    pageSize : "15",
                    total    : 0,
                    pageList : [],
                    allLoaded: false,//是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
                },
                scrollMode  : "auto", //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
            };
        },
        methods: {
            loadBottom() {
                // 上拉加载
                this.getData(true);// 上拉触发的分页查询
                // 固定方法，查询完要调用一次，用于重新定位
                this.$refs.loadmore.onBottomLoaded();
            },
            getData:function (isMore) {
                Indicator.open();

                let search = this.searchCondition;
                search.pageNo = isMore ? parseInt(search.pageNo) + 1 : parseInt(search.pageNo);
                let self = this;
                $.get(getUrl('sf_zhzf/msys/inspnotes/verlist'), {
                    execobjId   : self.id,
                    pageNum     : search.pageNo,
                    numPerPage  : search.pageSize
                }, function (data, status) {
                    console.log(data);
                    Indicator.close();
                    if (data.statusCode == 200) {
                        console.log(data);
                        search.pageList = search.pageList.concat(data.list);
                        search.total = data.totalCount;
                        search.pageList.length >= search.total && (search.allLoaded = true);
                    } else if (data.statusCode == 310) {
                        //登录超时
                        window.location.href = "login.html";
                    } else {
                        Toast(data.message);
                    }
                }, 'json');
            },
            click:function (inspVersion) {
                this.$router.push({name: 'CheckDetail', params: { id : this.id ,inspVersion : inspVersion}});
            },
        },
        mounted() {
            this.id = this.$route.params.id;
            this.getData(false);
        },
    }
</script>

<style scoped>
    .lm{
        height: 100vh;
        overflow:scroll;
    }
    .myBlock{
        padding: 10px 15px;
        background-color: white;
        margin-bottom: 1px;
        font-size: 14px;
        position: relative;
    }
    .myP{
        height: 25px;
        line-height: 25px;
        color: #8C8888;
    }
    .qyInfo{
        width: 80%;
    }
    .qyName{
        font-size: 15px;
        color: orange;
    }
    .myLinkImg{
        position: absolute;
        width: 24px;
        height: 24px;
        top: 50%;
        right: 15px;
        margin-top: -12px;
    }
</style>
