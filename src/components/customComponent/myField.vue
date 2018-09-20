<template>
    <div class="block">
        <span class="red-point">*</span>
        <div style="padding-left: 8px">
            <mt-field :label="label" v-model="value" :placeholder="placeholder">
                <span><i class="fa fa-angle-right fa-lg myColor"></i></span>
            </mt-field>
        </div>
    </div>
</template>

<script>
    export default {
        name: "my-field",
        props:{
            label : '',
            placeholder : '',
            value : '',
        }
    }
</script>

<style scoped>
    .block{
        position: relative;
        background-color: white;
    }
    .red-point{
        color: red;
        position: absolute;
        height: 48px;
        line-height: 48px;
        z-index: 1;
        top: 3px;
        left: 8px;
    }
    .myColor{
        color: rgb(187,187,187);
    }
</style>