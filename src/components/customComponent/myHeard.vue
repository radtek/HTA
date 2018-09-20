<template>
    <div>
        <mt-header fixed :title="title">
            <router-link v-if="back" to="" slot="left">
                <mt-button class="myColor" icon="back" @click="$router.go(-1);"></mt-button>
            </router-link>
            <mt-button v-if="reform" slot="right">
                <router-link to="/Reform" class="myColor">
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
    export default {
        name : "my-heard",
        props:{
            back : false,
            title:'',
            reform: false,
            scan : false
        }
    }
</script>

<style scoped>
    .mint-header{
        background-color: white;
        color: rgb(16,16,16);
    }
    .myColor{
        color: rgb(0,149,147);
    }
    .scan{
        width: 20px;
    }
</style>