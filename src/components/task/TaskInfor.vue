<template>
    <div>
        <header>
            <router-link to="/">
                <img src="../../assets/img/return.png" alt="">
            </router-link>
            <h3>任务详情</h3>
        </header>
        <div class="content">
            <div class="infor">
                <div class="cont">
                    <span class="title">任务名称:</span>
                    <span class="right">{{ title }}</span>
                    <div class="clear"></div>
                </div>
                <div class="cont">
                    <span class="title">主要内容:</span>
                    <span class="right">主要内容主要内容主要内容主要内容主要内容主要内容</span>
                    <div class="clear"></div>
                </div>
                <div class="cont">
                    <span class="title">派发人：</span>
                    <span class="right">张三</span>
                    <div class="clear"></div>
                </div>
                <div class="cont">
                    <span class="title">派发时间：</span>
                    <span class="right">2018.03.09</span>
                    <div class="clear"></div>
                </div>
                <div class="cont">
                    <span class="title">完成时限：</span>
                    <span class="right">2019.09.07</span>
                    <div class="clear"></div>
                </div>
                <div class="cont">
                    <span class="title">任务状态：</span>
                    <span class="right">待接收</span>
                    <div class="clear"></div>
                </div>
            </div>
            <div class="give">
                <h3>派发附件</h3>
                <div class="list">
                    <div class="Limg">
                        <img src="../../assets/img/img.png" alt="">
                    </div>
                    <div class="text">
                        <p>双击编辑文本</p>
                        <p>双击编辑文本</p>
                    </div>
                    <div class="load">
                        <img src="../../assets/img/load.png" alt="无法加载">
                    </div>
                    <div class="clear"></div>
                </div>
                <div class="list">
                    <div class="Limg">
                        <img src="../../assets/img/img.png" alt="无法加载">
                    </div>
                    <div class="text">
                        <p>双击编辑文本</p>
                        <p>双击编辑文本</p>
                    </div>
                    <div class="load">
                        <img src="../../assets/img/load.png" alt="无法加载">
                    </div>
                    <div class="clear"></div>
                </div>
                <div class="list">
                    <div class="ListImg">
                        <img src="../../assets/img/img.png" alt="">
                    </div>
                    <div class="ListImg">
                        <img src="../../assets/img/img.png" alt="">
                    </div>
                    <div class="ListImg">
                        <img src="../../assets/img/img.png" alt="">
                    </div>
                    <div class="clear"></div>
                </div>
            </div>
            <div class="record">
                <h3>流转记录</h3>
            </div>
        </div>
    </div>
</template>

<style scoped>
    header{
        height: 55px;
        position: relative;
    }
    header img{
        position: absolute;
        top: 14px;
        left: 28px;
        width: 27px;
    }
    h3{
        text-align: center;
        font-size: 18px;
        color: #101010;
        font-family: Arial;
        padding: 15px 0;
        font-weight: 100;
        border-bottom: rgba(225, 225, 225, 1) solid 1px;
    }
    .content{
        background: #F8F9F9;
        padding: 5px 0 1px 0;
        margin: 0;
    }
    .infor{
        background: #fff;
        margin: 20px 10px 15px 10px;
        font-size: 14px;
    }
    .title{
        color: #646464!important;
        width: 40%;
        float: left;
    }
    .right{
        width: 40%;
        float: left;
        color: #AAAAAA;
        text-align: left;
    }
    .clear{
        clear:both;
    }
    .infor .cont{
        padding: 15px 10px 15PX 20px;
        border-bottom: rgba(225, 225, 225, 1) solid 1px;
    }
    .give{
        background: #fff;
        margin: 20px 10px 15px 10px;
        font-size: 14px;
        border-bottom: rgba(225, 225, 225, 1) solid 1px;
    }
    .give h3{
        color: #646464;
        text-align: left;
        font-size: 14px;
        padding: 15px 10px 15PX 20px;
    }
    .Limg{
        float: left;
        margin: 10px 5% 10px 5%;
    }
    .text{
        float: left;
        margin: 21px 5% 10px 6%;
        color: #AAAAAA;
        font-size: 14px;
    }
    .load{
        float: left;
        margin: 25px 5% 10px 18%;
    }
    .list{
        border-bottom: rgba(225, 225, 225, 1) solid 1px;
    }
    .list .Limg img{
        width: 60px;
        height: 60px;
    }
    .list .load img{
        width: 40px;
    }
    .ListImg{
        float: left;
        margin: 10px 5% 10px 5%;
    }
    .ListImg img{
        width: 60px;
    }
    .record{
        background: #fff;
        margin: 20px 10px 15px 10px;
        font-size: 14px;
        border-bottom: rgba(225, 225, 225, 1) solid 1px;
    }
    .record h3{
        color: #646464;
        text-align: left;
        font-size: 14px;
        padding: 15px 10px 15PX 20px;
    }
</style>

<script>
    export default{
        data() {
            return{
                title: "油烟检查",

            }
        },
    }

</script>