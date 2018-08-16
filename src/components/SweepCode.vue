<template>
    <div>
        <mt-header title="信息查询">
          <mt-button slot="right">
              <img slot="icon" src="../assets/shao.png" style="width: 23px;">
          </mt-button>
        </mt-header>
        <div class="" style="padding:0 7%;">
            <div class="demo-input-suffix">
                <el-input
                   placeholder="请输入内容"
                   prefix-icon="el-icon-search"
                   v-model="objName" style="width: 68%; float:left;">
                 </el-input>
                 <el-button type="primary" icon="el-icon-search" style="float:right;">搜索</el-button>
                 <div class="clear"></div>
            </div>

            <div style="height: 70vh; overflow:scroll;">
                <v-loadmore :bottom-method="loadBottom"
                            bottomPullText="下拉加载" bottomDropText="释放加载更多"  bottomLoadingText="加载中···"
                            :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
                    <ul class="list" v-for="item in pageList">
                        <li>
                            <router-link to="/ListContent">
                                <ul class="list" v-for="item in pageList">
                                    <li>
                                        <div>{{ item }}</div>
                                    </li>
                                </ul>
                            </router-link>
                        </li>
                    </ul>
                </v-loadmore>
            </div>
        </div>
    </div>
</template>
<style media="screen">
    .mint-tab-item-label{
        color: #409EFF;
    }
    .demo-input-suffix{
        margin: 20px 0;
        width: 100%;
    }
    .list{
        width: 100%;
        height: 85px;
        background: #EBEEF5;
        margin: 10px 0;
        border-radius: 5px;
        overflow: hidden;
    }
    .list h3{
        font-size: 16px;
        color: #606266;
        padding: 10px;
    }
    .list p{
        font-size: 13px;
        color: #909399;
        padding: 0 0 0 10px;
        width: 76%;
    }
    .cont{
        width: 85%;
        float: left;
    }
    .link{
        float:left;
        width:15%;
        margin:28px 0;
    }
    .link img{
        width: 26px;
    }
    .clear{
        content: '';
        clear: both;
    }
</style>
<script>
    import { Header,Tabbar, TabItem,Toast,Loadmore } from 'mint-ui';
    export default {
        name: 'home',
        data() {
            return {
                objName:'',
                title:'新乡海滨有限公司',
                data:'行政区划分：好几百的后视镜到哪里好几百的后视镜到哪里',
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
            Tabbar,
            TabItem,
            'v-loadmore':Loadmore
        },
        methods: {
            loadBottom:function() {
                // 上拉加载
                this.more();// 上拉触发的分页查询
                this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
            },
            loadPageList:function (){
                this.pageList = [
                    {name:'weiyalin'},
                    {name:'weiyalin'},
                    {name:'weiyalin'},
                    {name:'weiyalin'},
                    {name:'weiyalin'}
                ];

                if (this.pageList) return;
                //TODO::删去前面的

                let self = this;
                $.post(realmName + 'sf_zhzf/msys/enterprise/list',{
                    objName:self.objName,
                    // pageNum:self.searchCondition.pageNo,
                    // numPerPage:self.searchCondition.pageSize
                },function(data,status){
                    if(data.statusCode == 200){
                        self.pageList = data.list;
                    }else if(data.statusCode == 310){
                        window.location.href = "index.html";
                    }else{
                        Toast(data.message);
                    }
                });
            },
            more:function (){
                // 分页查询
                this.searchCondition.pageNo = parseInt(this.searchCondition.pageNo) + 1;

                //TODO::模糊分页查询路由
                let self = this;
                $.post(realmName + '',{
                    objName:self.objName,
                    pageNum:self.searchCondition.pageNo,
                    numPerPage:self.searchCondition.pageSize
                },function(data,status){
                    if(data.statusCode == 200){
                        self.pageList = this.pageList.concat(data.list);
                    }else if(data.statusCode == 310){
                        window.location.href = "index.html";
                    }else{
                        Toast(data.message);
                    }
                });
            },
        },
        mounted(){
          // this.loadPageList();
        },
    }
</script>
