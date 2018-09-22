<template>
    <div class="flaxBottom">
        <div class="flaxBut">
            <mt-button  size="small" type="primary" style="width: 100%;" @click="click">{{title}}</mt-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "my-flax-sub",
        props:{
            title:''
        },
        methods: {
            click() {
                this.$emit('click');
            }
        }
    }
</script>

<style scoped>
    .flaxBottom{
        position: fixed;
        width: 100%;
        bottom: 0;
        left: 0;
        z-index: 2;
    }
    .flaxBottom .flaxBut{
        padding: 10px 15px;
        background-color: white;
    }
</style>