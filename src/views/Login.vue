<template>
    <div class="login">
        <el-form :model="form">
            <el-form-item label="请输入名字">
                <el-input v-model="form.names"></el-input>
            </el-form-item>
            <el-form-item label="请输入密码">
                <el-input v-model="form.password"></el-input>
            </el-form-item>
                <el-button @click="submitHander">登录</el-button>
        </el-form>
    </div>
</template>

<script>
    import base from '../config/base';
    export default {
        name: "Login",
        data(){
            return{
                form: {
                    names: '',
                    password: ''
                }
            }
        },
        methods:{
            submitHander(){
                fetch(base.HOSTNAME+'/admin/login/index',{
                    body:JSON.stringify(this.form),
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then(res=>res.json()).then(data=>{
                    if(data.code===base.SUCCESS){
                        let redirect=this.$route.query.redirect||'mains';
                        this.$message.success(data.msg);
                        sessionStorage.token=data.data.token;
                        sessionStorage.names=data.data.names;
                        this.$router.push({name:redirect})
                    }else{
                        this.$message.error(data.msg);
                    }
                })
            }
        }
    }

</script>
<style scoped lang="scss">
    $width:500px;
    $height:auto;
    @mixin posMid{
        position: absolute;
        left:50%;
        top:50%;
        transform: translate3d(-50%,-50%,0);
    }
    .login{
        width: $width;
        height:$height;
        @include posMid;
    }

</style>
<style scoped>

</style>
