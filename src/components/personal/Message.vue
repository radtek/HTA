<template>
    <div>
        <myHeader back=true title="消息"></myHeader>
        <div>
            <div id="myScr"  style="height: 85vh; overflow:scroll; background-color: rgba(0,0,0,0);">
                <v-loadmore :bottom-method="loadBottom"
                            bottomPullText="下拉加载" bottomDropText="释放加载更多" bottomLoadingText="加载中···"
                            :bottom-all-loaded="searchCondition.allLoaded" :auto-fill="false" ref="loadmore">
                    <div class="message-list" v-for="(item,index) in searchCondition.pageList">
                        <a @click="show(index,item.id,item.msgStatus,item.noticeId)"
                        style="height: 100%;width: 100%;display: block">
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
                                <div class="massageCon">
                                    <div class="attachment" v-if="attachment[index] == true">
                                        <i class="fa fa-paperclip" aria-hidden="true"></i>
                                        附件
                                    </div>
                                    <div class="dates">
                                        {{ item.cretime }}
                                    </div>
                                </div>
                            </el-badge>
                        </a>
                    </div>
                    <div v-if="searchCondition.pageList.length >= searchCondition.total" class="contentEnd">
                        ————我是有底线的————
                    </div>
                </v-loadmore>
            </div>
            <div class="test">
                <mt-popup
                        v-model="showPopup" position="right">
                    <div class="msg" style="max-height: 70vh; overflow:scroll;">
                        <div class="myBox">
                            <div style="padding: 10px;background-color: white">
                                <p class="content">{{ popupContent }}</p>
                            </div>
                            <div v-for="item in appendixList" :key="item.id">
                                <a v-if="item.fileType == 2" @click="createDownload(item.urlPath,item.fileName)">
                                    <mt-cell :title="item.fileName">
                                        <img v-if="item.iconType == word" slot="icon"
                                             src="../../assets/img/word.png" width="24" height="24">
                                        <img v-else-if="item.iconType == excel" slot="icon"
                                             src="../../assets/img/excel.png" width="24" height="24">
                                        <img v-else-if="item.iconType == pdf" slot="icon"
                                             src="../../assets/img/pdf.png" width="24" height="24">
                                        <img v-else-if="item.iconType == unKnow" slot="icon"
                                             src="../../assets/img/text.png" width="24" height="24">
                                        <span>
                                            <img src="../../assets/img/down.png" width="24" height="24">
                                        </span>
                                    </mt-cell>
                                </a>
                                <div v-else style="padding: 10px 5px">
                                    <a style="width: 100%" @click="showDetail(item.urlPath)">
                                        <img class="appendImg" :src="item.urlPath" alt="">
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </mt-popup>
                <mt-popup
                        v-model="isShowDown"
                        position="right"
                        popup-transition="popup-fade">
                    <div class="downBox">
                        <div class="innerBox">
                            <mt-progress :value="downValue">
                                <div slot="end">{{ downValue }}%</div>
                            </mt-progress>

                            <mt-button plain type="primary" style="float: left;margin: 10px 0 0 10px;font-size:14px"
                                       @click="suspend">{{ butTest }}
                            </mt-button>
                            <mt-button plain type="danger" style="float: right;margin: 10px 10px 0 0;font-size:14px"
                                       @click="canl">取消
                            </mt-button>
                        </div>
                    </div>
                </mt-popup>
            </div>
            <div class="landscape" v-if="showPhoto">
                <a class="aClose" @click="closePhoto"><img class="myClose" src="../../assets/img/round_close.png" alt=""></a>
                <div class="myBoxDetail">
                    <img :src="imgUrl" alt="">
                </div>
            </div>
        </div>
        <a @click="$router.go(-1);">
            <div class="myReturn">
                返回
            </div>
        </a>
    </div>
</template>
<style>
    .contentEnd{
        color: darkgray;
        font-size: 13px;
        text-align: center;
        margin-bottom: 10px;
    }

    #myScr{
        margin-top: 55px;
    }

    .btn{
        position: fixed;
        bottom: 0px;
        color: rgb(0,149,147);
    }

    .conform {
        line-height: 30px;
        color: #303133;
        font-size: 15px;
        margin: 0;
        padding: 10px 20px 0;
        height: 60px;
        overflow: hidden
    }

    .massageCon{
        width: 100%;
    }

    .attachment{
        width: 30%;
        float: left;
        margin-left: 20px;
        font-size: 12px;
        color: rgb(0,149,147);
    }

    .dates {
        width: 50%;
        text-align: right;
        color: #909399;
        font-size: 12px;
        padding: 0 26px 10px;
        float: right;
    }

    .el-badge {
        width: 100%;
        background: #fff;
        margin-bottom: 20px;
    }

    .test .mint-popup {
        width: 100%;
        background-color: rgba(0, 0, 0, 0) !important;
    }

    .msg .myBox {
        width: 70%;
        margin: 0 auto;
        padding: 20px;
        background: #fff;
        /* border: 2px solid rgba(0, 0, 0, 0.2); */
        border-radius: 5px;
        overflow: hidden;
        text-align: left !important;
    }

    .message-list {
        height: 95px;
        width: 100%;
        margin-bottom: 15px;
    }

    .message-list h3 {
        font-size: 16px;
    }

    .mint-cell {
        /*background-color: rgba(0, 0, 0, 0) !important;*/
    }

    .appendImg {
        width: 100%;
    }

    .landscape {
        height: 100vh;
        width: 100vw;
        overflow: hidden;
        background-color: black;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 3000;
    }

    .aClose {
        position: fixed;
        top: 0;
        right: 0;
        z-index: 3001;
    }

    .myClose {
        width: 40px;
        height: 40px;
    }

    .mt-progress {
        margin: 0 10px !important;
    }

    .downBox {
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.2);
        text-align: left;
    }

    .innerBox {
        position: fixed;
        width: 80%;
        height: 100px;
        margin-top: -50px;
        top: 50%;
        left: 6.8%;
        padding: 10px;
        border: 2px solid rgba(0, 0, 0, 0);
        border-radius: 5px;
        background-color: rgba(255, 255, 255, 1);
    }

    .confirmButton {
        color: black;
    }
