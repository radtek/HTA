<template>
    <div>
        <mt-header title="标题">
          <mt-button slot="right">
              <img slot="icon" src="../assets/shao.png" style="width: 23px;">
          </mt-button>
        </mt-header>
        <mt-tabbar :selected.sync="selected">
          <mt-tab-item id="信息查询">
            <img slot="icon" src="../assets/search.png">
            信息查询
          </mt-tab-item>
          <mt-tab-item id="个人中心">
            <img slot="icon" src="../assets/us.png">
            个人中心
          </mt-tab-item>
        </mt-tabbar>
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

            }
        },
        components:{
            Header,
            Tabbar,
            TabItem
        }
    }
</script>
