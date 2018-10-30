<template>
    <div>
        <mt-header title="一企一档">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="content" style="padding:0 7%;">
            <el-row :gutter="12">
                <router-link :to="{ name: 'EnterpriseInfo', params: { id: id}}">
                    <el-col :span="24">
                        <el-card shadow="hover" style="background:#67C23A">
                            <p style="color: #fff !important;">企业基本信息</p>
                        </el-card>
                    </el-col>
                </router-link>
                <router-link :to="{ name: 'CleanRecord', params: { id: id}}">
                    <el-col :span="24">
                        <el-card shadow="hover" style="background:#E6A23C">
                            <p style="color: #fff !important;">清洗记录</p>
                        </el-card>
                    </el-col>
                </router-link>
                <router-link :to="{ name: 'FieldExplor', params: { id: id}}">
                    <el-col :span="24">
                        <el-card shadow="hover" style="background:#F56C6C">
                            <p style="color: #fff !important;">现场勘查</p>
                        </el-card>
                    </el-col>
                </router-link>
                <router-link :to="{ name: 'CheckRecord', params: { id: id}}">
                    <el-col :span="24">
                        <el-card shadow="hover" style="background:#909399">
                            <p style="color: #fff !important;">检查记录</p>
                        </el-card>
                    </el-col>
                </router-link>
                <router-link :to="{ name: 'Score', params: { id: id}}">
                    <el-col :span="24">
                        <el-card shadow="hover" style="background:rgba(118,88,249,0.85)">
                            <p style="color: #fff !important;">商户评分</p>
                        </el-card>
                    </el-col>
                </router-link>
                <router-link :to="{ name: 'ScoreRecord', params: { id: id}}">
                    <el-col :span="24">
                        <el-card shadow="hover" style="background:rgba(255,50,150,0.85)">
                            <p style="color: #fff !important;">评分记录 </p>
                        </el-card>
                    </el-col>
                </router-link>
            </el-row>
            <!--<mt-button type="primary" style="width: 100%;margin-top: 20px" @click="$router.go(-1);">返回上一级</mt-button>-->
        </div>
    </div>
</template>
<style media="screen">
    .content {
        margin: 10px 0;
    }

    .el-col-24 {
        margin: 10px 0;
    }
</style>
<script>
    import {Header} from 'mint-ui';

    export default {
        name: 'home',
        data() {
            return {
                id: 31
            }
        },
        components: {
            Header,
        },
        mounted() {
            this.id = this.$route.params.id;
        }
    }
</script>
