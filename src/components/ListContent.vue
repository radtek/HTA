<template>
    <div>
        <mt-header title="一企一档">
          <router-link to="/" slot="left">
            <mt-button icon="back"></mt-button>
          </router-link>
        </mt-header>
        <div class="content" style="padding:0 7%;">
            <el-row :gutter="12">
              <el-col :span="24">
                <el-card shadow="hover" style="background:#67C23A">
                    <router-link to="/EnterpriseInfor">
                        企业基本信息
                    </router-link>
                </el-card>
              </el-col>
              <el-col :span="24">
                <el-card shadow="hover" style="background:#E6A23C">
                    <router-link to="/CleanRecord">
                        清洗记录
                    </router-link>
                </el-card>
              </el-col>
              <el-col :span="24">
                <el-card shadow="hover" style="background:#F56C6C">
                    <router-link to="/FieldExplor">
                        现场勘查
                    </router-link>
                </el-card>
              </el-col>
              <el-col :span="24">
                <el-card shadow="hover" style="background:#909399">
                    <router-link to="/">
                        检查记录
                    </router-link>
                </el-card>
              </el-col>
            </el-row>
        </div>
    </div>


</template>
<style media="screen">
.content{
    margin: 10px 0;
}
a{
    color: #fff;
}
.el-col-24 {
    margin: 10px 0;
}
</style>
<script>
    import { Header,Tabbar, TabItem } from 'mint-ui';
    export default {
        name: 'home',
        data() {
            return {
                selected:''
            }
        },
        components:{
            Header,
            Tabbar,
            TabItem
        }
    }
</script>
