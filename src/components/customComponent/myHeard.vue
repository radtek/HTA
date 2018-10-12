<template>
    <div>
        <mt-header fixed :title="title">
            <router-link v-if="back" to="" slot="left">
                <mt-button class="myColor" icon="back" @click="backTo"></mt-button>
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
    export default {
        name : "my-heard",
        props:{
            back  : false,
            title :'',
            reform: false,
            scan  : false,
            to    : false
        },
        methods: {
            backTo:function () {
                console.log(this.to);
                if(this.to){
                    console.log(1);
                    this.$router.push({name: 'Administration'});
                }else{
                    console.log(2);
                    this.$router.back(-1);
                }
            }
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