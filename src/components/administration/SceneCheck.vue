<template>
    <div class="scene-check">
        <div style="width: 100%;height: 40px;"><myHeard back="true" title="现场检查"></myHeard></div>

        <div v-for="item in problems" class="mt">
            <mt-radio
                v-if="item.replyOption.length !== 0"
                :title="item.inspDesc"
                v-model="answer[item.inspCode]"
                :options="item.replyOption.split(',')">
            </mt-radio>
            <myField
                v-else
                red-point="true"
                :label="item.inspDesc"
                placeholder="请输入"
                v-model="answer[item.inspCode]"
                type="textarea">
            </myField>
            <mt-radio
                title="检查结果"
                v-model="result[item.inspCode]"
                :options="['合格','不合格']">
            </mt-radio>
        </div>

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
        <div style="width: 100%;height: 53px; margin-top: 10px"><myFlaxSub @click="sub()" title="提交"></myFlaxSub></div>
    </div>
</template>

<script>
    import myHeard   from  "../customComponent/myHeard";
    import myField   from  "../customComponent/myField";
    import myFlaxSub from  "../customComponent/myFlaxSub";
    import {Toast, Indicator} from 'mint-ui';
    export default {
        name: "scene-check",
        components:{
            myHeard,
            myField,
            myFlaxSub,
            Toast,
            Indicator
        },
        data() {
            return {
                form : {
                    objId   : '',
                    jointly : '',
                    time    : '',
                    items   : ''
                },
                problems    : [],
                answer      : [],
                result      : [],
                imgs        : [],
            };
        },
        methods: {
            getProblem:function () {
                Indicator.open();
                let self = this;
                $.get(getUrl('sf_zhzf/msys/inspnotes/inspstandard2'),{
                    items: self.form.items
                },function(data,status){
                    Indicator.close();
                    if(data.statusCode == 200){
                        self.problems = data.list;
                        console.log(self.problems);
                        self.problems.forEach(function (value) {
                            self.answer[value.inspCode] = '';
                            self.result[value.inspCode] = '';
                        });
                    }else if(data.statusCode == 310){
                        window.location.href = "login.html";
                    }else{
                        Toast(data.message);
                    }
                },'json');
            },
            captureImage: function () {
                let self = this;
                let cmr  = plus.camera.getCamera();
                let res  = cmr.supportedImageResolutions[0];
                let fmt  = cmr.supportedImageFormats[0];
                console.log("Resolution: "+res+", Format: "+fmt);
                cmr.captureImage(
                    function( path ){
                        console.log( "Capture image success: " + path );
                        let localPath = plus.io.convertLocalFileSystemURL(path);
                        Indicator.open();
                        // self.imgs.push(localPath);
                        // let image      = new Image();
                        // image.src      = path;
                        // image.onload   = function(){
                        //     let base64 = self.getBase64Image(image);
                        //     alert(base64);
                        // }

                        let base64  = "";
                        let img     = new Image();
                        img.src     = localPath;

                        img.onload  = function(){
                            base64  = self.getBase64Image(img);
                            self.imgs.push(base64);
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
            sub:function () {
                Indicator.open();
                let self = this;
                let list = [];

                self.problems.forEach(function (value) {
                    let obj = {
                        id         : value.id,
                        code       : value.inspCode,
                        inspResult : self.answer[value.inspCode],
                        inspStatus : self.result[value.inspCode] === '合格' ? 1 : 2
                    };
                    list.push(obj);
                });

                $.get(getUrl('sf_zhzf/msys/inspnotes/noteadd2'),{
                    execObjId    : self.form.objId,
                    inspdate     : self.form.time,
                    officerName  : self.form.jointly,
                    list         : list,
                    imgBase64    : ''
                },function(data,status){
                    Indicator.close();
                    if(data.statusCode == 200){
                        //TODO::imgBase64

                    }else if(data.statusCode == 310){
                        window.location.href = "login.html";
                    }else{
                        Toast(data.message);
                    }
                },'json');
            },
        },
        mounted() {
            this.form.objId     = this.$route.params.objId;
            this.form.jointly   = this.$route.params.jointly;
            this.form.time      = this.$route.params.time;
            this.form.items     = this.$route.params.items;

            this.getProblem();
        },
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