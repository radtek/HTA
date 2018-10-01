<template>
    <div>
        <div style="width: 100%;height: 40px;"><myHeard back="true" title="修改密码"></myHeard></div>

        <div class="bmt">
            <myField label="原密码" placeholder="请输入原密码" v-model.trim="originalPassword"
                     :attr="{ maxlength: 15 }" type="password" red-point="true"></myField>
            <myField label="新密码" placeholder="请输入新密码" v-model.trim="newPassword"
                     :attr="{ maxlength: 15 }" type="password" red-point="true"></myField>
            <myField label="确认密码" placeholder="请输入确认密码" v-model.trim="affirmPassword"
                     :attr="{ maxlength: 15 }" type="password" red-point="true"></myField>
        </div>

        <div style="width: 100%;height: 53px; margin-top: 10px"><myFlaxSub @click="submitForm()" title="确认修改"></myFlaxSub></div>
    </div>
</template>
<style>

</style>
<script>
    import myHeard   from  "../customComponent/myHeard";
    import myField   from  "../customComponent/myField";
    import myFlaxSub from  "../customComponent/myFlaxSub";
    import {Toast, Indicator} from 'mint-ui';

    export default {
        name: 'reset-password',
        data() {
            return {
                originalPassword: '',
                newPassword: '',
                affirmPassword: ''
            }
        },
        components: {
            myHeard,
            myField,
            myFlaxSub,
            Toast,
            Indicator
        },
        methods: {
            submitForm(formName) {
                let self = this;
                if (self.originalPassword.length == 0) {
                    Toast('原密码为空！');
                    return;
                }
                if (self.newPassword.length == 0) {
                    Toast('新密码为空！');
                    return;
                }
                if (self.affirmPassword.length == 0) {
                    Toast('确认密码为空！');
                    return;
                }
                if (self.newPassword != self.affirmPassword) {
                    Toast('新密码与确认密码不一致！');
                    return;
                }
                Indicator.open();
                $.get(getUrl('sf_zhzf/msys/user/resetpwd'), {
                    oldpass: hex_md5(self.originalPassword),
                    newpass: hex_md5(self.newPassword),
                    imei: plus.device.imei,
                    lastsend: localStorage.getItem("lastsend")
                }, function (data, status) {
                    Indicator.close();
                    if (data.statusCode == 200) {
                        localStorage.setItem("token", hex_md5(self.newPassword));
                        Toast('修改成功');
                        self.$router.go(-1);
                    } else if (data.statusCode == 310) {
                        window.location.href = "login.html";
                    } else {
                        Toast(data.message);
                    }
                }, 'json');
            },
        },
    }
</script>