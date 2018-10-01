<template>
    <div class="clearTest">
        <myHeard title="清洗记录" back="true"></myHeard>

        <p v-if="searchCondition.pageList.length == 0" style="width: 100%; text-align: center;font-size: 12px">暂无数据</p>

        <div class="lm">

            <div style="width: 100%;height: 40px;"></div>

            <Loadmore :bottom-method="loadBottom"
                      bottomPullText="下拉加载" bottomDropText="释放加载更多" bottomLoadingText="加载中···"
                      :bottom-all-loaded="searchCondition.allLoaded" :auto-fill="false" ref="loadmore">
                <div class="clear-list bmt" v-for="(item,index) in searchCondition.pageList">
                    <h3 class="time"> {{ item.cretime }} </h3>
                    <div class="item">
                        <mt-cell title="是否合格" :value="item.statusName"></mt-cell>
                    </div>
                    <a v-on:click="click(item.id,index,item.status)" style="display: block">
                        <div class="item">
                            <mt-cell title="查看照片详情" is-link></mt-cell>
                        </div>
                    </a>
                </div>
            </Loadmore>
            <div class="mt" style="width: 100%;height: 40px;"></div>
        </div>

        <a @click="$router.go(-1);">
            <div class="myReturn">
                返回
            </div>
        </a>

        <mt-popup
                v-model="showPopup" position="right">
            <div style="max-height: 70vh; overflow:scroll;">
                <div class="myBox box">
                    <a v-for="img in imgList" :key="img.id" @click="showDetail(img.urlPath)">
                        <img class="myImg" :src="img.urlPath" alt="">
                        <!--<img class="myImg" v-for="img in imgList" src="../assets/vip.gif" alt="">-->
                    </a>
                    <p v-if="imgList.length == 0">暂无图片</p>

                    <div :class="{ myempty: isReply }">
                        <el-button
                                style="position: fixed; bottom: 0px;right: 4.5%; margin-bottom: -20px"
                                type="primary"
                                @click="photoReply"
                                circle>
                            审
                        </el-button>
                    </div>

                </div>
            </div>
        </mt-popup>

        <mt-popup v-model="showAuditing" position="right">
            <div style="max-height: 70vh; overflow:scroll;">
                <div class="auditingBox box">

                    <el-form ref="form" label-width="80px">
                        <el-form-item label="是否合格">
                            <el-radio-group v-model="answer">
                                <el-radio label="2">是</el-radio>
                                <el-radio label="3">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="审批答复">
                            <el-input type="textarea" v-model="formal"></el-input>
                        </el-form-item>
                    </el-form>

                    <div style="width: 100%; margin-top: 10px">
                        <mt-button size="small" style="width: 100%" type="primary" @click="examine">提交
                        </mt-button>
                    </div>
                </div>
            </div>
        </mt-popup>

        <div class="landscape" v-if="showPhoto">
            <a class="aClose" @click="closePhoto"><img class="myClose" src="../../assets/img/round_close.png"
                                                       alt=""></a>
            <div class="myBoxDetail">
                <img :src="imgUrl" alt="">
            </div>
        </div>
    </div>
</template>

<script>
    import myHeard   from  "../customComponent/myHeard";
    import {Loadmore, Toast, Indicator} from 'mint-ui';

    export default {
        name: 'home',
        components: {
            myHeard,
            Toast,
            Loadmore,
            Indicator
        },
        data() {
            return {
                imgList: [],
                showPopup: false,
                showPhoto: false,
                showAuditing: false,
                id: '0',
                searchCondition: {  //分页属性
                    pageNo   : "1",
                    pageSize : "15",
                    total    : 0,
                    pageList : [],
                    allLoaded: false,//是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
                },
                scrollMode: "auto",   //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
                imgUrl: '',
                answer: '2',
                select: ['是', '否'],
                formal: '',
                clearId: '',
                clearIndex: '',
                isReply: false,    //false 展示审核按钮
            }
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
                $.get(getUrl('sf_zhzf/msys/cleanhist/list'), {
                    execobjId   : self.id,
                    pageNum     : search.pageNo,
                    numPerPage  : search.pageSize
                }, function (data, status) {
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
            click(clearId, index, status) {
                //审核需要
                this.clearId = clearId;
                this.clearIndex = index;
                this.checkR(status);

                this.showPopup = true;
                let self = this;
                $.get(getUrl('sf_zhzf/msys/cleanhist/photolst'), {
                    releId: clearId,
                }, function (data, status) {
                    if (data.statusCode == 200) {
                        self.imgList = data.list;
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
            reply(id, index) {
                this.showAuditing = true;
                this.clearId = id;
                this.answer = '2';
                this.clearIndex = index;
            },
            photoReply() {
                this.showAuditing = true;
                this.answer = '2';
            },
            examine() {
                Indicator.open();
                let self = this;

                $.get(getUrl('sf_zhzf/msys/cleanhist/ckverify'), {
                    id: self.clearId,
                    status: self.answer,
                    explain: self.formal,
                }, function (data, status) {
                    Indicator.close();
                    if (data.statusCode == 200) {
                        self.showAuditing = false;
                        (self.answer == 2) ? self.searchCondition.pageList[self.clearIndex].statusName = '合格' : self.searchCondition.pageList[self.clearIndex].statusName = '不合格';
                        self.searchCondition.pageList[self.clearIndex].status = self.answer;
                        self.checkR(self.answer);
                    } else if (data.statusCode == 310) {
                        window.location.href = "login.html";
                    } else {
                        Toast(data.message);
                    }
                }, 'json');
            },
            checkR(status) {
                if (status == 1) this.isReply = false;   // 1 为未审核，false显示
                else this.isReply = true;
            },
        },
        mounted() {
            this.id = this.$route.params.id;
            this.getData(false);
            check();
        }
    }
</script>

<style media="screen">
    .myempty {
        display: none;
    }

    .clearTest .mint-popup {
        width: 100%;
        background-color: transparent !important;
    }

    .box {
        width: 80%;
        margin: 0 auto;
        padding: 10px;
        border-radius: 5px;
    }

    .myBox {
        text-align: center;
        background: #EBEEF5;
    }

    .auditingBox {
        text-align: left;
        background: white;
    }

    .myImg {
        display: block;
        width: 100%;
        margin: 5px 0;
    }

    .clear-list {
        width: 100%;
        background-color: white;
        padding-top: 10px;
        border-radius: 5px;
        overflow: hidden;
    }

    .time {
        width: 100%;
        /*color: orange;*/
        text-align: center;
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

</style>