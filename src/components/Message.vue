<template>
    <div>
        <mt-header title="消息提醒">
            <router-link to="" slot="left">
                <mt-button icon="back" @click="$router.go(-1)">&nbsp;&nbsp;</mt-button>
            </router-link>
        </mt-header>
        <div style="padding: 0 5%">

            <div id="myScr" class="test" style="height: 85vh; overflow:scroll; background-color: rgba(0,0,0,0);">
                <v-loadmore :bottom-method="loadBottom"
                            bottomPullText="下拉加载" bottomDropText="释放加载更多"  bottomLoadingText="加载中···"
                            :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
                    <div class="message-list" v-for="(item,index) in pageList">
                        <a v-on:click="show(index,item.id,item.msgStatus)" style="height: 100%;width: 100%;display: block">
                            <el-badge v-if="item.msgStatus == unread" is-dot class="item">
                                <div class="conform">
                                    <h3> {{ item.title }} </h3>
                                    {{ item.content }}
                                </div>
                                <div class="dates">
                                    {{ item.cretime }}
                                </div>
                            </el-badge>

                            <el-badge v-else class="item">
                                <div class="conform">
                                    <h3> {{ item.title }} </h3>
                                    {{ item.content }}
                                </div>
                                <div class="dates">
                                    {{ item.cretime }}
                                </div>
                            </el-badge>
                        </a>
                    </div>
                    <mt-button v-if="pageList.length >= total" type="primary" style="width: 100%;margin: 10px 0" @click="$router.go(-1);">返回</mt-button>
                </v-loadmore>
                <mt-popup
                    v-model="showPopup" position="right">
                    <div style="max-height: 60vh; overflow:scroll;">
                        <div class="myBox">
                        {{ popupContent }}
                        </div>
                    </div>
                </mt-popup>
            </div>
        </div>
    </div>
</template>
<style>

    .conform{
        line-height: 30px;
        color: #303133;
        font-size: 15px;
        margin: 0;
        padding: 5px;

        height: 60px;
        overflow: hidden
    }
    .dates{
        text-align: right;
        color: #909399;
        font-size: 12px;
        padding: 0 5px 5px 0;
    }
    .el-badge{
        width: 100%;
        background: #EBEEF5;
        margin-bottom: 20px;
        border-radius: 5px;
    }
    .test .mint-popup{
        width: 100%;
        background-color: rgba(0,0,0,0) !important;
    }
    .myBox{
        width: 80%;
        margin:0 auto;
        padding: 10px;
        background: #EBEEF5;
        border: 2px solid rgba(0,0,0,0.2);
        border-radius: 5px;
    }

    .message-list{
        height: 95px;
        width: 96%;
        background: #EBEEF5;
        margin: 15px 2%;
        border-radius: 5px;
    }
    .message-list h3{
        font-size: 16px;
    }

</style>
<script>
    import { Header,Loadmore,Toast,Indicator } from 'mint-ui';
    export default {
        name: 'home',
        data() {
            return {
                unread:1, //未读为1
                read:2, //已读为2
                showPopup:false,
                popupContent:'',
                searchCondition:{  //分页属性
                    pageNo:"1",
                    pageSize:"15"
                },
                total:0,
                pageList:[],
                allLoaded: false, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
                scrollMode:"auto" //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
            }
        },
        components:{
            Header,
            Toast,
            'v-loadmore':Loadmore,
            Indicator
        },
        methods:{
            loadBottom() {
                // 上拉加载
                this.more();// 上拉触发的分页查询
                this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
            },
            loadPageList(){
                Indicator.open();
                let self = this;
                $.get( getUrl('sf_zhzf/msys/notice/list'),{
                    pageNum     : self.searchCondition.pageNo,
                    numPerPage  : self.searchCondition.pageSize
                },function(data,status){
                    Indicator.close();
                    if(data.statusCode == 200){
                        self.pageList = data.list;
                        self.total = data.totalCount;
                        self.checkOver();
                    }else if(data.statusCode == 310){
                        localStorage.clear();
                        window.location.href = "login.html";
                    }else{
                        Toast(data.message);
                    }
                },'json');
            },
            more(){
                //分页查询
                this.searchCondition.pageNo = parseInt(this.searchCondition.pageNo) + 1;

                let self = this;
                $.get(getUrl('sf_zhzf/msys/notice/list'),{
                    pageNum     :self.searchCondition.pageNo,
                    numPerPage  :self.searchCondition.pageSize
                },function(data,status){
                    if(data.statusCode == 200){
                        self.pageList = self.pageList.concat(data.list);
                        self.total = data.totalCount;
                        self.checkOver();
                    }else if(data.statusCode == 310){
                        localStorage.clear();
                        window.location.href = "login.html";
                    }else{
                        Toast(data.message);
                    }
                },'json');
            },
            show(index,id,msgStatus){
                let self = this;
                self.popupContent = self.pageList[index].content;
                self.showPopup = true;

                //如果是未读的消息则更改消息状态
                if(msgStatus == self.unread){
                    $.get(getUrl('sf_zhzf/msys/notice/reading'),{
                        id : id
                    },function(data,status){
                        if(data.statusCode == 200){

                            self.pageList[index].msgStatus = self.read;

                        }else if(data.statusCode == 310){
                            localStorage.clear();
                            window.location.href = "login.html";
                        }else{
                            Toast(data.message);
                        }
                    },'json');
                }
            },
            checkOver(){
                this.pageList.length >= this.total && (this.allLoaded = true);
            },
        },
        mounted(){
            this.loadPageList();
            check();
        }
    }
</script>
