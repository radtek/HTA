<template>
    <div class="block">
        <span class="red-point" v-if="redPoint">*</span>
        <div style="padding-left: 8px">
            <mt-field
                    v-if="leftImg"
                    :label="label"
                    v-model="value"
                    :placeholder="placeholder"
                    :readonly="readonly"
                    :type="type"
                    rows="3"
                    disableClear>
                <span><i class="fa fa-angle-right fa-lg myColor"></i></span>
            </mt-field>
            <mt-field
                    v-else
                    :label="label"
                    v-model="value"
                    :readonly="readonly"
                    :placeholder="placeholder"
                    :type="type"
                    rows="3">
            </mt-field>
        </div>
    </div>
</template>

<script>
    export default {
        name: "my-field",
        model:{
            prop: 'value',
        },
        props:{
            value       : '',
            label       : '',
            placeholder : '',
            leftImg     : false,
            redPoint    : false,
            type        : '',
            readonly    : false
        }
    }
</script>

<style scoped>
    .block{
        position: relative;
        background-color: white;
        margin-bottom: 1px;
    }
    .red-point{
        color: red;
        position: absolute;
        z-index: 1;
        height: 14px;
        top: 50%;
        margin-top: -7px;
        left: 8px;
    }
    .myColor{
        color: rgb(187,187,187);
    }
</style>