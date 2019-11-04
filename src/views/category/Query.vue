<template>
    <div id="box">
        <!--<el-breadcrumb separator="/" >-->
        <!--<el-breadcrumb-item :to="{ path: '/' }">教师管理</el-breadcrumb-item>-->
        <!--<el-breadcrumb-item><a href="/">教师添加</a></el-breadcrumb-item>-->
        <!--</el-breadcrumb>-->

        <el-table :data="form" v-if="form">
            <el-table-column prop="id" label="ID"></el-table-column>
            <el-table-column prop="cname" label="分类名称"></el-table-column>
            <el-table-column prop="thumb" label="缩略图">
                <template slot-scope="scope">
                    <img :src="imghostname+scope.row.thumb" alt="" :title="scope.row.cname" width="150">
                </template>
            </el-table-column>
            <el-table-column prop="sort" label="分类排序"></el-table-column>
            <el-table-column prop="create_time" label="创建时间"></el-table-column>
            <el-table-column prop="update_time" label="更新时间"></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <router-link :to="{name:'cateedit',query:{id:scope.row.id}}" tag="el-button">编辑</router-link>
                    <el-button @click="delCate(scope.row.id)" style="margin:0">删除</el-button>
                </template>
            </el-table-column>
        </el-table>


        <el-pagination background :page-size="limit"
                       layout="total,prev, pager, next,jumper" @current-change="changepage"
                       :total="total">
        </el-pagination>

    </div>
</template>

<script>
    import base from '../../config/base';
    import axios from 'axios';

    export default {
        name: "query",
        data() {
            return {
                imghostname: base.IMGHOSTNAME,
                form: [],
                total: 0,
                limit: 1,
                current: 1
            }
        },
        methods: {
            changepage(val) {
                this.current = val;
            },

            getCate() {
                let token = sessionStorage.getItem('token');
                axios({
                    method: 'GET',
                    params: {'page': this.current, 'limit': this.limit},
                    url: base.HOSTNAME + '/api/category',
                    headers: {'token': token},
                }).then(res => {
                    if (res.data.code === base.SUCCESS) {
                        this.form = res.data.data;
                        this.total = res.data.count;
                    } else if (res.data.code === base.FAIL) {
                        this.$message({type: 'error', message: res.data.msg});
                    } else if (res.data.code === base.TOKENFAIL) {
                        this.$message({type: 'warning', message: res.data.msg});
                        this.$router.push({name: 'login'})
                    }
                }).catch(error => console.log(error))

            },
            delCate(id) {
                let token = sessionStorage.getItem('token');
                fetch(base.HOSTNAME + '/api/category/' + id, {
                    method: 'DELETE',
                    headers: {
                        'token': token
                    }
                }).then(res => res.json()).then(data => {
                    if (data.code === base.SUCCESS) {
                        this.$message({type: 'success', message: data.msg});
                        this.form = this.form.filter(ele => ele.id !== id)
                    } else if (data.code === base.TOKENFAIL) {
                        this.$message({type: 'warning', message: data.msg});
                    } else {
                        this.$message({type: 'error', message: data.msg});
                    }
                })
            },

        },
        watch: {
            current() {
                this.getCate();
            }
        },
        beforeMount() {
            this.getCate();
        }
    }
</script>


<style>
    .el-main[data-v-6e6b717e] {
        line-height: 40px;
    }

</style>


<style scoped>

</style>

