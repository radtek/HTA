<template>
    <div>
        <mt-header title="消息提醒">
            <router-link to="/sh/Massage" slot="left">
                <mt-button icon="back" @click="$router.go(-1)">&nbsp;&nbsp;</mt-button>
            </router-link>
        </mt-header>
        <div style="padding: 0 7%">
            <div class="conts">
                <el-badge is-dot class="item">
                    <div class="conform" style="width:100%;">企业名称xx应在2018-18-04清理油烟机，
                        请及时提醒该商户清理油烟机</div>
                    <div class="dates">
                        2018-8-9
                    </div>
                </el-badge>
            </div>
        </div>
    </div>
</template>

<script>
    import { Header,Cell,Toast,Button  } from 'mint-ui';
    export default {
        name: 'message',
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
    .conts{
        margin: 20px 0;
        border: 1px solid #E4E7ED;
        border-radius: 5px;
    }
    .conts .conform{
        line-height: 30px;
        color: #303133;
        font-size: 15px;
        margin: 0;
        padding: 5px;
    }
    .dates{
        text-align: right;
        color: #909399;
        font-size: 12px;
        padding: 0 5px 5px 0;
    }
</style>
