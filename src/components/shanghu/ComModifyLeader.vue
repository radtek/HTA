<template>
    <div>
        <mt-header title="修改负责人">
            <router-link to="" slot="left">
                <mt-button icon="back" @click="$router.go(-1)">&nbsp;&nbsp;</mt-button>
            </router-link>
        </mt-header>
        <div style="padding: 0 3%">
            <div class="form" style="padding: 40px 5% 0 0">
                <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="88px" class="demo-ruleForm">
                    <el-form-item
                      label="负责人"
                      prop="people"
                      :rules="[
                        { required: true, message: '负责人不能为空'}
                      ]"
                    >
                      <el-input type="people" v-model.number="numberValidateForm.people" auto-complete="off"></el-input>
                    </el-form-item>
                      <el-form-item
                        label="电话号"
                        prop="phone"
                        :rules="[
                          { required: true, message: '电话号不能为空'},
                          { type: 'number', message: '电话号必须为数字值'}
                        ]"
                      >
                        <el-input type="phone" v-model.number="numberValidateForm.phone" auto-complete="off"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" @click="submitForm('numberValidateForm')">提交</el-button>
                        <el-button @click="resetForm('numberValidateForm')">重置</el-button>
                      </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import { Header,Cell,Toast,Button,Field   } from 'mint-ui';
    export default {
        name: 'modifyLeader',
        data() {
            return {
                selected:'',
                numberValidateForm: {
                  people: ''
                }
            }
        },
        components:{
            Header,
            Cell,
            Field
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
