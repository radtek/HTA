<template>
    <div id="app">
        <router-view/>
        <mt-tabbar>
            <!--<router-link style="width: 100%; height: 100%" to="/">-->
                <!--<mt-tab-item>-->
                    <!--<img slot="icon" src="./assets/search.png">-->
                    <!--任务管理-->
                <!--</mt-tab-item>-->
            <!--</router-link>-->
            <!--<router-link style="width: 100%; height: 100%" to="/">-->
                <!--<mt-tab-item>-->
                    <!--<img slot="icon" src="./assets/search.png">-->
                    <!--行政执法-->
                <!--</mt-tab-item>-->
            <!--</router-link>-->
            <!--<router-link style="width: 100%; height: 100%" to="/">-->
                <!--<mt-tab-item>-->
                    <!--<img slot="icon" src="./assets/search.png">-->
                    <!--信息查询-->
                <!--</mt-tab-item>-->
            <!--</router-link>-->
            <!--<router-link style="width: 100%; height: 100%;" to="/personal">-->
                <!--<mt-tab-item>-->
                    <!--<img slot="icon" src="./assets/us.png">-->
                    <!--个人中心-->
                <!--</mt-tab-item>-->
            <!--</router-link>-->
        </mt-tabbar>
    </div>
</template>

<script>
    import {Header, Tabbar, TabItem} from 'mint-ui';

    export default {
        name: 'App',
        data() {
            return {}
        },
        components: {
            Header,
            Tabbar,
            TabItem
        }
    }
</script>

<style>
    * {
        margin: 0;
        padding: 0;
    }

    a {
        text-decoration: none;
    }

    .mint-tab-item-label {
        color: #409EFF !important;
    }

    .mint-header > h1 {
        font-size: 20px !important;
    }
</style>
