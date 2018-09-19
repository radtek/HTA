<template>
    <div>
        <div style="width: 100%;height: 40px;"><myHeard back="true" title="日常检查"></myHeard></div>

        <!--<div>-->
            <!--<mt-cell title="标题文字" value="说明文字"></mt-cell>-->
            <!--<mt-field label="验证码" v-model="captcha">-->
                <!--<img src="../assets/100x100.png" height="45px" width="100px">-->
            <!--</mt-field>-->
        <!--</div>-->
    </div>
</template>

<script>
    import myHeard from "../customComponent/myHeard"
    export default {
        name: "check",
        components:{
            myHeard
        },
        data() {
            return {
                type : 1,
            };
        },
        methods: {

        },
        mounted() {
            this.type = this.$route.params.type;
            this.getData();
        }
    }
</script>

<style scoped>

</style>