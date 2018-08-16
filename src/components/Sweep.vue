<template>
    <div>
        <mt-header title="扫描二维码">
            <router-link to="/sweep" slot="left">
                <mt-button slot="left" icon="back" >
                    <div style="width: 23px;"></div>
                </mt-button>
            </router-link>
        </mt-header>
        <div id="bcid" style="height: 100vh; width: 100%; background-color: #3a8ee6">

        </div>
    </div>
</template>

<script>
    import { Header,Toast } from 'mint-ui';
    export default {
        name: 'sweep',
        data() {
            return {
                scan     :null,
                execobjId:null
            }
        },
        components:{
            Header,
            Toast
        },
        methods: {
            onmarked( type, result ) {

                var text = '未知: ';
                switch(type){
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
                this.execobjId = result;

                $.post( realmName + 'sf_zhzf/msys/enterprise/qrcode',{
                    code : result
                },function(data,status){
                    //成功直接返回企业信息，失败时statusCode为300/310
                    if(data.statusCode){    //失败
                        Toast(data.message);
                    }else{                  //成功

                    }
                });
            },
            startRecognize() {
                scan == null && scan.close();
                scan = new plus.barcode.Barcode('bcid');
                scan.onmarked = onmarked;
                scan.start();
            },
            closeScan() {
                scan.close();
            },
        },
        mounted(){
            // this.startRecognize();
        },
    }
</script>