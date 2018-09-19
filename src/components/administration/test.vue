<template>
    <div>
        <myHeard back="true" title="任务管理" scan="true"></myHeard>
        <div style="width: 100%;height: 1000px"></div>
        <myMenu active="2"></myMenu>
    </div>
</template>

<script>
    import myMenu from "../customComponent/myMenu";
    import myHeard from "../customComponent/myHeard";
    export default {
        name: "test",
        components:{
            myMenu,
            myHeard,
        },
    }
</script>

<style scoped>

</style>