<template>
    <div>
        <mt-header title="信息查询">
          <mt-button slot="right">
              <img slot="icon" src="../assets/shao.png" style="width: 23px;">
          </mt-button>
        </mt-header>
        <div class="" style="padding:0 7%;">
            <div class="demo-input-suffix">
                <el-input
                   placeholder="请输入内容"
                   prefix-icon="el-icon-search"
                   v-model="input21">
                 </el-input>
            </div>
            <div class="list">
                <div class="cont">
                    <h3>{{ title }}</h3>
                    <p>{{ data }}</p>
                </div>
                <div class="link">
                    <router-link to="/ListContent" style="">
                        <img src="../assets/return.png" alt="width:20px;">
                    </router-link>
                </div>
                <div class="clear"></div>
            </div>
        </div>
    </div>


</template>
<style media="screen">
    body{

    }
    .mint-tab-item-label{
        color: #409EFF;
    }
    .demo-input-suffix{
        margin: 20px 0;
        width: 100%;
    }
    .list{
        width: 100%;
        height: 85px;
        background: #EBEEF5;
        margin: 10px 0;
        border-radius: 5px;
        overflow: hidden;
    }
    .list h3{
        font-size: 16px;
        color: #606266;
        padding: 10px;
    }
    .list p{
        font-size: 13px;
        color: #909399;
        padding: 0 0 0 10px;
        width: 76%;
    }
    .cont{
        width: 85%;
        float: left;
    }
    .link{
        float:left;
        width:15%;
        margin:28px 0;
    }
    .link img{
        width: 26px;
    }
    .clear{
        content: '';
        clear: both;
    }
</style>
<script>
    import { Header,Tabbar, TabItem } from 'mint-ui';
    export default {
        name: 'home',
        data() {
            return {
                selected:'',
                input21:'',
                title:'新乡海滨有限公司',
                data:'行政区划分：好几百的后视镜到哪里好几百的后视镜到哪里'
            }
        },
        components:{
            Header,
            Tabbar,
            TabItem
        }
    }
</script>
