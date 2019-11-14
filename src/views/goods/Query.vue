<template>
    <div>
        <el-form :model="form" :inline="true">
            <el-form-item label="商品分类">
                <el-select v-model="form.cid">
                    <el-option v-for="item in category" :key="item.id" :value="item.id" :label="item.cname"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品名称">
               <el-input v-model="form.gname"></el-input>
            </el-form-item>
            <el-form-item label="现价价格区间">
                <el-input v-model.number="form.min_price" style="width: 150px"></el-input>
                ---
                <el-input v-model.number="form.max_price" style="width: 150px"></el-input>
            </el-form-item>
       <el-form-item>
            <button @click="searchGoods" style="width: 70px;height: 40px;">搜索</button>
       </el-form-item>
        </el-form>
        <el-table :data="goods">
            <el-table-column prop="id" label="ID"></el-table-column>
            <el-table-column prop="cid" label="分类"></el-table-column>
            <el-table-column prop="gname" label="商品名称"></el-table-column>
            <el-table-column prop="price" label="商品原价"></el-table-column>
            <el-table-column prop="sale" label="商品现价"></el-table-column>
            <el-table-column prop="stock" label="商品库存"></el-table-column>
            <el-table-column prop="description" label="商品描述"></el-table-column>
            <el-table-column prop="brand" label="商品品牌"></el-table-column>
            <el-table-column prop="norms" label="商品规格"></el-table-column>
            <el-table-column prop="banner" label="商品轮播图">
                <img v-for="item in bannerArr" :key="item" :src="imgHost+item" width="100px">
            </el-table-column>
            <el-table-column prop="thumb" label="商品缩略图">
                <template slot-scope="scope">
                    <img :src="imgHost+scope.row.thumb" :alt="scope.row.name" width="100px" :title="scope.row.name">
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <!--<router-link :to="{name:'categoryEdit',query:{id:scope.row.id}}" tag="el-button">编辑</router-link>-->
                    <el-button @click="deleteCate(scope.row.gid)">删除</el-button>
                </template>

            </el-table-column>
        </el-table>
        <el-pagination layout="total,prev,pager,next,jumper" :total="total" :page-size="2"></el-pagination>
    </div>
</template>

<script>
    import axios from 'axios';
    import {HOSTNAME, SUCCESS, IMAGENAME} from "../../config/base";

    export default {
        name: "Query",
        data() {
            return {
                goods: [],
                category: [],
                imgHost: IMAGENAME,
                form:{
                  cid:'',
                  gname:'',
                  min_price:'',
                  max_price:''
                },
                bannerArr: [],
                total:0,
                current:1,
                limit:3
            }
        },
        methods: {
            getGoods() {
             /*   let pagelimit = {limit:this.limit,page:this.current};
                let params=Object.assign({},pagelimit,this.form);*/
                let token = sessionStorage.getItem('token');
                //     fetch(HOSTNAME+'/api/goods',{
                //         method:'GET',
                //         headers:{
                //             'content-type':'application/json',
                //             'token':token
                //         }
                //     })
                //         .then(res=>res.json())
                //         .then(data=>{
                //             if(data.code == SUCCES){
                //                 this.$message.success(data.msg);
                //                 for(let i=0;i<data.data.length;i++){
                //                     let xm=data.data[i].gbanner;
                //                     let xmm=xm.split(',');
                //                     this.gbannerArr.push(xmm);
                //                 }
                //                 this.gbannerArr=this.gbannerArr[0];
                //                 console.log(this.gbannerArr);
                //                 this.goods=data.data;
                //             }else if(data.code == FAIL){
                //                 this.$message.error(data.msg);
                //             }else if(data.code==TOKENFAIL){
                //                 this.$message({
                //                     type:'warning',
                //                     message:data.msg,
                //                 })
                //             }
                //         })
                axios.get(HOSTNAME + '/api/goods', {
                    params: {
                        token,
                        limit:this.limit,
                        page:this.current,
                        gname:this.form.gname,
                        cid:this.form.cid,
                        min_price:this.min_price,
                        max_price:this.max_price
                    },
                })
                    .then(res => {
                        if(res.data.code == SUCCESS && res.data.count){
                            this.goods = res.data.data;
                            this.total = res.data.count;
                            this.page=res.data.current;
                            // console.log(this.total);
                            for (let i = 0; i < res.data.data.length; i++) {
                                let xm = res.data.data[i].banner;
                                let xmm = xm.split(',');
                                this.bannerArr.push(xmm);
                            }
                            // console.log(this.bannerArr);
                            this.bannerArr = this.bannerArr[0];
                        }
                        console.log(res);
                    }).catch(error => {
                    console.log(error);
                })
            },
            searchGoods(){
                this.current=1;
                this.getGoods();
            },
            changePage(i){
              this.current=i;
            },
            getCategory(){
                let token = sessionStorage.getItem('token');
                axios.get(HOSTNAME + '/api/category', {
                    headers:{
                        token
                    }
                })
            },
            deleteCate(gid) {
                let token = sessionStorage.getItem('token');
                fetch(HOSTNAME + '/api/goods/' + gid, {
                    method: 'DELETE',
                    headers: {
                        'token': token,
                    }
                }).then(res => res.json())
                    .then(data => {
                        if (data.code == SUCCESS) {
                            this.goods = this.goods.filter(ele => ele.gid != gid);
                            this.$message.success(data.msg);
                        } else {
                            this.$message.error(data.msg);
                        }
                    })
            }
        },
        watch:{
            current(){
                this.getGoods();
            }
        },
        beforeMount() {
            this.getGoods();
            this.getCategory();
        }
    }
</script>

<style scoped>

</style>