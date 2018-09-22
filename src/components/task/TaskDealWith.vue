<template>
    <div>
        <div style="width: 100%;height: 40px;"><myHeard back="true" title="日常检查"></myHeard></div>

        <div class="bmt">
            <a @click="popupVisible = true;getObj();">
                <myField label="执法对象" placeholder="请选择" v-model="form.obj" left-img="true" red-point="true"></myField>
            </a>
            <myField label="检查人" placeholder="请输入" v-model="form.checkMan" red-point="true"></myField>
            <myField label="协办人员" placeholder="请输入" v-model="form.jointly" red-point="true"></myField>
            <a @click="openPicker">
                <myField label="办理时间" placeholder="请选择" v-model="form.time" left-img="true" red-point="true"></myField>
            </a>
            <myField label="检查内容" placeholder="请输入" v-model="form.content" red-point="true" type="textarea"></myField>
        </div>



        <div class="weui_cells weui_cells_form">
            <div class="weui_cell">
                <div class="weui_uploader_hd weui_cell" id="picture_content">
                    <div class="font-position">照片</div>
                    <div class="add-img">
                        <img src="" alt="">
                    </div>
                    <div class="add-img">
                        <img src="" alt="">
                    </div>
                    <div class="add-img">
                        <img src="" alt="">
                    </div>
                    <div class="add-img">
                        <img src="" alt="">
                    </div>

                    <div id="add" class="weui-uploader-input-wrp" @click= "captureImage()">
                        <input type="file" id="file_input" multiple/>
                    </div>
                </div>
            </div>
        </div>




        <myFlaxSub title="提交" @click="sub"></myFlaxSub>

        <div class="select">
            <mt-popup
                    v-model="popupVisible"
                    position="right">
                <div style="height:100%;overflow:scroll;">
                    <div style="width: 100%;height: 40px;">
                        <mt-header fixed title="执法对象">
                            <router-link to="" slot="left">
                                <mt-button class="myColor" icon="back" @click="popupVisible = false"></mt-button>
                            </router-link>
                        </mt-header>
                    </div>

                    <div class="selectBut">
                        <el-input placeholder="请输入内容" v-model="selectValue" class="input-with-select" size="medium">
                            <el-button slot="append" icon="el-icon-search" @click="getObj"></el-button>
                        </el-input>
                    </div>

                    <div class="mt">
                        <a v-for="item in objList" :key="item.id" @click="selectedObj(item.objName)">
                            <div class="myObj">
                                <p>{{ item.objName }}</p>
                            </div>
                        </a>
                    </div>
                </div>
            </mt-popup>
        </div>
        <mt-datetime-picker
                v-model="dataValue"
                ref="picker"
                type="date"
                @confirm="handleConfirm"
        >
        </mt-datetime-picker>
    </div>
</template>

