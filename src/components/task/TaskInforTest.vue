<template>
    <div>
        <div style="width: 100%;height: 40px;"><myHeard back="true" title="任务详情"></myHeard></div>

        <div class="bmt">
            <div class="item"><mt-cell title="任务名称" :value="taskInfo.taskName"></mt-cell></div>
            <div class="item"><mt-cell title="主要内容" :value="taskInfo.content"></mt-cell></div>
            <div class="item"><mt-cell title="派发人" :value="taskInfo.publisher"></mt-cell></div>
            <div class="item"><mt-cell title="派发时间" :value="taskInfo.updtime"></mt-cell></div>
            <div class="item"><mt-cell title="完成时限" :value="taskInfo.limitDate"></mt-cell></div>
            <div class="item"><mt-cell title="任务状态" :value="taskInfo.statusName"></mt-cell></div>
        </div>

        <div class="bmt">
            <div class="item">
                <mt-cell title="派发附件" v-if="filelst.length == 0" value="无"></mt-cell>
                <mt-cell title="派发附件" v-else></mt-cell>
            </div>

            <div class="list" v-for="(item,index) in files" :key="index" @click="createDownload(item.urlPath,item.fileName)">
                <img v-if="item.iconType == word" class="list-img"
                     src="../../assets/img/word.png">
                <img v-else-if="item.iconType == excel" class="list-img"
                     src="../../assets/img/excel.png">
                <img v-else-if="item.iconType == pdf" class="list-img"
                     src="../../assets/img/pdf.png">
                <img v-else-if="item.iconType == unKnow" class="list-img"
                     src="../../assets/img/text.png">
                <div class="text">
                    <p>{{ item.remark}}</p>
                    <p>{{ item.fileName}}</p>
                </div>
                <img class="list-down" src="../../assets/img/load.png" alt="无法加载">
            </div>
            <div class="imgs">
                <img v-for="(item,index) in imgs" :src="item.urlPath" alt="" :key="index"
                     @click="showDetail(item.urlPath)">
            </div>
        </div>

        <div class="bmt">
            <div class="item">
                <mt-cell title="流转记录" ></mt-cell>
            </div>

            <div class="flow">
                <div v-for="(task,index) in taskFlow" class="taskFlow">
                    <i class="fa fa-circle taskIcon" aria-hidden="true"></i>
                    <span class="taskBy">{{task.receivedId}}</span>

                    <span v-if="index == (taskFlow.length-1)" class="taskStatus">{{task.status}}</span>
                    <span v-else>{{task.status}}</span>

                    <span class="taskTime">{{task.updtime}}</span>
                </div>

                <div id="line"></div>
            </div>
        </div>

        <mt-popup
                v-model="isShowDown"
                position="right"
                popup-transition="popup-fade">
            <div class="downBox">
                <div class="innerBox">
                    <mt-progress :value="downValue">
                        <div slot="end">{{ downValue }}%</div>
                    </mt-progress>

                    <mt-button plain type="primary" style="float: left;margin: 10px 0 0 10px;width: 30%"
                               @click="suspend">{{ butTest }}
                    </mt-button>
                    <mt-button plain type="danger" style="float: right;margin: 10px 10px 0 0;width: 30%"
                               @click="canl">取消
                    </mt-button>
                </div>
            </div>
        </mt-popup>

        <div class="landscape" v-if="showPhoto">
            <a class="aClose" @click="closePhoto">
                <img class="myClose" src="../../assets/img/new/round_close.png" alt="">
            </a>
            <div class="myBoxDetail">
                <img :src="imgUrl" alt="图片加载失败">
                <!--<img class="appendImg" src="../assets/vip.gif" alt="">-->
            </div>
        </div>

        <div class="bmt" style="width: 100%; height: 40px"></div>
        <div v-if="status == 1" class="myReturn">
            <el-col :span="8"><a class="link" @click="accept">接受</a></el-col>
            <el-col :span="8"><a class="link" @click="transfer ">转派</a></el-col>
            <el-col :span="8"><a class="link" @click="$router.go(-1);">返回</a></el-col>
        </div>
        <div v-else-if="status == 2"class="myReturn">
            <el-col :span="12"><a class="link" @click="dealWith">办理</a></el-col>
            <el-col :span="12"><a class="link" @click="$router.go(-1);">返回</a></el-col>
        </div>
        <a v-else @click="$router.go(-1);">
            <div class="myReturn">
                返回
            </div>
        </a>

        <mt-popup
                v-model="showTransferPhoto"
                position="bottom">
            <div class="transferPhoto">
                <mt-picker :slots="slots" showToolbar @change="onValuesChange">
                    <el-col class="transToolbar" :span="12"><a @click="showTransferPhoto = false">取消</a></el-col>
                    <el-col class="transToolbar" :span="12"><a @click="transferConfirm">确定</a></el-col>
                </mt-picker>
            </div>
        </mt-popup>

    </div>
</template>

