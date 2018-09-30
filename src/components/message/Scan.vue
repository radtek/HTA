<template>
    <div>
        <myHeard back="true" title="扫描二维码"></myHeard>
        <div style="padding: 0;width: 100%; height: 100vh; background: rgba(0,149,147,0.04);overflow: hidden">
            <div id="bcid" style="top: 0px;left: 0; width: 100%;height: 100%; position: absolute;"></div>
        </div>

        <a @click="back();$router.go(-1);">
            <div class="myReturn">
                返回
            </div>
        </a>
    </div>
</template>

<script>
    import myHeard   from  "../customComponent/myHeard";
    import {Toast, Indicator} from 'mint-ui';
    export default {
        name: 'scan',
        components: {
            myHeard,
            Toast,
            Indicator
        },
        data() {
            return {
                execobjId: null
            }
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
                    self.$router.push({name: 'ListContent', params: {id: self.execobjId,data : '无'}});

                    self.back();

                };
                scan.start();
            },
            closeScan() {
                scan && scan.close();
            },
            back() {
                this.closeScan();
            }
        },
        mounted() {
            this.startRecognize();
        },
    }
</script>

<style>

</style>