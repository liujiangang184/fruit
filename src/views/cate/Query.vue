<template>
    <div>
        <el-table :data="cate">
            <el-table-column fixed prop="id" label="ID" width="130">
            </el-table-column>
            <el-table-column
                    prop="cname"
                    label="分类名称">
            </el-table-column>
            <el-table-column
                    prop="sort"
                    label="排序">
            </el-table-column>
            <el-table-column
                    prop="thumb"
                    label="缩略图">
                <template slot-scope="scope">
                    <img :src="imgHost+scope.row.thumb" :title="scope.row.cname" :alt="scope.row.id" width="150">
                </template>
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作" width="200">
                <template slot-scope="scope">
                    <el-button size="mini">
                        <router-link :to="{name:'categoryEdit',params:{id:scope.row.id}}">编辑</router-link>
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete( scope.row.id)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {SUCCESS, FAIL, TOKENFAIL,HOSTNAME,IMAGEHOST} from "../../config/base";

    export default {
        name: "query",
        data: function () {
            return {
                cate: [],
                imgHost:IMAGEHOST,
            }
        },
        methods: {
            getCate() {
                let token = sessionStorage.getItem('token');
                fetch(HOSTNAME + "/api/category", {
                    method: 'GET',
                    headers: {
                        'token': token,
                    },
                }).then(res => res.json()).then(data => {
                    if (data.code == SUCCESS) {
                        // window.console.log(data.data);
                        this.cate = data.data;
                        this.$message.success(data.msg);
                    } else if (data.code == FAIL) {
                        this.$message.error(data.msg);
                    }else if (data.code==TOKENFAIL){
                        this.$message.warning(data.msg);
                    }
                })
            },
            handleDelete(index, id) {
                let token = sessionStorage.getItem('token');
                fetch(HOSTNAME + "/api/category/delete"+id, {
                    method: 'DELETE',
                    body: {'id': id},
                    headers: {
                        'token': token,
                    },
                })
                    .then(res => res.json())
                    .then(data => {
                    if (data.code == SUCCESS) {
                        // window.console.log(data.data);
                        this.cate = data.data.data;
                        this.$message.success(data.msg);
                    } else if (data.code == FAIL) {
                        this.$message.error(data.msg);
                    }
                })
                // this.students=this.students.filter((ele,key)=>{return key!=index})
                window.console.log(index, id);
            },
            //     //点击编辑
            //     handleEdit(index, row) {
            //         window.console.log(index,row);
            //
            //         this.forrm = Object.assign({}, row); //这句是关键！！！
            //     },
            //     handleCurrentChange(row, event, column) {
            //         window.console.log(row, event, column, event.currentTarget)
            //     },
            //
        },
       beforeMount() {
            this.getCate();
       }
    }
</script>

<style scoped>
    .demo-table-expand {
        font-size: 0;
    }

    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }

    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }

    a {
        color: #000;
    }
</style>