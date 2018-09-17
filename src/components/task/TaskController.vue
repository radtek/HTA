<template>
    <div>
        <header>
            <h3>任务管理</h3>
        </header>
        <div class="nav">
            <el-menu
                    :default-active="activeIndex2"
                    class="el-menu-demo"
                    mode="horizontal"
                    @select="handleSelect"
                    text-color="#8C8888"
                    active-text-color="#089593">
                <el-menu-item index="1" class="right">处理中心</el-menu-item>
                <el-menu-item index="2" class="left">订单管理</el-menu-item>
            </el-menu>

            <div style="padding: 15px 0;background-color: #F8F9F9!important;width: 100%;" v-if="show">
                <el-input placeholder="请输入内容" class="input-with-select search" size="small">
                    <el-button slot="append" icon="el-icon-search" class="submit" size="small"></el-button>
                </el-input>
                <div class="list">
                    <v-loadmore :bottom-method="loadBottom"
                                bottomPullText="下拉加载" bottomDropText="释放加载更多" bottomLoadingText="加载中···"
                                :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
                        <!--<div class="list" v-for="item in pageList" :key="item.id">-->
                        <!--<router-link :to="{ name: 'ListContent', params: { id: item.id }}" class="clearBoth">-->
                        <!--<div class="cont">-->
                        <!--<h3> {{ item.objName }} </h3>-->
                        <!--<p> {{ item.p1 }} </p>-->
                        <!--<p> {{ item.p2 }} </p>-->
                        <!--</div>-->
                        <!--</router-link>-->
                        <!--</div>-->
                    </v-loadmore>
                </div>
            </div>
        </div>

        <router-link to="/">
            <div class="cont">
                <h3>油烟检查任务</h3>
                <p>完成期限： <span>2018.03.09</span></p>
                <p>任务来源： <span>110任务</span></p>
                <div class="go">
                    <img src="" alt="">
                </div>
            </div>

        </router-link>

    </div>
</template>

<style scoped>
    body{
        background-color: #F8F9F9;
        font-family: "思源黑体";
    }
    header{
        height: 55px;
    }
    h3{
        text-align: center;
        font-size: 18px;
        color: #101010;
        font-family: Arial;
        padding: 15px 0;
        font-weight: 100;
    }
    .nav{
        width: 80%;
        margin: 0 10%;
    }
    .right,.left{
        width: 50%;
        text-align: center;
    }
    .search{
        border: #089593 solid 1px;
        width: 90%;
        margin: 0 5%;
    }
    .submit{
        border: #089593 solid 1px;
        background-color: #089593 !important;
        border-radius: 0;
        color: #fff !important;
    }
    .cont{
        width: 80%;
        margin: 0 10%;
        padding: 10px 0;
        border-top: rgba(225, 225, 225, 1) solid 0.5px;
        border-bottom: rgba(225, 225, 225, 1) solid 0.5px;
        border-radius: 3px;
        position: relative;
        font-family: "思源黑体";
    }
    .cont h3{
        padding: 5px 0 10px 10px;
        text-align: left;
        color: #FF9800;
        font-size: 16px;
    }
    .cont p{
        color: #888888;
        font-size: 12px;
        text-align: left;
        padding: 0 0 5px 10px;
    }
    .cont p span{
        color: #089593;
        opacity: 0.65;
        font-size: 14px;
        text-align: left;
    }
    .cont .go{
        position: absolute;
        right: 20%;
        bottom: 30%;
        background: #0b2e13;
        width: 10px;
        height: 10px;
    }
</style>

<script>
    import { Loadmore } from 'mint-ui';

    export default {
        data() {
            return {
                objName: "",
                taskList: [],
                activeIndex: '1',
                activeIndex2: '1',
                show: true,
                pageList: [],
                allLoaded: true, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
                scrollMode: "auto"
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
//                getData(key);
            },
            loadBottom() {
                // 上拉加载
                this.more();// 上拉触发的分页查询
                this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
            },
            loadPageList() {
                Indicator.open();
                let self = this;

                self.pageList = [
                    {
                        title:"油烟检查任务",
                        p1:"2018.03.03",
                        p2:"110",
                        name:"weiyakajs",

                    },
                    {
                        title:"油烟检查任务",
                        p1:"2018.05.05",
                        p2:"120",
                        name:"weiyakajs",

                    }
                  ];
//                $.get(getUrl('sf_zhzf/msys/enterprise/querybyname'), {
//                    objName: self.objName,
//                    // pageNum:self.searchCondition.pageNo,
//                    // numPerPage:self.searchCondition.pageSize
//                }, function (data, status) {
//                    Indicator.close();
//                    if (data.statusCode == 200) {
//                        self.pageList = data.list;
//                    } else if (data.statusCode == 310) {
//                        window.location.href = "login.html";
//                    } else {
//                        Toast(data.message);
//                    }
//                }, 'json');
            },
            more() {
                // 分页查询
                this.searchCondition.pageNo = parseInt(this.searchCondition.pageNo) + 1;

                let self = this;
                $.get(getUrl('sf_zhzf/msys/enterprise/querybyname'), {
                    objName: self.objName,
                    // pageNum:self.searchCondition.pageNo,
                    // numPerPage:self.searchCondition.pageSize
                }, function (data, status) {
                    if (data.statusCode == 200) {
                        self.pageList = self.pageList.concat(data.list);
                    } else if (data.statusCode == 310) {
                        window.location.href = "login.html";
                    } else {
                        Toast(data.message);
                    }
                }, 'json');
            },
        },
        components: {
            'v-loadmore': Loadmore
        },
    }

</script>