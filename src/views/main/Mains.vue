<template>
    <div>
        <el-container>
            <el-aside width="200px" style="background-color: #545c64">

                <el-row class="tac">
                    <el-col :span="12">
                        <el-menu
                                class="el-menu-vertical-demo"
                                background-color="#545c64"
                                text-color="#fff"
                                active-text-color="#ffd04b"
                        >
                            <el-submenu index="1">
                                <template slot="title">
                                    <i class="el-icon-location"></i>
                                    <span>分类管理</span>
                                </template>
                                <el-menu-item index="1-1"><router-link to="/cateadd">添加分类</router-link></el-menu-item>
                                <el-menu-item index="1-2"><router-link to="/catequery">查看分类</router-link></el-menu-item>
                            </el-submenu>
                            <el-submenu index="2">
                                <template slot="title">
                                    <i class="el-icon-location"></i>
                                    <span>商品管理</span>
                                </template>
                                <el-menu-item index="2-1"><router-link to="/goodsadd">添加商品</router-link></el-menu-item>
                                <el-menu-item index="2-2"><router-link to="/goodsquery">查看商品</router-link></el-menu-item>
                            </el-submenu>
                            <el-submenu index="3">
                                <template slot="title">
                                    <i class="el-icon-location"></i>
                                    <span>日报管理</span>
                                </template>
                                <el-menu-item index="3-1">填写日报</el-menu-item>
                                <el-menu-item index="3-2">查看日报</el-menu-item>
                            </el-submenu>
                            <el-submenu index="4">
                                <template slot="title">
                                    <i class="el-icon-location"></i>
                                    <span>日报可视化</span>
                                </template>
                                <el-menu-item index="4-1"><router-link to="/vcharts">日报可视化</router-link></el-menu-item>
                            </el-submenu>
                        </el-menu>
                    </el-col>
                </el-row>
            </el-aside>
            <el-container>
                <el-header>
                    <el-menu  class="el-menu-demo" mode="horizontal"  background-color="#545c64"
                              text-color="#fff"
                              active-text-color="#ffd04b">
                        <el-menu-item index="1">处理中心</el-menu-item>
                        <el-submenu index="2">
                            <template slot="title">我的工作台</template>
                            <el-menu-item index="2-1">选项1</el-menu-item>
                            <el-menu-item index="2-2">选项2</el-menu-item>
                            <el-menu-item index="2-3">选项3</el-menu-item>
                        </el-submenu>
                        <el-menu-item index="3" >消息中心</el-menu-item>
                        <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
                    </el-menu>
                    <el-menu  class="el-menu-demo" mode="horizontal"  background-color="#545c64"
                              text-color="#fff"
                              active-text-color="#ffd04b">
                        <el-menu-item index="1">{{names}}</el-menu-item>
                        <el-menu-item index="2"><el-button style="background-color:#545c64;border:none;color:white" @click="exit">退出</el-button></el-menu-item>
                    </el-menu>
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
                <el-footer>Footer</el-footer>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "mains",
        data(){
            return{
                names:''
            }
        },

        methods:{
            getUser(){
                this.names=sessionStorage.getItem('names');
            },
            exit(){
                sessionStorage.token='';
                this.$router.push('/login');
            }
        },
        beforeMount(){
            this.getUser()
        }
    }
</script>

<style>
    body,html{
        width:100%;
        height: 100%;
        margin: 0;
    }
    .el-col-12{
        width:100%;
        text-align: left;
    }


</style>
<style scoped>
    .el-header, .el-footer {
        background-color: #545c64;
        color: #fdfafa;
        text-align: center;
        line-height: 60px;
    }
    .el-header{
        display: flex;
        justify-content: space-between;
    }
    .el-aside {
        /*background-color: #545c64;*/
        color: #fdfafa;
        text-align: center;
        line-height: 200px;
        height: 100vh ;
    }

    .el-main {
        background-color: #eeeeee;
        color: #E9EEF3;
        text-align: center;
        line-height: 160px;
        min-height: 530px;
    }
    .router-link-active{
        color:#ffd04b;
    }
    a{
        color:black
    }


</style>
