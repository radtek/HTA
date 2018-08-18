<template>
    <div>
        <mt-header title="消息提醒">
            <router-link to="" slot="left">
                <mt-button icon="back" @click="$router.go(-1)">&nbsp;&nbsp;</mt-button>
            </router-link>
        </mt-header>
        <div style="padding: 0 5%">

            <div id="myScr" style="height: 85vh; overflow:scroll; background-color: rgba(0,0,0,0);">
                <v-loadmore :bottom-method="loadBottom"
                            bottomPullText="下拉加载" bottomDropText="释放加载更多"  bottomLoadingText="加载中···"
                            :bottom-all-loaded="allLoaded" :auto-fill="true" ref="loadmore">
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
    .mint-popup{
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
    import { Header,Loadmore,Toast } from 'mint-ui';
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
                let self = this;


                this.pageList = [
                    {
                        "id":"123",
                        "title":"油烟超期未清理",
                        "content":"XXXX餐馆，1超过10天未提交清理信息",
                        "msgStatus":"1",
                        "cretime":"2018-08-12 14:12:23"
                    },
                    {
                        "id":"123",
                        "title":"油烟超期未清理",
                        "content":"XXXX餐馆，2超过10天未提交清理信息",
                        "msgStatus":"1",
                        "cretime":"2018-08-12 14:12:23"
                    },
                    {
                        "id":"123",
                        "title":"油烟超期未清理",
                        "content":"XXXX餐馆，3超过10天未提交清理信息",
                        "msgStatus":"0",
                        "cretime":"2018-08-12 14:12:23"
                    },
                    {
                        "id":"123",
                        "title":"油烟超期未清理",
                        "content":"XXXX餐馆，4超过10天未提交清理信息",
                        "msgStatus":"1",
                        "cretime":"2018-08-12 14:12:23"
                    }
                ];

                if (this.pageList) return;
                //TODO::删去前面的

                $.post( realmName + 'sf_zhzf/msys/notice/list',{
                    pageNum     : self.searchCondition.pageNo,
                    numPerPage  : self.searchCondition.pageSize
                },function(data,status){
                    if(data.statusCode == 200){
                        self.pageList = data.list;
                        self.pageList.forEach(function (value) {
                            self.showPopups[value.id] = false;
                        });
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
                        "id":"123",
                        "title":"油烟超期未清理",
                        "content":"XXXX餐馆，超过10天未提交清理信息",
                        "msgStatus":"1",
                        "cretime":"2018-08-12 14:12:23"
                    },
                    {
                        "id":"123",
                        "title":"油烟超期未清理",
                        "content":"XXXX餐馆，超过10天未提交清理信息",
                        "msgStatus":"1",
                        "cretime":"2018-08-12 14:12:23"
                    },
                    {
                        "id":"123",
                        "title":"油烟超期未清理",
                        "content":"XXXX餐馆，超过10天未提交清理信息",
                        "msgStatus":"1",
                        "cretime":"2018-08-12 14:12:23"
                    },
                    {
                        "id":"123",
                        "title":"油烟超期未清理",
                        "content":"XXXX餐馆，超过10天未提交清理信息",
                        "msgStatus":"1",
                        "cretime":"2018-08-12 14:12:23"
                    }
                ]);

                return;

                //分页查询
                this.searchCondition.pageNo = parseInt(this.searchCondition.pageNo) + 1;

                let self = this;
                $.post(realmName + 'sf_zhzf/msys/notice/list',{
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
            show(index,id,msgStatus){
                let self = this;
                self.popupContent = self.pageList[index].content;
                self.showPopup = true;

                //TODO::记得删除
                self.pageList[index].msgStatus = self.read;
                return;

                //发消息
                if(msgStatus == self.unread){
                    $.post(realmName + 'sf_zhzf/msys/notice/reading',{
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
                    });
                }
            }
        },
        mounted(){
            this.loadPageList();
            check();
        }
    }
</script>
