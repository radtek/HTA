<template>
    <div>
        <div class="mt">
            <div class="item">
                <mt-cell title="现场拍照"></mt-cell>
            </div>
            <div class="imgs clearBoth">
                <div v-for="(img,index) in imgs" :key="index">
                    <img :src="img" alt="加载失败">
                </div>
                <div id="add" class="weui-uploader-input-wrp" @click= "captureImage()">
                    <input type="file" id="file_input" multiple/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {Indicator} from 'mint-ui';
    export default {
        name: "my-upload-img",
        components:{
            Indicator
        },
        data() {
            return {
                imgs : [],
            };
        },
        methods: {
            captureImage: function () {
                let self = this;
                let cmr  = plus.camera.getCamera();
                let res  = cmr.supportedImageResolutions[0];
                let fmt  = cmr.supportedImageFormats[0];
                cmr.captureImage(
                    function( path ){
                        let localPath = plus.io.convertLocalFileSystemURL(path);
                        Indicator.open();

                        let base64  = "";
                        let img     = new Image();
                        img.src     = localPath;

                        img.onload  = function(){
                            base64  = self.getBase64Image(img);
                            self.imgs.push(base64);
                            self.changeImg();
                            Indicator.close();
                        }
                    },
                    function( error ) {
                        console.log( "Capture image failed: " + error.message );
                    },
                    {
                        resolution:res,format:fmt
                    }
                );
            },
            getBase64Image(img) {

                let square = 700;
                let imageWidth;
                let imageHeight;
                let offsetX = 0;
                let offsetY = 0;
                if (img.width > img.height) {
                    imageWidth = Math.round(square * img.width / img.height);
                    imageHeight = square;
                    offsetX = - Math.round((imageWidth - square) / 2);
                } else {
                    imageHeight = Math.round(square * img.height / img.width);
                    imageWidth = square;
                    offsetY = - Math.round((imageHeight - square) / 2);
                }

                let canvas = document.createElement("canvas");
                canvas.width = square;
                canvas.height = square;
                canvas.getContext("2d").drawImage(img, offsetX, offsetY, imageWidth, imageHeight);
                return canvas.toDataURL("image/jpeg");
            },
            changeImg:function () {
                this.$emit('changeImg', this.imgs);
            }
        }
    }
</script>

<style scoped>
    .clearBoth:after{
        content: ' ';
        clear: both;
        display: block;
    }
    .imgs{
        background-color: white;
        padding: 0 10px;
    }
    .imgs img{
        float: left;
        margin: 9px;
        width: 50px;
        height: 50px;
    }

    .weui-uploader-input-wrp {
        float: left;
        position: relative;
        margin: 9px;
        width: 50px;
        height: 50px;
        border: 1px solid #D9D9D9;
        background-color: rgb(245,245,245);
    }
    #file_input {
        display: none;
        font: 100% tahoma, \5b8b\4f53, arial;
        vertical-align: baseline;
        border-radius: 0;
        background-color: transparent;
        -webkit-appearance: none;
    }
    .weui-uploader-input-wrp:before {
        width: 2px;
        height: 39.5px;
    }
    .weui-uploader-input-wrp:after {
        width: 39.5px;
        height: 2px;
    }
    .weui-uploader-input-wrp:before, .weui-uploader-input-wrp:after {
        content: " ";
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        background-color: #D9D9D9;
    }
</style>