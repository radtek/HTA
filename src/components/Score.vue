<template>
    <div>
        <mt-header title="商户评分">
            <router-link :to="'/ListContent/'+id" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div style="overflow: hidden">
            <object class="myFrame" :data="url" scrolling="no" frameborder="0"></object>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'score',
        data() {
            return {
                id : '',
                url: ''
            }
        },
        mounted() {
            this.id = this.$route.params.id;
            this.url = "http://61.54.107.162:8089/sf_zhzf/mcust/grade/toadd?exeobjId="+this.id;
        }
    }
</script>

<style scoped>
    .myFrame{
        width: 100%;
        height: 85vh;
        overflow: hidden;
        scroll-padding: 0;
    }
</style>