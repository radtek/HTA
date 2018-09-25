<template>
    <div>
        <div style="width: 100%;height: 40px;"><myHeard back="true" title="新增执法对象"></myHeard></div>

        <div class="bmt">
            <myField label="企业名称" placeholder="请输入" v-model="objName" red-point="true"></myField>
            <myField label="地址" placeholder="请输入" red-point="true" v-model="objAdd"></myField>
            <myField label="营业执照" placeholder="请输入" red-point="true" v-model="licence"></myField>
        </div>

        <div class="bmt">
            <mt-radio
                    title="类别"
                    v-model="objType"
                    :options="['企业','个人']">
            </mt-radio>
        </div>

        <div class="bmt">
            <myField label="法人" placeholder="请输入" red-point="true" v-model="faName"></myField>
            <myField label="法人电话" placeholder="请输入" red-point="true" v-model="faPhone"></myField>
            <myField label="负责人" placeholder="请输入" red-point="true" v-model="fuName"></myField>
            <myField label="负责电话" placeholder="请输入" red-point="true" v-model="fuPhone"></myField>
        </div>

        <div style="width: 100%;height: 53px; margin-top: 10px"><myFlaxSub @click="sub()" title="提交"></myFlaxSub></div>
    </div>
</template>

<script>
    import myHeard   from  "../customComponent/myHeard";
    import myField   from  "../customComponent/myField";
    import myFlaxSub from  "../customComponent/myFlaxSub";
    import {Toast, Indicator} from 'mint-ui';
    export default {
        name: "add-obj",
        components:{
            myHeard,
            myField,
            myFlaxSub,
            Toast,
            Indicator,
        },
        data() {
            return {
                objName : '',
                objType : '',
                objAdd  : '',
                licence : '',
                faName  : '',
                faPhone : '',
                fuName  : '',
                fuPhone : '',
            };
        },
        methods: {
            test:function () {
                if(this.objName.length == 0){
                    Toast('企业名称为空');
                    return false;
                }
                if(this.objType.length == 0){
                    Toast('请选择企业类型');
                    return false;
                }
                if(this.objAdd.length == 0){
                    Toast('地址为空');
                    return false;
                }
                if(this.licence.length == 0){
                    Toast('营业执照为空');
                    return false;
                }
                if(this.faName.length == 0){
                    Toast('法人姓名为空');
                    return false;
                }
                if(this.faPhone.length == 0){
                    Toast('法人电话为空');
                    return false;
                }
                if(this.fuName.length == 0){
                    Toast('负责人为空');
                    return false;
                }
                if(this.fuPhone.length == 0){
                    Toast('负责人电话为空');
                    return false;
                }
                return true;
            },
            sub:function () {
                Indicator.open();
                let self = this;
                if(test())
                    $.get(getUrl('sf_zhzf/msys/enterprise/add'),{
                        objName     : self.objName,
                        objType     : self.objType,
                        busiAddr    : self.objAdd,
                        identityNo  : self.licence,
                        faren       : self.faName,
                        farenPhone  : self.faPhone,
                        fuzeren     : self.fuName,
                        fuzerenPhone: self.fuPhone,
                    },function(data,status){
                        Indicator.close();
                        if(data.statusCode == 200){
                            Toast('新增执法对象成功');
                        }else if(data.statusCode == 310){
                            window.location.href = "login.html";
                        }else{
                            Toast(data.message);
                        }
                    },'json');
            },
        },
        mounted() {

        },
    }
</script>

<style scoped>

</style>