<template>
    <div>
        <a @click="openPicker">
            <myField :label="label" :placeholder="placeholder" v-model="time" left-img="true" red-point="true"></myField>
        </a>
        <mt-datetime-picker
                v-model="dataValue"
                ref="picker"
                :type="type"
                @confirm="handleConfirm"
        >
        </mt-datetime-picker>
    </div>
</template>

<script>
    import myField from  "../customComponent/myField";
    export default {
        props: {
            type        : '',
            label       : '',
            placeholder : ''
        },
        components:{
            myField,
        },
        data () {
            return {
                time : '',
                dataValue : new Date(),
            }
        },
        methods: {
            openPicker:function () {
                this.$refs.picker.open();
            },
            handleConfirm:function (value) {
                let dateVal = new Date(value);
                this.time = this.myFormat(dateVal);
                this.$emit('changeTime', this.time);
            },
            myFormat:function (dateVal) {
                return this.type == "date" ? this.myFormatDate(dateVal) : this.myFormatDateTime(dateVal);
            },
            myFormatDate: function (dateVal) {
                let year    = dateVal.getFullYear();
                let month   = dateVal.getMonth() + 1;
                let date    = dateVal.getDate();

                month   < 10 && (month   = '0'+month);
                date    < 10 && (date    = '0'+date);

                return year + '-' + month + '-' + date;
            },
            myFormatDateTime: function (dateVal) {
                let year     = dateVal.getFullYear();
                let month    = dateVal.getMonth() + 1;
                let date     = dateVal.getDate();
                let hours    = dateVal.getHours();
                let minutes  = dateVal.getMinutes();

                month    < 10 && (month   = '0'+month);
                date     < 10 && (date    = '0'+date);
                hours    < 10 && (hours   = '0'+hours);
                minutes  < 10 && (minutes = '0'+minutes);

                return year + '-' + month + '-' + date + ' ' + hours + ':' + minutes;
            }
        },
        mounted() {
            this.time = this.myFormat(new Date());
            this.$emit('changeTime', this.time);
        },
    }
</script>

<style scoped>

</style>