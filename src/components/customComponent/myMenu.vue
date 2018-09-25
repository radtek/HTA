<template>
    <div>
        <mt-tabbar>
            <router-link style="width: 100%; height: 100%" to="/">
                <mt-tab-item v-if="active == 1" class="myActive">
                    <img slot="icon" src="../../assets/img/new/task_active.png">
                    任务管理
                </mt-tab-item>
                <mt-tab-item v-else class="unActive">
                    <img slot="icon" src="../../assets/img/new/task.png">
                    任务管理
                </mt-tab-item>
            </router-link>
            <router-link style="width: 100%; height: 100%" to="/Administration">
                <mt-tab-item v-if="active == 2" class="myActive">
                    <img slot="icon" src="../../assets/img/new/administration_active.png">
                    行政执法
                </mt-tab-item>
                <mt-tab-item v-else class="unActive">
                    <img slot="icon" src="../../assets/img/new/administration.png">
                    行政执法
                </mt-tab-item>
            </router-link>
            <router-link style="width: 100%; height: 100%" to="/Message">
                <mt-tab-item v-if="active == 3" class="myActive">
                    <img slot="icon" src="../../assets/img/new/search_active.png">
                    信息查询
                </mt-tab-item>
                <mt-tab-item v-else class="unActive">
                    <img slot="icon" src="../../assets/img/new/search.png">
                    信息查询
                </mt-tab-item>
            </router-link>
            <router-link style="width: 100%; height: 100%;" to="/Personal">
                <mt-tab-item v-if="active == 4" class="myActive">
                    <img slot="icon" src="../../assets/img/new/my_active.png">
                    个人中心
                </mt-tab-item>
                <mt-tab-item v-else class="unActive">
                    <img slot="icon" src="../../assets/img/new/my.png">
                    个人中心
                </mt-tab-item>
            </router-link>
        </mt-tabbar>
    </div>
</template>

<script>
    export default {
        name : "myMenu",
        props:{
            active:0
        }
    }
</script>

<style scoped>
    .mint-tabbar{
        position: fixed !important;
        background-color: white !important;
    }
    .unActive{
        color: rgb(140,136,136);
    }
    .myActive{
        color: rgb(0,149,147);
    }
</style>