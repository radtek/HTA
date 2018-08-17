<template>
    <div>
        <mt-header title="一企一档">
          <router-link to="/" slot="left">
            <mt-button icon="back"></mt-button>
          </router-link>
        </mt-header>
        <div class="content" style="padding:0 7%;">
            <el-row :gutter="12">
                <router-link to="/sh/EnterpriseInfor">
                      <el-col :span="24">
                        <el-card shadow="hover" style="background:#67C23A">
                                <p style="color: #fff !important;">企业基本信息</p>
                        </el-card>
                      </el-col>
              </router-link>
              <router-link to="/sh/CleanRecord">
                  <el-col :span="24">
                        <el-card shadow="hover" style="background:#409EFF">
                                <p style="color: #fff !important;">清洗记录</p>
                        </el-card>
                  </el-col>
              </router-link>
              <router-link to="/sh/Message">
                  <el-col :span="24">
                    <el-card shadow="hover" style="background:#F56C6C">
                            <p style="color: #fff !important;">消息提醒</p>
                    </el-card>
                  </el-col>
              </router-link>
              <router-link to="/sh/modifyLeader">
                  <el-col :span="24">
                    <el-card shadow="hover" style="background:#E6A23C">
                            <p style="color: #fff !important;">修改负责人</p>
                    </el-card>
                  </el-col>
              </router-link>
              <router-link to="/sh/Report">
                  <el-col :span="24">
                    <el-card shadow="hover" style="background:#909399">
                            <p style="color: #fff !important;">我要上报</p>
                    </el-card>
                  </el-col>
              </router-link>
            </el-row>
            <mt-button type="primary" @click="$router.go(-1)" style="width: 100%;margin-top: 20px">安全退出</mt-button>
        </div>
    </div>


</template>
<style media="screen">
.content{
    margin: 10px 0;
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
