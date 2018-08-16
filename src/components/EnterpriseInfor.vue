<template>
    <div>
        <mt-header title="企业信息">
          <router-link to="/ListContent" slot="left">
            <mt-button icon="back"></mt-button>
          </router-link>
        </mt-header>
        <div style="padding:0 7%;">
            <!-- <ul>
                <li v-for="item in items">
                    <mt-cell title="item" value="item"></mt-cell>
                </li>
            </ul> -->
            <div class="tables">
                <mt-cell title="item" value="item"></mt-cell>
            </div>
        </div>
    </div>
</template>
<style media="screen">
    .tables{
        border-bottom: 1px solid #dcdfe6;
    }
</style>
<script>
    import { Header,Tabbar, TabItem } from 'mint-ui';
    export default {
        name: 'home',
        data() {
            return {
                selected:'',
            }
        },
        components:{
            Header,
            Tabbar,
            TabItem
        },
        methods: {
        },
    }
</script>
