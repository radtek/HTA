<template>
    <div>
        <mt-header fixed :title="title">
            <router-link v-if="back && !backTo" to="" slot="left">
                <mt-button class="myColor" icon="back" @click="$router.go(-1);"></mt-button>
            </router-link>
            <router-link v-else-if="back && backTo" :to="backTo" slot="left">
                <mt-button class="myColor" icon="back"></mt-button>
            </router-link>
            <mt-button v-if="reform" slot="right">
                <router-link to="/Reform" class="myColor" style="font-size: 12px">
                    下达整改
                </router-link>
            </mt-button>
            <mt-button v-if="scan" slot="right">
                <router-link to="/Scan" class="myColor">
                    <img class="scan" src="../../assets/img/new/scan.png" alt="">
                </router-link>
            </mt-button>
        </mt-header>
    </div>
</template>

<script>
    import {Indicator} from 'mint-ui';
    export default {
        name : "my-heard",
        components:{
            Indicator
        },
        props:{
            back  : false,
            title :'',
            reform: false,
            scan  : false,
            backTo: false
        },
        mounted() {
            isMain = this.back ? false : true;
            Indicator.close();
        },
    }
</script>

<style scoped>
    .mint-header{
        background-color: white !important;
        color: rgb(16,16,16) !important;
        font-size: 16px !important;
    }
    .myColor{
        color: rgb(0,149,147) !important;
    }
    .scan{
        width: 20px;
    }
</style>