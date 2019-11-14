<template>
    <div id="container">
        <div class="login">
            <el-form :model="form">
                <el-form-item label="用户名">
                    <el-input v-model="form.names">
                    </el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.password" show-password="">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="submitHandle">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>

</template>

<script>
    import {SUCCESS,FAIL,HOSTNAME} from "../config/base";

    export default {
        name: "Login",
        data: function () {
            return {
                form: {
                    names: '',
                    password: ''
                }
            }
        },
        methods: {
            submitHandle() {
                fetch(HOSTNAME+'/admin/login/index',{
                    method:'POST',
                    body:JSON.stringify(this.form),
                    headers:{
                        'content-type':'application/json'
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        if(data.code == SUCCESS){
                            let redirect = this.$route.query.redirect || 'mains';
                            this.$message.success(data.msg);
                            sessionStorage.token = data.data.token;
                            sessionStorage.names = data.data.names;
                            this.$router.push({name:redirect})
                        }else if(data.code == FAIL){
                            this.$message.error(data.msg);
                        }
                    })
            }
        }
    }
</script>

<style scoped lang="scss">
    $width: 400px;
    $bgcolor: #ccc;
    @mixin centerMid {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
    }

    .login {
        width: $width;
        height: auto;
        @include centerMid;
        padding: 0 50px;
        box-sizing: border-box;
        background: rgba(255,255,255,0.4);
        border-radius: 20px;
    }
    #container{
        position: absolute;
        top:0;
        bottom: 0;
        left: 0;
        right:0;
        background: #fff url("../assets/scene.jpg") center/cover;
        margin: 0;
        padding: 0;
    }
</style>