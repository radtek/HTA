<template>
    <div>
        <myHeard back="true" title="企业信息" scan="true"></myHeard>
        <div class="lm">
            <div style="width: 100%;height: 40px;"></div>

            <div class="select">
                <div class="selectBut">
                    <el-input placeholder="请输入内容" v-model="objName" class="input-with-select" size="medium">
                        <el-button slot="append" icon="el-icon-search" @click="getData(false)"></el-button>
                    </el-input>
                </div>
            </div>

            <Loadmore :bottom-method="loadBottom"
                      bottomPullText="下拉加载" bottomDropText="释放加载更多" bottomLoadingText="加载中···"
                      :bottom-all-loaded="searchCondition.allLoaded" :auto-fill="false" ref="loadmore">
                <div class="myBlock" v-for="list in searchCondition.pageList" @click="click(list)" :key="list.id">
                    <div class="qyInfo">
                        <p class="myP qyName">{{ list.objName }}</p>

                        <p v-if="list.deptId == 1" class="myP">涉污类型：{{  }}</p>
                        <p v-if="list.deptId == 2" class="myP">所属行业：{{  }}</p>
                        <p v-if="list.deptId == 3" class="myP">经营类别：{{  }}</p>
                        <p v-if="list.deptId == 4" class="myP">对象类型：{{  }}</p>

                        <p class="myP">地址：{{ list.busiAddr }}</p>
                    </div>
                    <img class="myLinkImg" src="../../assets/img/into.png" alt="无法加载">
                </div>
            </Loadmore>

            <div style="width: 100%;height: 40px;"></div>
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
    import myField   from  "../customComponent/myField";
    import myFlaxSub from  "../customComponent/myFlaxSub";
    import {Toast, Indicator, Loadmore} from 'mint-ui';
    export default {
        name: "company-record",
        components:{
            myHeard,
            myField,
            myFlaxSub,
            Toast,
            Indicator,
            Loadmore
        },
        data() {
            return {
                departments:[
                    {
                        id  :1,
                        name:'全部'
                    },
                    {
                        id  :2,
                        name:'环保'
                    },
                    {
                        id  :3,
                        name:'生产'
                    },
                    {
                        id  :4,
                        name:'食药监'
                    },
                    {
                        id  :5,
                        name:'城管、国土'
                    },{
                        id  :6,
                        name:'执法大队'
                    },
                ],
                searchCondition: {  //分页属性
                    pageNo   : "1",
                    pageSize : "15",
                    total    : 0,
                    pageList : [],
                    allLoaded: true,//是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
                },
                scrollMode  : "auto", //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
                objName     : ''
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

                $.get(getUrl('sf_zhzf/msys/enterprise/querybyname'), {
                    objName     : self.objName,
                    // pageNum     : search.pageNo,
                    // numPerPage  : search.pageSize
                }, function (data, status) {
                    console.log(data);
                    Indicator.close();
                    if (data.statusCode == 200) {
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
            click:function (list) {

            },
        },
        mounted() {
            this.getData(false);
        },
    }
</script>

<style scoped>
    .lm{
        height: 100vh;
        overflow:scroll;
    }
    .select p{
        font-size: 12px;
        color: rgba(0,149,147,0.8);
        height: 30px;
        line-height: 30px;
    }
    .select p > span{
        color: orange;
    }
    .selectBut{
        padding: 10px;
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