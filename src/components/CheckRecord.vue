<template>
    <div>
        <mt-header title="检查记录">
          <router-link to="/ListContent" slot="left">
            <mt-button icon="back"></mt-button>
          </router-link>
        </mt-header>
        <div style="padding:0 7%;">
            <div class="content">
                <el-row :gutter="12">
                  <el-col :span="8" style="padding:0 0!important">
                    <el-card shadow="always" style="height:70px;padding:0 0!important;text-align:center;">
                        <span class="tit">日常检查</span>
                    </el-card>
                  </el-col>
                  <el-col :span="16">
                    <el-card shadow="hover" style="height:70px;position:relative;">
                        <p style="color:#606266;">企业名称xx检查</p>
                        <span class="date">2018-9-04</span>
                    </el-card>
                  </el-col>
                </el-row>
            </div>
        </div>
    </div>


</template>
<style media="screen">
    .content{
        margin: 10px 0;
    }
    .date{
        position: absolute;
        bottom: 10px;
        right:10px;
        color: #909399;
        font-size: 12px;
    }
    .tit{
        color: #303133;
        font-size: 15px;
        font-family: "Helvetica Neue";
    }
</style>
<script>
    import { Header, Radio  } from 'mint-ui';
    export default {
        name: 'home',
        data() {
            return {
                selected:'',
                value: ''
            }
        },
        components:{
            Header,
            Radio
        }
    }
</script>
