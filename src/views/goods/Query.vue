<template>
    <div id="box">
        <!--<el-breadcrumb separator="/" >-->
        <!--<el-breadcrumb-item :to="{ path: '/' }">教师管理</el-breadcrumb-item>-->
        <!--<el-breadcrumb-item><a href="/">教师添加</a></el-breadcrumb-item>-->
        <!--</el-breadcrumb>-->
        <el-form ref="searchg" :model="searchg" label-width="80px" :inline="true">
            <el-form-item label="商品分类">
                <el-select v-model="searchg.cid" placeholder="选择分类" style="width: 150px">
                    <el-option v-for="item in category" :label="item.cname" :value="item.id" :key="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品名称">
                <el-input v-model="searchg.gname" style="width: 150px"></el-input>
            </el-form-item>
            <el-form-item label="现价区间">
                <el-input v-model="searchg.min_price" placeholder="价格下限" style="width: 150px"></el-input>
                --
                <el-input v-model="searchg.max_price" placeholder="价格上限" style="width: 150px"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">搜索</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="form" v-if="form">
            <el-table-column prop="id" label="ID" width="30"></el-table-column>
            <el-table-column prop="gname" label="商品名称"></el-table-column>
            <el-table-column prop="cname" label="所属分类"></el-table-column>
            <el-table-column prop="thumb" label="缩略图">
                <template slot-scope="scope">
                    <img :src="imghostname+scope.row.thumb" :alt="scope.row.gname" :title="scope.row.gname" width="50">
                </template>
            </el-table-column>
            <el-table-column prop="description" label="商品描述"></el-table-column>
            <el-table-column prop="gprice" label="商品原价"></el-table-column>
            <el-table-column prop="sale" label="商品现价"></el-table-column>
            <el-table-column prop="stock" label="商品库存"></el-table-column>
            <el-table-column prop="volume" label="商品销量"></el-table-column>
            <el-table-column prop="brand" label="商品品牌"></el-table-column>
            <el-table-column prop="norms" label="商品规格"></el-table-column>
            <el-table-column prop="create_time" label="创建时间"></el-table-column>
            <el-table-column prop="update_time" label="更新时间"></el-table-column>
            <el-table-column   fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                <router-link :to="{name:'goodsedit',query:{id:scope.row.id}}" tag="el-button">编辑</router-link>
                <el-button @click="delCate(scope.row.id)" style="margin:0">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background  :page-size="limit"
        layout="total,prev, pager, next,jumper"  @current-change="cupage"
        :total="total">
        </el-pagination>
    </div>
</template>

<script>
    import base from '../../config/base';
    import {api} from '../../config/api';
    import axios from 'axios';
    export default {
        name: "query",
        data() {
            return {
                imghostname: base.IMGHOSTNAME,
                form: [],
                bannerArr: [],
                category: [],
                total: 0,
                limit: 1,
                current:1,
                searchg: {
                    cid: '',
                    gname: '',
                    min_price: '',
                    max_price: ''
                },

            }
        },
        methods: {
            getCategory() {
                api('get', '/api/category').then(res => {
                    this.category = res.data
                })
            },
            getCate() {
                let token = sessionStorage.getItem('token');
                let params1 = {'page': this.current, 'limit': this.limit};
                let params2 = {
                    'cid': this.searchg.cid,
                    'gname': this.searchg.gname,
                    ' min_price': this.searchg.min_price,
                    'max_price': this.searchg.max_price
                };
                let params3 = Object.assign({}, params1, params2);

                axios({
                    method: 'GET',
                    params: params3,
                    url: base.HOSTNAME + '/api/goods',
                    headers: {'token': token},
                }).then(res => {
                    if (res.data.code === base.SUCCESS) {
                        this.form = res.data.data;
                        this.total = res.data.count;
                    } else if (res.data.code === base.FAIL) {
                        this.$message({type: 'error', message: res.data.msg});
                        this.form = res.data.data;
                        this.total = res.data.count;
                    } else if (res.data.code === base.TOKENFAIL) {
                        this.$message({type: 'warning', message: res.data.msg});
                        this.$router.push({name: 'login'})
                    }
                }).catch(error => console.log(error))

            },
            delCate(id) {
                let token = sessionStorage.getItem('token');
                fetch(base.HOSTNAME + '/api/goods/' + id, {
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
            cupage(val) {
                this.current=val;
            },
            onSubmit() {
                this.getCate();
            }
        },
        watch:{
            current(){
                this.getCate()
            }
        },
        beforeMount() {
            this.getCategory();
            this.getCate();

        }
    }
</script>

<style>

    .el-main[data-v-6e6b717e]{
        line-height: 24px;
    }
</style>




<style scoped>

</style>

