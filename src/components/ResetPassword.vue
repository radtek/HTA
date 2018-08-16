<template>
    <div>
        <mt-header title="修改密码">
            <router-link to="" slot="left">
                <mt-button icon="back" @click="$router.go(-1)">&nbsp;&nbsp;</mt-button>
            </router-link>
        </mt-header>
        <div style="padding: 0 3%">
            <div class="form" style="padding: 40px 5% 0 0">
                <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                      <el-form-item label="密码" prop="pass">
                        <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="确认密码" prop="checkPass">
                        <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                        <el-button @click="resetForm('ruleForm2')">重置</el-button>
                      </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import { Header,Cell,Toast,Button  } from 'mint-ui';
    export default {
        name: 'reset-password',
        data() {

             var validatePass = (rule, value, callback) => {
               if (value === '') {
                 callback(new Error('请输入密码'));
               } else {
                 if (this.ruleForm2.checkPass !== '') {
                   this.$refs.ruleForm2.validateField('checkPass');
                 }
                 callback();
               }
             };
             var validatePass2 = (rule, value, callback) => {
               if (value === '') {
                 callback(new Error('请再次输入密码'));
               } else if (value !== this.ruleForm2.pass) {
                 callback(new Error('两次输入密码不一致!'));
               } else {
                 callback();
               }
             };
             return {
               ruleForm2: {
                 pass: '',
                 checkPass: '',
                 age: ''
               },
               rules2: {
                 pass: [
                   { validator: validatePass, trigger: 'blur' }
                 ],
                 checkPass: [
                   { validator: validatePass2, trigger: 'blur' }
                 ]
               }

             };
        },
        components:{
            Header,
            Cell,
        },
        methods: {
              submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                  if (valid) {
                    alert('submit!');
                  } else {
                    console.log('error submit!!');
                    return false;
                  }
                });
              },
              resetForm(formName) {
                this.$refs[formName].resetFields();
              }
          },
        mounted() {

        }
    }
</script>

<style scoped>

</style>
