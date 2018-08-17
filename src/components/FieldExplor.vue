<template>
    <div>
        <mt-header title="现场勘查">
          <router-link to="" slot="left">
            <mt-button icon="back" @click="$router.go(-1);"></mt-button>
          </router-link>
        </mt-header>
        <div style="padding:0 7%;">
            <div class="content">
                <mt-radio
                  title="1 油烟净化机是否能正常使用"
                  v-model="value"
                  :options="['是', '否']">
                </mt-radio>
            </div>
            <div class="content">
                <mt-radio
                  title="2 油烟净化机是否能定期清洗"
                  v-model="value"
                  :options="['是', '否']">
                </mt-radio>
            </div>
            <footer>
                <div class="demo-input-suffix">
                  联系人：
                  <el-input
                    placeholder="请输入内容"
                    prefix-icon="el-icon-search"
                    v-model="input">
                  </el-input>
                </div>
                <div class="demo-input-suffix">

                  陪同人：
                  <el-input
                    placeholder="请输入内容"
                    prefix-icon="el-icon-search"
                    v-model="input">
                  </el-input>
                </div>
                <div class="demo-input-suffix">
                    检查时间：
                    <el-input
                        placeholder="请选择日期"
                        suffix-icon="el-icon-date"
                        v-model="input2">
                    </el-input>
                </div>
            </footer>
        </div>
    </div>


</template>
<style media="screen">
    .content{
        margin: 25px 0;
    }
    .mint-radiolist-title {
        font-size: 16px;
        margin: 8px;
        display: block;
        color: #303133;
    }
    .demo-input-suffix{
        margin: 20px 0;
    }
</style>
<script>
    import { Header, Radio  } from 'mint-ui';
    export default {
        name: 'home',
        data() {
            return {
                selected:'',
                value: '',
                input: '',
                input2:''
            }
        },
        components:{
            Header,
            Radio
        }
    }
</script>
