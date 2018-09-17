<template>
    <div>
        <mt-header fixed title="扫描二维码">
            <router-link to="" slot="left">
                <mt-button @click="back(); $router.go(-1);" icon="back">&nbsp;&nbsp;</mt-button>
            </router-link>
        </mt-header>
        <div style="padding: 0;width: 100%; height: 100vh; background: rgba(38,166,255,0.1);overflow: hidden">
            <div id="bcid" style="top: 0px;left: 0; width: 100%;height: 100%; position: absolute;"></div>
        </div>

        <div class="my-mint-tabbar">
            <a class="my-tabbar-item" style="width: 100%;height: 100%">
                <a @click="back(); $router.go(-1);">
                    <div class="myIcon">
                        <img src="../assets/pull_left.png" alt="">
                    </div>
                    <div class="myMsg">
                        返回
                    </div>
                </a>
            </a>
        </div>
    </div>
</template>
<style>
    .my-mint-tabbar {
        display: flex;
        right: 0;
        bottom: 0;
        left: 0;
        position: absolute;
        text-align: center;
        background-color: white;
    }

    .my-tabbar-item {
        display: block;
        padding: 7px 0;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        text-decoration: none;
    }

    .my-tabbar-item a {
        display: block;
        padding: 7px 0;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        text-decoration: none;
    }

    .myIcon {
        width: 24px;
        height: 24px;
        margin: 0 auto 5px;
    }

    .myIcon img {
        display: block;
        width: 100%;
        height: 100%;
    }

    .myMsg {
        font-size: 12px;
        line-height: 1;
        color: #26a2ff;
    }
</style>
<script>
    import {Header, Toast} from 'mint-ui';

    export default {
        name: 'sweep',
        data() {
            return {
                execobjId: null
            }
        },
        components: {
            Header,
            Toast
        },
        methods: {
            startRecognize() {
                let self = this;
                scan != null && scan.close();
                scan = new plus.barcode.Barcode('bcid');
                scan.background = "rgba(38,166,255,0.1)";
                scan.onmarked = function (type, result) {
                    var text = '未知: ';
                    switch (type) {
                        case plus.barcode.QR:
                            text = 'QR: ';
                            break;
                        case plus.barcode.EAN13:
                            text = 'EAN13: ';
                            break;
                        case plus.barcode.EAN8:
                            text = 'EAN8: ';
                            break;
                    }

                    self.execobjId = result.split('?code=')[1];
                    self.$router.push({name: 'ListContent', params: {id: self.execobjId}});

                    self.back();

                };
                scan.start();
            },
            closeScan() {
                scan && scan.close();
            },
            back() {
                $(".mint-tabbar").css({
                    "display": "flex"
                });

                this.closeScan();
            }
        },
        mounted() {
            $(".mint-tabbar").css({
                "display": "none"
            });

            this.startRecognize();
        },
    }
</script>