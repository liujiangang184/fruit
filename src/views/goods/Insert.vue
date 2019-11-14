<template>
    <div><!--v-loading.fullscreen.lock="loading"-->
        <el-form :model="form"  ref="form"><!--:rules="rules"-->
            <el-form-item label="所属分类">
                <el-select v-model="form.cid">
                    <el-option :value="item.id" :label="item.cname" v-for="item in category" :key="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品名称">
                <el-input v-model="form.gname" placeholder="请输入5-30个字符" clearable=""></el-input>
            </el-form-item>
            <el-form-item label="商品描述">
                <el-input v-model="form.description" placeholder="请输入简单描述" clearable=""></el-input>
            </el-form-item>
            <el-form-item label="商品原价">
                <el-input v-model.number="form.mprice" placeholder="请输入商品原价" clearable=""></el-input>
            </el-form-item>
            <el-form-item label="商品现价">
                <el-input v-model.number="form.sale" placeholder="请输入商品现价" clearable=""></el-input>
            </el-form-item>
            <el-form-item label="商品库存">
                <el-input v-model.number="form.stock" placeholder="请输入库存数量" clearable=""></el-input>
            </el-form-item>

            <el-form-item label="商品品牌">
                <el-input v-model.number="form.brand" placeholder="请输入商品品牌" clearable=""></el-input>
            </el-form-item>
            <el-form-item label="商品规格">
                <el-input v-model.number="form.norms" placeholder="请输入商品规格" clearable=""></el-input>
            </el-form-item>
            <el-form-item label="商品缩略图">
                <el-upload :action="HostName+'/api/upload'" :on-success="thumbUploadSuccess">
                    <img v-if="form.gthumb" :src="ImgHostName + form.gthumb" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="商品轮播图">
                <el-upload :action="HostName+'/api/upload'"
                           :on-success="bannerUploadSuccess"
                           multiple :limit="3"
                >
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <ul v-if="bannerArr.length" id="banner-box">
                    <li v-for="(item,index) in bannerArr" :key="index"
                        @mouseenter="showMask(index)" @mouseleave="hiddenMask(index)">
                        <div class="mask" ref="mask">
                            <i class="el-icon-plus" @click="previewImage(index)"></i>
                            <i class="el-icon-delete"></i>
                        </div>
                        <img :src="ImgHostName + item" alt="">
                    </li>
                </ul>
            </el-form-item>
            <el-form-item label="商品详情图">
                <el-upload :action="HostName+'/api/upload'"
                           :on-success="detailUploadSuccess"
                           multiple :limit="5"
                >
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <ul v-if="detailArr.length" id="banners-box">
                    <li v-for="(item,index) in detailArr" :key="index"
                        @mouseenter="showMasks(index)" @mouseleave="hiddenMasks(index)">
                        <div class="masks" ref="masks">
                            <i class="el-icon-plus" @click="previewImages(index)"></i>
                            <i class="el-icon-delete"></i>
                        </div>
                        <img :src="ImgHostName + item" alt="">
                    </li>
                </ul>
            </el-form-item>
            <el-form-item>
                <el-button @click="insertGoods">提交</el-button>
            </el-form-item>
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
        </el-form>
    </div>
</template>

<script>
    import {HOSTNAME, IMAGEHOST, SUCCESS, FAIL, TOKENFAIL} from "../../config/base";
    import {api} from "../../config/api";

    export default {
        name: "Insert",
        data() {
            return {
                HostName: HOSTNAME,
                ImgHostName: IMAGEHOST,
                imgurl:'',
                category: [],
                loading: true,
                form: {
                    gname: '',
                    mprice: '',
                    sale: '',
                    description: '',
                    gthumb: '',
                    banner: '',
                    detail: '',
                    brand: '',
                    stock: '',
                    norms: '',
                    cid: ''
                },
                /*rules: {
                    gname: [{required: true, message: '请输入商品名称', trigger: 'blur'}],
                },*/
                bannerArr: [],
                detailArr:[],
                dialogVisible:false,
                dialogImageUrl:''
            }
        },
        methods: {
            showMask(index) {
                this.$refs.mask[index].style.display = 'flex';
            },
            hiddenMask(index) {
                this.$refs.mask[index].style.display = 'none';
            },
            previewImage(index){
              this.dialogVisible=true;
              this.dialogImageUrl=this.ImgHostName+this.bannerArr[index];
            },
            showMasks(index) {
                this.$refs.masks[index].style.display = 'flex';
            },
            hiddenMasks(index) {
                this.$refs.masks[index].style.display = 'none';
            },
            previewImages(index){
                this.dialogVisible=true;
                this.dialogImageUrl=this.ImgHostName+this.bannerArr[index];
            },
            getCategory() {
                let token = sessionStorage.getItem('token');
                fetch(HOSTNAME + "/api/category", {
                    method: 'GET',
                    headers: {
                        'token': token,
                        'content-type': 'application/json'
                    },
                })
                    .then(res => res.json())
                    .then(data => {
                        this.loading = false;
                        if (data.code == SUCCESS) {
                            this.category = data.data;
                            this.$message.success(data.msg);
                        } else if (data.code == FAIL) {
                            this.$message.error(data.msg);
                        } else if (data.code == TOKENFAIL) {
                            this.$message.warning(data.msg);
                        }
                    })
            },
            thumbUploadSuccess(res) {
                this.form.gthumb = res.src;
            },
            bannerUploadSuccess(res) {
                this.bannerArr.push(res.src);
            },
            detailUploadSuccess(res) {
                this.detailArr.push(res.src)
            },
            insertGoods(){
                api('post',HOSTNAME+'/api/goods',this.form)
            }
        },
        watch: {
            bannerArr() {
                this.form.banner = this.bannerArr.join();
            },
            detailArr(){
                this.form.detail=this.detailArr.join();
            }
        },
        beforeMount() {
            this.getCategory();
        }
    }
</script>

<style lang="scss">
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

    #banner-box {
        display: flex;
        flex-wrap: wrap;

        > li {
            position: relative;
            width: 150px;
            height: 150px;
            margin: 10px;

            > .mask {
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                background-color: rgba(0, 0, 0, 0.3);
                /*display: none;*/
                justify-content: center;
                align-items: center;

                > i {
                    color: #ffffff;
                    margin-left: 20px;
                }
            }

            > img {
                width: 100%;
                height: 100%;
            }
        }
    }
    #banners-box {
        display: flex;
        flex-wrap: wrap;

        > li {
            position: relative;
            width: 150px;
            height: 150px;
            margin: 10px;

            > .masks {
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                background-color: rgba(0, 0, 0, 0.3);
                /*display: none;*/
                justify-content: center;
                align-items: center;

                > i {

                    color: #ffffff;
                    margin-left: 20px;
                }
            }

            > img {
                width: 100%;
                height: 100%;
            }
        }
    }

</style>