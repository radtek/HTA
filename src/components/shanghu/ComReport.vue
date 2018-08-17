<template>
    <div>
        <mt-header title="我要上报">
          <router-link to="/sh/ListContent" slot="left">
            <mt-button icon="back"></mt-button>
          </router-link>
        </mt-header>
        <div style="padding:0 7%;">
            <div class="content">
                <el-form>
                    <el-form-item label="上报内容">
                       <el-input type="textarea" v-model="desc"></el-input>
                    </el-form-item>
                    <div class="imgUp" style="width:100%;">
                        拍照或上传图片
                    </div>
                    <div style="clear:clear;"></div>
                    <el-upload
                          class="avatar-uploader"
                          action="#"
                          :show-file-list="false"
                          :on-success="handleAvatarSuccess"
                          :before-upload="beforeAvatarUpload">
                          <img v-if="imageUrl" :src="imageUrl" class="avatar">
                          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                     <el-form-item style="margin: 20px 0;">
                        <el-button type="primary" @click="onSubmit" style="width: 100%;">立即创建</el-button>
                     </el-form-item>
            </el-form>
            </div>
        </div>
    </div>
</template>
<style media="screen">
    .content{
        margin: 10px 0;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
      }
      .avatar {
        width: 178px;
        height: 178px;
        display: block;
      }
      .imgUp{
        text-align: left;
        float: left;
        font-size: 14px;
        color: #606266;
        line-height: 40px;
        padding: 0 12px 0 0;
      }
</style>
<script>
    import { Header } from 'mint-ui';
    export default {
        name: 'home',
        data() {
            return {
                selected:'',
                imageUrl: '',
                desc: ''
            }
        },
        components:{
            Header
        },
        methods: {
          handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
          },
          beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
              this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
              this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
           },
           onSubmit() {
               console.log('submit!');
           }
        }
    }
</script>
