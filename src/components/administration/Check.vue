<template>
    <div>
        <div style="width: 100%;height: 40px;"><myHeard back="true" title="日常检查"></myHeard></div>

        <div class="bmt">

            <myField label="执法对象" placeholder="请选择" :value="form.obj"></myField>

        </div>
    </div>
</template>

<script>
    import myHeard from "../customComponent/myHeard";
    import myField from  "../customComponent/myField"
    export default {
        name: "check",
        components:{
            myHeard,
            myField
        },
        data() {
            return {
                type : 1,
                form : {
                    obj:'',
                }
            };
        },
        methods: {

        },
        mounted() {
            this.type = this.$route.params.type;
        }
    }
</script>

<style scoped>

</style>