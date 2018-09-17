<template>
    <div>
        <mt-header title="企业信息附件">
            <router-link to="" slot="left">
                <mt-button icon="back" @click="$router.go(-1);"></mt-button>
            </router-link>
        </mt-header>
        <div style="padding:0 7%;">
            <div id="myScr" style="height: 85vh; overflow:scroll;">
                <p style="text-align: center" v-if="appendixList.length == 0">暂无附件</p>

                <div v-for="item in appendixList" :key="item.id">
                    <a v-if="item.fileType == 2" @click="createDownload(item.urlPath,item.fileName)">
                        <div class="myCell">
                            <img v-if="item.iconType == word" class="cellIcon" src="../assets/word.png">
                            <img v-else-if="item.iconType == excel" class="cellIcon" src="../assets/excel.png">
                            <img v-else-if="item.iconType == pdf" class="cellIcon" src="../assets/pdf.png">
                            <img v-else-if="item.iconType == unKnow" class="cellIcon" src="../assets/text.png">
                            <div class="cellTest">
                                <span class="remake">{{ item.remark }}</span>
                                <span class="fileName">{{ item.fileName }}</span>
                            </div>
                            <img class="downIcon" src="../assets/down.png">
                        </div>
                    </a>
                    <a v-else @click="showDetail(item.urlPath)">
                        <div class="myCell">
                            <img class="cellIcon" :src="item.urlPath">
                            <!--<img class="cellIcon" src="../assets/vip.gif">-->
                            <div class="cellTest">
                                <span class="remake">{{ item.remark }}</span>
                                <span class="fileName">{{ item.fileName }}</span>
                            </div>
                            <img class="downIcon" src="../assets/return.png">
                        </div>
                    </a>
                </div>
                <mt-button type="primary" style="width: 100%;margin: 10px 0" @click="$router.go(-1);">返回</mt-button>

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
                    <a class="aClose" @click="closePhoto"><img class="myClose" src="../assets/round_close.png"
                                                               alt=""></a>
                    <div class="myBoxDetail">
                        <img :src="imgUrl" alt="图片加载失败">
                        <!--<img class="appendImg" src="../assets/vip.gif" alt="">-->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {Header, Toast, Indicator} from 'mint-ui';

    export default {
        name: 'append',
        data() {
            return {
                id: '',
                appendixList: [],

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
            }
        },
        components: {
            Header,
            Toast,
            Indicator
        },
        methods: {
            getData() {

                Indicator.open();
                let self = this;
                $.get(getUrl('sf_zhzf/msys/enterprise/attachfile'), {
                    code: self.id
                }, function (data, status) {
                    Indicator.close();
                    if (data.statusCode == 200) {
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
                    } else if (data.statusCode == 310) {
                        window.location.href = "login.html";
                    } else {
                        Toast(data.message);
                    }
                }, 'json');
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
            this.id = this.$route.params.id;
            this.getData();
        }
    }
</script>

<style scoped>
    .myCell {
        width: 100%;
        overflow: hidden;
        margin-top: 10px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.5);
        position: relative;
        min-height: 100px;
    }

    .cellIcon {
        width: 80px;
        height: 80px;
        position: absolute;
        top: 50%;
        left: 0;
        margin-top: -40px;
    }

    .cellTest {
        max-width: 60%;
        margin-left: 90px;
        margin-top: 10px;
    }

    .remake {
        padding-top: 10px;
        display: block;
        font-size: 18px;
        overflow: hidden;
    }

    .fileName {
        padding-top: 20px;
        padding-bottom: 10px;
        display: block;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.6);
    }

    .downIcon {
        width: 30px;
        height: 30px;
        position: absolute;
        top: 50%;
        margin-top: -15px;
        right: 0;
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
        border: 2px solid rgba(0, 0, 0, 0.2);
        border-radius: 5px;
        background-color: rgba(255, 255, 255, 1);
    }

    .confirmButton {
        color: black;
    }
</style>