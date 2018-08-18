<template>
    <div>
        <mt-header title="清洗记录">
          <router-link to="" slot="left">
            <mt-button icon="back" @click="$router.go(-1);"></mt-button>
          </router-link>
        </mt-header>
        <div style="padding:0 7%;">
            <div style="height: 85vh; overflow:scroll;">
                <v-loadmore :bottom-method="loadBottom"
                            bottomPullText="下拉加载" bottomDropText="释放加载更多"  bottomLoadingText="加载中···"
                            :bottom-all-loaded="allLoaded" :auto-fill="true" ref="loadmore">
                    <div class="clear-list" v-for="item in pageList">
                        <!--<router-link :to="{ name: 'ListContent', params: { id: item.id}}" class="clearBoth">-->
                            <div class="clear-link">
                                <img src="../assets/logo.png" alt="">
                                <!--<img :src="item.imgurl" alt="">-->
                            </div>
                            <div class="clear-cont">
                                <h3> {{ item.status }} </h3>
                                <p>  {{ item.cretime }} </p>
                            </div>
                        <!--</router-link>-->

                    </div>
                </v-loadmore>
            </div>
        </div>
    </div>
</template>
<style media="screen">
    .clear-list{
        width: 100%;
        height: 85px;
        background: #EBEEF5;
        margin: 10px 0;
        border-radius: 5px;
        overflow: hidden;
    }
    .clear-list h3{
        font-size: 16px;
        color: #606266;
    }
    .clear-list p{
        font-size: 13px;
        color: #909399;
        width: 76%;
    }
    .clear-cont{
        width: 70%;
        float: left;
        margin-left: 10px;
        height: 100%;
    }
    .clear-cont * {
        margin-top: 15px;
    }
    .clear-link{
        float:left;
        width:20%;
        margin-top: 14px;
        margin-left: 10px;
    }
    .clear-link img{
        display: block;
        width: 60px;
        margin: 0 auto;
    }
</style>
<script>
    import { Header,Loadmore,Toast } from 'mint-ui';
    export default {
        name: 'home',
        data() {
            return {
                id:'',
                searchCondition:{  //分页属性
                    pageNo:"1",
                    pageSize:"5"
                },

                pageList:[],
                allLoaded: false, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
                scrollMode:"auto" //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
            }
        },
        components:{
            Header,
            Toast,
            'v-loadmore':Loadmore
        },
        methods:{
            loadBottom() {
                // 上拉加载
                this.more();// 上拉触发的分页查询
                this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
            },
            loadPageList(){
                this.pageList = [
                    {
                        "id":"1",
                        "execobjId":"121",
                        "imgurl":"http://wwww.xx.xx.com/img/12313.jpg",
                        "status":"合格",
                        "cretime":"2018-06-19 18:12:34"
                    },
                    {
                        "id":"1",
                        "execobjId":"121",
                        "imgurl":"http://wwww.xx.xx.com/img/12313.jpg",
                        "status":"合格",
                        "cretime":"2018-06-19 18:12:34"
                    },
                    {
                        "id":"1",
                        "execobjId":"121",
                        "imgurl":"http://wwww.xx.xx.com/img/12313.jpg",
                        "status":"合格",
                        "cretime":"2018-06-19 18:12:34"
                    },
                    {
                        "id":"1",
                        "execobjId":"121",
                        "imgurl":"http://wwww.xx.xx.com/img/12313.jpg",
                        "status":"合格",
                        "cretime":"2018-06-19 18:12:34"
                    }
                ];

                if (this.pageList) return;
                //TODO::删去前面的

                let self = this;
                $.post( realmName + 'sf_zhzf/msys/cleanhist/list',{
                    execobjId   : self.id,
                    pageNum     : self.searchCondition.pageNo,
                    numPerPage  : self.searchCondition.pageSize
                },function(data,status){
                    if(data.statusCode == 200){
                        /*"list":[{"id":"1","execobjId":"121","imgurl":"http://wwww.xx.xx.com/img/12313.jpg",
                        "status":"合格","cretime":"2018-06-19 18:12:34"}]*/
                        self.pageList = data.list;

                    }else if(data.statusCode == 310){
                        //登录超时
                        localStorage.clear();
                        window.location.href = "login.html";
                    }else{
                        Toast(data.message);
                    }
                });
            },
            more(){

                this.pageList = this.pageList.concat([
                    {
                        "id":"1",
                        "execobjId":"121",
                        "imgurl":"http://wwww.xx.xx.com/img/12313.jpg",
                        "status":"合格",
                        "cretime":"2018-06-19 18:12:34"
                    },
                    {
                        "id":"1",
                        "execobjId":"121",
                        "imgurl":"http://wwww.xx.xx.com/img/12313.jpg",
                        "status":"合格",
                        "cretime":"2018-06-19 18:12:34"
                    },
                    {
                        "id":"1",
                        "execobjId":"121",
                        "imgurl":"http://wwww.xx.xx.com/img/12313.jpg",
                        "status":"合格",
                        "cretime":"2018-06-19 18:12:34"
                    },
                    {
                        "id":"1",
                        "execobjId":"121",
                        "imgurl":"http://wwww.xx.xx.com/img/12313.jpg",
                        "status":"合格",
                        "cretime":"2018-06-19 18:12:34"
                    }
                ]);

                return;

                //分页查询
                this.searchCondition.pageNo = parseInt(this.searchCondition.pageNo) + 1;

                let self = this;
                $.post(realmName + 'sf_zhzf/msys/cleanhist/list',{
                    execobjId   : self.id,
                    pageNum     :self.searchCondition.pageNo,
                    numPerPage  :self.searchCondition.pageSize
                },function(data,status){
                    if(data.statusCode == 200){
                        self.pageList = self.pageList.concat(data.list);
                    }else if(data.statusCode == 310){
                        localStorage.clear();
                        window.location.href = "login.html";
                    }else{
                        Toast(data.message);
                    }
                });
            },
        },
        mounted(){
            this.id = this.$route.params.id;
            this.loadPageList();
        }
    }
</script>
