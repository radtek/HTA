<template>
    <div>
        <mt-header title="修改密码">
            <router-link to="" slot="left">
                <mt-button icon="back" @click="$router.go(-1)">&nbsp;&nbsp;</mt-button>
            </router-link>
        </mt-header>
        <div style="padding: 0 7%">

        </div>
    </div>
</template>

<script>
    import { Header,Cell,Toast,Button  } from 'mint-ui';
    export default {
        name: 'reset-password',
        data() {
            return {

            }
        },
        components:{
            Header,
            Cell,
        },
        methods: {

        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>