</style>
<script>
    import myHeader from '../customComponent/myHeard.vue';
    import {getRequest} from "../../assets/js/public";
    import {Header, Loadmore, Toast, Indicator, Cell, MessageBox} from 'mint-ui';

    export default {
        name: 'home',
        data() {
            return {
                unread: 1, //未读为1
                read: 2, //已读为2
                showPopup: false,
                popupContent: '',

                searchCondition: {  //分页属性
                    pageNo: "1",
                    pageSize: "15",
                    total: 0,
                    pageList: [],
                    allLoaded: false, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
                },
                scrollMode: "auto", //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动

                appendixList: '',
                showPhoto: false,//是否显示图片放大缩放
                imgUrl: '',
                isShowDown: false,//是否显示下载
                downValue: 0,
                isContinue: false,//是否是继续按钮 false为暂停，true为继续
                butTest: '暂停',
                word: 1,
                excel: 2,
                pdf: 3,
                unKnow: 4,
                attachment: [],
            }
        },
        components: {
            Header,
            Toast,
            'v-loadmore': Loadmore,
            Indicator,
            Cell,
            MessageBox,
            myHeader
        },
        methods: {
            loadBottom() {
                // 上拉加载
                this.getData(true);// 上拉触发的分页查询
                this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
            },
            getData:function (isMore) {
                let search = this.searchCondition;
                search.pageNo = isMore ? parseInt(search.pageNo) + 1 : parseInt(search.pageNo);

                getRequest('sf_zhzf/msys/notice/list',{
                    pageNum     : search.pageNo,
                    numPerPage  : search.pageSize
                },function (data) {
                    search.pageList = data.list;
                    search.total = data.totalCount;
                    search.pageList.length >= search.total && (search.allLoaded = true);
                });
            },
            show(index, id, msgStatus, noticeId) {
                let self = this;
                self.popupContent = self.searchCondition.pageList[index].content;
                self.showPopup = true;

                //如果是未读的消息则更改消息状态
                if (msgStatus == self.unread) {
                    getRequest('sf_zhzf/msys/notice/reading',{
                        id: id
                    },function (data) {
                        self.searchCondition.pageList[index].msgStatus = self.read;
                    });
                }
               self.getAttachment(index,noticeId);
            },
            getAttachment(index,noticeId){
                //获得附件
                let self = this;
                getRequest('sf_zhzf/msys/notice/attachfile',{
                    noticeId: noticeId
                },function (data) {
                    if(data.list.length == 1) self.attachment[index] = true;
                    self.appendixList = data.list;
                    self.appendixList.forEach(function (value, index, arr) {
                        if (value.fileType == 2) {
                            let exe = value.fileName.split('.');
                            switch (exe[exe.length - 1].toLowerCase()) {
                                case 'docx':
                                case 'doc' :
                                    arr[index].iconType = self.word;
                                    break;
                                case 'xls' :
                                case 'xlsx':
                                    arr[index].iconType = self.excel;
                                    break;
                                case 'pdf' :
                                    arr[index].iconType = self.pdf;
                                    break;
                                default:
                                    arr[index].iconType = self.unKnow;
                                    break;
                            }
                        }
                    });
                });
            },
            showDetail(path) {
                this.showPhoto = true;
                this.imgUrl = path;
                let myBoxDetail = $(".myBoxDetail");
                let checkMyBox = setInterval(function () {
                    if (myBoxDetail) {
                        new window.PinchZoom.default(document.querySelector('div.myBoxDetail'), {});
                        clearTimeout(checkMyBox);
                    }
                }, 200);
            },
            closePhoto() {
                this.showPhoto = false;
            },
            createDownload(url, name) {

                this.isShowDown = true;

                let self = this;
                dtask = plus.downloader.createDownload(url, {}, function (d, status) {
                    // 下载完成
                    if (status == 200) {
                        self.isShowDown = false;
                        self.downValue = 0;

                        MessageBox.confirm('', {
                            message: name,
                            title: '下载成功',
                            showConfirmButton: true,
                            showCancelButton: true,
                            confirmButtonText: '确定',
                            cancelButtonText: '打开'
                        }).then(action => {

                        }).catch(err => {
                            if (err != 'cancel') return;
                            plus.runtime.openFile(d.filename);
                        });

                    } else {
                        Toast("下载失败: " + status);
                    }
                });
                dtask.addEventListener("statechanged", function (d, status) {
                    self.downValue = parseInt((d.downloadedSize / d.totalSize) * 100);
                    if (isNaN(self.downValue)) self.downValue = 0;
                }, false);
                dtask.start();
            },
            suspend() {
                if (dtask == null) return;
                if (this.isContinue) {
                    dtask.resume();
                    this.isContinue = false;
                    this.butTest = '暂停';
                } else {
                    dtask.pause();
                    this.isContinue = true;
                    this.butTest = '继续';
                }
            },
            canl() {
                if (dtask == null) return;
                dtask.abort();
                this.isShowDown = false;
                this.downValue = 0;
            }
        },
        mounted() {
            this.getData(false);
            check();
        }
    }
</script>