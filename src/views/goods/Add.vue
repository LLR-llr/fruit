<template>
    <div id="box" v-loading.fullscreen.loch="loading" element-loading-background="rgba(0, 0, 0, 0.8)">
        <!--<el-breadcrumb separator="/" >-->
            <!--<el-breadcrumb-item :to="{ path: '/' }">教师管理</el-breadcrumb-item>-->
            <!--<el-breadcrumb-item><a href="/">教师添加</a></el-breadcrumb-item>-->
        <!--</el-breadcrumb>-->

        <el-form :model="form" ref="form" label-width="80px" :rules="rules">
            <el-form-item label="所属分类" >
                <el-select v-model="form.cid" placeholder="请选择">
                    <el-option
                            v-for="item in cate"
                            :key="item.id"
                            :label="item.cname"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品名称" prop="gname">
                <el-input v-model="form.gname" placeholder="清输入5-30个字符" clearable>
                    <i slot="prefix" class="el-input-icon el-icon-user"></i>
                </el-input>
            </el-form-item>
            <el-form-item label="商品描述" prop="description">
                <el-input v-model="form.description" placeholder="清输入5-30个字符" clearable>
                    <i slot="prefix" class="el-input-icon el-icon-user"></i>
                </el-input>
            </el-form-item>

            <el-form-item label="缩略图" >
                <el-upload :action="uploadurl" :on-success="uploadSuccess">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="轮播图" >
            </el-form-item>
            <el-form-item >
                <ul id="bannerbox" v-if="bannerArr.length">
                    <li v-for="(item,index) in bannerArr" :key="index" @mouseenter="showMask(index)" @mouseleave="hiddenMask(index)"><img :src="bannerSrc+item" alt="" >
                    <div class="mask" ref="mask">
                        <i class="el-icon-plus" @click="handlePictureCardPreview(bannerSrc+item)"></i>
                        <i class="el-icon-delete" @click="deletepicture(index)"></i>
                    </div>
                    </li>
                </ul>
                <el-upload   :action="uploadurl" :on-success="banneruploadSuccess" multiple :limit="3" :show-file-list="false">
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="详情图" >
            </el-form-item>
            <el-form-item >
                <ul id="detailbox" v-if="detailArr.length">
                    <li v-for="(item,index) in detailArr" :key="index" @mouseenter="showMask1(index)" @mouseleave="hiddenMask1(index)"><img :src="bannerSrc+item" alt="" >
                        <div class="mask1" ref="mask1">
                            <i class="el-icon-plus" @click="handlePictureCardPreview(bannerSrc+item)"></i>
                            <i class="el-icon-delete" @click="deletepicturedet(index)"></i>
                        </div>
                    </li>
                </ul>
                <el-upload :action="uploadurl" :on-success="detailuploadSuccess"  multiple :limit="5" :show-file-list="false" >
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="原价" prop="gprice">
                <el-input v-model.number="form.gprice" placeholder="原价" clearable>
                    <i slot="prefix" class="el-input-icon el-icon-sort"></i>
                </el-input>
            </el-form-item>
            <el-form-item label="现价" prop="sale">
                <el-input v-model.number="form.sale" placeholder="现价" clearable>
                    <i slot="prefix" class="el-input-icon el-icon-sort"></i>
                </el-input>
            </el-form-item>
            <el-form-item label="库存" prop="etock">
                <el-input v-model.number="form.stock" placeholder="库存" clearable>
                    <i slot="prefix" class="el-input-icon el-icon-sort"></i>
                </el-input>
            </el-form-item>
            <el-form-item label="品牌" prop="brand">
                <el-input v-model.number="form.brand" placeholder="品牌" clearable>
                    <i slot="prefix" class="el-input-icon el-icon-sort"></i>
                </el-input>
            </el-form-item>
            <el-form-item label="规格" prop="norms">
                <el-input v-model.number="form.norms" placeholder="规格" clearable>
                    <i slot="prefix" class="el-input-icon el-icon-sort"></i>
                </el-input>
            </el-form-item>
            <el-dialog :visible.sync="dialogVisible"> <img width="100%" :src="dialogImageUrl" alt=""></el-dialog>
            <el-form-item>
                <el-button type="primary" @click="submitF">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import base from '../../config/base';
    import {api} from '../../config/api';
    export default {
        name: "add",
        data(){
            return{
                uploadurl:base.HOSTNAME+'/api/upload',
                imageUrl:'',
                bannerArr:[],
                detailArr:[],
                loading:true,
                bannerSrc:base.IMGHOSTNAME,
                dialogImageUrl: '',
                dialogVisible: false,
                form:{
                    gname:'',
                    thumb:'',
                    gprice:'',
                    cid:'',
                    sale:'',
                    description:'',
                    detail:'',
                    brand:'',
                    stock:'',
                    norms:'',
                    banner:'',
                },
                cate:[],
                rules: {
                    gname: [
                        {required:true,message:'请输入用户名',trigger:'blur'},
                        {min:1,max:15,message:'请输入1-15个字符',trigger:'blur'}
                    ],

                }
            }
        },
        methods:{
            showMask(index){
                this.$refs.mask[index].style.display='flex'
            },
            hiddenMask(index){
                this.$refs.mask[index].style.display='none'
            },
            showMask1(index){
                this.$refs.mask1[index].style.display='flex'
            },
            hiddenMask1(index){
                this.$refs.mask1[index].style.display='none'
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file;
                this.dialogVisible = true;
            },
            deletepicture(index){
                this.bannerArr.splice(index,1);
            },
            deletepicturedet(index){
                this.detailArr.splice(index,1);
            },
            submitF(){
                api('POST','/api/goods',this.form).then(res=>{        this.$message({type:'success',message:res.msg});
                    this.$refs.form.resetFields();});
            },
            uploadSuccess(data){
                this.imageUrl=base.IMGHOSTNAME+data.src;
                    this.form.thumb=data.src;
            },
            banneruploadSuccess(res){
                this.bannerArr.push(res.src);

            },
            detailuploadSuccess(res){
                this.detailArr.push(res.src);
            },
            getCate(){
                let token=sessionStorage.getItem('token');
                fetch(base.HOSTNAME+'/api/category',{
                    method:'GET',
                    headers:{
                        'token':token
                    }
                }).then(res => res.json()).then(data => {
                    if (data.code === base.SUCCESS) {
                        this.cate = data.data;
                        console.log(this.cate);
                        this.loading=false;
                        // this.total = data.count
                    } else if(data.code===base.TOKENFAIL){
                        this.$message({type:'warning',message:data.msg});
                        this.$router.push({name:'login'})
                    }else{
                        this.$message({type:'error',message:data.msg});
                    }

                })
            }
        },
        watch:{
            bannerArr(){
                this.form.banner=this.bannerArr.join()
            },
            detailArr(){
                this.form.detail=this.detailArr.join()
            }
        },
        beforeMount() {
            this.getCate()
        }
    }
</script>
<style>
    .el-upload{
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader {
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
        width: 150px;
        height: 150px;
        line-height: 150px;
        text-align: center;
    }
    .avatar {
        width: 150px;
        height: 150px;
        display: block;
    }
    .el-dialog{
        width:30%;
    }
</style>
<style scoped lang="scss">
    #bannerbox,#detailbox{
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        >li{
            width:150px;
            height: 150px;
            border:solid 1px #cccccc;
            margin-right: 10px;
            border-radius: 5px;
            overflow:hidden;
            position: relative;
            >img{
                width:100%;
                height: 100%;
            }
            >.mask,.mask1{
                position: absolute;
                top: 0;
                left: 0;
                width:100%;
                height: 100%;
                background-color: rgba(0,0,0,0.3);
                display: none;
                justify-content: center;
                align-items: center;
                >i{
                    color: #ffffff;
                    margin-left: 10px;
                    margin-right: 10px;
                }
            }
        }
    }
</style>