<script>
    import myHeard   from  "../customComponent/myHeard";
    import {Toast, Indicator, MessageBox } from 'mint-ui';
    export default {
        components:{
            myHeard,
            Toast,
            Indicator,
            MessageBox
        },
        data() {
            return {
                id : 0,
                filelst  : [],
                files    : [],
                imgs     : [],

                taskFlow : [],
                taskInfo : {},

                showPhoto   : false,//是否显示图片放大缩放
                imgUrl      : '',
                isShowDown  : false,//是否显示下载
                downValue   : 0,
                isContinue  : false,//是否是继续按钮 false为暂停，true为继续
                butTest     : '暂停',

                word    : 1,
                excel   : 2,
                pdf     : 3,
                unKnow  : 4,

                status  : 1,

                slots: [
                    {
                        values: ['weiyalin1','weiyalin2','weiyalin3','weiyalin4','weiyalin5']
                    },
                ],
                showTransferPhoto : false,
                transferMan : '',
            };
        },
        methods: {
            onValuesChange:function (picker, values) {
                this.transferMan = values[0];
            },
            getData:function () {
                let self = this;
                $.get(getUrl('sf_zhzf/msys/task/taskinfo'), {
                    id  : self.id,
                }, function (data, status) {
                    Indicator.close();
                    if (data.statusCode == 200) {
                        console.log(data);
                        self.filelst  = data.filelst;
                        self.taskFlow = data.taskFlow;
                        self.taskInfo = data.taskInfo;

                        self.status = data.taskInfo.status;

                        self.filelst.forEach(function (value, index, arr) {
                            let exe = value.fileName.split('.');
                            switch (exe[exe.length - 1].toLowerCase()) {
                                case 'docx':
                                case 'doc' :
                                    arr[index].iconType = self.word;
                                    self.files.push(arr[index]);
                                    break;
                                case 'xls' :
                                case 'xlsx':
                                    arr[index].iconType = self.excel;
                                    self.files.push(arr[index]);
                                    break;
                                case 'pdf' :
                                    arr[index].iconType = self.pdf;
                                    self.files.push(arr[index]);
                                    break;
                                default:
                                    self.imgs.push(arr[index]);
                                    break;
                            }
                        });

                        let len = (self.taskFlow.length-1)*40;
                        $("#line").css("height",len+"px");

                    } else if (data.statusCode == 310) {
                        //登录超时
                        window.location.href = "login.html";
                    } else {
                        Toast(data.message);
                    }
                }, 'json');
            },
            showDetail:function (path) {
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
            closePhoto:function ()  {
                this.showPhoto = false;
            },
            createDownload:function (url, name)  {

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
            suspend:function () {
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
            canl:function () {
                if (dtask == null) return;
                dtask.abort();
                this.isShowDown = false;
                this.downValue = 0;
            },
            dealWith:function () {
                this.$router.push({name: 'TaskDealWith', params: { id : this.id }});
            },
            accept:function () {
                let self = this;
                $.get(getUrl('sf_zhzf/msys/task/accept'), {
                    id  : self.id,
                }, function (data, status) {
                    Indicator.close();
                    if (data.statusCode == 200) {
                        Toast('成功接受该任务');
                        self.$router.push({name: 'TaskInfor', params: { id : this.id }});
                    } else if (data.statusCode == 310) {
                        window.location.href = "login.html";
                    } else {
                        Toast(data.message);
                    }
                }, 'json');
            },
            transfer:function () {
                this.showTransferPhoto = true;
            },
            transferConfirm:function () {
                this.showTransferPhoto = false;

                //TODO::转派
                console.log(this.transferMan);
            }
        },
        mounted() {
            this.id = this.$route.params.id;
            this.getData();
        },
    }
</script>

<style scoped>
    .list{
        height: 80px;
        background-color: white;
        margin-bottom: 1px;
        position: relative;
    }
    .list-img{
        width: 60px;
        height: 60px;
        position: absolute;
        top: 50%;
        margin-top: -30px;
        left: 20px;
    }
    .text{
        padding-top: 20px;
        margin-left: 100px;
        color: #AAAAAA;
        font-size: 14px;
    }
    .text p{
        max-width: 70%;
        height: 20px;
        line-height: 20px;
        overflow: hidden;
    }
    .list-down{
        position: absolute;
        width: 40px;
        height: 30px;
        top: 50%;
        margin-top: -15px;
        right: 20px;
    }
    .imgs{
        background-color: white;
    }
    .imgs img{
        width: 20%;
        height: 20%;
        margin: 10px 2.5%;
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
        border: 2px solid rgba(0, 0, 0, 0.2);
        border-radius: 5px;
        background-color: rgba(255, 255, 255, 1);
    }
    .flow{
        position: relative;
    }
    #line{
        position: absolute;
        top: 20px;
        left: 25px;
        width: 0px;
        border-left: 1px solid rgb(0,149,147);
    }
    .taskFlow{
        background-color: white;
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
        font-size: 12px;
    }
    .taskFlow span{
        padding: 0 10px;
    }
    .taskIcon,.taskStatus{
        color: rgb(0,149,147);
    }
    .taskTime{
        color: #aaa;
    }
    .transferPhoto{
        width: 100vw;
    }
    .transToolbar{
        height: 40px;
        line-height: 40px;
        text-align: center;
    }
    .transToolbar a{
        display: inline-block;
        width: 100%;
        height: 100%;
        color: rgb(0,149,147);
    }
</style>