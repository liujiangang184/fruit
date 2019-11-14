<template>
    <div class="form">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>添加分类</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>
        <el-form ref="form" :model="form" label-width="80px" :rules="rules">
            <el-form-item label="分类名称" prop="cname">
                <el-input v-model="form.cname"></el-input>
            </el-form-item>
            <el-form-item label="分类排序" prop="sort">
                <el-input v-model="form.sort"></el-input>
            </el-form-item>
            <el-form-item label="缩略图" prop="thumb">
                <el-upload :action="uploadurl"
                           :on-success="uploadSuccess"
                >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {SUCCESS, FAIL, HOSTNAME, IMAGEHOST, TOKENFAIL} from "../../config/base";

    export default {
        name: "add",
        data: function () {
            return {
                uploadurl: HOSTNAME + '/api/upload',
                imageUrl: '',
                form: {
                    cname: '',
                    sort: '',
                    thumb: ''
                    // create_time: '',
                    // update_time: '',
                },
                rules: {
                    cname: [
                        {required: true, message: '请输入分类名称', trigger: 'blur'},
                        {min: 2, max: 4, message: '长度在2到4个字符', trigger: 'blur'},
                    ],
                    thumb: [{required: true, message: '请选择缩略图', trigger: 'blur'}],
                    sort: [{required: true, Number, message: '请输入排序', trigger: 'blur'}],
                },
            }
        },

        methods: {
            uploadSuccess(res) {
                this.imageUrl = IMAGEHOST + res.src
                this.form.thumb = res.src;

            },
            onSubmit() {
                // window.console.log(this.form);
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        let data = this.form;
                        let token = sessionStorage.getItem('token');
                        // console.log(token);
                        fetch(HOSTNAME + "/api/category", {
                            method: 'POST',
                            body: JSON.stringify(data),
                            headers: {
                                'token': token,
                                'content-type': 'application/json' // 通过头指定，获取的数据类型是JSON
                            },
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.code == SUCCESS) {
                                    this.$message.success(data.msg);
                                } else if (data.code == FAIL) {
                                    this.$message.error(data.msg);
                                } else if (data.code == TOKENFAIL) {
                                    this.$message.warning(data.msg);
                                }
                            })

                    } else {
                        window.console.log('error submit!!');
                        return false;
                    }
                })

            }
        }
    }
</script>
<style>
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
        border: 1px solid rgba(179, 149, 182, 0.47);
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
<style scoped>
    .form {
        width: 600px;
    }

    .el-input {
        width: 220px;
    }

</style>