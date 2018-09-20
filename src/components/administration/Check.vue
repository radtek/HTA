<template>
    <div>
        <div style="width: 100%;height: 40px;"><myHeard back="true" title="日常检查"></myHeard></div>

        <div class="bmt">
            <myField label="执法对象" placeholder="请选择" v-model="form.obj" left-img="true" red-point="true"></myField>
            <myField label="检查人" placeholder="请输入" v-model="form.checkMan" red-point="true"></myField>
            <myField label="协办人员" placeholder="请选择" v-model="form.jointly" left-img="true" red-point="true"></myField>
            <myField label="办理时间" placeholder="请选择" v-model="form.time" left-img="true" red-point="true"></myField>
            <myField label="检查内容" placeholder="请输入" v-model="form.content" red-point="true" type="textarea"></myField>
        </div>

        <div class="bmt">
            <myField label="检查内容" red-point="true" readonly="true"></myField>

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
                    obj     :'',
                    checkMan:'',
                    jointly :'',
                    time    :'2018-08-23 14:22',
                    content :'',
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