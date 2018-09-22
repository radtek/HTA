<template>
    <div class="block">
        <span class="red-point" v-if="redPoint">*</span>
        <div style="padding-left: 8px">
            <mt-field
                    v-if="leftImg"
                    :label="label"
                    v-model="model"
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
                    v-model="currentValue" @input="handleInput"
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
            prop : 'model',
        },
        props: {
            model: [String, Number],
            label:'',
            placeholder: '',
            leftImg: false,
            redPoint: false,
            type: '',
            readonly: false
        },
        data () {
            return {
                currentValue: this.model //不直接绑定prop，而是在data 或者 computed 里面根据prop初始化自己领域的值
            }
        },
        methods: {
            handleInput() {
                this.$emit('input', this.currentValue); // key code
            }
        }
    }
</script>

<style scoped>
    .block{
        position: relative;
        background-color: white;
        /*margin-bottom: 1px;*/
        border-bottom: 1px solid rgb(248,248,248);
    }
    .red-point{
        color: red;
        position: absolute;
        z-index: 1;
        height: 14px;
        top: 50%;
        margin-top: -10px;
        left: 8px;
    }
    .myColor{
        color: rgb(187,187,187);
    }
</style>