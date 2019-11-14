<template>
    <el-container style="height: 690px;">
        <el-aside width="200px">
            <el-menu default-active="2" class="el-menu-vertical-demo">

                    <img src="../../assets/管理系统1.png" alt="" style="margin: 10px 15px">

                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>商品分类</span>
                    </template>
                    <el-menu-item index="1-1"><router-link to="/categoryAdd">添加分类</router-link></el-menu-item>
                    <el-menu-item index="1-2"><router-link to="/categoryQuery">查看分类</router-link></el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>商品管理</span>
                    </template>
                    <el-menu-item index="2-1" style="color: #fff"><router-link to="/goodsinsert" >添加商品</router-link> </el-menu-item>
                    <el-menu-item index="2-2"><router-link to="/goodsquery">查看商品</router-link></el-menu-item>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>其他商品</span>
                    </template>
                    <el-menu-item index="3-1">添加商品</el-menu-item>
                    <el-menu-item index="3-2">查看商品</el-menu-item>
                </el-submenu>
                <el-submenu index="4">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>商品可视化</span>
                    </template>
                    <el-menu-item index="4-1"><router-link to="/vcharts">数据可视化</router-link></el-menu-item>
                </el-submenu>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header>
                <el-menu class="el-menu-demo" mode="horizontal">
                    <el-menu-item index="1">处理中心</el-menu-item>
                    <el-submenu index="2">
                        <template slot="title" style="color: #fff">我的工作台</template>
                        <el-menu-item index="2-1">选项1</el-menu-item>
                        <el-menu-item index="2-2">选项2</el-menu-item>
                        <el-menu-item index="2-3">选项3</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="3">消息中心</el-menu-item>
                    <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
                </el-menu>
                <div style="position: absolute;right: 50px;top: 20px;color: #fff">欢迎您：{{user.username}}        退出</div>
            </el-header>

            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        name: "Mains",
        data(){
            return{
                user:null
            }
        },
        methods:{
            getuser(){
                this.user=JSON.parse(localStorage.getItem('user'))
            }
        },
        beforeMount() {
            this.getuser();
        }
    }

</script>

<style>
    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
    }
    .el-menu{
        background-color: #0a3f71;
    }
    .el-submenu__title>span{
        color: #fff;
    }
    .el-submenu__title>i{
        color: #fff;
    }
    .el-menu--horizontal>.el-menu-item{
        color: #fff;
    }
    .el-menu--horizontal>.el-submenu .el-submenu__title{

    }
    .el-aside {
        height: 100vh;
        background-color: #0a3f71;
        color: #333;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
    }

    .el-header {
        padding: 0;
    }
    .router-link-exact-active{
        color: #4094fe;
    }
</style>