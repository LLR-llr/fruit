<template>
    <div id="box">
        <!--<el-breadcrumb separator="/" >-->
            <!--<el-breadcrumb-item :to="{ path: '/' }">教师管理</el-breadcrumb-item>-->
            <!--<el-breadcrumb-item><a href="/">教师添加</a></el-breadcrumb-item>-->
        <!--</el-breadcrumb>-->
        <el-form :model="form" ref="form" label-width="80px" :rules="rules">
            <el-form-item label="分类名称" prop="cname">
                <el-input v-model="form.cname" placeholder="cname" clearable>
                    <i slot="prefix" class="el-input-icon el-icon-user"></i>
                </el-input>
            </el-form-item>
            <el-form-item label="缩略图" >
                <el-upload :action="uploadurl" :on-success="uploadSuccess">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    <el-input v-model="form.thumb" type="hidden">
                    </el-input>
                </el-upload>
            </el-form-item>
            <el-form-item label="排序" prop="sort">
                <el-input v-model.number="form.sort" placeholder="sort" clearable>
                    <i slot="prefix" class="el-input-icon el-icon-sort"></i>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitF">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import base from '../../config/base';
    export default {
        name: "add",
        data(){
            return{
                uploadurl:base.HOSTNAME+'/api/upload',
                imageUrl:'',
                form:{
                    cname:'',
                    thumb:'',
                    sort:'',
                },
                rules: {
                    cname: [
                        {required:true,message:'请输入用户名',trigger:'blue'},
                        {min:1,max:15,message:'请输入1-15个字符',trigger:'blue'}
                    ],

                }
            }
        },
        methods:{
            submitF(){
                let token=sessionStorage.getItem('token');
                fetch(base.HOSTNAME+'/api/category',{
                    method:'POST',
                    body:JSON.stringify(this.form),
                    headers: {
                        'Content-Type': 'application/json', // 指定提交方式为表单提交
                        'token':token // 通过头指定，获取的数据类型是JSON
                    },
                }).then(res=>res.json()).then(data=>{
                    if(data.code===base.SUCCESS){
                        this.$message({type:'success',message:data.msg});
                        this.$refs.form.resetFields();
                    }else if(data.code===base.TOKENFAIL){
                        this.$message({type:'warning',message:data.msg});
                        this.$router.push({name:'login'})
                    }else{
                        this.$message({type:'error',message:data.msg});
                    }
                })
            },
            uploadSuccess(data){
                this.imageUrl=base.IMGHOSTNAME+data.src;
                    this.form.thumb=data.src;
            }
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
</style>
<style scoped>
    #box{
        width: 400px;
    }
</style>
