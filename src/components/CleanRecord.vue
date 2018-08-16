<template>
    <div>
        <mt-header title="清洗记录">
          <router-link to="/ListContent" slot="left">
            <mt-button icon="back"></mt-button>
          </router-link>
        </mt-header>
        <div style="padding:0 7%;">
            <!-- <div class="" v-for="(url, item) in items">
                <el-row :gutter="12">
                  <el-col :span="8">
                    <el-card shadow="always">
                        <img src="{{ url }}" alt="">
                    </el-card>
                  </el-col>
                  <el-col :span="16">
                    <el-card shadow="hover">
                        {{item}}
                    </el-card>
                  </el-col>
                </el-row>
            </div> -->
            <div class="content">
                <el-row :gutter="12">
                  <el-col :span="8">
                    <el-card shadow="always" style="height:60px;padding:0!important;">
                        <img src="../assets/logo.png" alt="" style="width:50px;">
                    </el-card>
                  </el-col>
                  <el-col :span="16">
                    <el-card shadow="hover" style="height:60px">
                        .....
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
</style>
<script>
    import { Header } from 'mint-ui';
    export default {
        name: 'home',
        data() {
            return {
                selected:''
            }
        },
        components:{
            Header
        }
    }
</script>
