<template>
    <div>
        <mt-header title="个人中心"></mt-header>
        <div class="info">
            <img class="infoImg" src="../assets/logo.png" alt="">
            <!--<mt-cell title="张三" label="执法证号：XXXX"></mt-cell>-->
            <p>张三</p>
            <p>执法证号：XXXX</p>
        </div>

        <mt-cell title="消息提醒" to="/" is-link>
            <img slot="icon" src="../assets/logo.png" width="24" height="24">
        </mt-cell>
        <mt-cell title="系统设置" to="/" is-link>
            <img slot="icon" src="../assets/logo.png" width="24" height="24">
        </mt-cell>
    </div>
</template>
<style>
    .info{
        width: 100%;
        text-align: center;
        padding-bottom: 10px;
    }
    .infoImg{
        width: 100px;
        height: 100px;
    }
    .mint-cell-wrapper,.mint-cell:last-child{
        background-image: none !important;
    }
    .mint-cell-wrapper {
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
</style>
<script>
    import { Header,Cell } from 'mint-ui';
    export default {
        name: 'home',
        data() {
            return {
                selected:'',
                imgUrl:'../assets/logo.png'
            }
        },
        components:{
            Header,
            Cell,
        }
    }
</script>