<script>
    import myHeard from "../customComponent/myHeard";
    import myField from  "../customComponent/myField";
    import myFlaxSub from  "../customComponent/myFlaxSub";
    import {Toast, Indicator} from 'mint-ui';
    export default {
        name: "check",
        components:{
            myHeard,
            myField,
            myFlaxSub,
            Toast,
            Indicator
        },
        data() {
            return {
                type : 1,
                popupVisible  : false,
                selectValue   : '',
                objList       : [],
                dataArr       : [],
                dataValue     :new Date(),
                form : {
                    obj       :'',
                    checkMan  :'',
                    jointly   :'',
                    time      :'2018-08-23 14:22',
                    content   :'',
                },
                dialogImageUrl: '',
                dialogVisible : false
            };
        },
        methods: {
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            getCheckList:function () {
                Indicator.open();
                let self = this;
                $.get(getUrl('sf_zhzf/msys/inspnotes/inspitems'), {
                    inspSpecial: self.type
                }, function (data, status) {
                    Indicator.close();
                    if (data.statusCode == 200) {
                        data.list.forEach(function (value,index) {
                            self.checkOptions.push(value.inspName);
                        })
                    } else if (data.statusCode == 310) {
                        // window.location.href = "login.html";
                    } else {
                        Toast(data.message);
                    }
                }, 'json');
            },
            getObj:function () {
                Indicator.open();
                let self = this;
                $.get(getUrl('sf_zhzf/msys/enterprise/querybyname2'), {
                    inspSpecial: self.type,
                    objName    : self.selectValue
                }, function (data, status) {
                    Indicator.close();
                    console.log(data);
                    if (data.statusCode == 200) {
                        self.objList = data.list;
                    } else if (data.statusCode == 310) {
                        // window.location.href = "login.html";
                    } else {
                        Toast(data.message);
                    }
                }, 'json');
            },
            selectedObj:function (obj) {
                this.form.obj = obj;
                this.popupVisible = false;
            },
            openPicker:function () {
                this.$refs.picker.open();
            },
            handleConfirm:function (value) {
                let dateVal    = new Date(value);
                this.form.time = this.myFormat(dateVal);
            },
            myFormat:function (dateVal) {

                let year    = dateVal.getFullYear();
                let month   = dateVal.getMonth() + 1;
                let date    = dateVal.getDate();

                month   < 10 && (month   = '0'+month);
                date    < 10 && (date    = '0'+date);

                return year + '-' + month + '-' + date;
            },
            sub:function () {
                console.log(555);
            },
            captureImage: function () {
                let self = this;
                let cmr  = plus.camera.getCamera();
                let res  = cmr.supportedImageResolutions[0];
                let fmt  = cmr.supportedImageFormats[0];
                console.log("Resolution: "+res+", Format: "+fmt);
                cmr.captureImage( function( path ){
                        console.log( "Capture image success: " + path );
                        let image      = new Image();
                        image.src      = path;
                        image.onload   = function(){
                            let base64 = self.getBase64Image(image);
                            result     = '<div class="delete">delete</div><div class="result"><img src="'+base64+'" alt=""/></div>';
                            let div    = document.createElement('div');
                            div.innerHTML    = result;
                            div['className'] = 'add-img';
                            document.getElementById("picture_content").insertBefore(div,document.getElementById("add"));  　　//插入dom树
                            console.log(base64);
                            div.onclick = function(){
                                this.remove();                  // 在页面中删除该图片元素
                            }
                        }
                    },
                    function( error ) {
                        console.log( "Capture image failed: " + error.message );
                    },
                    {resolution:res,format:fmt}
                );
            },
            getBase64Image(img) {
                var canvas      = document.createElement("canvas");
                canvas.width    = img.width;
                canvas.height   = img.height;
                var ctx         = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, img.width, img.height);
                var ext         = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();
                var dataURL     = canvas.toDataURL("image/"+ext);
                return dataURL;
            }
        },
        mounted() {
            this.type = this.$route.params.type;
            // this.getCheckList();
            this.form.time = this.myFormat(new Date());
        },
    }
</script>

<style scoped>
    .select{
        width: 100%;
        height: 100%;
    }
    .select .mint-popup{
        width: 100%;
        height: 100%;
        background-color: rgb(248,249,249);
    }
    .select .mint-header{
        background-color: white;
        color: rgb(0,149,147);
        font-size: 16px !important;
    }
    .myColor{
        color: rgb(0,149,147);
    }
    .selectBut{
        padding: 10px;
        background-color: white;
    }
    .myObj{
        margin-bottom: 1px;
        background-color: white;
        height: 30px;
        line-height: 30px;
        padding: 2px 15px;
        font-size: 14px;
        color: rgb(96,96,96);
    }

    .weui_cells {
        margin-top: 10px;
        background-color: #FFFFFF;
        line-height: 1.41176471;
        font-size: 17px;
        overflow: hidden;
        position: relative;
        padding-bottom: 19px;
    }
    .weui_cell {
        padding: 10px 15px;
        align-items: center;
    }
    .weui_uploader_hd {
        padding-top: 0;
        padding-right: 0;
        padding-left: 0;
        padding: 10px 15px;
        position: relative;
    }

    .weui-uploader-input-wrp {
        float: left;
        position: relative;
        margin: 9px;
        width: 77px;
        height: 77px;
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
    .font-position{
        margin-right:20px;
        background-size: cover;
        margin-bottom: 6px;
    }
    .add-img{
        float: left;
        margin: 9px;
        width: 77px;
        height: 77px;
        border: 1px solid #D9D9D9;
    }
    .add-img img{
        width: 100%;
        height: 100%;
    }
    .delete{
        width: 69px;
        height: 69px;
        position: absolute;
        text-align: center;
        line-height: 80px;
        z-index: 10;
        font-size: 23px;
        background-color: rgba(255,255,255,0.8);
        color: #777;
        opacity: 0;
        transition-duration: 0.7s;
        -webkit-transition-duration: 0.7s;
    }

    .delete:hover{
        cursor: pointer;
        opacity: 1;
    }
    .result{
        width: 100%;
        height: 100%;
        text-align: center;
        box-sizing: border-box;
    }
</style>