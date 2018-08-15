<template>
  <div id="app">

    <router-view/>
    <router-link to="/personal">personal</router-link>
    <mt-tabbar :selected.sync="selected">
      <mt-tab-item id="信息查询">
        <img slot="icon" src="./assets/search.png">
          信息查询
      </mt-tab-item>
      <mt-tab-item id="个人中心">
        <img slot="icon" src="./assets/us.png">
        个人中心
      </mt-tab-item>
    </mt-tabbar>

  </div>
</template>

<script>
    import { Header,Tabbar, TabItem } from 'mint-ui';
    export default {
      name: 'App',
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

<style>
#app {
  margin: 0;
}
</style>
