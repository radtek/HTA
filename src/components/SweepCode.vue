<template>
    <div>
        <mt-header title="标题">
          <mt-button slot="right">
              <img slot="icon" src="../assets/shao.png" style="width: 23px;">
          </mt-button>
        </mt-header>
    </div>
    <div class="demo-input-suffix">
        <el-input
           placeholder="请输入内容"
           prefix-icon="el-icon-search"
           v-model="input21">
         </el-input>
    </div>
    
</template>
<style media="screen">
    .mint-tab-item-label{
        color: #409EFF;
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
