<template>
    <div>
        <mt-header title="修改密码">
            <router-link to="" slot="left">
                <mt-button icon="back" @click="$router.go(-1)">&nbsp;&nbsp;</mt-button>
            </router-link>
        </mt-header>
        <div style="padding: 0 7%">
            <mt-field label="原密码" :attr="{ maxlength: 15 }" placeholder="请输入原密码" type="password"
                      v-model.trim="originalPassword"></mt-field>
            <mt-field label="新密码" :attr="{ maxlength: 15 }" placeholder="请输入新密码" type="password"
                      v-model.trim="newPassword"></mt-field>
            <mt-field label="确认密码" :attr="{ maxlength: 15 }" placeholder="请输入确认密码" type="password"
                      v-model.trim="affirmPassword"></mt-field>
            <mt-button type="primary" style="width: 100%;margin: 20px 0" @click="submitForm">确认修改</mt-button>
        </div>
    </div>
</template>
<style>

</style>
<script>
    import {Header, Cell, Toast, Button, Indicator} from 'mint-ui';

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
            Header,
            Cell,
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
                    oldpass  : hex_md5(self.originalPassword),
                    newpass  : hex_md5(self.newPassword),
                    imei     : plus.device.imei,
                    lastsend : localStorage.getItem("lastsend")
                }, function (data, status) {
                    Indicator.close();
                    if (data.statusCode == 200) {
                        Toast('修改成功');
                        self.$router.go(-1);
                    } else if (data.statusCode == 310) {
                        localStorage.clear();
                        window.location.href = "login.html";
                    } else {
                        Toast(data.message);
                    }
                },'json');
            },
        },
    }
</script>